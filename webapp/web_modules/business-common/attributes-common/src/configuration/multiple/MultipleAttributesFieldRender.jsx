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
import { fieldArrayFieldsPropTypes, fieldMetaPropTypes } from 'redux-form'
import { intlShape } from 'react-intl'
import Subheader from 'material-ui/Subheader'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AvailableAttributesTable from './available/AvailableAttributesTable'
import SelectedAttributesTable from './selected/SelectedAttributesTable'
import { DEFAULT_RENDERER_KEY } from '../../render/AttributesTypeToRender'

/**
 * Table allowing multiple attributes selection
 * @author Raphaël Mechali
 */
class MultipleAttributesFieldRender extends React.Component {
  static propTypes = {
    allowRendererSelection: PropTypes.bool.isRequired,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    label: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

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
    const { allowRendererSelection, fields: { push } } = this.props
    const attributeConfiguration = { name }
    if (allowRendererSelection) {
      attributeConfiguration.renderer = DEFAULT_RENDERER_KEY
    }
    push(attributeConfiguration)
  }

  /**
   * User callback: new renderer selected for configuration
   * @param {number} attributeIndex
   */
  onRendererSelected = (attributeIndex, renderer) => {
    const { fields } = this.props
    const attr = fields.get(attributeIndex)
    fields.remove(attributeIndex)
    fields.insert(attributeIndex, {
      ...attr,
      renderer,
    })
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
    const {
      label, attributeModels, allowRendererSelection,
      meta: { invalid, error }, intl,
    } = this.props
    const { availableAttributesModels, selectedAttributes } = this.state
    const {
      rootStyle, fieldLabelStyle, verticalSeparatorStyle,
      firstTableHolderStyle, secondTableHolderStyle,
    } = this.context.moduleTheme.configuration.editDialog.multipleSelector
    return (
      <>
        <Subheader style={fieldLabelStyle}>
          {label}
        </Subheader>
        <div style={rootStyle}>
          <div style={firstTableHolderStyle}>
            <AvailableAttributesTable
              attributeModels={availableAttributesModels}
              onAdd={this.onAdd}
            />
          </div>
          <div style={verticalSeparatorStyle} />
          <div style={secondTableHolderStyle}>
            <SelectedAttributesTable
              allowRendererSelection={allowRendererSelection}
              selectedAttributes={selectedAttributes}
              attributeModels={attributeModels}
              onRendererSelected={this.onRendererSelected}
              onRemove={this.onRemove}
              invalid={invalid}
              error={invalid && error ? intl.formatMessage({ id: error }) : undefined}
            />
          </div>
        </div>
      </>
    )
  }
}
export default MultipleAttributesFieldRender
