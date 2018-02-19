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
import SpeedIcon from 'mdi-material-ui/Gauge'
import FlagFinished from 'mdi-material-ui/FlagCheckered'
import { DataProviderShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
* Component to display informations about running jobs of a given acqauisition chain
* @author Sébastien Binda
*/
class AcquisitionProcessingChainJobsMonitoringComponent extends React.Component {
  static propTypes = {
    chain: DataProviderShapes.AcquisitionProcessingChainMonitorContent.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {}

  static style = {
    refresh: {
      display: 'inline-block',
      position: 'relative',
    },
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  renderProductAcquisitionJobsActivity = () => {
    const { chain } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { chainJobs: { jobActivityStyle } } } } = this.context
    if (chain && chain.nbProductAcquisitionJob && chain.nbProductAcquisitionJob === 0) {
      return (
        <div style={jobActivityStyle}>
          <RefreshIndicator
            size={25}
            left={0}
            top={0}
            status="loading"
            style={AcquisitionProcessingChainJobsMonitoringComponent.style.refresh}
          />
          {formatMessage({ id: 'acquisition-chain.jobs.monitor.product-acquisition.job.label' }, { count: this.props.chain.nbProductAcquisitionJob })}
        </div>
      )
    }
    return (
      <div style={jobActivityStyle}> <FlagFinished /> {formatMessage({ id: 'acquisition-chain.jobs.monitor.product-acquisition.job.empty.label' })} </div>
    )
  }

  renderGenerationJobsActivity = () => {
    const { chain } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { chainJobs: { jobActivityStyle } } } } = this.context
    if (chain && chain.nbSIPGenerationJobs && chain.nbSIPGenerationJobs === 0) {
      return (
        <div style={jobActivityStyle}>
          <RefreshIndicator
            size={25}
            left={0}
            top={0}
            status="loading"
            style={AcquisitionProcessingChainJobsMonitoringComponent.style.refresh}
          />
          {formatMessage({ id: 'acquisition-chain.jobs.monitor.generation.job.label' }, { count: this.props.chain.nbSIPGenerationJobs })}
        </div>
      )
    }
    return (
      <div style={jobActivityStyle}>  <FlagFinished /> {formatMessage({ id: 'acquisition-chain.jobs.monitor.generation.job.empty.label' })} </div>
    )
  }

  renderSubmissionJobsActivity = () => {
    const { chain } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { chainJobs: { jobActivityStyle } } } } = this.context
    if (chain && chain.nbSIPSubmissionJobs && chain.nbSIPSubmissionJobs > 0) {
      return (
        <div style={jobActivityStyle}>
          <RefreshIndicator
            size={25}
            left={0}
            top={0}
            status="loading"
            style={AcquisitionProcessingChainJobsMonitoringComponent.style.refresh}
          />
          {formatMessage({ id: 'acquisition-chain.jobs.monitor.submission.job.label' }, { count: this.props.chain.nbSIPSubmissionJobs })}
        </div>
      )
    }
    return (
      <div style={jobActivityStyle}> <FlagFinished /> {formatMessage({ id: 'acquisition-chain.jobs.monitor.submission.job.empty.label' })} </div>
    )
  }

  renderDialog = () => {
    const { chain } = this.props
    const { intl: { formatMessage }, moduleTheme: { monitoring: { chainJobs: { descriptionStyle } } } } = this.context
    const actions = [
      <FlatButton
        key="close"
        label="Close"
        primary
        onClick={this.handleClose}
      />,
    ]
    return (
      <Dialog
        title={formatMessage({ id: 'acquisition-chain.jobs.monitor.dialog.title' }, { label: chain.label })}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div style={descriptionStyle}>
          {formatMessage({ id: 'acquisition-chain.jobs.monitor.dialog.information.message' })}
        </div>
        <Divider />
        {this.renderProductAcquisitionJobsActivity()}
        <Divider />
        {this.renderGenerationJobsActivity()}
        <Divider />
        {this.renderSubmissionJobsActivity()}
        <Divider />
      </Dialog>
    )
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <span style={{ marginLeft: '10px' }}>
        <FlatButton
          label={formatMessage({ id: 'acquisition-chain.jobs.monitor.view.button.label' })}
          labelPosition="before"
          primary
          icon={<SpeedIcon />}
          onClick={this.handleOpen}
        />
        {this.renderDialog()}
      </span>
    )
  }
}
export default AcquisitionProcessingChainJobsMonitoringComponent
