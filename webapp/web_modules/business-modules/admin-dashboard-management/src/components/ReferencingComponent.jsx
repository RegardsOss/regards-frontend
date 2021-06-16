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
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import FeatureManagerStep from './steps/FeatureManagerStep'
import IngestStep from './steps/IngestStep'

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
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      sessionStep, project, selectedSession, retryRequests, relaunchAIP,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardStyle, cardTitleDivStyle, cardTitleStyle, cardTitleTextStyle,
        },
      },
    } = this.context
    const inputRelated = get(sessionStep, 'inputRelated', 0)
    const outputRelated = get(sessionStep, 'outputRelated', 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.referencing.title' }, { nbIn: inputRelated, nbOut: outputRelated })}
              style={cardTitleStyle}
              titleStyle={cardTitleTextStyle}
            />
            <DisplayIconsComponent
              entity={sessionStep}
              displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
            />
          </div>
          <CardText>
            {sessionStep.stepId === REFERENCING_TYPE.FEATURE
              ? <FeatureManagerStep
                  project={project}
                  sessionStep={sessionStep}
                  selectedSession={selectedSession}
                  retryRequests={retryRequests}
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
