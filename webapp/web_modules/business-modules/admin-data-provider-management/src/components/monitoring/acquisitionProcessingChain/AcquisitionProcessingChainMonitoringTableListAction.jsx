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
import RunIcon from 'material-ui/svg-icons/action/list'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* User Callback, onclick will show list 
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringTableListAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.array,
    }),
    onListChain: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { chain } = this.props.entity.content
    return (
      <IconButton
        className={`selenium-run-${chain.id}`}
        title={formatMessage({ id: 'acquisition-chain.monitor.list.list.tooltip' })}
        iconStyle={AcquisitionProcessingChainMonitoringTableListAction.iconStyle}
        style={AcquisitionProcessingChainMonitoringTableListAction.buttonStyle}
        onClick={() => this.props.onListChain(chain.ingestChain)}
      >
        <RunIcon />
      </IconButton>
    )
  }
}
export default AcquisitionProcessingChainMonitoringTableListAction
