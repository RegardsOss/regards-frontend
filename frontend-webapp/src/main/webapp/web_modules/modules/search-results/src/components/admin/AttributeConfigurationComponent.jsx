/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { AttributeModel, AttributeModelController, AttributeConfiguration } from '@regardsoss/model'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Search from 'material-ui/svg-icons/action/search'
import Locked from 'material-ui/svg-icons/action/lock'
import { FormattedMessage } from 'react-intl'

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

  shouldComponentUpdate(nextProps, nextState) {
    const { conf } = this.props
    const nextConf = nextProps.conf
    if (conf.order !== nextConf.order ||
      conf.visibility !== nextConf.visibility ||
      conf.facetable !== nextConf.facetable) {
      return true
    }
    return false
  }

  changeVisibility = () => {
    const newConf = merge({}, this.state.conf, { visibility: !this.state.conf.visibility })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  changeFacetable = () => {
    const newConf = merge({}, this.state.conf, { facetable: !this.state.conf.facetable })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  changeAttributeOrder = (event, value) => {
    const newConf = merge({}, this.state.conf, { order: parseInt(value, this) })
    this.setState({ conf: newConf })
    this.props.onChange(AttributeModelController.getAttributeFullyQualifiedName(this.props.attribute), newConf)
  }

  formatOrder = value => value ? parseInt(value, this) : undefined

  render() {
    return (
      <Card
        style={{ width: 300, margin: 5 }}
      >
        <CardHeader
          title={this.props.attribute.content.label}
          subtitle={this.props.attribute.content.description}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        />
        <CardText
          style={{
            paddingTop: 0,
          }}
        >
          <TextField
            id="search"
            type="number"
            floatingLabelText={<FormattedMessage id="form.attributes.order" />}
            value={this.formatOrder(this.state.conf.order)}
            onChange={this.changeAttributeOrder}
            style={{
              maxWidth: 150,
            }}
          />
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
