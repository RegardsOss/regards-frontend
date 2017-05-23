import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

const NAMESPACE = 'search-results'
const STORE_PATH = ['modules.search-results', 'resultsTable']

export default {
  tableActions: new TableActions(NAMESPACE),
  tableReducer: getTableReducer(NAMESPACE),
  tableSelectors: getTableSelectors(STORE_PATH),
}
