/**
 * LICENSE_PLACEHOLDER
 **/
import { AdminClient } from '@regardsoss/client'

const namespace = 'common/endpoint'
const REDUX_PATH = ['common', 'endpoints']
const endpointActions = new AdminClient.EndpointActions(namespace)
const endpointReducers = AdminClient.getEndpointReducers(namespace)
const endpointSelectors = AdminClient.getEndpointSelectors(REDUX_PATH)

export default {
  endpointActions,
  endpointReducers,
  endpointSelectors,
}
