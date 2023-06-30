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
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import EyeIcon from 'mdi-material-ui/Eye'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DataProviderShapes, CommonShapes } from '@regardsoss/shape'
import { RefreshIndicatorComponent, ContentDisplayDialog, ShowableAtRender } from '@regardsoss/components'

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
    timeZone: 'utc',
  }

  state = {
    isExecutionBlockersDialogOpen: false,
  }

  toggleExecutionBlockersDialog = () => {
    const { isExecutionBlockersDialogOpen } = this.state
    this.setState({
      isExecutionBlockersDialogOpen: !isExecutionBlockersDialogOpen,
    })
  }

  renderExecutionBlockersDialog = () => {
    const {
      entity: {
        content: {
          executionBlockers,
        },
      },
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { isExecutionBlockersDialogOpen } = this.state
    return (
      <ShowableAtRender
        show={isExecutionBlockersDialogOpen}
      >
        <ContentDisplayDialog
          displayedContent={
            map(executionBlockers, (executionBlocker) => (
              <ListItem
                key={executionBlocker}
                primaryText={executionBlocker}
                disabled
              />
            ))
          }
          title={formatMessage({ id: 'acquisition-chain.list.activity.dialog.title' })}
          onClose={this.toggleExecutionBlockersDialog}
        />
      </ShowableAtRender>

    )
  }

  render() {
    const {
      entity: {
        content: {
          chain, active, executionBlockers,
        },
      },
    } = this.props
    const { intl: { formatMessage, formatDate }, moduleTheme: { chains: { stateStyle } } } = this.context
    if (active) {
      return [
        <RefreshIndicatorComponent
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
      <div style={stateStyle}>
        {label}
        {
          !isEmpty(executionBlockers)
          && <IconButton
            title={formatMessage({ id: 'acquisition-chain.list.activity.button.title' })}
            onClick={this.toggleExecutionBlockersDialog}
          >
            <EyeIcon />
          </IconButton>
        }
        {this.renderExecutionBlockersDialog()}
      </div>
    )
  }
}
export default AcquisitionProcessingChainActivityRenderer
