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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import HelpIcon from 'mdi-material-ui/HelpCircle'
import IconButton from 'material-ui/IconButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FieldMessageHelpContent } from '../../shapes/FieldHelpShape'
import messages from '../../i18n'

/**
 * Shows a button to open field help message in a dialog box
 *
 * @author Raphaël Mechali
 */
export class DialogMessageHelpComponent extends React.Component {
  static propTypes = {
    help: FieldMessageHelpContent.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Default title / tooltip key for field help message  */
  static DEFAULT_TITLE_KEY = 'field.default.help.title'

  state = {
    helpVisible: false,
  }

  /** User callback: on show field help */
  onShowHelp = () => this.setState({ helpVisible: true })

  /** user callback: on close field help */
  onCloseHelp = () => this.setState({ helpVisible: false })

  render() {
    const { help: { titleKey, messageKey } } = this.props
    const { helpVisible } = this.state
    const { intl: { formatMessage }, muiTheme: { formsExtensions: { fieldHelpButton } } } = this.context
    return (
      <>
        {/* 1. Button (with styles for self-alignement in parent flex) */}
        <IconButton
          style={fieldHelpButton}
          title={formatMessage({ id: titleKey || DialogMessageHelpComponent.DEFAULT_TITLE_KEY })}
          onClick={this.onShowHelp}
        >
          <HelpIcon />
        </IconButton>
        {/* 2. Dialog */}
        <Dialog
          title={formatMessage({ id: titleKey || DialogMessageHelpComponent.DEFAULT_TITLE_KEY })}
          actions={[ /** Single close action */
            <FlatButton
              key="close.button"
              label={formatMessage({ id: 'field.help.close.button.label' })}
              primary
              keyboardFocused
              onClick={this.onCloseHelp}
            />]}
          modal={false}
          open={helpVisible}
          onRequestClose={this.onCloseHelp}
        >
          {formatMessage({ id: messageKey })}
        </Dialog>
      </>)
  }
}
export default withI18n(messages, true)(DialogMessageHelpComponent)
