const navItems = [
  { name: 'Blog', path: '/', description: '' },
  { name: 'Meta', path: '/meta', description: 'Metadata about yours truly' },
  { name: 'Misc', path: '/misc', description: 'Miscellaneous items of interest' },
]

const getNavItems = (activePath: string) => navItems.map((item) => ({
  ...item,
  isActive: item.path === activePath || `${item.path}/` === activePath,
}));

export { getNavItems };
