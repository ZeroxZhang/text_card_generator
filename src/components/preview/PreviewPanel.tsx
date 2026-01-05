import React, { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Download, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '../ui/Button';
import html2canvas from 'html2canvas';
import { clsx } from 'clsx';
import { pinyin } from 'pinyin-pro';

export const PreviewPanel: React.FC = () => {
  const { content, settings } = useStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;

    try {
      // Calculate aspect ratio and dimensions for better export quality
      const scale = 4; // Increased from 3 to 4 for ultra-high resolution
      
      const canvas = await html2canvas(previewRef.current, {
        scale: scale,
        useCORS: true,
        backgroundColor: settings.cardStyle === 'sticky' 
          ? null // For sticky notes, we capture the gradient from the element itself
          : settings.backgroundColor,
        logging: false,
        onclone: (clonedDoc) => {
          // Fix for some CSS effects not rendering perfectly in html2canvas
          const element = clonedDoc.querySelector('[data-preview-container]') as HTMLElement;
          if (element) {
            // Ensure background images/gradients are preserved
            element.style.background = getBackgroundStyle().background || getBackgroundStyle().backgroundColor || '';
          }
        }
      });

      const link = document.createElement('a');
      link.download = `reading-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    }
  };

  const getBackgroundStyle = () => {
    // If it's a sticky note style, we might use a gradient from the scheme if available
    // But since settings only has backgroundColor (which is a hex code usually), 
    // we need to handle the gradient case.
    
    if (settings.cardStyle === 'sticky') {
       // Match the specific gradient based on the background color (a bit hacky but works for now)
       if (settings.backgroundColor === '#E2E8F0') { // Light Sticky
         return { background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' };
       }
       if (settings.backgroundColor === '#0F172A') { // Dark Sticky
         return { background: 'linear-gradient(180deg, #0E1E3A 0%, #2B2F72 100%)' };
       }
    }
    
    return { backgroundColor: settings.backgroundColor };
  };

  const getTextureStyle = () => {
    const color = settings.cardStyle === 'sticky' 
      ? (settings.backgroundColor === '#0F172A' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
      : 'rgba(0, 0, 0, 0.08)';
      
    switch (settings.texture) {
      case 'line':
        return {
          backgroundImage: `linear-gradient(transparent 96%, ${color} 96%)`,
          backgroundSize: '100% 2.5rem',
        };
      case 'grid':
        return {
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        };
      default:
        return {};
    }
  };

  const isSticky = settings.cardStyle === 'sticky';
  const isDarkSticky = isSticky && settings.backgroundColor === '#0F172A';
  const authorLabel = (() => {
    const a = (content.author || '').trim();
    if (!a) return 'Zerox';
    const isChinese = /[\u4e00-\u9fa5]/.test(a);
    if (isChinese) {
      const arr = pinyin(a, { toneType: 'none', type: 'array' });
      return Array.isArray(arr) ? arr.join(' ') : String(arr);
    }
    return a;
  })();

  return (
    <div className="flex flex-col h-full bg-[#F2F2F0] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} 
      />

      <div className="absolute top-6 right-8 z-20 flex gap-2">
        <Button 
          onClick={handleExport} 
          className="bg-foreground text-white hover:bg-black shadow-lg hover:shadow-xl transition-all rounded-full px-6 py-2.5 flex items-center gap-2"
        >
          <Download size={16} strokeWidth={2.5} />
          <span className="font-medium tracking-wide text-xs">导出长图</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-8 md:p-12 flex items-start justify-center">
        <div
          ref={previewRef}
          data-preview-container
          className={clsx(
            "w-full max-w-[520px] transition-all duration-500 ease-out relative flex flex-col",
            isSticky ? "rounded-3xl p-8 overflow-hidden" : "shadow-card hover:shadow-card-hover"
          )}
          style={{
            ...getBackgroundStyle(),
            minHeight: '600px',
            boxShadow: isSticky ? '0 20px 50px rgba(0,0,0,0.15)' : undefined,
          }}
        >
          {/* Sticky Header (Only for Sticky Mode) */}
          {isSticky && (
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-xl font-bold" style={{ color: settings.textColor }}>Sticky Notes</h2>
              <div className="opacity-60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={settings.textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </div>
          )}

          {/* Main Card Content Area */}
          <div 
            className={clsx(
              "flex-1 relative transition-all duration-300",
              isSticky ? "rounded-xl backdrop-blur-md" : ""
            )}
            style={{
              backgroundColor: isSticky 
                ? (isDarkSticky ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.85)')
                : settings.backgroundColor,
              ...(!isSticky ? getTextureStyle() : {}), // Apply texture to main background if not sticky
              padding: isSticky ? `${settings.padding}px` : `${settings.padding}px`,
              fontFamily: settings.fontFamily,
              color: settings.textColor,
              boxShadow: isSticky ? '0 10px 30px rgba(0,0,0,0.05)' : undefined,
            }}
          >
             {/* Sticky Note Folded Corner Effect */}
             {isSticky && (
              <div 
                className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${isDarkSticky ? '#3b82f6' : '#bfdbfe'} 50%)`,
                  borderRadius: '0 0 12px 0',
                  boxShadow: '-2px -2px 5px rgba(0,0,0,0.1)'
                }}
              />
            )}
            {isSticky && (
               <div 
                className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                style={{
                  background: isDarkSticky ? '#0F172A' : '#E2E8F0', // Match parent background to "cut" the corner
                  clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
                }}
              />
            )}

            {/* Header */}
            <div className={clsx("mb-8 border-b pb-6", isSticky ? "border-current border-opacity-10" : "border-black/5")}>
              <div className="flex justify-between items-start">
                <h1 
                  className={clsx(
                    "font-bold mb-4 leading-tight tracking-tight flex-1",
                    isSticky ? "text-2xl" : "text-4xl"
                  )}
                  style={{ color: isSticky ? (isDarkSticky ? '#59A0FF' : '#1F4E8F') : settings.textColor }}
                >
                  {content.title}
                </h1>
                {isSticky && (
                  <div className="text-current opacity-50 ml-4 text-xl leading-none">•••</div>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm font-medium opacity-60 font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-[1px] bg-current opacity-50"></span>
                  {content.author}
                </span>
                <span>{content.date}</span>
              </div>
            </div>

            {/* Abstract */}
            {content.abstract && (
              <div 
                className={clsx(
                  "mb-8 p-5 text-sm leading-relaxed",
                  isSticky ? "rounded-lg bg-current bg-opacity-5 border-none" : "rounded-none border-l-4 italic"
                )}
                style={{ 
                  backgroundColor: !isSticky ? 'rgba(0,0,0,0.02)' : undefined,
                  borderColor: !isSticky ? settings.accentColor : undefined,
                  color: settings.textColor,
                  opacity: 0.9
                }}
              >
                {content.abstract}
              </div>
            )}

            {/* Body */}
            <div 
              className="whitespace-pre-wrap relative z-10"
              style={{
                fontSize: isSticky ? Math.max(14, settings.fontSize * 0.9) : settings.fontSize, // Slightly smaller font for sticky notes
                lineHeight: settings.lineHeight,
                letterSpacing: `${settings.letterSpacing}em`,
                textAlign: settings.textAlign,
                ... (isSticky ? getTextureStyle() : {}) // Apply texture to content card if sticky
              }}
            >
              {content.body.split('\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  style={{ 
                    textIndent: paragraph.trim() ? `${settings.paragraphIndent}em` : 0,
                    marginBottom: `${settings.paragraphSpacing}em`,
                    minHeight: paragraph.trim() ? 'auto' : '1em' // Ensure empty lines have height
                  }}
                >
                  {paragraph || '\u00A0'} 
                </p>
              ))}
            </div>

            {/* Footer / Toolbar for Sticky */}
            {isSticky ? (
               <div className="mt-8 pt-4 border-t border-current border-opacity-10 flex gap-4 opacity-70">
                 {['B', 'I', 'S', 'U'].map(item => (
                   <span key={item} className="font-serif font-bold text-sm cursor-pointer hover:opacity-100">{item}</span>
                 ))}
               </div>
            ) : (
              <div className="mt-16 pt-8 border-t border-black/5 flex justify-center items-center opacity-60">
                <span className="text-[10px] font-medium tracking-widest uppercase" style={{ color: 'gray', fontFamily: '"Roboto Condensed", sans-serif' }}>
                  {authorLabel} All Rights Reserved
                </span>
              </div>
            )}
          </div>
          
           {/* Sticky Bottom Toolbar (Outside the card) */}
           {isSticky && (
            <div className="mt-6 flex gap-3">
              {['+', 'T', 'P', 'G', 'F'].map((icon, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:scale-105"
                  style={{
                    backgroundColor: isDarkSticky ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
                    color: isDarkSticky ? '#9CC3FF' : '#1F4E8F'
                  }}
                >
                  <span className="font-bold text-lg">
                    {i === 0 ? '+' : (i === 1 ? 'T' : '●')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
