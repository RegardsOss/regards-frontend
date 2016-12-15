/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { map } from 'lodash'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import { Card, CardText } from 'material-ui/Card'
import AppBar from 'material-ui/AppBar'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnectionList } from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * Step-by-step React component helping the user to configure all microservices' database connections for its project.
 *
 * @autor Xavier-Alexandre Brochard
 */
class GuidedProjectConfiguration extends React.Component {

  static propTypes = {
    projectConnections: ProjectConnectionList,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    stepIndex: 0,
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

  getStepButton = (projectConnection, key) => {
    const stepButtonProps = {
      onTouchTap: () => this.setState({ stepIndex: parseInt(key, 10) }),
    }
    if (this.getConnectivityIcon(projectConnection.content.connectivity)) {
      stepButtonProps.icon = this.getConnectivityIcon(projectConnection.content.connectivity)
    }

    return (
      <StepButton {...stepButtonProps} >
        <FormattedMessage
          id="database.form.edit.title"
          values={{ microservice: projectConnection.content.microservice }}
        />
      </StepButton>
    )
  }

  handleNext = () => {
    const { stepIndex } = this.state
    this.setState({ stepIndex: stepIndex + 1 })
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  render() {
    const { stepIndex } = this.state
    const { projectConnections } = this.props

    return (
      <Card>
        <AppBar
          title={'Configure a project'}
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <CardText>
          <Stepper
            activeStep={stepIndex}
            orientation="vertical"
          >
            {map(projectConnections, (projectConnection, key) => (
              <Step>
                {this.getStepButton(projectConnection, key)}
                <StepContent>
                  <ProjectConnectionFormComponent
                    projectConnection={projectConnection}
                    onSubmit={this.handleNext}
                    onCancel={this.handlePrev}
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardText>
      </Card>
    )
  }
}

export default GuidedProjectConfiguration
