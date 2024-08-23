import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
            "border": "hsl(var(--border))",
            "input": "hsl(var(--input))",
            "ring": "hsl(var(--ring))",
            "background": "hsl(var(--background))",
            "foreground": "hsl(var(--foreground))",
            "primary": {
              "DEFAULT": "hsl(var(--primary))",
              "foreground": "hsl(var(--primary-foreground))"
            },
            "secondary": {
              "DEFAULT": "hsl(var(--secondary))",
              "foreground": "hsl(var(--secondary-foreground))"
            },
            "destructive": {
              "DEFAULT": "hsl(var(--destructive))",
              "foreground": "hsl(var(--destructive-foreground))"
            },
            "muted": {
              "DEFAULT": "hsl(var(--muted))",
              "foreground": "hsl(var(--muted-foreground))"
            },
            "accent": {
              "DEFAULT": "hsl(var(--accent))",
              "foreground": "hsl(var(--accent-foreground))"
            },
            "popover": {
              "DEFAULT": "hsl(var(--popover))",
              "foreground": "hsl(var(--popover-foreground))"
            },
            "card": {
              "DEFAULT": "hsl(var(--card))",
              "foreground": "hsl(var(--card-foreground))"
            }, 
            customBlue: '#1e3a8a',
        customGreen: '#10b981',
        customRed: '#e53e3e',
        customYellow: '#f6e05e',
        customPurple: '#6b46c1',
        customPink: '#d53f8c',
        customOrange: '#ed8936',
        customTeal: '#38b2ac',
        customGray: '#e2e8f0',
        customIndigo: '#4c51bf',
        customCyan: '#00bcd4',
        customLime: '#c6ff00',
        customAmber: '#ffc107',
        customSlate: '#2d3748',
        customRose: '#fbb6ce',
        customViolet: '#7f5fc7',
        customFuchsia: '#d53f8c',
        customEmerald: '#34d399',
        customCoolGray: '#6b7280',
        customTrueGray: '#9e9e9e',
        customWarmGray: '#9e9e9e',
        customRoseGray: '#d6d3d1',
          },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;