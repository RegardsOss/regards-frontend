/*
 * LICENSE_PLACEHOLDER
 */
import find from 'lodash/find'
import map from 'lodash/map'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnection, Project } from '@regardsoss/model'
import ProjectConnectionFormComponent from './ProjectConnectionFormComponent'

/**
 * Step-by-step React component helping the user to configure all microservices' database connections for its project.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
class GuidedProjectConfigurationComponent extends React.Component {

  static propTypes = {
    project: Project.isRequired,
    projectConnections: PropTypes.objectOf(ProjectConnection).isRequired,
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
      onTouchTap: () => this.setState({ stepIndex: parseInt(key, 10) }),
    }
    if (projectConnection && this.getConnectivityIcon(projectConnection.content.connectivity)) {
      stepButtonProps.icon = this.getConnectivityIcon(projectConnection.content.connectivity)
    }

    return (
      <StepButton {...stepButtonProps} >
        <FormattedMessage
          id="database.form.edit.title"
          values={{
            microservice,
            project: this.props.project.content.name,
          }}
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
    const firstMicroservice = values(STATIC_CONF.MSERVICES)[0]
    const firstProjectConnection = find(this.props.projectConnections, lProjectConnection => lProjectConnection.content.microservice === firstMicroservice)
    return (
      <ProjectConnectionFormComponent
        project={this.props.project}
        microservice={firstMicroservice}
        projectConnection={firstProjectConnection}
        configureOneForAll={this.props.configureOneForAll}
        errorMessage={this.props.errorMessage}
        onCreate={this.props.onCreate}
        onUpdate={this.props.onUpdate}
        onNext={this.handleNext}
        onCancel={this.handleBackClick}
        onChangeConfigurationMode={this.props.onChangeConfigurationMode}
        isStep
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
        {map(STATIC_CONF.MSERVICES, (microservice, key) => {
          // Search if a connection is already defined for the current project
          const projectConnection = find(projectConnections, lProjectConnection => lProjectConnection.content.microservice === microservice)
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
          title={<FormattedMessage
            id="database.project.configuration.title"
            values={{
              project: this.props.project.content.name,
            }}
          />}
        />
        <CardText>
          {this.props.configureOneForAll ? this.renderConfigurationOnForAllConnections() : this.renderStepper()}
        </CardText>
      </Card>
    )
  }
}

export default GuidedProjectConfigurationComponent
