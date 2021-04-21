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

import isEmpty from 'lodash/isEmpty'
import { StringValueRender } from '@regardsoss/components'
import { FemShapes } from '@regardsoss/shape'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import AlertError from 'mdi-material-ui/AlertCircle'

/**
  * Table cell render for status
  * @author Théo Lasserre
  */
class StatusRender extends React.Component {
  static propTypes = {
    entity: FemShapes.Request.isRequired,
    onViewRequestErrors: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { entity: { content: { state, errors } }, onViewRequestErrors } = this.props
    const { moduleTheme: { tableStyle: { renderStyle: { statusStyle } } } } = this.context
    return <div style={statusStyle}>
      <StringValueRender value={state} />
      {
        isEmpty(errors)
          ? null
          : <IconButton onClick={() => onViewRequestErrors(this.props.entity)}>
            <AlertError />
          </IconButton>
      }
    </div>
  }
}
export default StatusRender
