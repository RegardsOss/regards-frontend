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
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain } from '@regardsoss/domain'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import FeatureManagerStep from './steps/FeatureManagerStep'
import IngestStep from './steps/IngestStep'
import { ICON_TYPE_ENUM } from '../domain/iconType'

const {
  displayNumber,
} = CommonDomain.DisplayBigNumbers

const REFERENCING_TYPE = {
  FEATURE: 'feature',
  OAIS: 'oais',
}

/**
 * ReferencingComponent
 * @author Théo Lasserre
 */
class ReferencingComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    selectedSession: AdminShapes.Session,
    relaunchAIP: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      sessionStep, project, selectedSession, retryFEMRequests, relaunchAIP,
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
    const runnings = get(sessionStep, `state.${ICON_TYPE_ENUM.RUNNING}`, 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.referencing.title' })}
              subtitle={formatMessage({ id: 'dashboard.selectedsession.referencing.subtitle' }, { nbIn: displayNumber(inputRelated, 3), nbOut: displayNumber(outputRelated, 3) })}
              titleStyle={cardTitleTextStyle}
              subtitleStyle={cardSubTitleTextStyle}
              style={cardTitleStyle}
            />
            { runnings !== 0
              ? <DisplayIconsComponent
                  entity={sessionStep}
                  displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
              />
              : null}
          </div>
          <CardText>
            {sessionStep.stepId === REFERENCING_TYPE.FEATURE
              ? <FeatureManagerStep
                  project={project}
                  sessionStep={sessionStep}
                  selectedSession={selectedSession}
                  retryRequests={retryFEMRequests}
              />
              : <IngestStep
                  project={project}
                  sessionStep={sessionStep}
                  selectedSession={selectedSession}
                  relaunchAIP={relaunchAIP}
              />}
          </CardText>
        </Card> : null
    )
  }
}
export default ReferencingComponent