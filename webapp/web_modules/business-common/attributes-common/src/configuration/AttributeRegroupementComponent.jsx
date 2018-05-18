/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
import { AccessShapes } from '@regardsoss/shape'

/**
 * Component to display an attribute configuration.
 * @author Sébastien binda
 */
class AttributeConfigurationComponent extends React.Component {
  static propTypes = {
    conf: AccessShapes.AttributesGroupConfigurationContent.isRequired,
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

  onDeleteAction = () => {
    this.props.onDelete(this.props.conf)
  }

  onEditAction = () => {
    this.props.onEdit(this.props.conf)
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
    const cardStyle = { width: 300, margin: 5 }
    const cardHeaderStyle = {
      display: 'inline-block',
      width: '80%',
      paddingTop: 0,
      paddingBottom: 0,
    }
    const cardContentStyle = { paddingTop: 0 }
    const searchFieldStyle = { maxWidth: 150 }
    const anchorOrigin = { horizontal: 'left', vertical: 'top' }
    const menuIconStyle = {
      display: 'inline-block',
    }
    const iconButton = <IconButton><MoreVertIcon /></IconButton>
    const visibilityOffIcon = <VisibilityOff />
    const visibilityOnIcon = <Visibility />
    return (
      <Card
        style={cardStyle}
      >
        <CardHeader
          title={this.props.conf.label}
          style={cardHeaderStyle}
        />
        <IconMenu
          iconButtonElement={iconButton}
          anchorOrigin={anchorOrigin}
          targetOrigin={anchorOrigin}
          style={menuIconStyle}
        >
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'form.attributes.regroupement.edit' })}
            onClick={this.onEditAction}
          />
          <MenuItem
            primaryText={this.context.intl.formatMessage({ id: 'form.attributes.regroupement.remove' })}
            onClick={this.onDeleteAction}
          />
        </IconMenu>
        <CardText
          style={cardContentStyle}
        >
          <TextField
            id="search"
            type="number"
            floatingLabelText={this.context.intl.formatMessage({ id: 'form.attributes.order' })}
            value={this.formatOrder(this.state.conf.order) || ''}
            onChange={this.changeAttributeOrder}
            style={searchFieldStyle}
          />
          <Checkbox
            label={this.context.intl.formatMessage({ id: 'form.attributes.visibility.label' })}
            checked={this.state.conf.visibility}
            checkedIcon={visibilityOnIcon}
            uncheckedIcon={visibilityOffIcon}
            onCheck={this.changeVisibility}
          />
        </CardText>
      </Card>
    )
  }
}

export default AttributeConfigurationComponent
