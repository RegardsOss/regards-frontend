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
import size from 'lodash/size'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import Running from 'mdi-material-ui/PlayCircleOutline'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ScrollArea } from '@regardsoss/adapters'
import { CommonDomain } from '@regardsoss/domain'
import DisplayPropertiesComponent from './DisplayPropertiesComponent'
import FEMActionsComponent from './actions/FEMActionsComponent'
import IngestActionsComponent from './actions/IngestActionsComponent'
import { REFERENCING_TYPE } from '../domain/referencingTypes'
import { STEP_SUB_TYPES_ENUM } from '../domain/stepSubTypes'
import {
  INGEST_REQUESTS_PROPERTIES, INGEST_PRODUCTS_PROPERTIES,
} from '../domain/ingestProperties'
import { FEM_REQUESTS_PROPERTIES, FEM_PRODUCTS_PROPERTIES } from '../domain/femProperties'
import { getNbInputs, getNbOutputs, isRunning } from '../domain/stepDisplayFunctions'

const {
  displayNumber,
} = CommonDomain.DisplayBigNumbers

/**
 * @author Théo Lasserre
 */
class ReferencingComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionSteps: PropTypes.arrayOf(AdminShapes.SessionStep),
    relaunchAIP: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getProperties = (stepId, femProperties, ingestProperties) => stepId === REFERENCING_TYPE.FEATURE ? femProperties : ingestProperties

  getStepSubType = (stepId) => stepId === REFERENCING_TYPE.FEATURE ? STEP_SUB_TYPES_ENUM.FEATURE_MANAGER : STEP_SUB_TYPES_ENUM.INGEST

  buildStep = (sessionStep) => {
    const {
      project, relaunchAIP, retryFEMRequests,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: { cardContentStyle },
      },
    } = this.context
    return (
      <div style={cardContentStyle}>
        <ScrollArea
          vertical
          horizontal={false}
        >
          <div>
            <DisplayPropertiesComponent
              title={formatMessage({ id: `dashboard.selectedsession.${sessionStep.type}.${this.getStepSubType(sessionStep.stepId)}.properties.input.title` })}
              properties={this.getProperties(sessionStep.stepId, FEM_REQUESTS_PROPERTIES, INGEST_REQUESTS_PROPERTIES)}
              sessionStep={sessionStep}
              stepSubType={this.getStepSubType(sessionStep.stepId)}
            />
            <DisplayPropertiesComponent
              title={formatMessage({ id: `dashboard.selectedsession.${sessionStep.type}.${this.getStepSubType(sessionStep.stepId)}.properties.output.title` })}
              properties={this.getProperties(sessionStep.stepId, FEM_PRODUCTS_PROPERTIES, INGEST_PRODUCTS_PROPERTIES)}
              sessionStep={sessionStep}
              stepSubType={this.getStepSubType(sessionStep.stepId)}
            />
          </div>
        </ScrollArea>
        {
          sessionStep.stepId === REFERENCING_TYPE.FEATURE
            ? <FEMActionsComponent
                project={project}
                sessionStep={sessionStep}
                retryFEMRequests={retryFEMRequests}
            />
            : <IngestActionsComponent
                project={project}
                sessionStep={sessionStep}
                relaunchAIP={relaunchAIP}
            />
        }
      </div>
    )
  }

  buildStepTabs = () => {
    const {
      sessionSteps,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: { tabStyle },
      },
    } = this.context
    return (
      <Tabs>
        {map(sessionSteps, (sessionStep) => (
          <Tab
            key={sessionStep}
            label={formatMessage({ id: `dashboard.selectedsession.${sessionStep.type}.${sessionStep.stepId}.title` })}
            style={tabStyle}
          >
            {this.buildStep(sessionStep)}
          </Tab>
        ))}
      </Tabs>
    )
  }

  render() {
    const {
      sessionSteps,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          cardStyle, stepTitleTextStyle, cardTitleStyle,
          runningIconStyle, cardTitleDivStyle, cardSubTitleTextStyle,
        },
      },
    } = this.context
    return (
      !isEmpty(sessionSteps)
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.title' })}
              titleStyle={stepTitleTextStyle}
              style={cardTitleStyle}
              subtitle={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.subtitle' }, { nbIn: displayNumber(getNbInputs(sessionSteps), 3), nbOut: displayNumber(getNbOutputs(sessionSteps), 3) })}
              subtitleStyle={cardSubTitleTextStyle}
            />
            {isRunning(sessionSteps)
              ? <div>
                <Running style={runningIconStyle} />
              </div>
              : null}
          </div>
          <CardText>
            {
              size(sessionSteps) <= 1
                ? this.buildStep(sessionSteps[0])
                : this.buildStepTabs()
            }
          </CardText>
        </Card> : null
    )
  }
}
export default ReferencingComponent
