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
        return <Check color={this.context.muiTheme.palette.primary1Color}/>
      case EnumConnectivity.WARNING:
        return <Warning color={this.context.muiTheme.palette.warningColor}/>
      case EnumConnectivity.ERROR:
        return <Error color={this.context.muiTheme.palette.accent1Color}/>
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

  renderStepActions(step) {
    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          type="submit"
          label="Next"
          disableTouchRipple
          disableFocusRipple
          primary
          onTouchTap={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple
            disableFocusRipple
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    )
  }

  render() {
    const { stepIndex } = this.state
    const { projectConnections } = this.props

    return (
      <div
        style={{
          maxWidth: 380,
          maxHeight: 400,
          margin: 'auto',
        }}
      >
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
              Select campaign settings
            </StepButton>
            <StepContent>
              <p>
                For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
              Create an ad group
            </StepButton>
            <StepContent>
              <p>An ad group contains one or more ads which target a shared set of keywords.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
              Create an ad
            </StepButton>
            <StepContent>
              <p>
                Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    )
  }
}

export default GuidedProjectConfiguration
