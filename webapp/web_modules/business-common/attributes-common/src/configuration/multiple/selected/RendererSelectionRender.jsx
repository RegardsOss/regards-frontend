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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { getTypeRendererKeys, DEFAULT_RENDERER_KEY } from '../../../render/AttributesTypeToRender'

/**
 * Table renderer for attribute renderer selelction
 * @author Raphaël Mechali
 */
class RendererSelectionRender extends React.Component {
  static propTypes = {
    entity: AccessShapes.AttributeConfigurationData,
    rowIndex: PropTypes.number.isRequired,
    // on renderer selected callback, like (attributeIndex, renderer) => ()
    onRendererSelected: PropTypes.func.isRequired,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: renderer selected
   * @param {*} event
   * @param {number} index
   * @param {string} value new selected value
   */
  onRendererSelected = (event, index, value) => {
    const { entity: { renderer }, rowIndex, onRendererSelected } = this.props
    if (value !== renderer) {
      onRendererSelected(rowIndex, value)
    }
  }

  render() {
    // pre: attribute exists
    // pre: attribute type renderers are listed
    const { entity: { name, renderer }, attributeModels } = this.props
    const { intl: { formatMessage } } = this.context
    const { content: { type } } = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels)
    const availableRenderers = getTypeRendererKeys(type)
    return (
      <SelectField
        value={renderer || DEFAULT_RENDERER_KEY}
        onChange={this.onRendererSelected}
        fullWidth
        autoWidth
      >
        {
        availableRenderers.map((key) => (
          <MenuItem
            key={key}
            value={key}
            primaryText={formatMessage({ id: `attribute.configuration.renderer.${type}.${key}` })}
          />
        ))
        }
      </SelectField>
    )
  }
}
export default RendererSelectionRender
