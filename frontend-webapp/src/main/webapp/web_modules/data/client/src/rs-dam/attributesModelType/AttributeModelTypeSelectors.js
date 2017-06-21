import sortBy from 'lodash/sortBy'
import { BasicArraySelectors } from '@regardsoss/store-utils'

export default storePath => new BasicArraySelectors(storePath)
