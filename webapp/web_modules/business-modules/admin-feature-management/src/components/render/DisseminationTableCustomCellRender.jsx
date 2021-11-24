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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import map from 'lodash/map'
import { StringValueRender } from '@regardsoss/components'
import { FemShapes } from '@regardsoss/shape'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import AlertError from 'mdi-material-ui/AlertCircle'

/**
  * Table cell render for dissemination
  * @author Théo Lasserre
  */
class DisseminationTableCustomCellRender extends React.Component {
  static propTypes = {
    entity: FemShapes.Reference.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { tableStyle: { disseminationCellStyle } } } = this.context
    const disseminationsInfo = get(entity, 'content.disseminationsInfo', '')
    const isDisseminationPending = get(entity, 'content.disseminationPending', false)
    let stringToRender = ''
    if (!isEmpty(disseminationsInfo)) {
      stringToRender = join(map(disseminationsInfo, (diffusionObject) => diffusionObject.label), ', ')
    }
    return <div style={disseminationCellStyle}>
      <StringValueRender value={stringToRender} />
      {
        isDisseminationPending
          ? <IconButton title={formatMessage({ id: 'feature.requests.tooltip.button.dissemination' })}>
            <AlertError />
          </IconButton>
          : null
      }
    </div>
  }
}
export default DisseminationTableCustomCellRender
