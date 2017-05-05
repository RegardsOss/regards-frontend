/*
 * LICENSE_PLACEHOLDER
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Microservice infos client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'microservice-management', 'microservice-info']
const REDUX_ACTION_NAMESPACE = 'microservice-info'

const microserviceInfoReducer = CommonClient.MicroserviceInfosReducer(REDUX_ACTION_NAMESPACE)
const microserviceInfoActions = new CommonClient.MicroserviceInfosActions(REDUX_ACTION_NAMESPACE)


export default {
  microserviceInfoReducer,
  microserviceInfoActions,
}
