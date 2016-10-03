declare module "@regardsoss/store-utils" {

  export class BasicSelector {
    constructor(rootStore: Array<String>)
    uncombineStore(store: any): any
  }
}

