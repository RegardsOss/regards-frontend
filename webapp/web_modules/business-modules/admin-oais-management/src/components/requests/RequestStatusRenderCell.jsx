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
import isEmpty from 'lodash/isEmpty'
import IconButton from 'material-ui/IconButton'
import AlertError from 'mdi-material-ui/AlertCircle'
import SelectVersionOptionIcon from 'mdi-material-ui/CogSync'
import { IngestDomain } from '@regardsoss/domain'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Renders aip request status
 * @author Simon MILHAU
 */
class RequestStatusRenderCell extends React.Component {
  static propTypes = {
    entity: IngestShapes.RequestEntity.isRequired,
    modeSelectionAllowed: PropTypes.bool.isRequired, // version mode selection allowed to current user?
    onViewRequestErrors: PropTypes.func.isRequired,
    // callback like (selectionMode, [entity]) => ()
    onSelectVersionOption: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Callback : shows errors using parent callback
   */
  onViewRequestErrors = () => {
    const { entity, onViewRequestErrors } = this.props
    onViewRequestErrors(entity)
  }

  /**
   * User callback: select version option for a product
   */
  onSelectVersionOption = () => {
    const { entity, onSelectVersionOption } = this.props
    onSelectVersionOption([entity])
  }

  render() {
    const { entity: { content: { state, errors, errorType } }, modeSelectionAllowed } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { requests: { status: { common, waitingAction, action } } },
    } = this.context
    // waiting style and callback: when in waiting version mode and dependency allows user setting it
    const isWaitingAction = state === IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE && modeSelectionAllowed
    return (
      <div
        title={formatMessage({ id: `oais.list.filters.requestState.${state}` })}
        onClick={isWaitingAction ? this.onSelectVersionOption : null}
        style={isWaitingAction ? waitingAction : common}
      >
        { /* 1. label */
          formatMessage({ id: `oais.list.filters.requestState.${state}` })
        }
        {
            state === IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR && errorType
              ? ` - ${formatMessage({ id: `oais.list.filters.errorType.${errorType}` })}`
              : null
          }
        { /* 2. show error action if any */
         isEmpty(errors)
           ? null
           : <IconButton style={action} onClick={this.onViewRequestErrors}><AlertError /></IconButton>
          }
        { /* 3. show select choci if waiting version mode */
          isWaitingAction
            ? <IconButton style={action} onClick={this.onSelectVersionOption}><SelectVersionOptionIcon /></IconButton>
            : null

        }
      </div>
    )
  }
}
export default RequestStatusRenderCell
