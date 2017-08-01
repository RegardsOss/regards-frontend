/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import ErrorIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDialogContainer, NoContentMessageInfo } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import { Parameter } from '../../definitions/parameters/Parameter'
import ParametersConfigurationComponent from './parameters/ParametersConfigurationComponent'

/**
* Dialog containing all the service run steps (not related with shown content):
* It shows loading / error / parameters form and results according with current sep (abstracted step notion to be used
*  by both UI and catalog plugin services lifecycle)
*/
export class RunServiceDialogComponent extends React.Component {

  static Steps = {
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    PARAMETERS_CONFIGURATION: 'PARAMETERS_CONFIGURATION',
    RESULTS: 'RESULTS',
  }

  /**
   * Builds loading step
   * @param message loading message
   * @return usable step for this component
   */
  static buildLoadingStep = message => ({ step: RunServiceDialogComponent.Steps.LOADING, message })
  /**
   * Builds error step
   * @param message error message
   * @param onPrevious optional callback, user clicked on previous option (option is hidden when undefined/null)
   * @return usable step for this component
   */
  static buildErrorStep = (message, onPrevious) => ({ step: RunServiceDialogComponent.Steps.ERROR, message, onPrevious })
  /**
   * Builds parameter configuration step
   * @param parameters parameters list
   * @param onSubmit callback, user submitted parameters values
   * @return usable step for this component
   */
  static buildParametesConfigurationStep = (parameters, onSubmit) => ({ step: RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION, parameters, onSubmit })
  /**
   * Builds results step
   * @param resultsComponent results component to show
   * @param onPrevious optional callback, user clicked on previous option (option is hidden when undefined/null)
   * @return usable step for this component
   */
  static buildResultsStep = (resultsComponent, onPrevious) => ({ step: RunServiceDialogComponent.Steps.RESULTS, resultsComponent })

  static propTypes = {
    serviceName: PropTypes.string.isRequired,
    currentStep: PropTypes.oneOfType([
      // loading step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.LOADING]),
        message: PropTypes.string.isRequired,
      }),
      // error step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.ERROR]),
        message: PropTypes.string.isRequired,
        onPrevious: PropTypes.func,
      }),
      // parameters configuration step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION]),
        parameters: PropTypes.arrayOf(PropTypes.instanceOf(Parameter)).isRequired,
        onSubmit: PropTypes.func.isRequired,
      }),
      // results step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.RESULTS]),
        resultsComponent: PropTypes.node.isRequired,
        onPrevious: PropTypes.func,
      }),
    ]).isRequired,
    onClose: PropTypes.func.isRequired,
    // from reduxForm
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    // other LoadableContentDialogContainer properties accepted here
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Single empty react component reference */
  static EMPTY_COMPONENT = <div />

  /**
   * On form submitted (can only be called when step is PARAMETERS_CONFIGURATION)
   */
  onSubmit = values => this.props.currentStep.onSubmit(values)

  renderActions = () => {
    const { onClose, currentStep, invalid, handleSubmit } = this.props
    const { intl: { formatMessage } } = this.context
    // 1 - determinate if there is a second action in current state
    let otherAction
    switch (currentStep.step) {
      // submit option when configuring parameters
      case RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION:
        otherAction = (
          <FlatButton
            primary
            disabled={invalid}
            label={formatMessage({ id: 'entities.common.services.submit.parameters' })}
            type="submit"
            onTouchTap={handleSubmit(this.onSubmit)} // it is required here to handle manually the submit button (tested)
            key="submit.button"
          />)
        break
      // previous options (should be used after parameters configuration)
      case RunServiceDialogComponent.Steps.ERROR:
      case RunServiceDialogComponent.Steps.RESULTS:
        otherAction = (
          <FlatButton
            secondary
            label={formatMessage({ id: 'entities.common.services.change.parameters' })}
            key="back.button"
            onTouchTap={currentStep.onPrevious}
          />)
        break
      default:
        otherAction = null
    }
    // 2 - render actions list
    return [
      otherAction,
      <FlatButton
        secondary
        key="close.button"
        label={formatMessage({ id: 'entities.common.services.close.service' })}
        onTouchTap={onClose}
      />,
    ]
  }

  render() {
    const { serviceName, currentStep, handleSubmit, initialize, ...otherDialogProps } = this.props
    const { moduleTheme: { pluginServiceDialog }, intl: { formatMessage } } = this.context
    const stepType = currentStep.step
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <LoadableContentDialogContainer
          title={serviceName}
          dialogHeightPercent={pluginServiceDialog.heightPercent}
          dialogWidthPercent={pluginServiceDialog.widthPercent}
          actions={this.renderActions()}
          loaded={stepType !== RunServiceDialogComponent.Steps.LOADING}
          loadingMessage={stepType === RunServiceDialogComponent.Steps.LOADING ? currentStep.message : ''}
          modal
          open
          {...otherDialogProps}
        >
          <NoContentMessageInfo // content: error or current component
            noContent={stepType === RunServiceDialogComponent.Steps.ERROR} // TODO handle NO FILE
            title={formatMessage({ id: 'entities.common.services.error.title' })}
            message={stepType === RunServiceDialogComponent.Steps.ERROR ? currentStep.message : ''}
            Icon={ErrorIcon}
            rootStyles={pluginServiceDialog.contentStyles}
          >
            { // render interactive steps: configuration or results
              stepType === RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION ?
                <ParametersConfigurationComponent parameters={currentStep.parameters} initialize={initialize} /> : // configuration step
                currentStep.resultsComponent || RunServiceDialogComponent.EMPTY_COMPONENT // results step or none
            }
          </NoContentMessageInfo>
        </LoadableContentDialogContainer>
      </form>
    )
  }
}
export default reduxForm({ form: 'service.plugin.parameters.form' })(RunServiceDialogComponent)
