import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

const NAMESPACE = 'admin-accessright-management/access-right-table'
const STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'access-right-table']

export default {
  tableActions: new TableActions(NAMESPACE),
  tableReducer: getTableReducer(NAMESPACE),
  tableSelectors: getTableSelectors(STORE_PATH),
}
