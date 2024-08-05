/** @type {import('tailwindcss').Config} */
import tailwindThemeVarDefine from './themes/tailwind-theme-var-define'
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#eaecf0',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          700: '#475467',
          600: '#344054',
          800: '#1d2939',
          900: '#101828',
        },
        primary: {
          25: '#FFE3B6', // 基础颜色
          50: '#FFF4E1', // 非常浅的橙色
          100: '#FFE3B6', // 较浅的橙色
          200: '#FFD49B', // 中等偏亮的橙色
          300: '#FFC77F', // 较亮的橙色
          400: '#FFBA63', // 明亮的橙色
          500: '#F4AA3F', // 当前的600色
          600: '#F4AA3F', // 结构色
          700: '#D78D32', // 较深的橙色
          800: '#A76F27', // 更深的橙色
          900: '#7A4D17', // 最深的橙色

        },
        blue: {
          500: '#E1EFFE',
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F',

        },
        yellow: {
          100: '#FDF6B2',
          800: '#723B13',
        },
        purple: {
          50: '#F6F5FF',
          200: '#DCD7FE',
        },
        indigo: {
          25: '#F5F8FF',
          50: '#EEF4FF',
          100: '#E0EAFF',
          300: '#A4BCFD',
          400: '#8098F9',
          600: '#444CE7',
          800: '#2D31A6',
        },
        ...tailwindThemeVarDefine,
      },
      backgroundImage: {
        primarylinear: 'linear-gradient( 145deg, #FFBA0B 0%, #FF9E11 100%)',
        primarylinearhover: 'linear-gradient( 145deg, #F4CB63 0%, #F4AA3F 100%)',
        primaryLinearText: 'linear-gradient(91.58deg, #F4AA3F -29.55%, #FFF4E1 75.22%)',
        primaryLinearText2: 'linear-gradient(to right, #F4AA3F 0, #FFE3B6 100%)',
        primaryLinearText3: 'linear-gradient(90deg, #FFCE51 0%, #FF9905 100%);',
      },
      screens: {
        mobile: '100px',
        // => @media (min-width: 100px) { ... }
        tablet: '640px', // 391
        // => @media (min-width: 600px) { ... }
        pc: '769px',
        // => @media (min-width: 769px) { ... }
      },
      boxShadow: {
        'xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        'sm': '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        'md': '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)',
        'lg': '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
        'xl': '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
        'box': '0px 60px 60px -40px rgba(15,15,15,0.3)',
        'btn': '0px 14 20px -12px #F4B64C',
      },
      opacity: {
        2: '0.02',
        8: '0.08',
      },
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // https://github.com/tailwindlabs/tailwindcss/discussions/5969
  corePlugins: {
    preflight: false,
  },
}
