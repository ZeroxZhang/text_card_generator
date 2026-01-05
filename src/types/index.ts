export interface TextContent {
  title: string;
  body: string;
  abstract: string;
  author: string;
  date: string;
}

export interface TypographySettings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  paragraphSpacing: number;
  paragraphIndent: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  padding: number;
  texture: string;
  cardStyle: 'default' | 'sticky';
}

export interface ColorScheme {
  name: string;
  background: string;
  backgroundImage?: string;
  text: string;
  accent: string;
  secondary: string;
  cardStyle?: 'default' | 'sticky';
}

export const defaultContent: TextContent = {
  title: '在这里输入标题',
  body: '这里是正文内容。你可以自由编辑这段文字，调整字体、间距和排版风格。阅读卡片生成器帮助你创造精美的文字图片，分享你的思考和感悟。\n\n支持多段落排版，自动处理行间距和段落间距。',
  abstract: '这是摘要部分，用于简要说明文章主旨。',
  author: '作者名',
  date: new Date().toLocaleDateString('zh-CN'),
};

export const defaultSettings: TypographySettings = {
  fontFamily: '"Noto Serif SC", serif',
  fontSize: 18,
  lineHeight: 1.8,
  letterSpacing: 0.05,
  paragraphSpacing: 1.2,
  paragraphIndent: 0,
  textAlign: 'justify',
  backgroundColor: '#F5F1EB',
  textColor: '#2C2C2C',
  accentColor: '#FF6B35',
  padding: 40,
  texture: 'none',
  cardStyle: 'default',
};

export const defaultSchemes: ColorScheme[] = [
  {
    name: 'Sticky Light',
    background: '#E2E8F0',
    backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // Soft pastel gradient
    text: '#1F4E8F',
    accent: '#4A5A70',
    secondary: '#8B9BB4',
    cardStyle: 'sticky'
  },
  {
    name: 'Sticky Dark',
    background: '#0F172A',
    backgroundImage: 'linear-gradient(180deg, #0E1E3A 0%, #2B2F72 100%)',
    text: '#9CC3FF',
    accent: '#59A0FF',
    secondary: '#C9DAF7',
    cardStyle: 'sticky'
  },
  {
    name: '温暖米色',
    background: '#F5F1EB',
    text: '#2C2C2C',
    accent: '#FF6B35',
    secondary: '#8B8B8B'
  },
  {
    name: '极简白',
    background: '#FFFFFF',
    text: '#1A1A1A',
    accent: '#2563EB',
    secondary: '#6B7280'
  },
  {
    name: '深空蓝',
    background: '#0F172A',
    text: '#E2E8F0',
    accent: '#60A5FA',
    secondary: '#64748B'
  },
  {
    name: '抹茶绿',
    background: '#F0FDF4',
    text: '#166534',
    accent: '#22C55E',
    secondary: '#16A34A'
  }
];
