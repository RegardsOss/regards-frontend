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
import FlatButton from 'material-ui/FlatButton'
import ErrorIcon from 'mdi-material-ui/EmoticonSadOutline'
import MessageIcon from 'mdi-material-ui/EmoticonHappyOutline'
import CloseIcon from 'mdi-material-ui/Close'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDialogContainer, NoContentMessageInfo } from '@regardsoss/components'
import { reduxForm } from '@regardsoss/form-utils'
import { Parameter } from '../../definitions/parameters/Parameter'
import ParametersConfigurationComponent from '../ParametersConfigurationComponent'
import ServiceDescriptionComponent from './ServiceDescriptionComponent'

/**
* Dialog containing all the service run steps (not related with shown content):
* It shows loading / error / parameters form and results according with current sep (abstracted step notion to be used
*  by both UI and catalog plugin services lifecycle)
*/
export class RunServiceDialogComponent extends React.Component {
  /** Possible steps in dialog */
  static Steps = {
    LOADING: 'LOADING',
    MESSAGE: 'MESSAGE',
    PARAMETERS_CONFIGURATION: 'PARAMETERS_CONFIGURATION',
    RESULTS: 'RESULTS',
  }

  static propTypes = {
    serviceName: PropTypes.string.isRequired,
    currentStep: PropTypes.oneOfType([
      // loading step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.LOADING]),
      }),
      // a message step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.MESSAGE]),
        messageKey: PropTypes.string.isRequired,
        error: PropTypes.bool.isRequired,
        // custom step dialog options as react components
        customOptions: PropTypes.arrayOf(PropTypes.element).isRequired,
      }),
      // description step
      PropTypes.shape({
        step: PropTypes.oneOf([RunServiceDialogComponent.Steps.DESCRIPTION]),
        description: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
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
        // plugin option to hide action bar for the RESULT step
        showButtonsBar: PropTypes.bool.isRequired,
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
   * Builds loading step
   * @return usable step for this component
   */
  static buildLoadingStep() {
    return { step: RunServiceDialogComponent.Steps.LOADING }
  }

  /**
   * Builds a message step, that can be used for both error and no data messages
   * @param messageKey message key
   * @param error is in error?
   * @param customOptions options for that step
   * @return usable step for this component
   */
  static buildMessageStep(messageKey, error, customOptions = []) {
    return {
      step: RunServiceDialogComponent.Steps.MESSAGE,
      messageKey,
      error,
      customOptions,
    }
  }

  /**
   * Builds parameter configuration step
   * @param parameters parameters list
   * @param parametersValues map <string, *> of user entered values (used to keep entered values on previous step request)
   * @param onSubmit callback, user submitted parameters values
   * @return usable step for this component
   */
  static buildDescriptionStep(description, onSubmit) {
    return {
      step: RunServiceDialogComponent.Steps.DESCRIPTION,
      description,
      onSubmit,
    }
  }

  /**
   * Builds parameter configuration step
   * @param parameters parameters list
   * @param parametersValues map <string, *> of user entered values (used to keep entered values on previous step request)
   * @param onSubmit callback, user submitted parameters values
   * @return usable step for this component
   */
  static buildParametersConfigurationStep(parameters, parametersValues = {}, onSubmit) {
    return {
      step: RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION,
      parameters,
      parametersValues,
      onSubmit,
    }
  }

  /**
   * Builds results step
   * @param resultsComponent results component to show
   * @param customOptions options for that step
   * @param showButtonsBar plugin definition option to hide action bar during RESULT state
   * @return usable step for this component
   */
  static buildResultsStep(resultsComponent, customOptions = [], showButtonsBar = true) {
    return {
      step: RunServiceDialogComponent.Steps.RESULTS,
      resultsComponent,
      customOptions,
      showButtonsBar,
    }
  }

  static renderStep(currentStep, initialize) {
    switch (currentStep.step) {
      case RunServiceDialogComponent.Steps.DESCRIPTION:
        return <ServiceDescriptionComponent description={currentStep.description} />
      case RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION:
        return <ParametersConfigurationComponent parameters={currentStep.parameters} parametersValues={currentStep.parametersValues} initialize={initialize} />
      default:
        return currentStep.resultsComponent || RunServiceDialogComponent.EMPTY_COMPONENT
    }
  }

  /**
   * On form submitted (can only be called when step is PARAMETERS_CONFIGURATION)
   */
  onSubmit = (values) => this.props.currentStep.onSubmit(values)

  /**
   * Renders dialog actions for step and service configuration
   */
  renderActions = () => {
    const {
      onClose, currentStep, invalid, handleSubmit,
    } = this.props
    const { intl: { formatMessage } } = this.context
    // Button bar, according with step
    return <>
      {/* 1. Step options */
        (() => {
          switch (currentStep.step) {
            // submit option when configuring parameters
            case RunServiceDialogComponent.Steps.PARAMETERS_CONFIGURATION:
            case RunServiceDialogComponent.Steps.DESCRIPTION:
              return <FlatButton
                key="submit.button"
                disabled={invalid}
                label={formatMessage({ id: 'entities.common.services.submit.parameters' })}
                type="submit"
                onClick={handleSubmit(this.onSubmit)}
              />
            // previous options (should be used after parameters configuration)
            case RunServiceDialogComponent.Steps.MESSAGE:
            case RunServiceDialogComponent.Steps.RESULTS:
              // inner fragment to handle multiple custom options
              return <>{currentStep.customOptions}</>
            default:
              return null
          }
        })()
      }
      { /** 2. Close button  */ }
      <FlatButton
        key="close.button"
        primary
        icon={<CloseIcon />}
        label={formatMessage({ id: 'entities.common.services.close.service' })}
        title={formatMessage({ id: 'entities.common.services.close.service' })}
        onClick={onClose}
      />
    </>
  }

  render() {
    const {
      serviceName, currentStep, handleSubmit, initialize, ...otherDialogProps
    } = this.props
    const { moduleTheme: { pluginServiceDialog } } = this.context
    const stepType = currentStep.step
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <LoadableContentDialogContainer
          title={serviceName}
          dialogHeightPercent={pluginServiceDialog.heightPercent}
          dialogWidthPercent={pluginServiceDialog.widthPercent}
          actions={this.renderActions()}
          loaded={stepType !== RunServiceDialogComponent.Steps.LOADING}
          bodyStyle={stepType === RunServiceDialogComponent.Steps.RESULTS
            ? pluginServiceDialog.resultsBodyStyle
            : pluginServiceDialog.commonBodyStyles}
          modal
          open
          {...otherDialogProps}
        >
          <NoContentMessageInfo // content: message or provided component (messages are used to show error / no result)
            noContent={stepType === RunServiceDialogComponent.Steps.MESSAGE}
            titleKey={currentStep.error ? 'entities.common.services.error.title' : 'entities.common.services.notice.title'}
            messageKey={stepType === RunServiceDialogComponent.Steps.MESSAGE ? currentStep.messageKey : null}
            Icon={currentStep.error ? ErrorIcon : MessageIcon}
          >
            {RunServiceDialogComponent.renderStep(currentStep, initialize)}
          </NoContentMessageInfo>
        </LoadableContentDialogContainer>
      </form>
    )
  }
}
export default reduxForm({ form: 'service.plugin.parameters.form' })(RunServiceDialogComponent)
