/* Configuration Tailwind (couleurs de la marque, polices, animations). Chargé après le script Tailwind. */
tailwind.config = {
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        primary:    { 50: '#EEF6FF', 100: '#DBEDFF', 500: '#1F5FD1', 600: '#154EB4' },
        accent:     { 100: '#D0F3FF', 400: '#54BFF6', 500: '#27A8E0' },
        secondary:  { 100: '#DAE7FE', 800: '#041945', 900: '#03113A', 950: '#010923' },
        background: { 50: '#FAFCFE', 100: '#F3F7FB', 200: '#E8EEF5', 300: '#D6DFE9' },
        ink: '#0B1530',
        txt: '#3E4A63',
        mut: '#566179',
        jit: {
          navy:   '#06122E',
          royal:  '#1F5FD1',
          royal2: '#154EB4',
          amber:  '#FFB020',
          txt:    '#3F4B63',
          paper:  '#EEF3F9'
        }
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        jit:     ['"DM Sans"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        mq:    { to: { transform: 'translateX(-50%)' } }
      }
    }
  }
};
