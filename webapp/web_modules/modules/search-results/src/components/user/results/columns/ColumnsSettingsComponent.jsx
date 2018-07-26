/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PositionedDialog, TableLayout, InfiniteTableContainer, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableColumnBuilder, TableHeaderText, TableSortOrders,
} from '@regardsoss/components'
import { ColumnPresentationModelArray } from '../../../../models/table/TableColumnModel'
import ColumnLabelRender from './ColumnLabelRender'
import ColumnVisibleRender from './ColumnVisibleRender'
import ColumnAttributesRender from './ColumnAttributesRender'
import MoveColumnOption from './MoveColumnOption'

/**
 * Columns settings dialog componet: allows user editing columns order and visibility
 * @author Raphaël Mechali
 */
class ColumnsSettingsComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    presentationModels: ColumnPresentationModelArray.isRequired, // used only in onPropertiesUpdated
    onDone: PropTypes.func.isRequired, // edition done callback (presentation models) => ()
    onResetColumns: PropTypes.func.isRequired, // reset callback () => ()
    onClose: PropTypes.func.isRequired, // close callback
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    editionModels: [],
    valid: false,
    modified: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to transform current presentation model into edition models
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to transform current presentation model into edition models
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect dialog opening: when it opens, convert copy current presentation models into state, to be used
    // as edition model
    if (!oldProps.open && newProps.open) {
      // update state through inner callback
      this.onEditionModelsUpdate(
        newProps.presentationModels,
        newProps.presentationModels.map(model => ({ ...model })))
    }
  }

  /**
   * inner callback: updates edition model and related variables in state
   * @param {[ColumnPresentationModel]} editionModels new edition models
   */
  onEditionModelsUpdate = (initialEditionModels, editionModels) =>
    this.setState({
      editionModels,
      valid: editionModels.some(m => m.visible),
      modified: !isEqual(initialEditionModels, editionModels),
      allVisible: !editionModels.find(m => !m.visible),
    })

  /**
   * User callback: on edition done (locally wrapped). It clears previous sorting state from hidden models
   * before calling parent
   */
  onDone = () => {
    const { editionModels } = this.state
    const { onDone } = this.props
    // recompute sorting: remove previously enabled sorting attribute columns and re number remaining ones
    const { uCM: updatedColumnsModels } = editionModels.reduce(({ sortIndex, uCM }, model) => {
      let nextModel = model
      let nextSortIndex = sortIndex
      if (model.sortOrder !== TableSortOrders.NO_SORT) {
        if (model.visible) {
          // that model is still used for sorting: update its sort index, increment sort index for next sorting model
          nextModel = { ...model, sortIndex: nextSortIndex }
          nextSortIndex += 1
        } else {
          // that model is no longer used for sorting: clear its sorting state
          nextModel = { ...model, sortOrder: TableSortOrders.NO_SORT, sortIndex: null }
        }
      } // else: that model is not used for sorting, return it in its current state
      return { sortIndex: nextSortIndex, uCM: [...uCM, nextModel] }
    }, { sortIndex: 0, uCM: [] })

    onDone(updatedColumnsModels)
  }

  /**
   * On change visibility callback: update column visibility in edition model
   * @param {ColumnPresentationModel} presentationModel updated presentation model
   * @param {boolean} visible new visible attribute
   */
  onChangeVisibility = (presentationModel, visible) => {
    // update state through inner callback
    this.onEditionModelsUpdate(
      this.props.presentationModels,
      this.state.editionModels.map(model =>
        model.key === presentationModel.key ? { ...model, visible } : model))
  }

  /**
   * On move column callback: update column position in model
   * @param {number} oldIndex: previous column index
   * @param {number} newIndex: new column index
   */
  onMove = (oldIndex, newIndex) => {
    // compute new edition models
    const movedElement = this.state.editionModels[oldIndex]
    // 1 - remove the element from model
    const withoutMovedElement = this.state.editionModels.reduce(
      (acc, elt, index) => index === oldIndex ? acc : [...acc, elt], [])
    // 2 - Insert element at new position in array
    const withMovedElement = [
      ...(newIndex > 0 ? withoutMovedElement.slice(0, newIndex) : []),
      movedElement,
      ...(newIndex < withoutMovedElement.length ? withoutMovedElement.slice(newIndex) : []),
    ]
    // update state through inner callback
    this.onEditionModelsUpdate(this.props.presentationModels, withMovedElement)
  }

  /**
   * Inner callback: Toggles all columns visible state
   * @param {boolean} visible new visible state for all columns
   */
  onToggleAll = visible =>
    this.onEditionModelsUpdate(
      this.props.presentationModels,
      this.state.editionModels.map(m => ({ ...m, visible })))

  /** User callback: hide all columns */
  onToggleAllHidden = () => this.onToggleAll(false)

  /** User callback: show all columns */
  onToggleAllVisible = () => this.onToggleAll(true)

  /** @return [*] Buildt columns table columns */
  buildColumns = () => {
    const { editionModels } = this.state
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - Visible
      new TableColumnBuilder('column.visible')
        .label(formatMessage({ id: 'search.results.configure.columns.visible.column' }))
        .optionsSizing(1)
        .rowCellDefinition({
          Constructor: ColumnVisibleRender,
          props: {
            onChangeVisibility: this.onChangeVisibility,
          },
        })
        .build(),
      // 2 - Label
      new TableColumnBuilder('column.label')
        .label(formatMessage({ id: 'search.results.configure.columns.label.column' }))
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: ColumnLabelRender })
        .build(),
      // 3 - Attributes
      new TableColumnBuilder('column.attributes')
        .label(formatMessage({ id: 'search.results.configure.columns.attribute.column' }))
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: ColumnAttributesRender })
        .build(),
      // 4 - Options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: MoveColumnOption,
        optionProps: {
          onMove: this.onMove,
          models: editionModels,
        },
      }]).build(),
    ]
  }

  render() {
    const { open, onClose, onResetColumns } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { columnsDialog } } } = this.context
    const {
      valid, modified, allVisible, editionModels,
    } = this.state
    return (
      <PositionedDialog
        dialogWidthPercent={columnsDialog.widthPercent}
        dialogHeightPercent={columnsDialog.heightPercent}
        open={open}
        modal
        actions={// render dialog actions
          <div style={columnsDialog.actionsContainer}>
            <FlatButton
              key="reset.button"
              label={formatMessage({ id: 'search.results.configure.columns.dialog.reset' })}
              title={formatMessage({ id: 'search.results.configure.columns.dialog.reset.tooltip' })}
              onClick={onResetColumns}
            />
            <div style={columnsDialog.actionsSeparator} />
            <FlatButton
              key="cancel.button"
              label={formatMessage({ id: 'search.results.configure.columns.dialog.cancel' })}
              onClick={onClose}
            />
            <FlatButton
              key="confirm.button"
              label={formatMessage({ id: 'search.results.configure.columns.dialog.confirm' })}
              disabled={!valid || !modified}
              onClick={this.onDone}
            />
          </div>
        }
      >
        <TableLayout>
          <TableHeaderLine>
            <TableHeaderContentBox>
              <TableHeaderText text={formatMessage(
                { id: 'search.results.configure.columns.summary.text' },
                { columnsCount: editionModels.length })}
              />
            </TableHeaderContentBox>
            <TableHeaderOptionsArea>
              <FlatButton
                label={formatMessage({
                  id: allVisible ?
                    'search.results.configure.columns.toggle.all.hidden' :
                    'search.results.configure.columns.toggle.all.visible',
                })}
                onClick={allVisible ? this.onToggleAllHidden : this.onToggleAllVisible}
              />
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          {/* Columns table */}
          <InfiniteTableContainer
            entities={editionModels}
            columns={this.buildColumns()}
          />
        </TableLayout>
      </PositionedDialog>
    )
  }
}
export default ColumnsSettingsComponent

