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
import ModuleConfigurationComponent from '../../components/admin/ModuleConfigurationComponent'
import { ModuleConfigurationShape } from '../../model/ModuleConfigurationShape'

/**
 * Admin module container for module configuration
 * @author Raphaël Mechali
 */
export class AdminModuleContainer extends React.Component {
  static propTypes = {
    adminForm: PropTypes.shape({
      changeField: PropTypes.func.isRequired,
      form: ModuleConfigurationShape,
    }),
  }

  render() {
    const { changeField, form } = this.props.adminForm
    return <ModuleConfigurationComponent changeField={changeField} moduleForm={form} />
  }
}
export default AdminModuleContainer
