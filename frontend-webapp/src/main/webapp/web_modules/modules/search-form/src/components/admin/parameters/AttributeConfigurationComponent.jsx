/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { AttributeModel } from '@regardsoss/model'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Search from 'material-ui/svg-icons/action/search'
import Locked from 'material-ui/svg-icons/action/lock'
import { FormattedMessage } from 'react-intl'
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
    this.state = {
      conf: this.props.conf,
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
      <Card
        style={{ width: 300, margin: 5 }}
      >
        <CardHeader
          title={this.props.attribute.name}
          subtitle={this.props.attribute.description}
        />
        <CardText>
          <Checkbox
            label={<FormattedMessage id="form.attributes.visibility.label" />}
            checked={this.state.conf.visibility}
            checkedIcon={<Visibility />}
            uncheckedIcon={<VisibilityOff />}
            onCheck={this.changeVisibility}
          />
          <Checkbox
            label={<FormattedMessage id="form.attributes.facetable.label" />}
            checked={this.state.conf.facetable}
            checkedIcon={<Search />}
            uncheckedIcon={<Locked />}
            onCheck={this.changeFacetable}
          />
        </CardText>
      </Card>
    )
  }
}

export default AttributeConfigurationComponent
