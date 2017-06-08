/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import AttributeModel from '../common/AttributeModel'

export class SampleService extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.string,
    /**
     * Service configuration see plugin-info.json to get conf parameters
     */
    pluginConf: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Hello Service Plugin</div>
    )
  }
}

export default SampleService


