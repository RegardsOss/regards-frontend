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
import AlertError from 'mdi-material-ui/AlertCircle'
import { IngestShapes } from '@regardsoss/shape'

/**
 * Renders aip request status
 * @author Simon MILHAU
 */
class RequestStatusRenderCell extends React.Component {
  static propTypes = {
    entity: IngestShapes.RequestEntity.isRequired,
    onViewRequestErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Root div styles */
  static ROOT_STYLES = { display: 'flex', justifyContent: 'center', alignItems: 'center' }

  /**
   * Callback : shows errors using parent callback
   */
  onViewRequestErrors = () => {
    const { entity, onViewRequestErrors } = this.props
    onViewRequestErrors(entity)
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <div style={RequestStatusRenderCell.ROOT_STYLES}>
        <StringValueRender value={formatMessage({ id: `oais.requests.status.${entity.content.state}` })} />
        {isEmpty(entity.content.errors) ? null : <IconButton onClick={this.onViewRequestErrors}><AlertError /></IconButton>}
      </div>
    )
  }
}
export default RequestStatusRenderCell
