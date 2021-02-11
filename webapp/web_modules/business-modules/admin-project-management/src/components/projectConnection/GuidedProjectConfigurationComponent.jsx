/*
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
 */
import find from 'lodash/find'
import map from 'lodash/map'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import {
  Step, Stepper, StepButton, StepContent,
} from 'material-ui/Stepper'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Check from 'mdi-material-ui/Check'
import Error from 'mdi-material-ui/AlertCircle'
import Warning from 'mdi-material-ui/Alert'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import { AdminShapes } from '@regardsoss/shape'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * Step-by-step React component helping the user to configure all microservices' database connections for its project.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
class GuidedProjectConfigurationComponent extends React.Component {
  static propTypes = {
    project: AdminShapes.Project.isRequired,
    projectConnections: AdminShapes.ProjectConnectionList.isRequired,
    configureOneForAll: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    onUpdate: PropTypes.func,
    onCreate: PropTypes.func,
    onChangeConfigurationMode: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static MSERVICES_ARRAY = values(STATIC_CONF.MSERVICES)

  state = {
    stepIndex: 0,
  }

  /**
   * Add the successCallBack to the step create method to pass to the next step
   * @param projectConnection
   */
  onStepCreate = (projectConnection) => {
    this.props.onCreate(projectConnection, this.handleNext)
  }

  /**
   * Add the successCallBack to the step update method to pass to the next step
   * @param projectConnection
   */
  onStepUpdate = (id, projectConnection) => {
    this.props.onUpdate(id, projectConnection, this.handleNext)
  }

  getConnectivityIcon = (connectivity) => {
    switch (connectivity) {
      case EnumConnectivity.SUCCESS:
        return <Check color={this.context.muiTheme.palette.primary1Color} />
      case EnumConnectivity.WARNING:
        return <Warning color={this.context.muiTheme.palette.warningColor} />
      case EnumConnectivity.ERROR:
        return <Error color={this.context.muiTheme.palette.accent1Color} />
      default:
        return undefined
    }
  }

  getStepButton = (microservice, projectConnection, key) => {
    const stepButtonProps = {
      onClick: () => this.setState({ stepIndex: parseInt(key, 10) }),
    }
    if (projectConnection && this.getConnectivityIcon(projectConnection.content.connectivity)) {
      stepButtonProps.icon = this.getConnectivityIcon(projectConnection.content.connectivity)
    }

    const titleLabelValues = {
      microservice,
      project: this.props.project.content.name,
    }

    return (
      <StepButton {...stepButtonProps}>
        <FormattedMessage
          id="database.form.edit.title"
          values={titleLabelValues}
        />
      </StepButton>
    )
  }

  handleBackClick = () => {
    browserHistory.push(`/admin/projects/${this.props.project.content.name}/connections`)
  }

  handleNext = () => {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
    }, () => {
      if (this.isFinished()) {
        this.handleBackClick()
      }
    })
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      })
    }
  }

  isFinished = () => this.state.stepIndex >= keys(STATIC_CONF.MSERVICES).length

  renderConfigurationOnForAllConnections = () => {
    const firstMicroservice = GuidedProjectConfigurationComponent.MSERVICES_ARRAY[0]
    const firstProjectConnection = find(this.props.projectConnections, (lProjectConnection) => lProjectConnection.content.microservice === firstMicroservice)
    return (
      <ProjectConnectionFormComponent
        project={this.props.project}
        microservice={firstMicroservice}
        projectConnection={firstProjectConnection}
        configureOneForAll={this.props.configureOneForAll}
        errorMessage={this.props.errorMessage}
        onCreate={this.props.onCreate}
        onUpdate={this.props.onUpdate}
        onCancel={this.handleBackClick}
        onChangeConfigurationMode={this.props.onChangeConfigurationMode}
      />
    )
  }

  renderStepper = () => {
    const { stepIndex } = this.state
    const { projectConnections } = this.props

    return (
      <Stepper
        activeStep={stepIndex}
        orientation="vertical"
      >
        {map(GuidedProjectConfigurationComponent.MSERVICES_ARRAY, (microservice, key) => {
          // Search if a connection is already defined for the current project
          const projectConnection = find(projectConnections, (lProjectConnection) => lProjectConnection.content.microservice === microservice)
          return (
            <Step key={key}>
              {this.getStepButton(microservice, projectConnection, key)}
              <StepContent>
                <ProjectConnectionFormComponent
                  project={this.props.project}
                  microservice={microservice}
                  projectConnection={projectConnection}
                  configureOneForAll={this.props.configureOneForAll}
                  errorMessage={this.props.errorMessage}
                  onCreate={this.onStepCreate}
                  onUpdate={this.onStepUpdate}
                  onNext={this.handleNext}
                  onCancel={key > 0 ? this.handlePrev : null}
                  onChangeConfigurationMode={this.props.onChangeConfigurationMode}
                  isStep
                />
              </StepContent>
            </Step>
          )
        })}
      </Stepper>
    )
  }

  render() {
    return (
      <Card className="selenium-guidedProjectConfiguration">
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'database.project.configuration.title' }, { project: this.props.project.content.name })}
        />
        <CardText>
          {this.props.configureOneForAll ? this.renderConfigurationOnForAllConnections() : this.renderStepper()}
        </CardText>
      </Card>
    )
  }
}

export default GuidedProjectConfigurationComponent
