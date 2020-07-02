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
import Subheader from 'material-ui/Subheader'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AvailableAttributesTable from './available/AvailableAttributesTable'
import SelectedAttributesTable from './selected/SelectedAttributesTable'

/**
 * Table allowing multiple attributes selection
 * @author Raphaël Mechali
 */
class AttributesSelectionTable extends React.Component {
  static propTypes = {
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    fields: PropTypes.shape({
      getAll: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }),
    meta: PropTypes.shape({
      invalid: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }),
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // 1 - recompute attributes list
    // 1.a - selected
    const selectedAttributes = newProps.fields.getAll()
    // 1.b - selectable (not selected yet)
    const availableAttributesModels = newProps.attributeModels.filter(({ content: { jsonPath } }) => !selectedAttributes.find(({ name }) => jsonPath === name))
    this.setState({
      availableAttributesModels,
      selectedAttributes,
    })
  }

  /**
   * On add attribute user callback
   * @param {string} name selected attribute full qualified name
   */
  onAdd = (name) => {
    const { fields: { push } } = this.props
    push({ name })
  }

  /**
   * On remove attribute user callback
   * @param {number} index removed attribute index
   */
  onRemove = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  render() {
    const { label, attributeModels, meta: { invalid, error } } = this.props
    const { availableAttributesModels, selectedAttributes } = this.state
    const {
      rootStyle, fieldLabelStyle, verticalSeparatorStyle, tableHolderStyle,
    } = this.context.moduleTheme.configuration.editDialog.multipleSelector
    return (
      <React.Fragment>
        <Subheader style={fieldLabelStyle}>
          {label}
        </Subheader>
        <div style={rootStyle}>
          <div style={tableHolderStyle}>
            <AvailableAttributesTable
              attributeModels={availableAttributesModels}
              onAdd={this.onAdd}
            />
          </div>
          <div style={verticalSeparatorStyle} />
          <div style={tableHolderStyle}>
            <SelectedAttributesTable
              selectedAttributes={selectedAttributes}
              attributeModels={attributeModels}
              onRemove={this.onRemove}
              invalid={invalid}
              error={error}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default AttributesSelectionTable
