import React from 'react';
import { useStore } from '../../store/useStore';
import { defaultSchemes } from '../../types';
import { clsx } from 'clsx';

export const ColorTab: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const applyScheme = (scheme: typeof defaultSchemes[0]) => {
    updateSettings({
      backgroundColor: scheme.background,
      textColor: scheme.text,
      accentColor: scheme.accent,
      cardStyle: scheme.cardStyle || 'default',
    });
  };

  const textures = [
    { value: 'none', label: '无纹理' },
    { value: 'line', label: '横线' },
    { value: 'grid', label: '方格' },
    { value: 'dots', label: '点阵' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-3 block">背景纹理</label>
        <div className="grid grid-cols-4 gap-2">
          {textures.map((texture) => (
            <button
              key={texture.value}
              onClick={() => updateSettings({ texture: texture.value })}
              className={clsx(
                "py-2 px-1 text-xs border rounded-md transition-all duration-200",
                settings.texture === texture.value
                  ? "border-foreground bg-foreground text-white shadow-md"
                  : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
              )}
            >
              {texture.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-3 block">预设配色</label>
        <div className="grid grid-cols-2 gap-3">
          {defaultSchemes.map((scheme) => (
            <button
              key={scheme.name}
              onClick={() => applyScheme(scheme)}
              className="group flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-gray-50/50 hover:bg-white"
            >
              <div
                className="w-10 h-10 rounded-full border border-black/5 shadow-sm flex items-center justify-center"
                style={{ backgroundColor: scheme.background }}
              >
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: scheme.accent }} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-foreground group-hover:text-black">{scheme.name}</span>
                <div className="flex gap-1.5 mt-1">
                  <div className="w-2 h-2 rounded-full ring-1 ring-black/5" style={{ backgroundColor: scheme.text }} />
                  <div className="w-2 h-2 rounded-full ring-1 ring-black/5" style={{ backgroundColor: scheme.accent }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 pt-6">
        <label className="text-xs font-medium text-muted uppercase tracking-wider mb-4 block">自定义颜色</label>
        <div className="flex flex-col gap-4">
          {[
            { label: '背景颜色', key: 'backgroundColor' as const },
            { label: '文字颜色', key: 'textColor' as const },
            { label: '强调颜色', key: 'accentColor' as const },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between group">
              <span className="text-sm text-gray-600 group-hover:text-foreground transition-colors">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">
                  {settings[item.key]}
                </span>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm transition-transform active:scale-95">
                  <input
                    type="color"
                    value={settings[item.key] as string}
                    onChange={(e) => updateSettings({ [item.key]: e.target.value })}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 border-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
