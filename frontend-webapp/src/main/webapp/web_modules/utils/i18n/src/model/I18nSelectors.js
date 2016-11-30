import { BasicSelector } from '@regardsoss/store-utils'

// Selectors
export const getDatasets = state => state.items

class ConnectionSelectors extends BasicSelector {
  constructor() {
    super(['common', 'i18n'])
  }

  getLocale(state) {
    return this.uncombineStore(state).locale
  }
  getMessages(state) {
    return this.uncombineStore(state).messages
  }
  getMessagesByMessageDir(state, messageDir) {
    return this.uncombineStore(state).messages[messageDir]
  }
}

const instance = new ConnectionSelectors()
export default instance
