/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import AttributeModel from '../common/AttributeModel'

export class ExampleContainer extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.string,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
    // From mapStateToProps
    test: React.PropTypes.bool,
    // From mapDispatchToProps
    /**
     * Just for checking that  we can dispatch an action from the plugin
     */
    testDispatch: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    this.props.testDispatch()
  }

  changeValue = (value) => {
    this.props.onChange({
      attribute: this.props.attributes.searchField,
      comparator: 'EQ',
      value,
    }, this.props.pluginInstanceId)
    this.setState({
      value,
    })
  }

  render() {
    const attributeLabel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null
    console.log("LE PPLUGIN SERVICE REPOND", this.props, this)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            margin: '0px 10px',
          }}
        >
          {attributeLabel}
        </span>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  test: state['plugins.string-criteria'].pluginTest.pluginTest,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({ type: 'plugin/TEST' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer)
