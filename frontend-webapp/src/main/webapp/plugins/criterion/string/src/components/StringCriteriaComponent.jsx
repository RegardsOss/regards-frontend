/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

class StringCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.number,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attributeId:<id>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.testDispatch()
  }

  changeValue = (value) => {
    this.props.onChange({
      attributeId: this.props.attributes.searchField,
      value: value,
    },this.props.pluginInstanceId)
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          onChange={(event, value) => {this.changeValue(value)}}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  test: state['plugins.string-criteria'].pluginTest,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({ type: 'plugin/TEST' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(StringCriteriaComponent)
