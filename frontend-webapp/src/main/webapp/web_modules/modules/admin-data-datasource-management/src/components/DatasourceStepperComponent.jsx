
/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
/**
 * React component to list datasources.
 */
export class DatasourceStepperComponent extends React.Component {

  static propTypes = {
    stepIndex: React.PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { stepIndex } = this.props
    return (
      <div className="row">
        <div className="col-sm-50 col-sm-offset-25">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel><FormattedMessage id="Saisie de la connexion" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="datasource.stepper.attributes" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="La suite..." /></StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }
}

export default DatasourceStepperComponent

