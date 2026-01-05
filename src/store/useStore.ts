import { create } from 'zustand';
import { TextContent, TypographySettings, defaultContent, defaultSettings } from '../types';

interface AppState {
  content: TextContent;
  settings: TypographySettings;
  updateContent: (content: Partial<TextContent>) => void;
  updateSettings: (settings: Partial<TypographySettings>) => void;
  resetSettings: () => void;
}

export const useStore = create<AppState>((set) => ({
  content: defaultContent,
  settings: defaultSettings,
  updateContent: (newContent) =>
    set((state) => ({ content: { ...state.content, ...newContent } })),
  updateSettings: (newSettings) =>
    set((state) => ({ settings: { ...state.settings, ...newSettings } })),
  resetSettings: () => set({ settings: defaultSettings }),
}));
