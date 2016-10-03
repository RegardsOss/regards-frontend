export class BasicSelector {
  rootStore: any

  constructor (rootStore: Array<string>) {
    this.rootStore = rootStore
  }

  /**
   * Returns the subset of the store that your reducer is based on
   * @param store
   * @returns {any}
   */
  uncombineStore (store: any): any {
    let partialStore: any = store
    try {
      for (let i = 0; i < this.rootStore.length; i++) {
        partialStore = partialStore[this.rootStore[i]]
      }
    } catch (e) {
      console.error("this.rootStore = ", this.rootStore)
      console.error("store = ", store)
      throw new Error('Failed to uncombine the store to be able to extract data from the store')
    }
    return partialStore
  }
}
