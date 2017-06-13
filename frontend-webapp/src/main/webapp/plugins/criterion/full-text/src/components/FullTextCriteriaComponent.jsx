/**
 * LICENSE_PLACEHOLDER
 **/
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import {AttributeModel} from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

class FullTextCriteriaComponent extends PluginComponent {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
  }

  changeValue = (value) => {
    this.setState({
      value,
    }, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      openSearchQuery = `"${state.value}"`
    }
    return openSearchQuery
  }

  render() {
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
            fontSize: '1.3em'
          }}
        >
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
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

export default FullTextCriteriaComponent
