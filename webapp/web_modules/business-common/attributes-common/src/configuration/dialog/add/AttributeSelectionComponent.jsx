/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Checkbox from 'material-ui/Checkbox'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import AttributeRender from '../../../render/AttributeRender'

/**
 * Attribute selection component: provides selector for an attribute
 * @author Raphaël Mechali
 */
class AttributeSelectionComponent extends React.Component {
  /** Shared shape for this model */
  static AttributeSelectionModel = PropTypes.shape({
    attributeModel: DataManagementShapes.AttributeModel.isRequired,
    selected: PropTypes.bool.isRequired,
  })

  static propTypes = {
    index: PropTypes.number.isRequired, // index in attributes list (to be used with onToggleAttributeSelection callback)
    attribute: AttributeSelectionComponent.AttributeSelectionModel.isRequired,
    onToggleAttributeSelection: PropTypes.func.isRequired, // (index: number) => ()
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Callback: user toggled attribute selection, propage event to parent
   */
  onToggleAttributeSelection = () => {
    const { index, onToggleAttributeSelection } = this.props
    onToggleAttributeSelection(index)
  }

  render() {
    const { attribute: { attributeModel, selected } } = this.props
    return (
      <Checkbox
        label={AttributeRender.getRenderLabel(attributeModel, this.context.intl)}
        checked={selected}
        onCheck={this.onToggleAttributeSelection}
      />
    )
  }
}
export default AttributeSelectionComponent
