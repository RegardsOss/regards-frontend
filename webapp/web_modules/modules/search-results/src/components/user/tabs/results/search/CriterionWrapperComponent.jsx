/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { PluginProvider, CriterionConfiguration, CriterionProperties } from '@regardsoss/plugins'
import CriterionLoadingComponent from './CriterionLoadingComponent'

/**
 * Criterion wrapper component: adapts callbacks, loads and displays criterion
 * @author Raphaël Mechali
 */
class CriterionWrapperComponent extends React.Component {
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
    pluginId: PropTypes.number.isRequired,
    pluginProps: CriterionProperties,
    pluginConf: CriterionConfiguration.isRequired,
  }

  /** Criterion loading component */
  static LOADING_COMPONENT = <CriterionLoadingComponent />

  render() {
    const {
      pluginInstanceId,
      pluginId,
      pluginProps,
      pluginConf,
    } = this.props
    return (
      <PluginProvider
        key={pluginInstanceId}
        pluginInstanceId={pluginInstanceId}
        pluginId={pluginId}
        pluginConf={pluginConf}
        pluginProps={pluginProps}
        displayPlugin
        loadingComponent={CriterionWrapperComponent.LOADING_COMPONENT}
        errorComponent={null} // disable plugin rendering when in error
      />
    )
  }
}
export default CriterionWrapperComponent
