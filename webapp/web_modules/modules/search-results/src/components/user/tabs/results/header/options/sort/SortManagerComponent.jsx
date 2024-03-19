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
import isEqual from 'lodash/isEqual'
import size from 'lodash/size'
import FlatButton from 'material-ui/FlatButton'
import ResetIcon from 'mdi-material-ui/BackupRestore'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PositionedDialog, TableLayout, InfiniteTableContainer, TableColumnBuilder,
} from '@regardsoss/components'
import find from 'lodash/find'
import SortLabelRender from './SortLabelRender'
import MoveSortOption from './MoveSortOption'
import SortOrderRender from './SortOrderRender'
import {
  getNewSortConfig, getSortConfigId, isNewSortConfig, areSortOptionsEquals,
} from './SortUtils'
import SortPriorityRender from './SortPriorityRender'
import DeleteSortOption from './DeleteSortOption'
import CreateSortOption from './CreateSortOption'
import { CriterionBuilder } from '../../../../../../../definitions/CriterionBuilder'

/**
 * sortConfig manager dialog component: allows user editing sortConfig order upon all sortable attributes
 * @author Léo Mieulet
 */
class SortManagerComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    // available sorting attributes
    sortableAttributes: UIShapes.SortableAttributes.isRequired,
    // user and admin sorting infos
    isInInitialSorting: PropTypes.bool.isRequired,
    currentSorting: PropTypes.arrayOf(UIShapes.SortingCriterion).isRequired,
    // edition done callback (presentation models) => ()
    onDone: PropTypes.func.isRequired,
    // attribute presentation models
    onReset: PropTypes.func.isRequired, // reset callback () => ()
    onClose: PropTypes.func.isRequired, // close callback
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentSortings: [],
    valid: false,
    modified: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to transform current presentation model into edition models
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to transform current presentation model into edition models
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect dialog opening: when it opens, convert copy current sorting criteria into state, to be used
    // as editable entity
    if (!oldProps.open && newProps.open) {
      this.onSortingsUpdated(newProps.currentSorting)
    }
  }

  /**
   * inner callback: updates edition model and related variables in state
   * @param {[UIShapes.SortingCriterion]} newSortings new sorting
   */
  onSortingsUpdated = (newSortings) => {
    const { currentSorting } = this.props
    this.setState({
      currentSortings: newSortings,
      valid: newSortings.length > 0 && !find(newSortings, (newSorting) => newSorting.uncomplete),
      modified: !isEqual(currentSorting, newSortings),
    })
  }

  /**
   * User callback: on edition done (locally wrapped). It clears previous sorting state from hidden models
   * before calling parent
   */
  onDone = () => {
    const { currentSortings } = this.state
    const { onDone } = this.props
    onDone(currentSortings)
  }

  /**
   * On move column callback: update column position in model
   * @param {number} oldIndex: previous column index
   * @param {number} newIndex: new column index
   */
  onMove = (oldIndex, newIndex) => {
    // compute new edition models
    const movedElement = this.state.currentSortings[oldIndex]
    // 1 - remove the element from model
    const withoutMovedElement = this.state.currentSortings.reduce(
      (acc, elt, index) => index === oldIndex ? acc : [...acc, elt], [])
    // 2 - Insert element at new position in array
    const withMovedElement = [
      ...(newIndex > 0 ? withoutMovedElement.slice(0, newIndex) : []),
      movedElement,
      ...(newIndex < withoutMovedElement.length ? withoutMovedElement.slice(newIndex) : []),
    ]
    // update state through inner callback
    this.onSortingsUpdated(withMovedElement)
  }

  onChangeSortOrder = (sortConfig, sortOrder) => {
    const newSortings = this.state.currentSortings.map((currentSorting) => areSortOptionsEquals(sortConfig, currentSorting)
      ? CriterionBuilder.buildSortCriterion(currentSorting.attribute, sortOrder)
      : currentSorting,
    )
    this.onSortingsUpdated(newSortings)
  }

  onCreate = (index) => {
    const { currentSortings } = this.state
    const newSort = getNewSortConfig()
    // 2 - Insert element at new position in array
    const withCreatedElement = [
      ...(index > 0 ? currentSortings.slice(0, index) : []),
      newSort,
      ...(index < currentSortings.length ? currentSortings.slice(index) : []),
    ]
    // update state through inner callback
    this.onSortingsUpdated(withCreatedElement)
  }

  onSetNewSortAttrId = (attrId) => {
    const { currentSortings } = this.state
    const { sortableAttributes } = this.props
    // There is a new sort config inside the current sortings, just replace
    // that stub entity with the attrId provided
    const withSortingAttrSelected = currentSortings.reduce((acc, sortConfig) => {
      // Replace the newly created sort config
      const curentSort = isNewSortConfig(sortConfig)
        // Create a sort config using attrId and its attributes
        ? CriterionBuilder.buildSortCriterion(find(sortableAttributes, (sortAttribute) => getSortConfigId(sortAttribute) === attrId).attribute, sortConfig.sortOrder)
        : sortConfig // keep that sorting element
      return [
        ...acc,
        curentSort,
      ]
    }, [])
    // update state through inner callback
    this.onSortingsUpdated(withSortingAttrSelected)
  }

  onDelete = (sortConfig) => {
    let newSortings = this.state.currentSortings.filter((currentSorting) => !areSortOptionsEquals(sortConfig, currentSorting))
    // We let the user delete the last sortConfig config, but we create another instantly
    if (size(newSortings) === 0) {
      newSortings = [getNewSortConfig()]
    }
    this.onSortingsUpdated(newSortings)
  }

  /** @return [*] Builds table columns */
  buildColumns = () => {
    const { sortableAttributes } = this.props
    const { currentSortings } = this.state
    const { intl: { formatMessage } } = this.context
    const maxAttributes = size(sortableAttributes)
    return [
      // 1 - Priority
      new TableColumnBuilder('column.priority')
        .label(formatMessage({ id: 'search.results.configure.sorting.column.priority' }))
        .titleHeaderCell().fixedSizing(80)
        .rowCellDefinition({
          Constructor: SortPriorityRender,
        })
        .build(),
      // 2 - Order
      new TableColumnBuilder('column.order')
        .label(formatMessage({ id: 'search.results.configure.sorting.column.order' }))
        .titleHeaderCell().fixedSizing(150)
        .rowCellDefinition({
          Constructor: SortOrderRender,
          props: { onChangeSortOrder: this.onChangeSortOrder },
        })
        .build(),
      // 3 - Label
      new TableColumnBuilder('column.label')
        .label(formatMessage({ id: 'search.results.configure.sorting.column.label' }))
        .titleHeaderCell()
        .rowCellDefinition({
          Constructor: SortLabelRender,
          props: { sortableAttributes, currentSortings, onSetNewSortAttrId: this.onSetNewSortAttrId },
        })
        .build(),

      // 4 - Options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: CreateSortOption,
        optionProps: {
          onCreate: this.onCreate,
          currentSortings,
          maxAttributes,
        },
      }, {
        OptionConstructor: MoveSortOption,
        optionProps: {
          onMove: this.onMove,
          currentSortings,
          sortableAttributes,
        },
      }, {
        OptionConstructor: DeleteSortOption,
        optionProps: {
          onDelete: this.onDelete,
        },
      }]).build(),
    ]
  }

  render() {
    const {
      open, onClose, onReset, isInInitialSorting,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { ordersDialog } } } = this.context
    const {
      valid, modified, currentSortings,
    } = this.state
    return (
      <PositionedDialog
        dialogWidthPercent={ordersDialog.widthPercent}
        dialogHeightPercent={ordersDialog.heightPercent}
        open={open}
        modal
        actions={[
          <FlatButton
            key="reset.button"
            label={formatMessage({ id: 'search.results.configure.sorting.dialog.reset' })}
            title={formatMessage({ id: 'search.results.configure.sorting.dialog.reset.tooltip' })}
            icon={<ResetIcon />}
            onClick={onReset}
            disabled={isInInitialSorting}
          />,
          <div key="actions.separator" style={ordersDialog.actionsSeparator} />,
          <FlatButton
            key="cancel.button"
            label={formatMessage({ id: 'search.results.configure.sorting.dialog.cancel' })}
            onClick={onClose}
          />,
          <FlatButton
            key="confirm.button"
            label={formatMessage({ id: 'search.results.configure.sorting.dialog.confirm' })}
            disabled={!valid || !modified}
            onClick={this.onDone}
          />]}
        actionsContainerStyle={ordersDialog.actionsContainer}
      >
        <TableLayout>
          <InfiniteTableContainer
            entities={currentSortings}
            columns={this.buildColumns()}
          />
        </TableLayout>
      </PositionedDialog>
    )
  }
}
export default SortManagerComponent
