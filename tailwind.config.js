/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const content = [
  './hugo_stats.json',
];

if (process.env.HUGO_ENVIRONMENT !== 'production') {
  content.push('./layouts/**/*.{html,js,ts}');
}

module.exports = {
  content,
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F8FD',
          100: '#E7F0FB',
          200: '#C4DAF4',
          300: '#A0C3ED',
          400: '#5896E0',
          500: '#1169D3',
          600: '#0F5FBE',
          700: '#0A3F7F',
          800: '#082F5F',
          900: '#05203F',
        },
      },
      maxWidth: {
        ch: '72ch',
      },
    },
    screens: {
      sm: `${640 / 16}rem`, // => @media (min-width: 40rem) { ... }
      md: `${768 / 16}rem`, // => @media (min-width: 48rem) { ... }
      lg: `${1024 / 16}rem`, // => @media (min-width: 64rem) { ... }
      xl: `${1280 / 16}rem`, // => @media (min-width: 80rem) { ... }
    },
  },
  plugins: [
    plugin(({ addBase, addComponents, addVariant, theme }) => {
      addBase({
        'html': {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          WebkitTextSizeAdjust: '100%',
          color: theme('colors.gray.600'),
          fontFamily: "Lato, -apple-system, BlinkMacSystemFont, Roboto, system-ui, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,   'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          fontSize: 'clamp(1em, ((100vw - 18.75em) / 300) * 2 + 1em, 1.125em)',
          lineHeight: 1.5,
          textRendering: 'optimizeLegibility',
          scrollPaddingTop: '6rem',
          scrollPaddingBottom: '3rem',
          [`@media (min-width: ${theme('screens.sm')})`]: {
            fontSize: 'clamp(1.125em, ((100vw - 37.5em) / 640) * 3 + 1.125em, 1.3125em)',
          }
        },
        'body': {
          WebkitTextSizeAdjust: '100%',
          lineHeight: 1.5,
          margin: 0,
          '&:focus-visible': {
            outlineWidth: 0,
          }
        },
        '*, ::before, ::after': {
          boxSizing: 'border-box',
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#e2e8f0',
        },
        ':focus-visible': {
          outline: '2px dashed currentColor',
          outlineOffset: '-2px',
        },
        '::selection, ::-moz-selection': {
          backgroundColor: theme('colors.primary.300'),
        },
        'hr': {
          backgroundColor: '#e7e7e7',
          borderColor: 'transparent',
          borderTopWidth: '1px',
          color: 'inherit',
          marginBottom: '3em',
          marginTop: '3em',
        },
        'b, strong': {
          fontWeight: 'bolder',
        },
        'small': {
          fontSize: '0.875em',
        },
        'a': {
          '--outline-offset': '2px',
          fontWeight: 'bold',
          color: theme('colors.primary.500'),
          cursor: 'pointer',
          textDecoration: 'none',
          '&:hover, &:active, &:focus': {
            color: theme('colors.primary.700')
          },
        },
        'button': {
          WebkitAppearance: 'button',
          backgroundColor: 'transparent',
          color: 'inherit',
          fontFamily: 'inherit',
          fontSize: '1em',
          lineHeight: 'inherit',
          margin: '0',
          padding: '0',
          textAlign: 'inherit',
          '&:disabled': {
            pointerEvents: 'none',
          },
          '&:not(:disabled)': {
            cursor: 'pointer',
          }
        },
        'img, video': {
          display: 'block',
          height: 'auto',
          maxWidth: '100%',
        },
        'svg': {
          fill: 'currentColor',
          verticalAlign: 'middle',
          '&:not(:root)': {
            overflow: 'visible',
          },
        },
        '[hidden]': {
          display: 'none !important',
        },
      });

      addComponents({
        'h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6': {
          color: theme('colors.gray.800'),
          marginBottom: '0.75em',
          marginTop: '1.5em',
          lineHeight: 1,
        },
        'h1, h2, h3, .h1, .h2, .h3': {
          fontWeight: theme('fontWeight.extrabold'),
          letterSpacing: theme('letterSpacing.tight')
        },
        'h1, .h1': {
          fontSize: theme('fontSize.4xl'),
        },
        'h2, .h2': {
          fontSize: theme('fontSize.2xl'),
        },
        'h3, .h3': {
          fontSize: theme('fontSize.xl'),
        },
        'h4, .h4': {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.bold'),
        },
        'h5, .h5': {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.normal'),
          textTransform: 'uppercase',
        },
        'h6, .h6': {
          fontSize: theme('fontSize.base')
        },
        [`@media (min-width: ${theme('screens.sm')})`]: {
          'h1, .h1': { fontSize: theme('fontSize.6xl') },
          'h2, .h2': { fontSize: theme('fontSize.4xl') },
          'h3, .h3': { fontSize: theme('fontSize.2xl') },
          'h4, .h4': { fontSize: theme('fontSize.xl') },
          'h5, .h5': { fontSize: theme('fontSize.lg') },
          'h6, .h6': { fontSize: theme('fontSize.lg') },
        },
        '.icon': {
          '> svg': {
            display: 'inline-block',
            height: '1em',
            width: '1em',
            maxWidth: '100%',
            maxHeight: '100%',
          },
        },
        p: {
          marginTop: '1em',
          marginBottom: '1em'
        },
        blockquote: {
          position: 'relative',
          padding: '2rem',
          fontSize: '1.25rem',
          lineHeight: 1.4,
          marginLeft: 'auto',
          marginRight: 'auto',
          '&:before': {
            content: '\\0201C',
            fontFamily: 'sans-serif',
            position: 'absolute',
            fontSize: '4em',
            left: '0',
            top: '0'
          },
          '&:after': {
            content: 'attr(cite)',
            display: 'block',
            fontWeight: 700,
            marginTop: '1em'
          },
        },
        '.header-link': {
          cssFloat: 'left',
          fontSize: '0.75em',
          marginLeft: 'calc(-1em - 0.25rem)',
          marginTop: '0.1em',
          paddingRight: '0.25rem',
          '&:hover, &:active, &:focus': {
            color: theme('colors.primary.500')
          },
          ':not(:hover) > &:not(:focus)': { opacity: 0 }
        },
        '.btn': {
          fontWeight: theme('fontWeight.bold'),
          display: 'inline-block',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          borderRadius: theme('borderRadius.DEFAULT'),
        },
        '.btn-primary': {
          backgroundColor: theme('color.primary.500'),
          color: 'white',
          '&:hover, &:focus': {
            backgroundColor: theme('color.primary.700'),
            color: 'white',
          },
        },
      });

      addVariant('not-focus', '&:not(:focus)');
    })
  ],
  corePlugins: {
    preflight: false,
    animation: false,
  },
}
