/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

export class StringCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.number,
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
    // eslint-disable-next-line
    attributes: React.PropTypes.object,
    // From mapStateToProps
    test: React.PropTypes.string,
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
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label" />}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={{
            top: -13,
            margin: '0px 10px',
            maxWidth: 165,
          }}
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
