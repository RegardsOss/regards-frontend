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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
  * @author Théo Lasserre
  */
class ExternalDiffusionActionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onClick = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor?disseminationPending=PENDING`)
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          raisedListStyle, cardButtonStyle, raisedListLabelStyle,
        },
      },
    } = this.context
    const nbWaiting = get(sessionStep, `state.${ICON_TYPE_ENUM.WAITING}`, 0)
    return (
      <div style={cardButtonStyle}>
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onClick}
                label={formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.fem_dissemination.button.see-detail' })}
                primary
                style={raisedListStyle}
                labelStyle={raisedListLabelStyle}
            />
            : null
        }
      </div>
    )
  }
}
export default ExternalDiffusionActionsComponent
