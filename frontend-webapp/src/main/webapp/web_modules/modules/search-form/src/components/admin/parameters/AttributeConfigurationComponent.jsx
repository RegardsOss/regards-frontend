/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { AttributeModel } from '@regardsoss/model'
import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Search from 'material-ui/svg-icons/action/search'
import Locked from 'material-ui/svg-icons/action/lock'
import AttributeConfiguration from '../../../models/attributes/AttributeConfiguration'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {

  static propTypes = {
    attribute: AttributeModel.isRequired,
    conf: AttributeConfiguration,
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const conf = this.props.conf ? this.props.conf : { id: this.props.attribute.id, visibility: false, facetable: false }
    this.state = {
      conf,
    }
  }

  changeVisibility = () => {
    const newConf = merge({}, this.state.conf, { visibility: !this.state.conf.visibility })
    this.setState({ conf: newConf })
    this.props.onChange(this.props.attribute.id, newConf)
  }

  changeFacetable = () => {
    const newConf = merge({}, this.state.conf, { facetable: !this.state.conf.facetable })
    this.setState({ conf: newConf })
    this.props.onChange(this.props.attribute.id, newConf)
  }

  render() {
    return (
      <ListItem>
        {this.props.attribute.name} - {this.props.attribute.description}
        <Checkbox
          label="Visible"
          checked={this.state.conf.visibility}
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          onCheck={this.changeVisibility}
        />
        <Checkbox
          label="Filterable"
          checked={this.state.conf.facetable}
          checkedIcon={<Search />}
          uncheckedIcon={<Locked />}
          onCheck={this.changeFacetable}
        />
      </ListItem>
    )
  }
}

export default AttributeConfigurationComponent
