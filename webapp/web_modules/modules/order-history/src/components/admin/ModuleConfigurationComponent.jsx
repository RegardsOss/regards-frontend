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
import { ModulePaneStateField } from '@regardsoss/modules-api'
import { FormPresentation, FormRow } from '@regardsoss/form-utils'

/**
 * Module configuration component (admin form)
 * @author Raphaël Mechali
 */
class ModuleConfigurationComponent extends React.Component {
  static propTypes = {
    currentNamespace: PropTypes.string.isRequired,
  }

  render() {
    const { currentNamespace } = this.props
    return (
      <FormPresentation>
        <FormRow>
          <ModulePaneStateField currentNamespace={currentNamespace} spanFullWidth />
        </FormRow>
      </FormPresentation>)
  }
}

export default ModuleConfigurationComponent
