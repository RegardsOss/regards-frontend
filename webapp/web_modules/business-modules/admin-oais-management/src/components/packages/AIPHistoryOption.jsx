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
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import ActionHistory from 'mdi-material-ui/History'
/**
* Detail option cell for the infinite table used to display the contents of an aip
 * @author Simon MILHAU
*/
class AIPHistoryOption extends React.Component {
  static propTypes = {
    entity: IngestShapes.AIPEntity,
    onViewAIPHistory: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { entity, onViewAIPHistory } = this.props
    onViewAIPHistory(entity)
  }

  render() {
    const { intl: { formatMessage } } = this.context

    return (
      <div>
        <IconButton
          onClick={this.onClick}
          title={formatMessage({ id: 'oais.packages.tooltip.history' })}
        >
          <ActionHistory />
        </IconButton>
      </div>
    )
  }
}
export default AIPHistoryOption
