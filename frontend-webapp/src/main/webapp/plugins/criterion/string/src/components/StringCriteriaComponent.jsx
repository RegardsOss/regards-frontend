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

  constructor(props){
    super(props)
    this.state = {
      value: '',
    };
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
    this.setState({
      value
    })
  }

  render() {

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
            minWidth: 400,
          }}>
            <span style={{
              marginRight: 20
            }}>
            {attributeLAbel}
            </span>
            <TextField
              id="search"
              floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
              value={this.state.value}
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
  // Needed to be linked with the dynamic change of locale
  locale: state.common.i18n.locale,
  // Needed to be linked with the dynamic change of theme
  theme: state.common.theme,
})
const mapDispatchToProps = dispatch => ({
  testDispatch: () => dispatch({type: 'plugin/TEST'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(StringCriteriaComponent)
