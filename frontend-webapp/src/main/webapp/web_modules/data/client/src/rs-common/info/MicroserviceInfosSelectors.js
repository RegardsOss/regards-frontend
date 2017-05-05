/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, filter, pickBy } from 'lodash'
import { BasicSignalSelectors } from '@regardsoss/store-utils'

export default storePath => new BasicSignalSelectors(storePath)
