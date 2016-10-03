import * as React from "react"
import { Step, Stepper, StepLabel } from "material-ui/Stepper"
import { FormattedMessage } from "react-intl"

interface StepperCreateDatasetProps {
  getStepperIndex: () => number
}
/**
 */
export default class StepperCreateDatasetComponent extends React.Component<StepperCreateDatasetProps, any> {

  getStepperIndex = () => {
    return this.props.getStepperIndex()
  }

  render (): JSX.Element {
    return (
      <Stepper activeStep={this.getStepperIndex()}>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.1.stepper"/></StepLabel>
        </Step>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.2.stepper"/></StepLabel>
        </Step>
        <Step>
          <StepLabel><FormattedMessage id="datamanagement.dataset.add.3.stepper"/></StepLabel>
        </Step>
      </Stepper>
    )
  }
}

/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
