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
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { fieldArrayFieldsPropTypes } from 'redux-form'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { StringComparison } from '@regardsoss/form-utils'
import {
  TableLayout, TableHeaderLine, TableHeaderContentBox,
  TableHeaderText, TableHeaderTextField, InfiniteTableContainer, TableColumnBuilder,
} from '@regardsoss/components'
import NoRestrictionElementComponent from './NoRestrictionElementComponent'
import ToggleElementSelectionComponent from './ToggleElementSelectionComponent'

/**
 * Component to show in field array: allows selection of datasets or dataset models for corresponding restrictions
 * @author Raphaël Mechali
 */
class DatasetRestrictionsSelectionComponent extends React.Component {
  static propTypes = {
    datasets: DataManagementShapes.DatasetList.isRequired,
    datasetModels: DataManagementShapes.ModelList.isRequired,
    currentRestrictionType: PropTypes.oneOf(UIDomain.DATASET_RESTRICTIONS_TYPES).isRequired,
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    selectableElements: [],
    visibleElements: [],
    filterText: '',
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
    const { currentRestrictionType, datasets, datasetModels } = newProps
    //  When restriction type / elements list change, update available list (nota: filter is reset)
    if (oldProps.currentRestrictionType !== currentRestrictionType) {
      this.onElementsUpdated(currentRestrictionType, datasets, datasetModels, '')
    }
  }

  /**
   * Elements list / restriction type or filter were updated. Update table elements in local state
   * @param {string} restrictionType from UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM
   * @param {*} datasets matching DataManagementShapes.DatasetList
   * @param {*} datasetModels matching DataManagementShapes.ModelList
   * @param {string} filterText applying filter
   */
  onElementsUpdated(restrictionType, datasets, datasetModels, filterText) {
    // 1 - Pick the right elements pool
    let selectableElements
    switch (restrictionType) {
      case UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE:
        selectableElements = []
        break
      case UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS:
        selectableElements = values(datasets).map(({ content: { feature: { id, label } } }) => ({ id, label }))
        break
      case UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS:
        selectableElements = values(datasetModels).map(({ content: { name } }) => ({ id: name, label: name }))
        break
      default:
        throw new Error(`Unknown restriction type: ${restrictionType}`)
    }
    // 2 - sort it
    const sortedSelectableElements = selectableElements.sort((e1, e2) => StringComparison.compare(e1.label, e2.label))
    // 3 - store it in state (pool, filter and filtered pool)
    const lowerFilterText = filterText.toLowerCase()
    const nextState = {
      selectableElements: sortedSelectableElements,
      visibleElements: sortedSelectableElements.filter((element) => element.label.toLowerCase().includes(lowerFilterText)),
      filterText,
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * Callback: user entered a new filter text
   * @param {*} event MUI event
   * @param {string} text new text value
   */
  onFilterTextInput = (event, text) => {
    const { currentRestrictionType, datasets, datasetModels } = this.props
    this.onElementsUpdated(currentRestrictionType, datasets, datasetModels, text)
  }

  /**
   * Callback: user added / removed an element in selection
   * @param {string} index (un)selected element index
   */
  onToggleSelection = (index) => {
    const { fields: { getAll, push, remove } } = this.props
    const { visibleElements } = this.state
    // 1 - retrieve the element by its index in visible elements list
    const element = visibleElements[index]
    // 2 - Search for element in currently selected values
    const selectedElementIndex = getAll().findIndex((selectedElement) => selectedElement === element.id)

    // 3 - Update selection
    if (selectedElementIndex < 0) {
      // 3.a - Not found in selection, add it (ID only)
      push(element.id)
    } else {
      // 3.b - Found in selection, remove it
      remove(selectedElementIndex)
    }
  }

  /**
   * @param {[string]} selectedElements selected elements IDs
   * @return {[*]} built table columns
   */
  buildColumns = (selectedElements) => [
    // Select / unselect column
    new TableColumnBuilder('selection.column').optionsColumn([{
      OptionConstructor: ToggleElementSelectionComponent,
      optionProps: {
        selectedElements,
        onToggleSelection: this.onToggleSelection,
      },
    }]).fixedColumn(false).build(),
    // Label column
    new TableColumnBuilder('label.column').propertyRenderCell('label').build(),
  ]

  render() {
    const { currentRestrictionType, fields: { getAll } } = this.props
    const { selectableElements, visibleElements, filterText } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    if (currentRestrictionType === UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE) {
      return null
    }
    const selection = getAll()
    const selectionCount = selection.length
    return (
      <TableLayout>
        {/* 0. Empty placeholder to show first row spacing and separator */}
        <TableHeaderLine />
        {/* Configuration text*/}
        <TableHeaderLine>
          <TableHeaderContentBox>
            <TableHeaderText text={formatMessage({
              id: currentRestrictionType === UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS
                ? 'search.results.form.restrictions.configuration.selection.dataset.count.max'
                : 'search.results.form.restrictions.configuration.selection.model.count.max',
            }, { max: ToggleElementSelectionComponent.MAX_SELECTED_DATASET })}
            />
          </TableHeaderContentBox>
        </TableHeaderLine>
        {/* Main header bar */}
        <TableHeaderLine>
          {/* Selected elements count (warn when none) */}
          <TableHeaderContentBox>
            <TableHeaderText
              text={formatMessage({
                id: selectionCount
                  ? 'search.results.form.restrictions.configuration.selection.count.message'
                  : 'search.results.form.restrictions.configuration.no.selection.message',
              }, { selectionCount, max: ToggleElementSelectionComponent.MAX_SELECTED_DATASET })}
              error={!selectionCount}
            />
          </TableHeaderContentBox>
          {/* Filter input field */}
          <TableHeaderTextField
            value={filterText}
            hintText={formatMessage({ id: 'search.results.form.restrictions.configuration.filter.by.name.message' })}
            onChange={this.onFilterTextInput}
          />
        </TableHeaderLine>
        {/* Selection table, showing only filtered elements */}
        <InfiniteTableContainer
          columns={this.buildColumns(selection)}
          entities={visibleElements}
          emptyComponent={
            <NoRestrictionElementComponent
              currentRestrictionType={currentRestrictionType}
              allElements={selectableElements}
            />
          }
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          displayColumnsHeader={false}
        />
      </TableLayout>
    )
  }
}
export default DatasetRestrictionsSelectionComponent
