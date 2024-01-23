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
import keys from 'lodash/keys'
import map from 'lodash/map'
import isPlainObject from 'lodash/isPlainObject'
import size from 'lodash/size'
import isEmpty from 'lodash/isEmpty'
import Running from 'mdi-material-ui/PlayCircleOutline'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { ScrollArea } from '@regardsoss/adapters'
import { CommonDomain } from '@regardsoss/domain'
import DisplayPropertiesComponent from './DisplayPropertiesComponent'
import DPActionsComponent from './actions/DPActionsComponent'
import WorkerActionsComponent from './actions/WorkerActionsComponent'
import { ACQUISITION_TYPE } from '../domain/acquisitionTypes'
import { WORKERS_REQUESTS_PROPERTIES, WORKERS_PRODUCTS_PROPERTIES } from '../domain/workersProperties'
import { DATA_PROVIDER_PRODUCTS_PROPERTIES, DATA_PROVIDER_FILES_PROPERTIES } from '../domain/dataProviderProperties'
import { STEP_SUB_TYPES_ENUM } from '../domain/stepSubTypes'
import { getNbInputs, getNbOutputs, isRunning } from '../domain/stepDisplayFunctions'
import { computeSessionStep } from '../domain/computeFunctions'

const {
  displayNumber,
} = CommonDomain.DisplayBigNumbers

/**
 * @author Théo Lasserre
 */
class AcquisitionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionSteps: PropTypes.arrayOf(AdminShapes.SessionStep),
    relaunchProducts: PropTypes.func.isRequired,
    retryWorkerRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getStepSubType(stepId) {
    return stepId === ACQUISITION_TYPE.WORKERS ? STEP_SUB_TYPES_ENUM.WORKERS : STEP_SUB_TYPES_ENUM.DATA_PROVIDER
  }

  buildStep = (sessionStep) => {
    const {
      project, retryWorkerRequests, relaunchProducts,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: { cardContentStyle },
      },
    } = this.context
    let currentSessionStep = sessionStep
    if (sessionStep.stepId === ACQUISITION_TYPE.WORKERS) {
      currentSessionStep = computeSessionStep(sessionStep, STEP_SUB_TYPES_ENUM.WORKERS, WORKERS_REQUESTS_PROPERTIES)
    }
    return (
      <div style={cardContentStyle}>
        <ScrollArea
          vertical
          horizontal={false}
        >
          <div>
            {
            currentSessionStep.stepId === ACQUISITION_TYPE.WORKERS
              ? <div>
                <DisplayPropertiesComponent
                  title={formatMessage({ id: `dashboard.selectedsession.${currentSessionStep.type}.${AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}.properties.input.title` })}
                  properties={WORKERS_REQUESTS_PROPERTIES}
                  sessionStep={currentSessionStep}
                  stepSubType={AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}
                />
                {
                  map(keys(currentSessionStep.properties), (propertyKey) => {
                    if (isPlainObject(currentSessionStep.properties[propertyKey])) {
                      return (
                        <DisplayPropertiesComponent
                          key={propertyKey}
                          title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.properties.workers.title' }, { value: propertyKey })}
                          properties={WORKERS_PRODUCTS_PROPERTIES}
                          propertyKey={propertyKey}
                          sessionStep={currentSessionStep}
                          stepSubType={AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}
                        />
                      )
                    }
                    return null
                  })
                }
              </div>
              : <div>
                <DisplayPropertiesComponent
                  title={formatMessage({ id: `dashboard.selectedsession.${currentSessionStep.type}.${AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}.properties.input.title` })}
                  properties={DATA_PROVIDER_FILES_PROPERTIES}
                  sessionStep={currentSessionStep}
                  stepSubType={AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}
                />
                <DisplayPropertiesComponent
                  title={formatMessage({ id: `dashboard.selectedsession.${currentSessionStep.type}.${AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}.properties.output.title` })}
                  properties={DATA_PROVIDER_PRODUCTS_PROPERTIES}
                  sessionStep={currentSessionStep}
                  stepSubType={AcquisitionComponent.getStepSubType(currentSessionStep.stepId)}
                />
              </div>
          }
          </div>
        </ScrollArea>
        {
          currentSessionStep.stepId === ACQUISITION_TYPE.WORKERS
            ? <WorkerActionsComponent
                project={project}
                sessionStep={currentSessionStep}
                retryWorkerRequests={retryWorkerRequests}
            />
            : <DPActionsComponent
                project={project}
                sessionStep={currentSessionStep}
                relaunchProducts={relaunchProducts}
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
          cardStyle, stepTitleTextStyle, cardTitleStyle, cardTitleDivStyle,
          runningIconStyle, cardSubTitleTextStyle,
        },
      },
    } = this.context
    return (
      !isEmpty(sessionSteps)
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.title' })}
              titleStyle={stepTitleTextStyle}
              style={cardTitleStyle}
              subtitle={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.subtitle' }, { nbIn: displayNumber(getNbInputs(sessionSteps), 3), nbOut: displayNumber(getNbOutputs(sessionSteps), 3) })}
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
export default AcquisitionComponent
