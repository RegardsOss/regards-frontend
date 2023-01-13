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

import isEmpty from 'lodash/isEmpty'
import { StringValueRender } from '@regardsoss/components'
import { WorkerShapes } from '@regardsoss/shape'
import { WorkerDomain } from '@regardsoss/domain'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import AlertError from 'mdi-material-ui/AlertCircle'

/**
 * Table cell render for status
 * @author Théo Lasserre
 */
class StatusRender extends React.Component {
  static propTypes = {
    entity: WorkerShapes.Request.isRequired,
    onViewRequestErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity: { content: { status, error } }, onViewRequestErrors } = this.props
    const { moduleTheme: { renderStyle: { statusStyle } }, intl: { formatMessage } } = this.context
    return <div style={statusStyle}>
      <StringValueRender value={formatMessage({ id: `datapreparation.filters.statuses.${status}` })} />
      {
        (status === WorkerDomain.REQUEST_STATUS_ENUM.ERROR || status === WorkerDomain.REQUEST_STATUS_ENUM.INVALID_CONTENT) && !isEmpty(error)
          ? <IconButton onClick={() => onViewRequestErrors(this.props.entity)}>
            <AlertError />
          </IconButton>
          : null
      }
    </div>
  }
}
export default StatusRender
