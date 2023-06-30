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
import { i18nContextType } from '@regardsoss/i18n'
import ProgressRenderCell from './ProgressRenderCell'

/**
* Based on ProgressRenderCell, this cell renders progress with optional percent label
* @author Raphaël Mechali
*/
class PercentProgressRenderCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.any.isRequired,
    getProgressPercent: PropTypes.func.isRequired,
    showLabel: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {
    showLabel: true,
  }

  getLabel = () => {
    const { showLabel, getProgressPercent, entity } = this.props
    const { intl: { formatMessage } } = this.context
    if (showLabel) {
      const percent = getProgressPercent(entity) || 0
      return formatMessage({ id: 'table.progress.percent.cell.message' }, { percent })
    }
    // no label
    return null
  }

  render() {
    const { entity, getProgressPercent } = this.props
    return (
      <ProgressRenderCell entity={entity} getProgressPercent={getProgressPercent} getProgressLabel={this.getLabel} />
    )
  }
}

export default PercentProgressRenderCell
