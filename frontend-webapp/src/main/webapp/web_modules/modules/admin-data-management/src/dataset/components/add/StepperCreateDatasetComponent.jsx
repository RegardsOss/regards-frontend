import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { FormattedMessage } from 'react-intl'

/**
 */
function StepperCreateDatasetComponent (props) {
    const {getStepperIndex } = props
    return (
      <Stepper activeStep={this.()}>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.1.stepper" /></StepLabel>
        </Step>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.2.stepper" /></StepLabel>
        </Step>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.3.stepper" /></StepLabel>
        </Step>
      </Stepper>
    )
  }
StepperCreateDatasetComponent.propTypes = {
  getStepperIndex: React.PropTypes.func.isRequired
}
export default StepperCreateDatasetComponent
/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
