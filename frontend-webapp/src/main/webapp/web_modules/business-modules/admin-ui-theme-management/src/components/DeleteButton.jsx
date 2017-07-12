/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys, HateoasLinks } from '@regardsoss/display-control'
import moduleStyles from '../styles/styles'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * Toolbar icon button for deleting  with a confirm dialog.
 *
 * @author Xavier-Alexandre Brochard
 */
class DeleteButton extends React.Component {

  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    entityHateoasLinks: PropTypes.arrayOf(HateoasLinks).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDiscard = () => {
    const { onDelete } = this.props
    Promise.resolve(onDelete()).then(actionRes => this.handleClose())
  }

  render() {
    const style = moduleStyles(this.context.muiTheme).theme

    const actions = [
      <FlatButton
        key="cancel"
        label={this.context.intl.formatMessage({ id: 'application.theme.remove.confirm.cancel' })}
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="remove"
        label={this.context.intl.formatMessage({ id: 'application.theme.remove.confirm.remove' })}
        primary
        onTouchTap={this.handleDiscard}
      />,
    ]

    const contentStyle = { width: 'auto' }

    return (
      <div>
        <HateoasIconAction
          entityLinks={this.props.entityHateoasLinks}
          hateoasKey={HateoasKeys.DELETE}
          onTouchTap={this.handleOpen}
          tooltip={this.context.intl.formatMessage({ id: 'application.theme.remove.tooltip' })}
        ><Delete color={style.toolbar.icon.color} /></HateoasIconAction>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={contentStyle}
        >
          <FormattedMessage id="application.theme.remove.confirm" />
        </Dialog>
      </div>
    )
  }
}

export default DeleteButton
