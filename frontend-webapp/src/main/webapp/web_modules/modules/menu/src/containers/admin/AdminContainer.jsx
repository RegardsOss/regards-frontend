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
import { moduleActions, moduleSelectors } from '../../clients/ModulesListClient'
import DynamicModulesProviderContainer from '../common/DynamicModulesProviderContainer'
import ModuleFormComponent from '../../components/admin/ModuleFormComponent'

/**
 * Admin root container for menu module
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {
  static propTypes = {
    // common parameters
    appName: PropTypes.string.isRequired,
    // Form parameters
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { appName } = this.props
    return (
      <DynamicModulesProviderContainer
        applicationId={appName}
        moduleActions={moduleActions}
        moduleSelectors={moduleSelectors}
      >
        <ModuleFormComponent currentNamespace={this.props.adminForm.currentNamespace} />
      </DynamicModulesProviderContainer>)
  }
}

export default AdminContainer
