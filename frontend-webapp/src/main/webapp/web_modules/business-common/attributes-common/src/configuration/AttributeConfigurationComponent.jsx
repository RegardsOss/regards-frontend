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
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {

  static propTypes = {
    allowFacettes: React.PropTypes.bool.isRequired,
    attribute: React.PropTypes.oneOfType([React.PropTypes.shape({
      // for standard attributes
      content: React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        fragment: React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        }).isRequired,
      }),
    }), AttributeModel]).isRequired,
    filter: React.PropTypes.string,
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
      conf.facetable !== nextConf.facetable ||
      conf.filter !== nextProps.filter) {
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
    const { allowFacettes, filter = '', attribute: { content: { label, description } } } = this.props
    const display = !filter.length || label.match(new RegExp(`^${this.props.filter}.*$`, 'i'))
    return (
      <ShowableAtRender
        show={display}
      >
        <Card
          style={{ width: 300, margin: 5 }}
        >
          <CardHeader
            title={label}
            subtitle={description}
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
            <ShowableAtRender show={allowFacettes}>
              <Checkbox
                label={<FormattedMessage id="form.attributes.facetable.label" />}
                checked={this.state.conf.facetable}
                checkedIcon={<Search />}
                uncheckedIcon={<Locked />}
                onCheck={this.changeFacetable}
              />
            </ShowableAtRender>
          </CardText>
        </Card>
      </ShowableAtRender>
    )
  }
}

export default AttributeConfigurationComponent
