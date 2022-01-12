import WindiCSS from 'vite-plugin-windicss'

export default {
  alias: {
    '/@': 'src',
  },
  plugins: [WindiCSS()],
}
