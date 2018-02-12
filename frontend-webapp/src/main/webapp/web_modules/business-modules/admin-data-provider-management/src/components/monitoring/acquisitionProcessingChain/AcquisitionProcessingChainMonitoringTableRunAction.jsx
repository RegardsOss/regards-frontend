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
import find from 'lodash/find'
import RunIcon from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Edit button action cell for the infinite table used to display ingest processing chains
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringTableRunAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
    onRunChain: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }
  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isRunnable = () => {
    const { links } = this.props.entity
    return !!find(links, l => l.rel === 'start')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { chain } = this.props.entity.content
    return (
      <IconButton
        className={`selenium-run-${chain.id}`}
        title={formatMessage({ id: 'acquisition-chain.monitor.list.run.tooltip' })}
        iconStyle={AcquisitionProcessingChainMonitoringTableRunAction.iconStyle}
        style={AcquisitionProcessingChainMonitoringTableRunAction.buttonStyle}
        onClick={() => this.props.onRunChain(chain.label, chain.id)}
        disabled={!this.isRunnable()}
      >
        <RunIcon />
      </IconButton>
    )
  }
}
export default AcquisitionProcessingChainMonitoringTableRunAction
