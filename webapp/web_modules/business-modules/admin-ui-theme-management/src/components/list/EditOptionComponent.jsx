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
import EditIcon from 'mdi-material-ui/Pencil'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Edit option for list
 * @author Raphaël Mechali
 */
class EditOptionComponent extends React.Component {
  static propTypes = {
    theme: AccessShapes.Theme.isRequired,
    onEdit: PropTypes.func.isRequired, // callback like: theme ID => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: edit theme
   */
  onEdit = () => {
    const { theme, onEdit } = this.props
    onEdit(theme.content.id)
  }

  render() {
    const { theme } = this.props
    const { intl: { formatMessage }, moduleTheme: { themeList } } = this.context
    return (
      <HateoasIconAction
        entityLinks={theme.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={this.onEdit}
        title={formatMessage({ id: 'theme.list.tooltip.edit' })}
      >
        <EditIcon hoverColor={themeList.hoverColor.edit} />
      </HateoasIconAction>
    )
  }
}
export default EditOptionComponent
