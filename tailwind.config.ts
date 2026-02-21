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
        brandos: {
          primary: '#00FF00',
          'primary-dark': '#00CC00',
          secondary: '#0099FF',
          bg: '#0A0E27',
          surface: '#1A1F3A',
          border: '#2A2F4A',
          text: '#FFFFFF',
          'text-secondary': '#CCCCCC',
          success: '#00FF00',
          warning: '#FFD700',
          danger: '#FF3333',
          info: '#0099FF',
        },
      },
      backgroundImage: {
        'gradient-brandos': 'linear-gradient(135deg, #0A0E27, #1A1F3A)',
        'gradient-glow': 'linear-gradient(135deg, #00FF00, #00CC00)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 0, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 255, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
export default config
