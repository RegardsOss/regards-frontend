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
import isEmpty from 'lodash/isEmpty'
import IconButton from 'material-ui/IconButton'
import AlertError from 'mdi-material-ui/AlertCircle'
import { StringValueRender } from '@regardsoss/components'
import { LTAShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Table cell render for status
 * @author Théo Lasserre
 */
export class StatusRender extends React.Component {
  static propTypes = {
    entity: LTAShapes.Request.isRequired,
    onViewMessage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity: { content: { status, message } }, onViewMessage } = this.props
    const { intl: { formatMessage }, moduleTheme: { renderStyle: { statusStyle } } } = this.context
    return <div style={statusStyle}>
      <StringValueRender value={formatMessage({ id: `lta.table.column.status.${status}` })} />
      {
        !isEmpty(message)
          ? <IconButton onClick={() => onViewMessage(this.props.entity)}>
            <AlertError />
          </IconButton>
          : null
      }
    </div>
  }
}
export default StatusRender
