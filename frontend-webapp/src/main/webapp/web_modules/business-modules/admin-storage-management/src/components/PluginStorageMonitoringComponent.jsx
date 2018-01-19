/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'

/**
* Component used to load the regardsoss-modules/storage-monitoring module into the admin app.
* @author Sébastien Binda
*/
export class PluginStorageMonitoringComponent extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  }

  render() {
    const { params: { project } } = this.props
    const resultsConfiguration = {
      type: modulesManager.AllDynamicModuleTypes.STORAGE_MONITORING,
      active: true,
      applicationId: 'admin',
      conf: {},
    }

    return (
      <LazyModuleComponent
        project={project}
        appName="admin"
        module={resultsConfiguration}
      />
    )
  }
}
export default PluginStorageMonitoringComponent
