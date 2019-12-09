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
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { StringValueRender } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import AlertError from 'material-ui/svg-icons/alert/error'
import { StorageShapes } from '@regardsoss/shape'

/**
 * Renders aip request status
 * @author Simon MILHAU
 */
class RequestStatusRenderCell extends React.Component {
  static propTypes = {
    entity: StorageShapes.RequestEntity.isRequired,
    onViewRequestErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { entity, onViewRequestErrors } = this.props
    console.error('entity', entity)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StringValueRender value={entity.content.state} />
        {!isEmpty(entity.content.errors) && <IconButton onClick={() => onViewRequestErrors(entity)}><AlertError /></IconButton>}
      </div>
    )
  }
}
export default RequestStatusRenderCell
