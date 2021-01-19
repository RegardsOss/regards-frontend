/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ScrollArea } from '@regardsoss/adapters'
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
/**
 * React component to list datasets.
 */

const STEPS_ID = {
  ATTRIBUTES: 0,
  SUBSETTING: 1, // Can't redirect to that page since it doesn't have a URL
  FILES: 2,
  LINKS: 3,
  PLUGINS_UI_PROCESSING: 4,
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

  static SCROLL_AREA_CONTENT_STYLE = {
    display: 'inline-block',
  }

  static STEPPER_WRAPPER_STYLE = {
    width: '980px',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getPluginsUIProcessing = () => {
    const text = (<FormattedMessage id="dataset.stepper.pluginsUIProcessing" />)
    if (!this.isDisabled(STEPS_ID.PLUGINS_UI_PROCESSING) && this.props.stepIndex !== STEPS_ID.PLUGINS_UI_PROCESSING) {
      return (
        <StepButton onClick={this.handlePluginsUIProcessingClick}>
          {text}
        </StepButton>
      )
    }
    return text
  }

  getAttributesStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.attributes" />)
    if (!this.isDisabled(STEPS_ID.ATTRIBUTES)
      && this.props.stepIndex !== STEPS_ID.ATTRIBUTES
      && this.props.stepIndex !== STEPS_ID.SUBSETTING) {
      return (
        <StepButton onClick={this.handleAttributesClick}>
          {text}
        </StepButton>)
    }
    return text
  }

  getFilesStep = () => {
    const text = (<FormattedMessage id="dataset.stepper.files" />)
    if (!this.isDisabled(STEPS_ID.FILES) && this.props.stepIndex !== STEPS_ID.FILES) {
      return (
        <StepButton onClick={this.handleFilesClick}>
          {text}
        </StepButton>)
    }
    return text
  }

  getLinksStep = () => {
    const text = (
      <FormattedMessage id="dataset.stepper.links" />)
    if (!this.isDisabled(STEPS_ID.LINKS) && this.props.stepIndex !== STEPS_ID.LINKS) {
      return (
        <StepButton onClick={this.handleLinksClick}>
          {text}
        </StepButton>)
    }
    return text
  }

  handlePluginsUIProcessingClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/${this.props.currentDatasetIpId}/plugins`
    browserHistory.push(url)
  }

  handleAttributesClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/edit`
    browserHistory.push(url)
  }

  handleFilesClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/files`
    browserHistory.push(url)
  }

  handleLinksClick = () => {
    const url = `/admin/${this.props.projectName}/data/collections/dataset/${this.props.currentDatasetId}/links`
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
      <div>
        <ScrollArea
          horizontal
          contentStyle={DatasetStepperContainer.SCROLL_AREA_CONTENT_STYLE}
          vertical={false}
        >
          <div
            style={DatasetStepperContainer.STEPPER_WRAPPER_STYLE}
          >
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
              <Step>
                <StepLabel
                  disabled={this.isDisabled(STEPS_ID.PLUGINS_UI_PROCESSING)}
                >
                  {this.getPluginsUIProcessing()}
                </StepLabel>
              </Step>
            </Stepper>
          </div>
        </ScrollArea>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  projectName: AuthenticationParametersSelectors.getProject(state),
})

export default connect(mapStateToProps)(DatasetStepperContainer)
