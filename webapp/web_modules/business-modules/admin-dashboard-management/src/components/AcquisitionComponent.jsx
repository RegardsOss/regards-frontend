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
import get from 'lodash/get'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain } from '@regardsoss/domain'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import FeatureProviderStep from './steps/FeatureProviderStep'
import DataProviderStep from './steps/DataProviderStep'
import { ICON_TYPE_ENUM } from '../domain/iconType'

const {
  displayNumber,
} = CommonDomain.DisplayBigNumbers

const ACQUISITION_TYPE = {
  EXTRACT: 'extract',
  SCAN: 'scan',
}

/**
 * AcquisitionComponent
 * @author Théo Lasserre
 */
class AcquisitionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    sessionStep: AdminShapes.SessionStep,
    relaunchProducts: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      sessionStep, project, selectedSession, retryRequests, relaunchProducts,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardStyle, cardTitleDivStyle, cardTitleTextStyle, cardTitleStyle, cardSubTitleTextStyle,
        },
      },
    } = this.context
    const inputRelated = get(sessionStep, 'inputRelated', 0)
    const outputRelated = get(sessionStep, 'outputRelated', 0)
    const running = get(sessionStep, `state.${ICON_TYPE_ENUM.RUNNING}`, 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.acquisition.title' })}
              subtitle={formatMessage({ id: 'dashboard.selectedsession.acquisition.subtitle' }, { nbIn: displayNumber(inputRelated, 3), nbOut: displayNumber(outputRelated, 3) })}
              titleStyle={cardTitleTextStyle}
              subtitleStyle={cardSubTitleTextStyle}
              style={cardTitleStyle}
            />
            { running !== 0
              ? <DisplayIconsComponent
                  entity={sessionStep}
                  displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
              />
              : null}
          </div>
          <CardText>
            {sessionStep.stepId === ACQUISITION_TYPE.EXTRACT
              ? <FeatureProviderStep
                  project={project}
                  sessionStep={sessionStep}
                  selectedSession={selectedSession}
                  retryRequests={retryRequests}
              />
              : <DataProviderStep
                  project={project}
                  sessionStep={sessionStep}
                  selectedSession={selectedSession}
                  relaunchProducts={relaunchProducts}
              />}
          </CardText>
        </Card> : null
    )
  }
}
export default AcquisitionComponent