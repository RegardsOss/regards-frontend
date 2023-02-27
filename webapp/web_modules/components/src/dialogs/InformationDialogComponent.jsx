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
import { SwitchThemeDecorator } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import messages from './i18n'

/**
 * An information inside dialog component
 * @author Léo Mieulet
 */
class InformationDialogComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    message: PropTypes.any.isRequired,
    confirmMessageKey: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  static defaultProps = {
    open: true,
    confirmMessageKey: 'confirm.dialog.close',
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      title, message, onClose, open, confirmMessageKey,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <SwitchThemeDecorator
        useMainTheme
      >
        <Dialog
          title={title}
          actions={
            <FlatButton
              key={confirmMessageKey}
              primary
              keyboardFocused
              label={formatMessage({ id: confirmMessageKey })}
              onClick={onClose}
            />
          }
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          {message}
        </Dialog>
      </SwitchThemeDecorator>
    )
  }
}

export default withI18n(messages, true)(InformationDialogComponent)
