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
 * React component to show the progress of datasource edition/creation.
 */
export class DatasourceStepperComponent extends React.Component {

  static propTypes = {
    stepIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { stepIndex } = this.props
    return (
      <div className="row">
        <div className="col-sm-50 col-sm-offset-15">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel><FormattedMessage id="datasource.stepper.connection" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="datasource.stepper.attributes" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="datasource.stepper.mapping" /></StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }
}

export default DatasourceStepperComponent

