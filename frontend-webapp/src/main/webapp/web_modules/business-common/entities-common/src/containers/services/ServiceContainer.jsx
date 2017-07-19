/**
* LICENSE_PLACEHOLDER
**/
import { withI18n } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
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
      <ModuleStyleProvider module={MODULE_STYLES}>
        { // render running service according with wrapper content
          (() => {
            const { serviceRunModel, onQuit } = this.props
            if (!serviceRunModel) {
              return null
            }
            switch (serviceRunModel.type) {
              case PluginServiceRunModel.ServiceTypes.CATALOG_PLUGIN_SERVICE:
                return (
                  <RunCatalogPluginServiceContainer
                    serviceConf={serviceRunModel.serviceConfiguration}
                    target={serviceRunModel.target}
                    onQuit={onQuit}
                  />)
              case PluginServiceRunModel.ServiceTypes.UI_PLUGIN_SERVICE:
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
      </ModuleStyleProvider>)
  }

}
export default withI18n(messages)(ServiceContainer)
