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
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import { HateoasKeys } from '@regardsoss/display-control'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Display actions available on attribute models from table list
 * @author Sébastien Binda
 */
class AttributeModelListActionsRenderer extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.AttributeModel,
    handleEdit: PropTypes.func.isRequired,
    openDeleteDialog: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render = () => {
    const { entity, openDeleteDialog, handleEdit } = this.props
    const { intl } = this.context

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    return (
      <div>
        <HateoasIconAction
          disableInsteadOfHide
          entityLinks={entity.links}
          onClick={() => handleEdit(entity.content.id)}
          hateoasKey={HateoasKeys.UPDATE}
          title={intl.formatMessage({ id: 'attrmodel.list.action.edit' })}
        >
          <Edit hoverColor={style.hoverButtonEdit} />
        </HateoasIconAction>

        <HateoasIconAction
          disableInsteadOfHide
          entityLinks={entity.links}
          onClick={() => openDeleteDialog(entity.content)}
          hateoasKey={HateoasKeys.DELETE}
          title={intl.formatMessage({ id: 'attrmodel.list.action.delete' })}
        >
          <Delete hoverColor={style.hoverButtonDelete} />
        </HateoasIconAction>
      </div>
    )
  }
}
export default AttributeModelListActionsRenderer
