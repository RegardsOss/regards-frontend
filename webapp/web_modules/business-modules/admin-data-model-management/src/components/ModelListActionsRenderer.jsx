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
import find from 'lodash/find'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Settings from 'material-ui/svg-icons/action/settings-input-composite'
import Download from 'material-ui/svg-icons/file/file-download'
import { withHateoasDisplayControl, withResourceDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ActionsMenuCell } from '@regardsoss/components'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { modelAttributesActions } from '../clients/ModelAttributesClient'
import { modelActions } from '../clients/ModelClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ResourceIconAction = withResourceDisplayControl(IconButton)
const actionsBreakpoints = [940, 995, 1065, 1320, 1380]

/**
 * Display actions available on models from table list
 * @author Sébastien Binda
 */
class ModelListActionsRenderer extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    entity: DataManagementShapes.Model,
    handleEdit: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    handleBindAttributes: PropTypes.func.isRequired,
    openDeleteDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  getExportUrlFromHateoas = (modelLinks) => {
    const { accessToken } = this.props
    const exportLink = find(modelLinks, link => (
      link.rel === 'export'
    ))
    return `${exportLink.href}?token=${accessToken}` || ''
  }

  render = () => {
    const {
      entity, openDeleteDialog, handleEdit, handleDuplicate, handleBindAttributes,
    } = this.props
    const { intl } = this.context

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    return (
      <ActionsMenuCell
        breakpoints={actionsBreakpoints}
      >
        <HateoasIconAction
          disableInsteadOfHide
          entityLinks={entity.links}
          hateoasKey="export"
          href={this.getExportUrlFromHateoas(entity.links)}
          title={intl.formatMessage({ id: 'model.list.action.export' })}
        >
          <Download hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>

        <ResourceIconAction
          hideDisabled={false}
          resourceDependencies={modelAttributesActions.getDependency(RequestVerbEnum.POST)}
          onClick={() => handleBindAttributes(entity.content.name)}
          title={intl.formatMessage({ id: 'model.list.action.bind' })}
        >
          <Settings hoverColor={style.hoverButtonBindAttribute} />
        </ResourceIconAction>

        <HateoasIconAction
          disableInsteadOfHide
          entityLinks={entity.links}
          hateoasKey={HateoasKeys.UPDATE}
          onClick={() => handleEdit(entity.content.name)}
          title={intl.formatMessage({ id: 'model.list.action.edit' })}
          className="selenium-editButton"
        >
          <Edit hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>

        <ResourceIconAction
          hideDisabled={false}
          resourceDependencies={modelActions.getDependency(RequestVerbEnum.POST)}
          onClick={() => handleDuplicate(entity.content.name)}
          title={intl.formatMessage({ id: 'model.list.action.duplicate' })}
        >
          <ContentCopy hoverColor={style.hoverButtonDuplicate} />
        </ResourceIconAction>

        <HateoasIconAction
          disableInsteadOfHide
          entityLinks={entity.links}
          hateoasKey={HateoasKeys.DELETE}
          onClick={() => openDeleteDialog(entity)}
          title={intl.formatMessage({ id: 'model.list.action.delete' })}
          className="selenium-deleteButton"
        >
          <Delete hoverColor={style.hoverButtonDelete} />
        </HateoasIconAction>
      </ActionsMenuCell>
    )
  }
}
export default ModelListActionsRenderer
