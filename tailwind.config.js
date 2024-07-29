/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const darkMode = '@media (prefers-color-scheme: dark)';

module.exports = {
  content: [
    './hugo_stats.json',
  ],
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
    plugin(({ addBase, addComponents, theme }) => {
      addBase({
        'html': {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          WebkitTextSizeAdjust: '100%',
          color: theme('colors.slate.600'),
          fontFamily: "Lato, -apple-system, BlinkMacSystemFont, Roboto, system-ui, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,   'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          fontSize: 'clamp(1em, ((100vw - 18.75em) / 300) * 2 + 1em, 1.125em)',
          lineHeight: 1.5,
          textRendering: 'optimizeLegibility',
          scrollPaddingTop: '6rem',
          scrollPaddingBottom: '3rem',
          [darkMode]: {
            color: theme('colors.slate.200'),
            backgroundColor: theme('colors.slate.900')
          },
          [`@media (min-width: ${theme('screens.sm')})`]: {
            fontSize: 'clamp(1.125em, ((100vw - 37.5em) / 640) * 3 + 1.125em, 1.3125em)',
          },
        },
        '*, ::before, ::after': {
          boxSizing: 'border-box',
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#e2e8f0',
          transitionProperty: 'none',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-in-out',
        },
        ':focus-visible': {
          outline: '2px dashed currentColor',
          outlineOffset: '-2px',
        },
        '::selection, ::-moz-selection': {
          backgroundColor: theme('colors.primary.300'),
        },
        'hr': {
          backgroundColor: theme('colors.slate.300'),
          borderColor: 'transparent',
          borderTopWidth: '1px',
          color: 'inherit',
          marginBottom: '3em',
          marginTop: '3em',
        },
        'h1, h2, h3, h4': {
          color: theme('colors.slate.950'),
          marginBottom: '1em',
          marginTop: '2em',
          [darkMode]: {
            color: 'white',
          },
        },
        'h1, h2, h3': {
          fontWeight: theme('fontWeight.extrabold'),
          letterSpacing: theme('letterSpacing.tight'),
        },
        'h1': {
          fontSize: theme('fontSize.4xl'),
          lineHeight: 1.1,
          [darkMode]: {
            color: theme('colors.teal.200'),
          },
        },
        'h2': {
          fontSize: theme('fontSize.2xl'),
          lineHeight: 1.2,
        },
        'h3': {
          fontSize: theme('fontSize.xl'),
          lineHeight: 1.3,
        },
        'h4': {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: 1.4,
        },
        [`@media (min-width: ${theme('screens.sm')})`]: {
          'h1': { fontSize: theme('fontSize.6xl') },
          'h2': { fontSize: theme('fontSize.4xl') },
          'h3': { fontSize: theme('fontSize.2xl') },
          'h4': { fontSize: theme('fontSize.xl') },
        },
        p: {
          marginTop: '1.25em',
          marginBottom: '1.25em'
        },
        blockquote: {
          fontStyle: 'italic',
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: '1.333em',
          borderLeftWidth: '0.1667em',
          borderLeftColor: theme('colors.slate.300'),
          [darkMode]: {
            boxShadow: 'inset 3px 0 0 0 #99f6e4',
          },
          [`@media (min-width: ${theme('screens.lg')})`]: {
            marginLeft: '-1.5em',
          }
        },
        strong: {
          fontWeight: 'bolder',
          [darkMode]: {
            color: 'white',
          },
        },
        'small, code': {
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
          [darkMode]: {
            color: theme('colors.teal.400'),
            '&:hover, &:active, &:focus': {
              color: theme('colors.teal.200')
            },
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
        'ol, ul': {
          marginTop: '1.5em',
          marginBottom: '1.5em',
          paddingLeft: '1.5em',
          // nested lists
          'li > &': {
            marginTop: '1em',
            marginBottom: '1em',
            paddingLeft: '1em',
          },
        },
        li: {
          marginTop: '0.5em',
          marginBottom: '0.5em',
          paddingLeft: '0.5em',
          '&::marker': {
            color: theme('colors.slate.400'),
            [darkMode]: {
              color: theme('colors.teal.200'),
            },
          },
        },
        'code': {
          '&:not(:where(pre &))': {
            backgroundColor: theme('colors.slate.100'),
            borderRadius: '4px',
            // color: theme('colors.slate.800'),
            fontSize: '.8em',
            padding: '0.5ch 0.75ch',
            marginLeft: `0.5ch`,
            marginRight: `0.5ch`,
            [darkMode]: {
              backgroundColor: theme('colors.slate.700'),
              // color: theme('colors.slate.200'),
            }
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
        'summary': {
          cursor: 'pointer',
        },
        table: {
          fontSize: '.9em',
          borderCollapse: 'collapse',
          marginBottom: '2em',
          marginTop: '2em',
          tableLayout: 'auto',
          textAlign: 'left',
          width: '100%',
        },
        thead: {
          borderBottomWidth: '1px',
          borderBottomColor: theme('colors.slate.400'),
          [darkMode]: {
            borderBottomColor: theme('colors.slate.500'),
          }
        },
        'thead th': {
          fontWeight: '600',
          verticalAlign: 'bottom',
          paddingInlineEnd: '1em',
          paddingBottom: '.75em',
          paddingInlineStart: '1em',
        },
        'thead th:first-child': {
          paddingInlineStart: '0',
        },
        'thead th:last-child': {
          paddingInlineEnd: '0',
        },
        'tbody tr': {
          borderBottomWidth: '1px',
          borderBottomColor: theme('colors.slate.200'),
          [darkMode]: {
            borderBottomColor: theme('colors.slate.700'),
          }
        },
        'tbody tr:last-child': {
          borderBottomWidth: '0',
        },
        'tbody td': {
          verticalAlign: 'baseline',
        },
        tfoot: {
          borderTopWidth: '1px',
          borderTopColor: theme('colors.slate.300'),
          [darkMode]: {
            borderTopColor: theme('colors.slate.600'),
          }
        },
        'tfoot td': {
          verticalAlign: 'top',
        },
        'tbody td, tfoot td': {
          paddingTop: '0.75em',
          paddingInlineEnd: '1em',
          paddingBottom: '0.75em',
          paddingInlineStart: '1em',
        },
        'tbody td:first-child, tfoot td:first-child': {
          paddingInlineStart: '0',
        },
        'tbody td:last-child, tfoot td:last-child': {
          paddingInlineEnd: '0',
        },
        '[hidden]': {
          display: 'none !important',
        },
        'del': {
          opacity: 0.675,
          fontStyle: 'italic',
        }
      });

      addComponents({
        '.icon': {
          '> svg': {
            display: 'inline-block',
            height: '1em',
            width: '1em',
            maxWidth: '100%',
            maxHeight: '100%',
          },
        },
        '.external-link-icon': {
          fontSize: '0.675em',
          transform: 'translateY(-0.2em)',
          marginLeft: '0.5ch',
          marginRight: '0.5ch',
        },
        '.anchor-link': {
          cssFloat: 'left',
          fontSize: '0.5em',
          marginLeft: '-2.5ch',
          marginRight: '-2ch',
          marginTop: '0.75ch',
          padding: '0.25ch 0.75ch',
          transitionProperty: 'color, opacity',
          ':not(:hover) > &:not(:focus)': { opacity: 0.25 }
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
        '.highlight': {
          '> pre': {
            backgroundColor: `${theme('colors.slate.800')} !important`,
            borderRadius: '0.4rem',
            fontSize: '0.75rem',
            overflow: 'scroll',
            padding: '1rem',
            [darkMode]: {
              backgroundColor: `${theme('colors.slate.950')} !important`,
            },
          },
        }
      });
    })
  ],
  corePlugins: {
    // using our own base styles for refined reset, fluid typography, and just not a fan of prose
    preflight: false,
    // removing default animation styles until we decide to use it
    animation: false,
  },
}
