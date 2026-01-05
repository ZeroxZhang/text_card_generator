import React from 'react';
import { EditorPanel } from '../components/editor/EditorPanel';
import { PreviewPanel } from '../components/preview/PreviewPanel';

export const Home: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <div className="w-[400px] flex-shrink-0 h-full">
        <EditorPanel />
      </div>
      <div className="flex-1 h-full">
        <PreviewPanel />
      </div>
    </div>
  );
};
