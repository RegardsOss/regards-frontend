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
import find from 'lodash/find'
import StopIcon from 'mdi-material-ui/Stop'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Stop button action cell for the infinite table used to stop a running processing chain
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableStopAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
    onStopChain: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  isStoppable = () => {
    const { links } = this.props.entity
    return !!find(links, (l) => l.rel === 'stop')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { chain } = this.props.entity.content
    return (
      <IconButton
        className={`selenium-stop-${chain.id}`}
        title={formatMessage({ id: 'acquisition-chain.list.stop.tooltip' })}
        iconStyle={AcquisitionProcessingChainTableStopAction.iconStyle}
        style={AcquisitionProcessingChainTableStopAction.buttonStyle}
        onClick={() => this.props.onStopChain(chain.label, chain.id)}
        disabled={!this.isStoppable()}
      >
        <StopIcon />
      </IconButton>
    )
  }
}
export default AcquisitionProcessingChainTableStopAction
