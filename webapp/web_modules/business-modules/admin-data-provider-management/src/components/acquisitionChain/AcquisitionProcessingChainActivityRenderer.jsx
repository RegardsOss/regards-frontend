/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'

/**
* Component to render the activity indicator for ne chain into the chain  list
* @author Sébastien Binda
*/
class AcquisitionProcessingChainActivityRenderer extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      content: DataProviderShapes.AcquisitionProcessingChainMonitorContent,
      links: PropTypes.arrayOf(CommonShapes.HateOASLink),
    }),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  static style = {
    refresh: {
      display: 'inline-block',
      position: 'relative',
      marginRight: '15px',
    },
  }

  static DATETIME_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  render() {
    const {
      entity: {
        content: {
          chain, active,
        },
      },
    } = this.props
    const { intl: { formatMessage, formatDate } } = this.context
    if (active) {
      return [
        <RefreshIndicator
          key="refresh"
          size={25}
          left={0}
          top={0}
          status="loading"
          style={AcquisitionProcessingChainActivityRenderer.style.refresh}
        />,
      ]
    }

    let label = formatMessage({ id: 'acquisition-chain.list.activity.not.running' })
    if (chain.deletionPending) {
      label = formatMessage({ id: 'acquisition-chain.list.activity.deletion.pending' })
    } else if (chain.lastActivationDate) {
      label = formatMessage({ id: 'acquisition-chain.list.activity.not.running.date' },
        { date: formatDate(chain.lastActivationDate, AcquisitionProcessingChainActivityRenderer.DATETIME_OPTIONS) })
    }
    return (
      <div>
        {label}
      </div>
    )
  }
}
export default AcquisitionProcessingChainActivityRenderer
