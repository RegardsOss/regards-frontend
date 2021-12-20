/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import Running from 'mdi-material-ui/PlayCircleOutline'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { AdminShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { i18nContextType } from '@regardsoss/i18n'
import DisplayPropertiesComponent from './DisplayPropertiesComponent'
import DiffusionActionsComponent from './actions/DiffusionActionsComponent'
import ExternalDiffusionActionsComponent from './actions/ExternalDiffusionActionsComponent'
import DisplayExternalDiffusionComponent from './DisplayExternalDiffusionComponent'
import { CATALOG_PRODUCTS_PROPERTIES } from '../domain/catalogProperties'
import { DISSEMINATION_TYPE } from '../domain/disseminationTypes'
import { STEP_SUB_TYPES_ENUM } from '../domain/stepSubTypes'
import { getNbInputs, getNbOutputs, isRunning } from '../domain/stepDisplayFunctions'
import { computeSessionStep } from '../domain/computeFunctions'

const {
  displayNumber,
} = CommonDomain.DisplayBigNumbers

/**
 * @author Théo Lasserre
 */
class DiffusionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionSteps: PropTypes.arrayOf(AdminShapes.SessionStep),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getStyle = (stepId, externalStyle, catalogStyle) => stepId === DISSEMINATION_TYPE.EXTERNAL_DIFFUSION ? externalStyle : catalogStyle

  buildStep = (sessionStep) => {
    const { project } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          cardContentStyle,
          extDiffusionCardContentStyle,
        },
      },
    } = this.context
    let currentSessionStep = sessionStep
    if (sessionStep.stepId === DISSEMINATION_TYPE.EXTERNAL_DIFFUSION) {
      currentSessionStep = computeSessionStep(sessionStep, STEP_SUB_TYPES_ENUM.DISSEMINATION)
    }
    return (
      <div style={this.getStyle(currentSessionStep.stepId, extDiffusionCardContentStyle, cardContentStyle)}>
        <ScrollArea
          vertical
          horizontal={false}
        >
          <div>
            {
              currentSessionStep.stepId === DISSEMINATION_TYPE.EXTERNAL_DIFFUSION
                ? <DisplayExternalDiffusionComponent
                    title={formatMessage({ id: `dashboard.selectedsession.${currentSessionStep.type}.${STEP_SUB_TYPES_ENUM.EXTERNAL_DIFFUSION}.properties.input.title` })}
                    sessionStep={currentSessionStep}
                />
                : <DisplayPropertiesComponent
                    title={formatMessage({ id: `dashboard.selectedsession.${currentSessionStep.type}.${STEP_SUB_TYPES_ENUM.DISSEMINATION}.properties.output.title` })}
                    properties={CATALOG_PRODUCTS_PROPERTIES}
                    sessionStep={currentSessionStep}
                    stepSubType={STEP_SUB_TYPES_ENUM.DISSEMINATION}
                />
            }
          </div>
        </ScrollArea>
        <div>
          {
            currentSessionStep.stepId === DISSEMINATION_TYPE.EXTERNAL_DIFFUSION
              ? <ExternalDiffusionActionsComponent
                  project={project}
              />
              : <DiffusionActionsComponent
                  project={project}
              />
          }
        </div>
      </div>
    )
  }

  buildStepTabs = () => {
    const { sessionSteps } = this.props
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
    const { sessionSteps } = this.props
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
              title={formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.title' })}
              titleStyle={stepTitleTextStyle}
              style={cardTitleStyle}
              subtitle={formatMessage({ id: 'dashboard.selectedsession.DISSEMINATION.subtitle' }, { nbIn: displayNumber(getNbInputs(sessionSteps), 3), nbOut: displayNumber(getNbOutputs(sessionSteps), 3) })}
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
export default DiffusionComponent
