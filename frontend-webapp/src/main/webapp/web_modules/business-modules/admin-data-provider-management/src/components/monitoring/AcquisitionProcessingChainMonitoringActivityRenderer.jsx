/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { i18nContextType } from '@regardsoss/i18n'
import { DataProviderShapes } from '@regardsoss/shape'

/**
* Component to render the activity indicator for ne chain into the chain monitoring list
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringActivityRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {}

  static style = {
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  };

  render() {
    const { entity: { content } } = this.props
    const { intl: { formatMessage } } = this.context
    if (content.running) {
      return (
        <RefreshIndicator
          size={25}
          left={0}
          top={0}
          status="loading"
          style={AcquisitionProcessingChainMonitoringActivityRenderer.style.refresh}
        />
      )
    }
    return (
      <div>
        {formatMessage({ id: 'acquisition-chain.monitor.list.activity.not.running' })}
      </div>
    )
  }
}
export default AcquisitionProcessingChainMonitoringActivityRenderer
