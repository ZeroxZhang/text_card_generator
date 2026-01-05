import React, { useState } from 'react';
import { ContentTab } from './ContentTab';
import { TypographyTab } from './TypographyTab';
import { ColorTab } from './ColorTab';
import { clsx } from 'clsx';
import { Type, Palette, FileText } from 'lucide-react';

export const EditorPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'typography' | 'color'>('content');

  const tabs = [
    { id: 'content', label: '内容', icon: FileText },
    { id: 'typography', label: '排版', icon: Type },
    { id: 'color', label: '配色', icon: Palette },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-md border-r border-gray-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-1 tracking-tight">Reading Card</h1>
        <p className="text-xs text-muted font-medium">Create beautiful text snippets</p>
      </div>
      
      <div className="flex px-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 pb-3 text-sm font-medium transition-all relative outline-none",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted hover:text-foreground/80"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <tab.icon size={16} strokeWidth={2.5} className={activeTab === tab.id ? "opacity-100" : "opacity-70"} />
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-t-full" />
            )}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'typography' && <TypographyTab />}
          {activeTab === 'color' && <ColorTab />}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <p className="text-[10px] text-center text-muted">
          Designed for optimal reading experience
        </p>
      </div>
    </div>
  );
};
