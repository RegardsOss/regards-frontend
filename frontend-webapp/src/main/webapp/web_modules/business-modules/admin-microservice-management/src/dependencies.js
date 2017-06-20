/**
 * LICENSE_PLACEHOLDER
 **/
import reduce from 'lodash/reduce'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import MaintenanceModeActions from './model/MaintenanceModeActions'
import SetMaintenanceModeActions from './model/SetMaintenanceModeActions'
import PluginMetaDataActions from './model/plugin/PluginMetaDataActions'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */

export default reduce(STATIC_CONF.MSERVICES, (result, microservice) => {
    result.push(MaintenanceModeActions(microservice).getDependency(RequestVerbEnum.GET))
    result.push(SetMaintenanceModeActions(microservice).getActivateDependency())
    result.push(SetMaintenanceModeActions(microservice).getDesactivateDependency())
    result.push(PluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST,microservice))
    return result
  }, [])
