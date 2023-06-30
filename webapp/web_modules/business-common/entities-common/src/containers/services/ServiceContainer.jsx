/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { pluginTypes } from '@regardsoss/domain/access'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { PluginServiceRunModel } from '../../shapes/PluginServiceRunModel'
import RunCatalogPluginServiceContainer from './catalog/RunCatalogPluginServiceContainer'
import RunUIPluginServiceContainer from './ui/RunUIPluginServiceContainer'
import messages from '../../i18n'
import styles from '../../styles'

/**
* Root container to run a service. It simply install module styles and messages then dispatches on the right service runner,
* making sure the runner will be mounted on request and unmounted at end
*/
class ServiceContainer extends React.Component {
  static propTypes = {
    // running service model (null when none)
    serviceRunModel: PluginServiceRunModel,
    // on close callback
    onQuit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
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
        </ModuleStyleProvider>
      </I18nProvider>)
  }
}
export default ServiceContainer
