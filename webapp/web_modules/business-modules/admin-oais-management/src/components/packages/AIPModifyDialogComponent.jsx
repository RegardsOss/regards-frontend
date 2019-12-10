/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import identity from 'lodash/identity'
import includes from 'lodash/includes'
import isEqual from 'lodash/isEqual'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { List, ListItem } from 'material-ui/List'
import { themeContextType } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import ContentSend from 'material-ui/svg-icons/content/send'
import {
  TableLayout, TableColumnBuilder, InfiniteTableContainer,
} from '@regardsoss/components'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import TextField from 'material-ui/TextField'
import messages from '../../i18n'
import AIPModifyDeleteOption from './AIPModifyDeleteOption'
import AIPModifyUndoOption from './AIPModifyUndoOption'
import AIPModifyAddOption from './AIPModifyAddOption'


/**
 * Confirm action dialog component. Switches dialog mode,
 */
class AIPModifyDialogComponent extends React.Component {
  static propTypes = {
    onConfirmModify: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    // selectionStorages: PropTypes.arrayOf(PropTypes.string).isRequired,
    // selectionTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    // selectionCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static SECTIONS = {
    STORAGE: 'STORAGE',
    TAG: 'TAG',
    CATEGORY: 'CATEGORY',
  }

  state = {
    toggledSection: AIPModifyDialogComponent.SECTIONS.STORAGE,
    [AIPModifyDialogComponent.SECTIONS.STORAGE]: {
      list: [],
      toDelete: [],
    },
    [AIPModifyDialogComponent.SECTIONS.TAG]: {
      list: [],
      toDelete: [],
      toAdd: [],
      textFieldValue: '',
    },
    [AIPModifyDialogComponent.SECTIONS.CATEGORY]: {
      list: [],
      toDelete: [],
      toAdd: [],
      textFieldValue: '',
    },
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
    const nextState = { ...this.state }
    if (!isEqual(oldProps.selectionStorages, newProps.selectionStorages)) {
      nextState[AIPModifyDialogComponent.SECTIONS.STORAGE] = {
        list: [...newProps.selectionStorages],
        toDelete: [],
      }
    }
    if (!isEqual(oldProps.selectionTags, newProps.selectionTags)) {
      nextState[AIPModifyDialogComponent.SECTIONS.TAG] = {
        list: [...newProps.selectionTags],
        toAdd: [],
        toDelete: [],
        textFieldValue: '',
      }
    }
    if (!isEqual(oldProps.selectionCategories, newProps.selectionCategories)) {
      nextState[AIPModifyDialogComponent.SECTIONS.CATEGORY] = {
        list: [...newProps.selectionCategories],
        toAdd: [],
        toDelete: [],
        textFieldValue: '',
      }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  onTextFieldChange = (event) => {
    const { toggledSection } = this.state
    if (toggledSection !== AIPModifyDialogComponent.SECTIONS.STORAGE) {
      this.setState({
        [toggledSection]: {
          ...this.state[toggledSection],
          textFieldValue: event.target.value,
        },
      })
    }
  }

  onDelete = (entity) => {
    const { toggledSection } = this.state
    if (toggledSection) {
      this.setState({
        [toggledSection]: {
          ...this.state[toggledSection],
          list: this.state[toggledSection].list.filter(e => e !== entity),
          toDelete: [
            ...this.state[toggledSection].toDelete,
            entity,
          ],
        },
      })
    }
  }

  onUndoDelete = (entity) => {
    const { toggledSection } = this.state
    if (toggledSection) {
      this.setState({
        [toggledSection]: {
          toDelete: this.state[toggledSection].toDelete.filter(e => e !== entity),
          list: [
            ...this.state[toggledSection].list,
            entity,
          ],
        },
      })
    }
  }

  onUndoAdd = (entity) => {
    const { toggledSection } = this.state
    if (toggledSection) {
      this.setState({
        [toggledSection]: {
          ...this.state[toggledSection],
          toAdd: this.state[toggledSection].toAdd.filter(e => e !== entity),
        },
      })
    }
  }

  onAdd = () => {
    const { toggledSection } = this.state
    if (toggledSection !== AIPModifyDialogComponent.SECTIONS.STORAGE
      && this.state[toggledSection].textFieldValue !== ''
      && !includes(this.state[toggledSection].toAdd, this.state[toggledSection].textFieldValue)) {
      this.setState({
        [toggledSection]: {
          ...this.state[toggledSection],
          toAdd: [
            ...(this.state[toggledSection].toAdd || []),
            this.state[toggledSection].textFieldValue,
          ],
        },
      })
    }
  }

  onConfirmModify = () => {
    const { onConfirmModify } = this.props

    onConfirmModify({
      storages: this.state[AIPModifyDialogComponent.SECTIONS.STORAGE].list,
      tags: this.state[AIPModifyDialogComponent.SECTIONS.TAG].list,
      categories: this.state[AIPModifyDialogComponent.SECTIONS.CATEGORY].list,
    })
  }

  renderPane = (pane) => {
    const { muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const paneObject = this.state[pane]
    const listColumns = [
      new TableColumnBuilder('column.providerId').valuesRenderCell([{ getValue: identity }])
        .build(),
      new TableColumnBuilder('column.actions').optionsColumn([{
        OptionConstructor: AIPModifyDeleteOption,
        optionProps: { onDelete: this.onDelete },
      }])
        .build(),
    ]
    const deleteColumns = [
      new TableColumnBuilder('column.providerId').valuesRenderCell([{ getValue: identity }])
        .build(),
      new TableColumnBuilder('column.actions').optionsColumn([{
        OptionConstructor: AIPModifyUndoOption,
        optionProps: { onUndo: this.onUndoDelete },
      }])
        .build(),
    ]
    const addColumns = [
      new TableColumnBuilder('column.providerId').valuesRenderCell([{ getValue: identity }])
        .build(),
      new TableColumnBuilder('column.actions').optionsColumn([{
        OptionConstructor: AIPModifyAddOption,
        optionProps: { onUndo: this.onUndoAdd },
      }])
        .build(),
    ]
    return (
      <div style={{ display: 'inline' }}>
        <div style={{
          width: '33%', display: 'inline-block', padding: 1, float: 'left',
        }}
        >
          <TableLayout>
            <InfiniteTableContainer
              displayColumnsHeader={false}
              columns={listColumns}
              entities={paneObject.list}
              minRowCount={minRowCount} // let the table grow and shrink with list elements count
              maxRowCount={maxRowCount}
            />
          </TableLayout>
        </div>
        <div style={{
          width: '33%', display: 'inline-block', padding: 1,
        }}
        >
          <TableLayout>
            <InfiniteTableContainer
              displayColumnsHeader={false}
              columns={deleteColumns}
              entities={paneObject.toDelete}
              minRowCount={minRowCount} // let the table grow and shrink with list elements count
              maxRowCount={maxRowCount}
            />
          </TableLayout>
        </div>
        {pane !== AIPModifyDialogComponent.SECTIONS.STORAGE
          && <div style={{
            width: '33%', display: 'inline-block', padding: 1,
          }}
          >
            <TextField
              name="toto"
              type="text"
              value={paneObject.textFieldValue}
              onChange={this.onTextFieldChange}
              label="tutu"
            />
            <FlatButton
              onClick={this.onAdd}
              secondary
              icon={<Add />}
            />
            <TableLayout>
              <InfiniteTableContainer
                displayColumnsHeader={false}
                columns={addColumns}
                entities={paneObject.toAdd}
                minRowCount={minRowCount} // let the table grow and shrink with list elements count
                maxRowCount={maxRowCount}
              />
            </TableLayout>
          </div>}
      </div>
    )
  }

  renderSection = () => {
    const { toggledSection } = this.state
    switch (toggledSection) {
      case AIPModifyDialogComponent.SECTIONS.STORAGE:
        return this.renderPane(AIPModifyDialogComponent.SECTIONS.STORAGE)
      case AIPModifyDialogComponent.SECTIONS.TAG:
        return this.renderPane(AIPModifyDialogComponent.SECTIONS.TAG)
      case AIPModifyDialogComponent.SECTIONS.CATEGORY:
        return this.renderPane(AIPModifyDialogComponent.SECTIONS.CATEGORY)
      default:
        return null
    }
  }

  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.sip.cancel.delete' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="confirmModify"
        id="confirm.dialog.cancel"
        label="modify"
        keyboardFocused
        onClick={this.onConfirmModify}
      />,
    ]
  }

  changeSection = (section) => {
    this.setState({
      toggledSection: section,
    })
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const dialogStyle = { display: 'inline', width: '100%' }
    return (
      <Dialog
        actions={this.renderActions()}
        modal={false}
        open
        contentStyle={dialogStyle}
      >
        {formatMessage({ id: 'oais.packages.confirm.modify.title' })}
        <div style={{ display: 'inline' }}>
          <div style={{ width: '19%', display: 'inline-block', float: 'left' }}>
            <List>
              <ListItem primaryText="storages" leftIcon={<ContentSend />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTIONS.STORAGE)} />
              <ListItem primaryText="categories" leftIcon={<ContentSend />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTIONS.CATEGORY)} />
              <ListItem primaryText="tags" leftIcon={<ContentSend />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTIONS.TAG)} />
            </List>
          </div>
          <div style={{ width: '80%', display: 'inline-block' }}>
            {this.renderSection()}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withI18n(messages)(AIPModifyDialogComponent)
