import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0369a1',
          light: '#38bdf8',
          foreground: '#ffffff',
        },
        surface: { DEFAULT: '#ffffff', dark: '#18181b' },
        card: { DEFAULT: '#f4f4f5', dark: '#27272a' },
        muted: { DEFAULT: '#52525b', dark: '#a1a1aa' },
        danger: { DEFAULT: '#dc2626', dark: '#f87171' },
        line: { DEFAULT: '#e4e4e7', dark: '#3f3f46' },
        subtle: { DEFAULT: '#e4e4e7', dark: '#3f3f46' },
      },
      borderRadius: { card: '12px' },
    },
  },
} satisfies Omit<Config, 'content'>;
