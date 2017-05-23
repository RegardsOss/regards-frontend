/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AttributesRegroupementConfiguration } from '@regardsoss/model'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {

  static propTypes = {
    conf: AttributesRegroupementConfiguration.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
      conf.label !== nextConf.label ||
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

  changeAttributeOrder = (event, value) => {
    const newConf = merge({}, this.state.conf, { order: parseInt(value, this) })
    this.setState({ conf: newConf })
    this.props.onChange(this.props.conf.label, newConf)
  }

  formatOrder = value => value ? parseInt(value, this) : undefined

  render() {
    return (
      <Card
        style={{ width: 300, margin: 5 }}
      >
        <CardHeader
          title={this.props.conf.label}
          style={{
            display: 'inline-block',
            width: '80%',
            paddingTop: 0,
            paddingBottom: 0 }}
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
            primaryText={this.context.intl.formatMessage({ id: 'form.attributes.regroupement.edit' })}
            onTouchTap={() => this.props.onEdit(this.props.conf)}
          />
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'form.attributes.regroupement.remove' })}
            onTouchTap={() => this.props.onDelete(this.props.conf)}
          />
        </IconMenu>
        <CardText
          style={{
            paddingTop: 0,
          }}
        >
          <TextField
            id="search"
            type="number"
            floatingLabelText={this.context.intl.formatMessage({ id: 'form.attributes.order' })}
            value={this.formatOrder(this.state.conf.order)}
            onChange={this.changeAttributeOrder}
            style={{
              maxWidth: 150,
            }}
          />
          <Checkbox
            label={this.context.intl.formatMessage({ id: 'form.attributes.visibility.label' })}
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
