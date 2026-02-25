import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BrandOS Custom Palette
        brandos: {
          // Neon Green (primary accent)
          neon: {
            50: '#f0fffa',
            100: '#ccfff0',
            200: '#99ffe6',
            300: '#33ffaa',
            400: '#00ff88',
            500: '#00ff77',
            600: '#00cc66',
            700: '#009944',
            800: '#006633',
            900: '#003322',
          },
          // Dark Base
          dark: {
            50: '#e6e6e6',
            100: '#cccccc',
            200: '#999999',
            300: '#666666',
            400: '#333333',
            500: '#1a1a1a',
            600: '#151515',
            700: '#0f0f0f',
            800: '#0d0d0d',
            900: '#000000',
          },
          // Teal/Emerald (secondary)
          teal: {
            50: '#f0fdf9',
            100: '#ccf2e8',
            200: '#99e5d1',
            300: '#33d9b0',
            400: '#0a3a2a',
            500: '#072f23',
            600: '#05241a',
            700: '#031b11',
            800: '#021208',
            900: '#000d05',
          },
          // Metallic Gray
          metal: {
            50: '#f5f5f7',
            100: '#e5e5ea',
            200: '#d1d1d6',
            300: '#a1a1a6',
            400: '#6a6a70',
            500: '#4a4a50',
            600: '#3a3a40',
            700: '#2a2a30',
            800: '#1a1a20',
            900: '#0a0a10',
          },
        },
      },
      backgroundImage: {
        // Carbon fiber texture
        'carbon-fiber': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><defs><pattern id=\"carbon\" x=\"0\" y=\"0\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><path d=\"M0,0 L100,100 M100,0 L0,100\" stroke=\"rgba(0,255,136,0.03)\" stroke-width=\"0.5\"/><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"rgba(0,255,136,0.05)\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"rgba(0,255,136,0.05)\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"%231a1a1a\"/><rect width=\"100\" height=\"100\" fill=\"url(%23carbon)\"/></svg>')",
        // Grid pattern
        'grid-pattern': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\"><rect width=\"50\" height=\"50\" fill=\"%231a1a1a\"/><path d=\"M50 0L0 50M0 0L50 50\" stroke=\"rgba(0,255,136,0.05)\" stroke-width=\"1\"/><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"rgba(0,255,136,0.1)\"/></svg>')",
      },
      boxShadow: {
        // BrandOS neon glow effects
        'neon-glow': '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
        'neon-glow-sm': '0 0 5px rgba(0, 255, 136, 0.4)',
        'neon-glow-lg': '0 0 20px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 255, 136, 0.3)',
        'neon-inner': 'inset 0 0 10px rgba(0, 255, 136, 0.2)',
      },
      keyframes: {
        // Neon pulse
        'neon-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.5)',
          },
        },
        // Flicker
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'tech': ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
