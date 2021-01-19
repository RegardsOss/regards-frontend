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
import FlatButton from 'material-ui/FlatButton'
import ResetIcon from 'mdi-material-ui/BackupRestore'
import ShowAllIcon from 'mdi-material-ui/Eye'
import HideAllIcon from 'mdi-material-ui/EyeOff'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PositionedDialog, TableLayout, InfiniteTableContainer, TableColumnBuilder,
} from '@regardsoss/components'
import ColumnLabelRender from './ColumnLabelRender'
import ColumnVisibleRender from './ColumnVisibleRender'
import MoveColumnOption from './MoveColumnOption'

/**
 * Columns settings dialog component: allows user editing columns order and visibility (dialog)
 * @author Raphaël Mechali
 */
class ColumnsSettingsComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    presentationModels: PropTypes.arrayOf(PropTypes.oneOfType([UIShapes.AttributePresentationModel, UIShapes.FunctionalPresentationModel])).isRequired, // used only in onPropertiesUpdated
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
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to transform current presentation model into edition models
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

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
        newProps.presentationModels.map((model) => ({ ...model })))
    }
  }

  /**
   * inner callback: updates edition model and related variables in state
   * @param {[ColumnPresentationModel]} editionModels new edition models
   */
  onEditionModelsUpdate = (editionModels) => {
    const { presentationModels: initialModels } = this.props
    this.setState({
      editionModels,
      valid: editionModels.some((m) => m.visible),
      modified: !isEqual(initialModels, editionModels),
      allVisible: !editionModels.find((m) => !m.visible),
    })
  }

  /**
   * User callback: on edition done (locally wrapped). It clears previous sorting state from hidden models
   * before calling parent
   */
  onDone = () => {
    const { editionModels } = this.state
    const { onDone } = this.props
    onDone(editionModels)
  }

  /**
   * On change visibility callback: update column visibility in edition model
   * @param {ColumnPresentationModel} presentationModel updated presentation model
   * @param {boolean} visible new visible attribute
   */
  onChangeVisibility = (presentationModel, visible) => {
    // update state through inner callback
    this.onEditionModelsUpdate(
      this.state.editionModels.map((model) => model.key === presentationModel.key ? { ...model, visible } : model))
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
    this.onEditionModelsUpdate(withMovedElement)
  }

  /**
   * Inner callback: Toggles all columns visible state
   * @param {boolean} visible new visible state for all columns
   */
  onToggleAll = (visible) => this.onEditionModelsUpdate(this.state.editionModels.map((m) => ({ ...m, visible })))

  /** User callback: hide all columns */
  onToggleAllHidden = () => this.onToggleAll(false)

  /** User callback: show all columns */
  onToggleAllVisible = () => this.onToggleAll(true)

  /** @return [*] Builds table columns */
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
      // 3 - Options
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
        actions={[
          <FlatButton
            key="reset.button"
            label={formatMessage({ id: 'search.results.configure.columns.dialog.reset' })}
            title={formatMessage({ id: 'search.results.configure.columns.dialog.reset.tooltip' })}
            icon={<ResetIcon />}
            onClick={onResetColumns}
          />,
          <FlatButton
            key="hide.show.all.button"
            label={formatMessage({
              id: allVisible
                ? 'search.results.configure.columns.toggle.all.hidden'
                : 'search.results.configure.columns.toggle.all.visible',
            })}
            icon={allVisible ? <HideAllIcon /> : <ShowAllIcon />}
            onClick={allVisible ? this.onToggleAllHidden : this.onToggleAllVisible}
          />,
          <div key="actions.separator" style={columnsDialog.actionsSeparator} />,
          <FlatButton
            key="cancel.button"
            label={formatMessage({ id: 'search.results.configure.columns.dialog.cancel' })}
            onClick={onClose}
          />,
          <FlatButton
            key="confirm.button"
            label={formatMessage({ id: 'search.results.configure.columns.dialog.confirm' })}
            disabled={!valid || !modified}
            onClick={this.onDone}
          />]}
        actionsContainerStyle={columnsDialog.actionsContainer}
      >
        <TableLayout>
          <InfiniteTableContainer
            entities={editionModels}
            columns={this.buildColumns()}
            displayColumnsHeader={false}
          />
        </TableLayout>
      </PositionedDialog>
    )
  }
}
export default ColumnsSettingsComponent
