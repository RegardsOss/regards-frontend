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
import get from 'lodash/get'
import DeleteFiles from 'mdi-material-ui/FileExcel'
import IconButton from 'material-ui/IconButton'
import Edit from 'mdi-material-ui/Pencil'
import Copy from 'mdi-material-ui/FileReplace'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ArrowDown from 'mdi-material-ui/ArrowDown'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  ActionsMenuCell, TableDeleteOption,
} from '@regardsoss/components'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { StorageShapes } from '@regardsoss/shape'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const actionsBreakpoints = [1300, 1350, 1400, 1450, 1500, 1550]

class StorageLocationListActions extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation.isRequired,
    onEdit: PropTypes.func.isRequired,
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

  render() {
    const {
      entity, onEdit, onCopyFiles, onUp, onDown, onDeleteFiles, onDelete, onRefresh,
    } = this.props
    const { entity: { content: { configuration } } } = this.props
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

    return (
      <ActionsMenuCell breakpoints={actionsBreakpoints}>
        <HateoasIconAction
          key="edit"
          entityLinks={entity.links}
          hateoasKey={HateoasKeys.UPDATE}
          onClick={() => onEdit(configuration)}
          disableInsteadOfHide
          title={intl.formatMessage({ id: 'storage.location.list.edit.button' })}
        >
          <Edit hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="copy"
          entityLinks={entity.links}
          hateoasKey="copy"
          disableInsteadOfHide
          disabled={storageRunning || deletionRunning || copyRunning}
          onClick={() => onCopyFiles(entity)}
          title={intl.formatMessage({ id: 'storage.location.list.copy.button' })}
        >
          <Copy hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="up"
          entityLinks={entity.links}
          hateoasKey="up"
          disableInsteadOfHide
          onClick={() => onUp(entity.content)}
          title={intl.formatMessage({ id: 'storage.location.list.up.priority.button' })}
        >
          <ArrowUp hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="down"
          entityLinks={entity.links}
          hateoasKey="down"
          disableInsteadOfHide
          onClick={() => onDown(entity.content)}
          title={intl.formatMessage({ id: 'storage.location.list.down.priority.button' })}
        >
          <ArrowDown hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <HateoasIconAction
          key="deleteFiles"
          entityLinks={entity.links}
          hateoasKey="deleteFiles"
          disableInsteadOfHide
          disabled={storageRunning || deletionRunning || copyRunning}
          onClick={() => onDeleteFiles(entity)}
          title={intl.formatMessage({ id: 'storage.location.list.delete-files.button' })}
        >
          <DeleteFiles hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>
        <TableDeleteOption
          entity={entity}
          onDelete={() => onDelete(entity)}
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
