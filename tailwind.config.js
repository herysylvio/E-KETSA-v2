export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'background-main': 'var(--background-main)',
        'surfaces-cards': 'var(--surfaces-cards)',
        'elevated-borders': 'var(--elevated-borders)',
        'brand-primary': 'var(--brand-primary)',
        'action-cta': 'var(--action-cta)',
        'success-escrow-badges': 'var(--success-escrow-badges)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'bottom-nav-background': 'var(--bottom-nav-background)',
        'bottom-nav-border': 'var(--bottom-nav-border)',
        'button-height-primary': 'var(--button-height-primary)',
        'radius-card': 'var(--radius-card)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        cta: 'var(--shadow-cta)'
      }
    }
  }
}