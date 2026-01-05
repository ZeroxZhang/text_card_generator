import React from 'react';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/Input';

export const ContentTab: React.FC = () => {
  const { content, updateContent } = useStore();

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="标题"
        value={content.title}
        onChange={(e) => updateContent({ title: e.target.value })}
        placeholder="输入标题..."
      />
      <Input
        label="作者"
        value={content.author}
        onChange={(e) => updateContent({ author: e.target.value })}
        placeholder="输入作者..."
      />
      <Input
        label="日期"
        value={content.date}
        onChange={(e) => updateContent({ date: e.target.value })}
        placeholder="输入日期..."
      />
      <Input
        label="摘要"
        value={content.abstract}
        onChange={(e) => updateContent({ abstract: e.target.value })}
        multiline
        placeholder="输入摘要..."
        className="min-h-[80px]"
      />
      <Input
        label="正文"
        value={content.body}
        onChange={(e) => updateContent({ body: e.target.value })}
        multiline
        placeholder="输入正文内容..."
        className="min-h-[300px]"
      />
    </div>
  );
};
