// Theme palettes, adapted from the cfb-pool-website turf-theme system:
// every color on the page runs through the CSS custom properties in :root,
// so applying a theme is just overwriting those variables. Renamed away
// from the original team names since this isn't a sports site.
const THEMES = {
  midnight: {
    label: 'Midnight (default)',
    vars: {
      '--turf-dark':'#0c0a1a', '--turf':'#181030', '--turf-panel':'#20183d', '--turf-line':'#3c2f66',
      '--chalk':'#f2eee1', '--chalk-dim':'#b3a9c9',
      '--gold':'#c9a227', '--gold-dim':'#8a6a1c',
      '--brick':'#c60c30', '--green-ok':'#5fae7c',
      '--accent-text':'#241a04', '--accent-hover':'#e0c15c'
    }
  },
  forest: {
    label: 'Forest',
    vars: {
      '--turf-dark':'#0d1c14', '--turf':'#152c1f', '--turf-panel':'#17321f', '--turf-line':'#2c5b41',
      '--chalk':'#f2eee1', '--chalk-dim':'#a9b7a5',
      '--gold':'#e8b23d', '--gold-dim':'#8a6a24',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#241a04', '--accent-hover':'#f2c05f'
    }
  },
  harbor: {
    label: 'Harbor',
    vars: {
      '--turf-dark':'#05141f', '--turf':'#0a2340', '--turf-panel':'#0d2c4d', '--turf-line':'#1e4a75',
      '--chalk':'#f2f4f6', '--chalk-dim':'#9fb3c8',
      '--gold':'#5b9bd5', '--gold-dim':'#2f5c85',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#ffffff', '--accent-hover':'#7fb2e0'
    }
  },
  lagoon: {
    label: 'Lagoon',
    vars: {
      '--turf-dark':'#021617', '--turf':'#04262a', '--turf-panel':'#062f33', '--turf-line':'#0f4d54',
      '--chalk':'#f2feff', '--chalk-dim':'#9dc4c7',
      '--gold':'#fc4c02', '--gold-dim':'#a3300a',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#230b00', '--accent-hover':'#ff7c45'
    }
  },
  crimson: {
    label: 'Crimson',
    vars: {
      '--turf-dark':'#1a0508', '--turf':'#2b0a10', '--turf-panel':'#331019', '--turf-line':'#5c1b26',
      '--chalk':'#f2eee1', '--chalk-dim':'#b79a9d',
      '--gold':'#9e1b32', '--gold-dim':'#6b121f',
      '--brick':'#e2542f', '--green-ok':'#5fae7c',
      '--accent-text':'#ffffff', '--accent-hover':'#c53a52'
    }
  },
  citrus: {
    label: 'Citrus',
    vars: {
      '--turf-dark':'#030a24', '--turf':'#071534', '--turf-panel':'#0a1c42', '--turf-line':'#1c3a75',
      '--chalk':'#f2f4f6', '--chalk-dim':'#9fb0c8',
      '--gold':'#fa4616', '--gold-dim':'#a52d0d',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#1f0900', '--accent-hover':'#ff7a4d'
    }
  },
  denim: {
    label: 'Denim',
    vars: {
      '--turf-dark':'#020e1c', '--turf':'#051b33', '--turf-panel':'#07223f', '--turf-line':'#163f66',
      '--chalk':'#f2eee1', '--chalk-dim':'#a9b3c2',
      '--gold':'#ffcb05', '--gold-dim':'#a6820a',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#241a04', '--accent-hover':'#ffe066'
    }
  },
  ember: {
    label: 'Ember',
    vars: {
      '--turf-dark':'#1a0d02', '--turf':'#2b1605', '--turf-panel':'#331a06', '--turf-line':'#5c3210',
      '--chalk':'#f2eee1', '--chalk-dim':'#c2ab96',
      '--gold':'#bf5700', '--gold-dim':'#7a3800',
      '--brick':'#d1445a', '--green-ok':'#5fae7c',
      '--accent-text':'#ffffff', '--accent-hover':'#e07a2e'
    }
  },
  rust: {
    label: 'Rust',
    vars: {
      '--turf-dark':'#040d1c', '--turf':'#0a1d38', '--turf-panel':'#0d2444', '--turf-line':'#1e3f6b',
      '--chalk':'#f2eee1', '--chalk-dim':'#a8b4c7',
      '--gold':'#e87722', '--gold-dim':'#9a4f13',
      '--brick':'#c9604d', '--green-ok':'#5fae7c',
      '--accent-text':'#1f0a00', '--accent-hover':'#ff9142'
    }
  }
};
const DEFAULT_THEME = 'midnight';

function applyTheme(key) {
  const theme = THEMES[key] || THEMES[DEFAULT_THEME];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([prop, value]) => root.style.setProperty(prop, value));
  const select = document.getElementById('themeSelect');
  if (select) select.value = THEMES[key] ? key : DEFAULT_THEME;
}

function initThemePicker() {
  const saved = localStorage.getItem('siteTheme');
  const initial = (saved && THEMES[saved]) ? saved : DEFAULT_THEME;
  applyTheme(initial);

  const select = document.getElementById('themeSelect');
  if (!select) return;
  select.innerHTML = Object.entries(THEMES)
    .map(([key, t]) => `<option value="${key}">${t.label}</option>`)
    .join('');
  select.value = initial;
  select.addEventListener('change', () => {
    localStorage.setItem('siteTheme', select.value);
    applyTheme(select.value);
  });
}

document.addEventListener('DOMContentLoaded', initThemePicker);
