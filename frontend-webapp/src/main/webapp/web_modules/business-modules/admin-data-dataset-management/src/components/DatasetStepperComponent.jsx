
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
 * React component to list datasets.
 */
export class DatasetStepperComponent extends React.Component {

  static propTypes = {
    stepIndex: React.PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { stepIndex } = this.props
    return (
      <div className="row">
        <div className="col-lg-80 col-lg-offset-10 col-xs-100">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel><FormattedMessage id="dataset.stepper.attributes" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="dataset.stepper.subsetting" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="dataset.stepper.links" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="dataset.stepper.plugins" /></StepLabel>
            </Step>
            <Step>
              <StepLabel><FormattedMessage id="dataset.stepper.uiServices" /></StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }
}

export default DatasetStepperComponent

