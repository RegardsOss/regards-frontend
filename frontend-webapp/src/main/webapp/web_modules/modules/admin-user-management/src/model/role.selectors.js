import { BasicSelector } from '@regardsoss/store-utils';

class RoleSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'user-management', 'project-account']);
  }

  getRoles(state) {
    return this.uncombineStore(state).items;
  }
  getRolesById(state, id) {
    return this.uncombineStore(state).items[id];
  }

}

const _instance = new RoleSelectors();
export default _instance;
