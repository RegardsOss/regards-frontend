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
import RunIcon from 'mdi-material-ui/PlayCircleOutline'
import IconButton from 'material-ui/IconButton'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Run button action cell for the infinite table used to run a processing chain
* @author Sébastien Binda
*/
class AcquisitionProcessingChainTableRunAction extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
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
    return !!find(links, (l) => l.rel === 'start')
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { chain } = this.props.entity.content
    return (
      <IconButton
        className={`selenium-run-${chain.id}`}
        title={formatMessage({ id: 'acquisition-chain.list.run.tooltip' })}
        iconStyle={AcquisitionProcessingChainTableRunAction.iconStyle}
        style={AcquisitionProcessingChainTableRunAction.buttonStyle}
        onClick={() => this.props.onRunChain(chain.label, chain.id)}
        disabled={!this.isRunnable()}
      >
        <RunIcon />
      </IconButton>
    )
  }
}
export default AcquisitionProcessingChainTableRunAction
