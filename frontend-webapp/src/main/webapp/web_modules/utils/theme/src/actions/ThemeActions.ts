function setTheme (theme: string): Object {
  return {
    type: 'SET_THEME',
    theme: theme,
  }
}

export { setTheme }
