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
import isEqual from 'lodash/isEqual'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine, TableNoDataMessage,
  TableHeaderContentBox, TableHeaderText, TableHeaderTextField, TableHeaderOptionGroup,
} from '@regardsoss/components'
import AttributeRender from '../../../render/AttributeRender'
import AddOption from './AddOption'

/**
 * Table to renders available attributes
 * @author Raphaël Mechali
 */
class AvailableAttributesTable extends React.Component {
  static propTypes = {
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    onAdd: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Filters attributes models on filterText
   * @param {*} intl context
   * @param {*} filterText filter text
   * @param {*} attributeModels attribute models
   * @return [{*}] filtered attributes list
   */
  static filterAttributes(intl, filterText, attributeModels = []) {
    const lowerFilter = filterText.toLowerCase()
    return attributeModels.filter((attribute) => {
      const lowerLabel = AttributeRender.getRenderLabel(attribute, intl).toLowerCase()
      return lowerLabel.includes(lowerFilter)
    })
  }


  /** Empty table component */
  static EMPTY_COMPONENT = <TableNoDataMessage messageKey="attribute.configuration.selectable.attributes.no.data" />

  state = {
    filterText: '',
    attributeModels: [],
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
    if (!isEqual(oldProps.attributeModels, newProps.attributeModels)) {
      // simulate filter event to filter attributes list
      this.onUpdateFilter(this.state.filterText, newProps.attributeModels)
    }
  }

  /**
   * On update filter user callback
   * @param {string} filter
   *  */
  onUpdateFilter = (filterText = '', attributeModels) => {
    const { intl } = this.context
    this.setState({
      filterText,
      attributeModels: AvailableAttributesTable.filterAttributes(intl, filterText, attributeModels),
    })
  }

  /**
   * User filter text input callback
   * @param {string} text input text
   */
  onFilterTextUpdated = (event, text) => {
    const { attributeModels } = this.props
    this.onUpdateFilter(text, attributeModels)
  }

  /**
   * Builds table columns
   * @return {[*]} built columns
   */
  buildColumns = () => {
    const { onAdd } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - attribute label
      new TableColumnBuilder('attribute')
        .label(formatMessage({ id: 'attribute.configuration.selectable.attributes.table.attribute.column' }))
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: AttributeRender })
        .build(),
      // 2 - Add option
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AddOption,
        optionProps: { onAdd },
      }]).build(),
    ]
  }

  render() {
    const { filterText, attributeModels } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - Header message */}
          <TableHeaderContentBox>
            <TableHeaderText text={formatMessage({ id: 'attribute.configuration.selectable.attributes.header' },
              { count: attributeModels.length })}
            />
          </TableHeaderContentBox>
          <TableHeaderOptionGroup>
            <TableHeaderTextField
              value={filterText}
              hintText={formatMessage({ id: 'attribute.configuration.selectable.attributes.filter' })}
              onChange={this.onFilterTextUpdated}
            />
          </TableHeaderOptionGroup>
        </TableHeaderLine>
        {/* 2 - Table render */}
        <InfiniteTableContainer
          minRowCount={5}
          maxRowCount={5}
          columns={this.buildColumns()}
          entities={attributeModels}
          emptyComponent={AvailableAttributesTable.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default AvailableAttributesTable
