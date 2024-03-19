/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import isEmpty from 'lodash/isEmpty'
import IconButton from 'material-ui/IconButton'
import DetailIcon from 'mdi-material-ui/HelpCircle'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import style from './styles'

/**
 * Generic component to display an help icon which pop a dialog
 * Its possible to add a link in the dialog via props
 * @author Théo Lasserre
 */
class HelpDialogComponent extends React.Component {
  static propTypes = {
    iconTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    link: PropTypes.string,
    linkLabel: PropTypes.string,
  }

  static defaultProps = {
    link: '',
    linkLabel: '',
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Initial state
   */
  state = {
    openHelpDialog: false,
  }

  /**
   * Display or not help dialog
   */
  showOrCloseHelpDialog = () => {
    const { openHelpDialog } = this.state
    this.setState({
      openHelpDialog: !openHelpDialog,
    })
  }

  /**
   * Dialog to display a message and possibly a link to help user
   */
  helpOpenSearchDialog = () => {
    const {
      title, message, buttonLabel, link, linkLabel,
    } = this.props
    const { openHelpDialog } = this.state
    const { moduleTheme: { helpDialog: { linkDivStyle, linkStyle } } } = this.context
    return (
      <Dialog
        actions={
          <FlatButton
            key={buttonLabel}
            label={buttonLabel}
            primary
            onClick={this.showOrCloseHelpDialog}
          />
        }
        title={title}
        open={openHelpDialog}
        onRequestClose={this.showOrCloseHelpDialog}
      >
        <div>
          {message}
        </div>
        {
          !isEmpty(link)
            ? <div style={linkDivStyle}>
              <Link to={{ pathname: link }} target="_blank" style={linkStyle}>
                {linkLabel}
              </Link>
            </div>
            : null
        }
      </Dialog>
    )
  }

  render() {
    const { iconTitle } = this.props
    const { moduleTheme: { helpDialog: { iconStyle, buttonStyle } } } = this.context
    return (
      <div>
        <IconButton
          className="selenium-help-dialog-component"
          title={iconTitle}
          iconStyle={iconStyle}
          style={buttonStyle}
          onClick={this.showOrCloseHelpDialog}
        >
          <DetailIcon />
        </IconButton>
        {this.helpOpenSearchDialog()}
      </div>

    )
  }
}
export default withModuleStyle(style)(HelpDialogComponent)
