/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import get from 'lodash/get'
import DeleteFiles from 'mdi-material-ui/FileExcel'
import Edit from 'mdi-material-ui/Pencil'
import Copy from 'mdi-material-ui/FileReplace'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  ActionsMenuCell, HateoasIconAction, TableDeleteOption,
} from '@regardsoss/components'
import { HateoasKeys } from '@regardsoss/display-control'
import { StorageShapes } from '@regardsoss/shape'

const actionsBreakpoints = [1300, 1350, 1400, 1450, 1500, 1550]

class StorageLocationListActions extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation.isRequired,
    project: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCopyFiles: PropTypes.func.isRequired,
    onUp: PropTypes.func.isRequired,
    onDown: PropTypes.func.isRequired,
    onDeleteFiles: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getEditUrl = () => {
    const { project, entity: { content: { name } } } = this.props
    return `/admin/${project}/data/acquisition/storage/storages/${name}/edit`
  }

  handleDelete = () => {
    const { onDelete, entity } = this.props
    onDelete(entity)
  }

  handleCopyFiles = () => {
    const { onCopyFiles, entity } = this.props
    onCopyFiles(entity)
  }

  handleUp = () => {
    const { onUp, entity } = this.props
    onUp(entity.content)
  }

  handleDown = () => {
    const { onDown, entity } = this.props
    onDown(entity.content)
  }

  handleDeleteFiles = () => {
    const { onDeleteFiles, entity } = this.props
    onDeleteFiles(entity)
  }

  handleRefresh = () => {
    const { onRefresh, entity } = this.props
    onRefresh(entity)
  }

  render() {
    const {
      entity, onRefresh,
    } = this.props
    const { intl } = this.context
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonBindAttribute: this.context.muiTheme.palette.primary3Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const storageRunning = get(entity, 'content.storageRunning', false)
    const deletionRunning = get(entity, 'content.deletionRunning', false)
    const copyRunning = get(entity, 'content.copyRunning', false)
    const pendingActionRunning = get(entity, 'content.pendingActionRunning', false)
    const actionRunning = storageRunning || deletionRunning || copyRunning || pendingActionRunning

    return (
      <ActionsMenuCell breakpoints={actionsBreakpoints}>
        <HateoasIconAction
          key="edit"
          entityLinks={entity.links}
          hateoasKey={HateoasKeys.UPDATE}
          disableInsteadOfHide
          title={intl.formatMessage({ id: 'storage.location.list.edit.button' })}
        >
          <Link to={this.getEditUrl}>
            <Edit hoverColor={style.hoverButtonEdit} />
          </Link>
        </HateoasIconAction>
        <HateoasIconAction
          key="copy"
          entityLinks={entity.links}
          hateoasKey="copy"
          disableInsteadOfHide
          disabled={actionRunning}
          onClick={this.handleCopyFiles}
          title={intl.formatMessage({ id: 'storage.location.list.copy.button' })}
        >
          <Copy hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="up"
          entityLinks={entity.links}
          hateoasKey="up"
          disableInsteadOfHide
          onClick={this.handleUp}
          title={intl.formatMessage({ id: 'storage.location.list.up.priority.button' })}
        >
          <ArrowUp hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="down"
          entityLinks={entity.links}
          hateoasKey="down"
          disableInsteadOfHide
          onClick={this.handleDown}
          title={intl.formatMessage({ id: 'storage.location.list.down.priority.button' })}
        >
          <ArrowDown hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="deleteFiles"
          entityLinks={entity.links}
          hateoasKey="deleteFiles"
          disableInsteadOfHide
          disabled={actionRunning}
          onClick={this.handleDeleteFiles}
          title={intl.formatMessage({ id: 'storage.location.list.delete-files.button' })}
        >
          <DeleteFiles hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <TableDeleteOption
          entity={entity}
          onDelete={this.handleDelete}
          fetchPage={onRefresh}
          handleHateoas
          disableInsteadOfHide
          queryPageSize={20}
        />
      </ActionsMenuCell>
    )
  }
}

export default StorageLocationListActions
