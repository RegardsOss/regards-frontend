/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { FormattedMessage } from 'react-intl'
import { AttributesRegroupementConfiguration } from '@regardsoss/model'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {

  static propTypes = {
    conf: AttributesRegroupementConfiguration.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
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
    if (conf.label !== nextConf.label ||
      conf.visibility !== nextConf.visibility ||
      conf.facetable !== nextConf.facetable) {
      return true
    }
    return false
  }

  changeVisibility = () => {
    const newConf = merge({}, this.state.conf, { visibility: !this.state.conf.visibility })
    this.setState({ conf: newConf })
    this.props.onChange(this.props.conf.label, newConf)
  }

  render() {
    return (
      <Card
        style={{ width: 300, margin: 5 }}
      >
        <CardHeader
          title={this.props.conf.label}
          style={{ display: 'inline-block', width: '80%' }}
        />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          style={{
            display: 'inline-block',
          }}
        >
          <MenuItem
            primaryText={<FormattedMessage id="form.attributes.regroupement.edit" />}
            onTouchTap={() => this.props.onEdit(this.props.conf)}
          />
          <MenuItem
            primaryText={<FormattedMessage id="form.attributes.regroupement.remove" />}
            onTouchTap={() => this.props.onDelete(this.props.conf)}
          />
        </IconMenu>
        <CardText>
          <Checkbox
            label={<FormattedMessage id="form.attributes.visibility.label" />}
            checked={this.state.conf.visibility}
            checkedIcon={<Visibility />}
            uncheckedIcon={<VisibilityOff />}
            onCheck={this.changeVisibility}
          />
        </CardText>
      </Card>
    )
  }
}

export default AttributeConfigurationComponent
