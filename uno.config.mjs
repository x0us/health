import { presetUno, defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno()
  ],
  theme: {
    colors: {
      primary: {
        50: '#fdfdfc',
        100: '#fafbf9',
        200: '#f6f6f3',
        300: '#eef0eb',
        400: '#eaebe5',
        500: '#e5e7df',
        600: '#bac0aa',
        700: '#909876',
        800: '#62694f',
        900: '#313427',
        950: '#191a14',
      },
      secondary: {
        50: '#e8fdf1',
        100: '#d1fae2',
        200: '#a3f5c5',
        300: '#75f0a8',
        400: '#47eb8b',
        500: '#19e66e',
        600: '#14b858',
        700: '#0f8a42',
        800: '#0a5c2c',
        900: '#052e16',
        950: '#02170b',
      },
      warning: '#e76f51',
      alert: '#f4a261',
      alarm: '#e9c46a',
      dark: '#303030',
      light: '#f3f3f3',
    }
  }
})
