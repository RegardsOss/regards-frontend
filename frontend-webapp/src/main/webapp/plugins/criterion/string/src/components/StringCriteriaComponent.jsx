/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import {Card, CardText} from 'material-ui/Card'
import {connect} from 'react-redux'

class StringCriteriaComponent extends React.Component {

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
    attributes: React.PropTypes.object,
  }

  componentDidMount() {
    this.props.testDispatch()
  }

  changeValue = (value) => {
    this.props.onChange({
      attribute: this.props.attributes.searchField,
      comparator: "EQ",
      value: value,
    }, this.props.pluginInstanceId)
  }

  render() {
    console.log("PLUGIN Loaded with props : ", this.props)

    const attributeLAbel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
      }}>
        <Card>
          <CardText style={{
            display: 'flex',
            alignItems: 'baseline',
            paddingTop: 0,
            paddingBottom: 2,
          }}>
            <span style={{
              marginRight: 20
            }}>
            {attributeLAbel}
            </span>
            <TextField
              id="search"
              floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
              onChange={(event, value) => {
                this.changeValue(value)
              }}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  test: state['plugins.string-criteria'].pluginTest,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({type: 'plugin/TEST'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(StringCriteriaComponent)
