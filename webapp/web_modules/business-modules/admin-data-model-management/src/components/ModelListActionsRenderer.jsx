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
import find from 'lodash/find'
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import Settings from 'mdi-material-ui/VideoInputComponent'
import Download from 'mdi-material-ui/Download'
import { HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ActionsMenuCell, HateoasIconAction, ResourceIconAction } from '@regardsoss/components'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { modelAttributesActions } from '../clients/ModelAttributesClient'
import { modelActions } from '../clients/ModelClient'

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
    const exportLink = find(modelLinks, (link) => (
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
