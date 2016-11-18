import BasicSelector from '@regardsoss/store-utils'

// Selectors
export const getDatasets = state => state.items

class ThemeSelectors extends BasicSelector {
  constructor() {
    super(['common', 'theme'])
  }

  getCurrentTheme(state) {
    return this.uncombineStore(state)
  }
}

const instance = new ThemeSelectors()
export default instance
