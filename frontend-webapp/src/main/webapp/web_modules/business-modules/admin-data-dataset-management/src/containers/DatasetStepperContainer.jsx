
/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
/**
 * React component to list datasets.
 */

const STEPS_ID = {
  ATTRIBUTES: 0,
  SUBSETTING: 1, // Can't redirect to that page since it doesn't have a URL
  LINKS: 2,
  PLUGINS: 3,
  UI_SERVICES: 4,
}
export class DatasetStepperContainer extends React.Component {
  static propTypes = {
    stepIndex: PropTypes.number.isRequired,
    isEditing: PropTypes.bool,
    currentDatasetIpId: PropTypes.string.isRequired,
    currentDatasetId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    projectName: PropTypes.string.isRequired,
  }
  static defaultProps = {
    isEditing: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getPluginsStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.plugins" />)
    if (!this.isDisabled(STEPS_ID.PLUGINS) && this.props.stepIndex !== STEPS_ID.PLUGINS) {
      return (<StepButton onClick={this.handlePluginsClick}>
        {text}
      </StepButton>)
    }
    return text
  }

  getAttributesStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.attributes" />)
    if (!this.isDisabled(STEPS_ID.ATTRIBUTES)
      && this.props.stepIndex !== STEPS_ID.ATTRIBUTES
      && this.props.stepIndex !== STEPS_ID.SUBSETTING) {
      return (<StepButton onClick={this.handleAttributesClick}>
        {text}
      </StepButton>)
    }
    return text
  }


  getLinksStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.links" />)
    if (!this.isDisabled(STEPS_ID.LINKS) && this.props.stepIndex !== STEPS_ID.LINKS) {
      return (<StepButton onClick={this.handleLinksClick}>
        {text}
      </StepButton>)
    }
    return text
  }

  getUIServicesStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.uiServices" />)
    if (!this.isDisabled(STEPS_ID.UI_SERVICES) && this.props.stepIndex !== STEPS_ID.UI_SERVICES) {
      return (<StepButton onClick={this.handleUIServicesClick}>
        {text}
      </StepButton>)
    }
    return text
  }

  handlePluginsClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/${this.props.currentDatasetIpId}/plugins`
    browserHistory.push(url)
  }

  handleAttributesClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/edit`
    browserHistory.push(url)
  }

  handleLinksClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/links`
    browserHistory.push(url)
  }

  handleUIServicesClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/${this.props.currentDatasetIpId}/ui-services`
    browserHistory.push(url)
  }

  isDisabled = (stepId) => {
    // Do not disable any StepLabel while editing dataset
    if (this.props.isEditing) {
      return false
    }
    // Otherwise provides the default behaviour
    return stepId > this.props.stepIndex
  }

  render() {
    const { stepIndex } = this.props
    return (
      <div className="row">
        <div className="col-lg-90 col-lg-offset-5 col-xs-100">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.ATTRIBUTES)}
              >
                {this.getAttributesStep()}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.SUBSETTING)}
              >
                <FormattedMessage id="dataset.stepper.subsetting" />
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.LINKS)}
              >
                {this.getLinksStep()}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.PLUGINS)}
              >
                {this.getPluginsStep()}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.UI_SERVICES)}
              >
                {this.getUIServicesStep()}
              </StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  projectName: AuthenticationParametersSelectors.getProject(state),
})


export default connect(mapStateToProps)(DatasetStepperContainer)
