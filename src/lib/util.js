export const accent = (name) => `var(--${name})`;

export const cx = (...parts) => parts.filter(Boolean).join(' ');

export const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
