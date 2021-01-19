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
import filter from 'lodash/filter'
import find from 'lodash/find'
import { fieldArrayFieldsPropTypes, fieldMetaPropTypes } from 'redux-form'
import {
  TableLayout, TableHeaderLine, InfiniteTableContainer, TableHeaderOptionsArea, TableColumnBuilder,
  TableHeaderOptionGroup, TableHeaderContentBox, TableHeaderText, TableNoDataMessage,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import RemoveLevelOption from './RemoveLevelOption'
import AddLevelOption from './AddLevelOption'

/**
* Render for selected levels field
*/
class SelectedLevelFormRender extends React.Component {
  static propTypes = {
    // values pool as fetched and normalized
    collectionModels: DataManagementShapes.ModelList.isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Table empty component */
  static EMPTY_COMPONENT = <TableNoDataMessage messageKey="search.graph.levels.selection.no.selection.hint" />

  /**
   * Called when user selects a graph level from collection types
   * @param levelName added level name
   */
  onAddLevel = (levelName) => {
    // add the level collection type name to selected field values
    this.props.fields.push(levelName)
  }

  /**
   * Callback: user removed a graph level
   * @param index element index
   */
  onRemoveLevel = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  /**
   * Returns selectable levels, ie not selected, with data, from current state selection
   * @return [{ content: {name, description}}]
   */
  getSelectableLevels = () => {
    const { fields, collectionModels } = this.props
    const allSelectedArray = fields.getAll() || []
    return filter(collectionModels, ({ content: { name } }) => !allSelectedArray.includes(name))
  }

  /**
   * Returns selected levels, with data, from current state selection
   * @return [{ content: {name, description}}]
   */
  getSelectedLevels = () => {
    const { fields, collectionModels } = this.props
    // rebuild selected levels list, avoid appending null to the selected levels list (may happen in module edition)
    const allSelectedArray = fields.getAll() || []
    return allSelectedArray.reduce((acc, name) => {
      // search selected element by name in collections
      const foundElt = find(collectionModels, ({ content: { name: currName } }) => currName === name)
      return foundElt ? [...acc, foundElt] : acc
    }, [])
  }

  /**
   * @return built table columns
   */
  buildColumns = () => {
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - name
      new TableColumnBuilder('name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'search.graph.selected.levels.column.name' }))
        .build(),
      // 2 - description
      new TableColumnBuilder('description').titleHeaderCell().propertyRenderCell('content.description')
        .label(formatMessage({ id: 'search.graph.selected.levels.column.description' }))
        .build(),
      // 3 - options
      new TableColumnBuilder().optionsColumn([{ // edit option
        OptionConstructor: RemoveLevelOption,
        optionProps: { onDelete: this.onRemoveLevel },
      }]).build(),
    ]
  }

  render() {
    const { meta: { error, invalid } } = this.props
    const { intl: { formatMessage } } = this.context

    const selectableLevels = this.getSelectableLevels()
    const selectedLevels = this.getSelectedLevels()

    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - models / elements count */}
          <TableHeaderContentBox>
            <TableHeaderText
              error={invalid}
              text={formatMessage(
                { id: invalid ? error : 'search.graph.levels.selection.header.message' },
                { count: selectedLevels.length })}
            />
          </TableHeaderContentBox>
          {/* 2 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              <AddLevelOption
                selectableLevels={selectableLevels}
                onAddLevel={this.onAddLevel}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <InfiniteTableContainer
          columns={this.buildColumns()}
          emptyComponent={SelectedLevelFormRender.EMPTY_COMPONENT}
          entities={selectedLevels}
          minRowCount={0} // let the table grow and shrink with list elements count
          maxRowCount={Number.MAX_SAFE_INTEGER}
        />
      </TableLayout>)
  }
}

export default SelectedLevelFormRender
