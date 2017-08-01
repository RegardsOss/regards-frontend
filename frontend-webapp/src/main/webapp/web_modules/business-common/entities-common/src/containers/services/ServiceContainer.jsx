/**
* LICENSE_PLACEHOLDER
**/
import { pluginTypes } from '@regardsoss/domain/access'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleThemeProvider } from '@regardsoss/modules'
import { PluginServiceRunModel } from '../../definitions/PluginServiceRunModel'
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
    // running service model (null when none)
    serviceRunModel: PropTypes.instanceOf(PluginServiceRunModel),
    // on close callback
    onQuit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <I18nProvider messageDir="business-common/entities-common/src/i18n">
        <ModuleThemeProvider module={MODULE_STYLES}>
          { // render running service according with wrapper content
            (() => {
              const { serviceRunModel, onQuit } = this.props
              if (!serviceRunModel) {
                return null
              }
              switch (serviceRunModel.serviceConfiguration.type) {
                case pluginTypes.CATALOG:
                  return (
                    <RunCatalogPluginServiceContainer
                      service={serviceRunModel.serviceConfiguration}
                      target={serviceRunModel.target}
                      onQuit={onQuit}
                    />)
                case pluginTypes.UI:
                  return (
                    <RunUIPluginServiceContainer
                      service={serviceRunModel.serviceConfiguration}
                      target={serviceRunModel.target}
                      onQuit={onQuit}
                    />)
                default:
                  throw new Error(`Unkown running service type "${serviceRunModel.type}"`)
              }
            })()
          }
        </ModuleThemeProvider>
      </I18nProvider>)
  }

}
export default ServiceContainer
