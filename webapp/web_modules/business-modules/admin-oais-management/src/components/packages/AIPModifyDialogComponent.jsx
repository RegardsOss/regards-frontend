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
import filter from 'lodash/filter'
import size from 'lodash/size'
import toLower from 'lodash/toLower'
import identity from 'lodash/identity'
import includes from 'lodash/includes'
import isEqual from 'lodash/isEqual'
import FlatButton from 'material-ui/FlatButton'
import NoContentIcon from 'material-ui/svg-icons/image/crop-free'
import { List, ListItem } from 'material-ui/List'
import { themeContextType } from '@regardsoss/theme'
import StoragesIcon from 'mdi-material-ui/Database'
import TagsIcon from 'mdi-material-ui/Tag'
import CategoriesIcon from 'mdi-material-ui/Pound'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import {
  TableLayout, TableColumnBuilder, InfiniteTableContainer, NoContentComponent, PositionedDialog,
  TableHeaderLine, TableHeaderContentBox, TableHeaderText,
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
export class AIPModifyDialogComponent extends React.Component {
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

  /** Possible section types */
  static SECTION_TYPES = {
    CATEGORY: 'category',
    STORAGE: 'storage',
    TAG: 'tag',
  }

  /** Empty component by section type */
  static EMPTY_COMPONENTS = {
    [AIPModifyDialogComponent.SECTION_TYPES.CATEGORY]: <NoContentComponent titleKey="oais.packages.modify.no.category" Icon={NoContentIcon} />,
    [AIPModifyDialogComponent.SECTION_TYPES.STORAGE]: <NoContentComponent titleKey="oais.packages.modify.no.storage" Icon={NoContentIcon} />,
    [AIPModifyDialogComponent.SECTION_TYPES.TAG]: <NoContentComponent titleKey="oais.packages.modify.no.tag" Icon={NoContentIcon} />,
  }

  state = {
    toggledSection: AIPModifyDialogComponent.SECTION_TYPES.STORAGE,
    [AIPModifyDialogComponent.SECTION_TYPES.STORAGE]: {
      list: [],
      toDelete: [],
    },
    [AIPModifyDialogComponent.SECTION_TYPES.TAG]: {
      list: [],
      toDelete: [],
      toAdd: [],
      textFieldValue: '',
    },
    [AIPModifyDialogComponent.SECTION_TYPES.CATEGORY]: {
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
      nextState[AIPModifyDialogComponent.SECTION_TYPES.STORAGE] = {
        list: [...newProps.selectionStorages],
        toDelete: [],
      }
    }
    if (!isEqual(oldProps.selectionTags, newProps.selectionTags)) {
      nextState[AIPModifyDialogComponent.SECTION_TYPES.TAG] = {
        list: [...newProps.selectionTags],
        toAdd: [],
        toDelete: [],
        textFieldValue: '',
      }
    }
    if (!isEqual(oldProps.selectionCategories, newProps.selectionCategories)) {
      nextState[AIPModifyDialogComponent.SECTION_TYPES.CATEGORY] = {
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
    if (toggledSection !== AIPModifyDialogComponent.SECTION_TYPES.STORAGE) {
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
      if (toggledSection === AIPModifyDialogComponent.SECTION_TYPES.STORAGE && size(this.state[toggledSection].list) < 2) {
        this.setState({
          deleteStorageError: true,
        })
      } else {
        this.setState({
          [toggledSection]: {
            ...this.state[toggledSection],
            list: filter(this.state[toggledSection].list, e => e !== entity),
            toDelete: [
              ...this.state[toggledSection].toDelete,
              entity,
            ],
          },
        })
      }
    }
  }

  onUndoDelete = (entity) => {
    const { toggledSection } = this.state
    if (toggledSection) {
      this.setState({
        [toggledSection]: {
          ...this.state[toggledSection],
          list: [
            ...this.state[toggledSection].list,
            entity,
          ],
          toDelete: filter(this.state[toggledSection].toDelete, e => e !== entity),
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
          toAdd: filter(this.state[toggledSection].toAdd, e => e !== entity),
        },
      })
    }
  }

  onAdd = () => {
    const { toggledSection } = this.state
    if (toggledSection !== AIPModifyDialogComponent.SECTION_TYPES.STORAGE
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
      storages: this.state[AIPModifyDialogComponent.SECTION_TYPES.STORAGE],
      tags: this.state[AIPModifyDialogComponent.SECTION_TYPES.TAG],
      categories: this.state[AIPModifyDialogComponent.SECTION_TYPES.CATEGORY],
    })
  }

  renderPane = (sectionType) => {
    const {
      moduleTheme: {
        aipModifyDialogSectionTable, aipModifyDialogSectionTableSeparator, aipModifyDialogAddButton,
      },
      muiTheme, intl: { formatMessage },
    } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const paneObject = this.state[sectionType]
    const { deleteStorageError } = this.state
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
      <React.Fragment>
        <div style={aipModifyDialogSectionTable}>
          <TableLayout>
            <TableHeaderLine>
              <TableHeaderContentBox>
                <TableHeaderText text={formatMessage({ id: 'oais.packages.modify.list' }, { pane: toLower(formatMessage({ id: `oais.packages.modify.${sectionType}` })) })} />
                {sectionType === AIPModifyDialogComponent.SECTION_TYPES.STORAGE && deleteStorageError ? <TableHeaderText text={formatMessage({ id: 'oais.packages.modify.delete.storages.error' })} /> : null }
              </TableHeaderContentBox>
            </TableHeaderLine>
            <InfiniteTableContainer
              displayColumnsHeader={false}
              columns={listColumns}
              entities={paneObject.list}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              emptyComponent={AIPModifyDialogComponent.EMPTY_COMPONENTS[sectionType]}
            />
          </TableLayout>
        </div>
        <div style={aipModifyDialogSectionTableSeparator} />
        <div style={aipModifyDialogSectionTable}>
          <TableLayout>
            <TableHeaderLine>
              <TableHeaderContentBox>
                <TableHeaderText text={formatMessage({ id: 'oais.packages.modify.delete' }, { pane: formatMessage({ id: `oais.packages.modify.${sectionType}` }) })} />
              </TableHeaderContentBox>
            </TableHeaderLine>
            <InfiniteTableContainer
              displayColumnsHeader={false}
              columns={deleteColumns}
              entities={paneObject.toDelete}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              emptyComponent={AIPModifyDialogComponent.EMPTY_COMPONENTS[sectionType]}
            />
          </TableLayout>
        </div>
        {sectionType !== AIPModifyDialogComponent.SECTION_TYPES.STORAGE ? ([<div key="lastSeparator" style={aipModifyDialogSectionTableSeparator} />,
          <div key="lastTable" style={aipModifyDialogSectionTable}>
            <TableLayout>
              <TableHeaderLine>
                <TableHeaderContentBox>
                  <TableHeaderText text={formatMessage({ id: 'oais.packages.modify.add' }, { pane: formatMessage({ id: `oais.packages.modify.${sectionType}` }) })} />
                </TableHeaderContentBox>
              </TableHeaderLine>
              <InfiniteTableContainer
                displayColumnsHeader={false}
                columns={addColumns}
                entities={paneObject.toAdd}
                minRowCount={minRowCount}
                maxRowCount={maxRowCount}
                emptyComponent={AIPModifyDialogComponent.EMPTY_COMPONENTS[sectionType]}
              />
            </TableLayout>
            <div style={aipModifyDialogAddButton}>
              <TextField
                name={`add-${sectionType}`}
                hintText={`Add ${sectionType}`}
                type="text"
                value={paneObject.textFieldValue}
                onChange={this.onTextFieldChange}
              />
              <FlatButton
                onClick={this.onAdd}
                secondary
                icon={<Add />}
              />
            </div>
          </div>]) : null}
      </React.Fragment>
    )
  }

  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.packages.modify.cancel' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="confirmModify"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.packages.modify.confirm' })}
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
    const { moduleTheme: { aipModifyDialog, aipModifyDialogList }, intl: { formatMessage } } = this.context
    const { toggledSection } = this.state

    return (
      <PositionedDialog
        dialogWidthPercent={90}
        dialogHeightPercent={90}
        title={formatMessage({ id: 'oais.packages.modify.title' })}
        actions={this.renderActions()}
        modal
        open
      >
        <div style={aipModifyDialog}>
          <List style={aipModifyDialogList}>
            <ListItem primaryText={formatMessage({ id: 'oais.packages.modify.storage' })} leftIcon={<StoragesIcon />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTION_TYPES.STORAGE)} />
            <ListItem primaryText={formatMessage({ id: 'oais.packages.modify.category' })} leftIcon={<CategoriesIcon />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTION_TYPES.CATEGORY)} />
            <ListItem primaryText={formatMessage({ id: 'oais.packages.modify.tag' })} leftIcon={<TagsIcon />} onClick={() => this.changeSection(AIPModifyDialogComponent.SECTION_TYPES.TAG)} />
          </List>
          { this.renderPane(toggledSection) }
        </div>
      </PositionedDialog>
    )
  }
}

export default withI18n(messages)(AIPModifyDialogComponent)
