import React from 'react';
import { useStore } from '../../store/useStore';
import { Slider } from '../ui/Slider';
import { Select } from '../ui/Select';

export const TypographyTab: React.FC = () => {
  const { settings, updateSettings } = useStore();

  const fonts = [
    { value: '"Noto Sans SC", sans-serif', label: '思源黑体 (简体)' },
    { value: '"Noto Serif SC", serif', label: '思源宋体 (简体)' },
    { value: '"Noto Sans TC", sans-serif', label: '思源黑体 (繁体)' },
    { value: '"Noto Serif TC", serif', label: '思源宋体 (繁体)' },
    { value: '"Noto Sans HK", sans-serif', label: '思源黑体 (香港)' },
    { value: '"Noto Serif HK", serif', label: '思源宋体 (香港)' },
    { value: '"ZCOOL XiaoWei", serif', label: '站酷小薇体' },
    { value: '"ZCOOL QingKe HuangYou", sans-serif', label: '站酷庆科黄油体' },
    { value: '"ZCOOL KuaiLe", cursive', label: '站酷快乐体' },
    { value: '"Ma Shan Zheng", cursive', label: '马善政毛笔楷书' },
    { value: '"Zhi Mang Xing", cursive', label: '志莽行书' },
    { value: '"Long Cang", cursive', label: '龙苍书体' },
    { value: '"Liu Jian Mao Cao", cursive', label: '流光毛草' },
    { value: 'ZiXinFangMingKeBen', label: '字心仿铭刻本' },
    { value: 'ZiXinFangMingKeBenGuJiBan', label: '字心仿铭刻本（古籍）' },
    { value: 'OradanoMingChaoTi', label: 'Oradano明朝体' },
    { value: 'sans-serif', label: '系统默认无衬线' },
    { value: 'serif', label: '系统默认衬线' },
  ];

  const aligns = [
    { value: 'left', label: '左对齐' },
    { value: 'center', label: '居中对齐' },
    { value: 'right', label: '右对齐' },
    { value: 'justify', label: '两端对齐' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Select
        label="字体"
        value={settings.fontFamily}
        onChange={(e) => updateSettings({ fontFamily: e.target.value })}
        options={fonts}
      />

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="字号"
          value={settings.fontSize}
          min={12}
          max={48}
          step={1}
          onChange={(value) => updateSettings({ fontSize: value })}
          unit="px"
        />
        <Slider
          label="行高"
          value={settings.lineHeight}
          min={1.0}
          max={3.0}
          step={0.1}
          onChange={(value) => updateSettings({ lineHeight: value })}
        />
        <Slider
          label="段间距"
          value={settings.paragraphSpacing}
          min={0}
          max={3.0}
          step={0.1}
          onChange={(value) => updateSettings({ paragraphSpacing: value })}
          unit="em"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="字间距"
          value={settings.letterSpacing}
          min={0}
          max={0.5}
          step={0.01}
          onChange={(value) => updateSettings({ letterSpacing: value })}
          unit="em"
        />
        <Slider
          label="段首缩进"
          value={settings.paragraphIndent}
          min={0}
          max={4}
          step={1}
          onChange={(value) => updateSettings({ paragraphIndent: value })}
          unit="em"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="内边距"
          value={settings.padding}
          min={10}
          max={100}
          step={5}
          onChange={(value) => updateSettings({ padding: value })}
          unit="px"
        />
        <Select
          label="对齐方式"
          value={settings.textAlign}
          onChange={(e) => updateSettings({ textAlign: e.target.value as 'left' | 'center' | 'right' | 'justify' })}
          options={aligns}
        />
      </div>
    </div>
  );
};
