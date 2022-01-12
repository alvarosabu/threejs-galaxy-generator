import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

import AsTheme from '@alvarosabu/ui/dist/windicss.config'

export default defineConfig({
  presets: [AsTheme],
  theme: {
    extend: {
      fontFamily: {
        title: ['Sacramento', 'serif'],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary.400'),
            a: {
              color: theme('colors.secondary.400'),
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.secondary.500'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
})
