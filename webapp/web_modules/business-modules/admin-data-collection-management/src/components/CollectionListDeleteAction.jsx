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
import { HateoasKeys } from '@regardsoss/display-control'
import Delete from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * CollectionList edit action
 * @author Maxime Bouveron
 */
class CollectionListDeleteAction extends React.Component {
  static propTypes = {
    openDeleteDialog: PropTypes.func,
    hoverColor: PropTypes.string,
    entity: DataManagementShapes.Collection,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { openDeleteDialog, hoverColor } = this.props
    const collection = this.props.entity
    return (
      <HateoasIconAction
        entityLinks={collection.links}
        hateoasKey={HateoasKeys.DELETE}
        onClick={() => openDeleteDialog(collection)}
        title={this.context.intl.formatMessage({ id: 'collection.list.action.delete' })}
      >
        <Delete hoverColor={hoverColor} />
      </HateoasIconAction>
    )
  }
}
export default CollectionListDeleteAction
