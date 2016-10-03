import {BasicSelector} from "@regardsoss/store-utils"

class AccountSelectors extends BasicSelector {
  constructor () {
    super(["admin", "user-management", "account"])
  }

  getAccounts (state: any): any {
    return this.uncombineStore(state).items
  }
  getAccountById (state: any, id: string): any {
    return this.uncombineStore(state).items[id]
  }

}

const _instance = new AccountSelectors()
export default _instance
