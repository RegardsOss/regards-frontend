/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import ErrorIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import MessageIcon from 'material-ui/svg-icons/social/sentiment-satisfied'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
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
    MESSAGE: 'MESSAGE',
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
   * Builds a message step, that can be used for both error and no data messages
   * @param message message
   * @param error is in error?
   * @param customOptions options for that step
   * @return usable step for this component
   */
  static buildMessageStep = (message, error, customOptions = []) => ({
    step: RunServiceDialogComponent.Steps.MESSAGE,
    message,
    error,
    customOptions,
  })

  /**
   * Builds parameter configuration step
   * @param parameters parameters list
   * @param parametersValues map <string, *> of user entered values (used to keep entered values on previous step request)
   * @param onSubmit callback, user submitted parameters values
   * @return usable step for this component
   */
  static buildParametersConfigurationStep = (parameters, parametersValues = {}, onSubmit) => ({
    step: RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION,
    parameters,
    parametersValues,
    onSubmit,
  })

  /**
   * Builds results step
   * @param resultsComponent results component to show
   * @param customOptions options for that step
   * @return usable step for this component
   */
  static buildResultsStep = (resultsComponent, customOptions = []) => ({
    step: RunServiceDialogComponent.Steps.RESULTS,
    resultsComponent,
    customOptions,
  })

  static propTypes = {
    serviceName: PropTypes.string.isRequired,
    currentStep: PropTypes.oneOfType([
      // loading step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.LOADING]),
        message: PropTypes.string.isRequired,
      }),
      // a message step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.MESSAGE]),
        message: PropTypes.string.isRequired,
        error: PropTypes.bool.isRequired,
        // custom step dialog options as react components
        customOptions: PropTypes.arrayOf(PropTypes.element).isRequired,
      }),
      // parameters configuration step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION]),
        parameters: PropTypes.arrayOf(PropTypes.instanceOf(Parameter)).isRequired,
        parametersValues: PropTypes.objectOf(PropTypes.any).isRequired, // previously entered values if any (used for 'previous step')
        onSubmit: PropTypes.func.isRequired,
      }),
      // results step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.RESULTS]),
        resultsComponent: PropTypes.node.isRequired,
        onPrevious: PropTypes.func,
        // custom step dialog options as react components
        customOptions: PropTypes.arrayOf(PropTypes.element).isRequired,
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
    const {
      onClose, currentStep, invalid, handleSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context
    // 1 - determinate if there is a second action in current state
    let otherActions
    switch (currentStep.step) {
      // submit option when configuring parameters
      case RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION:
        otherActions = [
          <FlatButton
            key="submit.button"
            disabled={invalid}
            label={formatMessage({ id: 'entities.common.services.submit.parameters' })}
            type="submit"
            onClick={handleSubmit(this.onSubmit)} // it is required here to handle manually the submit button (tested)
          />]
        break
      // previous options (should be used after parameters configuration)
      case RunServiceDialogComponent.Steps.MESSAGE:
      case RunServiceDialogComponent.Steps.RESULTS:
        otherActions = currentStep.customOptions
        break
      default:
        otherActions = []
    }
    // 2 - render actions list
    return [
      ...otherActions,
      <FlatButton
        key="close.button"
        primary
        icon={<CloseIcon />}
        label={formatMessage({ id: 'entities.common.services.close.service' })}
        title={formatMessage({ id: 'entities.common.services.close.service' })}
        onClick={onClose}
      />,
    ]
  }

  render() {
    const {
      serviceName, currentStep, handleSubmit, initialize, ...otherDialogProps
    } = this.props
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
          bodyStyle={stepType === RunServiceDialogComponent.Steps.RESULTS
            ? pluginServiceDialog.resultsBodyStyle
            : pluginServiceDialog.commonBodyStyles}
          modal
          open
          {...otherDialogProps}
        >
          <NoContentMessageInfo // content: message or provided component (messages are used to show error / no result)
            noContent={stepType === RunServiceDialogComponent.Steps.MESSAGE}
            title={formatMessage({ id: currentStep.error ? 'entities.common.services.error.title' : 'entities.common.services.notice.title' })}
            message={stepType === RunServiceDialogComponent.Steps.MESSAGE ? currentStep.message : ''}
            Icon={currentStep.error ? ErrorIcon : MessageIcon}
          >
            { // render interactive steps: configuration or results
              stepType === RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION
                ? <ParametersConfigurationComponent parameters={currentStep.parameters} parametersValues={currentStep.parametersValues} initialize={initialize} /> // configuration step
                : currentStep.resultsComponent || RunServiceDialogComponent.EMPTY_COMPONENT // results step or none
            }
          </NoContentMessageInfo>
        </LoadableContentDialogContainer>
      </form>
    )
  }
}
export default reduxForm({ form: 'service.plugin.parameters.form' })(RunServiceDialogComponent)
