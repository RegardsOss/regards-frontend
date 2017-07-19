/**
* LICENSE_PLACEHOLDER
**/
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleThemeProvider } from '@regardsoss/modules'
import { PluginServiceWrapper } from '../../definitions/PluginServiceWrapper'
import ManyElementsTarget from '../../definitions/targets/ManyElementsTarget'
import OneElementTarget from '../../definitions/targets/OneElementTarget'
import RunCatalogPluginServiceContainer from './catalog/RunCatalogPluginServiceContainer'
import RunUIPluginServiceContainer from './ui/RunUIPluginServiceContainer'
import styles from '../../styles/styles'

/** Render constant: module syles  */
const MODULE_STYLES = { styles }

/**
* Root container to run a service. It simply install module styles and messages then dispatches on the right service runner,
* making sure the runner will be mounted on request and unmounted at end
*/
class ServiceContainer extends React.Component {

  static propTypes = {
    // service to run or null when no service runing
    serviceWrapper: PropTypes.instanceOf(PluginServiceWrapper),
    // service target (dataobject / dataset / selection) or null
    target: PropTypes.oneOfType([PropTypes.instanceOf(OneElementTarget), PropTypes.instanceOf(ManyElementsTarget)]),
    // on close callback
    onQuit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <I18nProvider messageDir="business-common/entities-common/src/i18n">
        <ModuleThemeProvider module={MODULE_STYLES}>
          { // render running service according with wrapper content
            (() => {
              const { serviceWrapper, target, onQuit } = this.props
              if (!serviceWrapper) {
                return null
              }
              switch (serviceWrapper.type) {
                case PluginServiceConfigurationWrapper.ServiceTypes.CATALOG_PLUGIN_SERVICE:
                  return (
                    <RunCatalogPluginServiceContainer
                      serviceConf={serviceWrapper.serviceConfiguration}
                      target={target}
                      onQuit={onQuit}
                    />)
                case PluginServiceConfigurationWrapper.ServiceTypes.UI_PLUGIN_SERVICE:
                  return (
                    <RunUIPluginServiceContainer
                      service={serviceWrapper.serviceConfiguration}
                      target={target}
                      onQuit={onQuit}
                    />)
                default:
                  throw new Error(`Unkown running service type "${serviceWrapper.type}"`)
              }
            })()
          }
        </ModuleThemeProvider>
      </I18nProvider>)
  }

}
export default ServiceContainer
