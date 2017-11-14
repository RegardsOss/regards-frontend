
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
 * React component to access to different step of document.
 */

const STEPS_ID = {
  ATTRIBUTES: 0,
  FILES: 1,
  LINKS: 2,
}

export class DocumentStepperContainer extends React.Component {

  static propTypes = {
    stepIndex: PropTypes.number.isRequired,
    isEditing: PropTypes.bool,
    currentDocumentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    projectName: PropTypes.string.isRequired,
  }
  static defaultProps = {
    isEditing: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getFilesStep = () => {
    const text = (<FormattedMessage id="document.stepper.files" />)
    if (!this.isDisabled(STEPS_ID.FILES) && this.props.stepIndex !== STEPS_ID.PLUGINS) {
      return (<StepButton onClick={this.handleFilesClick}>
        {text}
      </StepButton>)
    }
    return text
  }

  getAttributesStep = () => {
    const text = (<FormattedMessage id="document.stepper.attributes" />)
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
    const text = (<FormattedMessage id="document.stepper.links" />)
    if (!this.isDisabled(STEPS_ID.LINKS) && this.props.stepIndex !== STEPS_ID.LINKS) {
      return (<StepButton onClick={this.handleLinksClick}>
        {text}
      </StepButton>)
    }
    return text
  }

  handleFilesClick = () => {
    const url = `/admin/${this.props.projectName}/data/acquisition/document/${this.props.currentDocumentId}/files`
    browserHistory.push(url)
  }

  handleAttributesClick = () => {
    const url = `/admin/${this.props.projectName}/data/acquisition/document/${this.props.currentDocumentId}/edit`
    browserHistory.push(url)
  }

  handleLinksClick = () => {
    const url = `/admin/${this.props.projectName}/data/acquisition/document/${this.props.currentDocumentId}/links`
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
        <div className="col-lg-80 col-lg-offset-10 col-xs-100">
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
                disabled={this.isDisabled(STEPS_ID.FILES)}
              >
                {this.getFilesStep()}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel
                disabled={this.isDisabled(STEPS_ID.LINKS)}
              >
                {this.getLinksStep()}
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


export default connect(mapStateToProps)(DocumentStepperContainer)
