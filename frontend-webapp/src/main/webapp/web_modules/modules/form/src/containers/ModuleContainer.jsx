/**
 * LICENSE_PLACEHOLDER
 **/
import { cloneDeep } from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import {ApplicationLayout} from '@regardsoss/layout'
import {PluginConf} from '@regardsoss/model'
/**
 * Main container to display module form.
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
    criterion: React.PropTypes.arrayOf(PluginConf),
  }

  constructor(props) {
    super(props)
    this.state = {
      criterion: {}
    }
  }

  handleSearch = () => {
    // TODO Manage search
    console.log("Running search",this.state.criterion)
  }

  onCriteriaChange = (criteria, pluginId) => {
    const clone = Object.assign({}, this.state.criterion)
    clone[pluginId] = criteria
    this.setState({
      criterion: clone
    })
  }

  render() {
    if (this.props.layout) {
      const layoutObj = JSON.parse(this.props.layout)

      const pluginsProps = {
        onChange: this.onCriteriaChange
      }

      return (
        <div style={{marginTop: 20, marginRight: 20, marginLeft: 20}}>
          <ApplicationLayout
            appName="user"
            layout={layoutObj}
            plugins={this.props.criterion}
            pluginProps={pluginsProps}
          />
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <RaisedButton
              label="Search"
              labelPosition="before"
              primary={true}
              icon={<SearchIcon />}
              style={{
                width: 200
              }}
              onTouchTap={this.handleSearch}
            />
          </div>
        </div>
      )
    }
    return <div>Loading ... </div>
  }

}

export default ModuleContainer
