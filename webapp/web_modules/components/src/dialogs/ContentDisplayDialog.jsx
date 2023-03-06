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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { CardActionsComponent, PositionedDialog } from '@regardsoss/components'
import styles from './styles'
import messages from './i18n'

export class ContentDisplayDialog extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    displayedContent: PropTypes.any,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
  }

  static defaultPropTypes = {
    style: {},
    displayedContent: null,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      displayedContent, onClose, title, style,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        codeDisplayDialog: {
          widthPercent,
          heightPercent,
          dialogBodyStyle,
          contentStyle,
          actionsStyle,
          rawContentStyle,
        },
      },
    } = this.context
    return (
      <PositionedDialog
        dialogWidthPercent={widthPercent}
        dialogHeightPercent={heightPercent}
        bodyStyle={dialogBodyStyle}
        title={title}
        modal
        open
      >
        <div style={contentStyle}>
          <div style={{ ...rawContentStyle, ...style }}>{displayedContent}</div>
        </div>
        <div style={actionsStyle}>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'code.display.dialog.close' })}
            mainButtonClick={onClose}
          />
        </div>
      </PositionedDialog>
    )
  }
}

export default withModuleStyle(styles, true)(withI18n(messages, true)(ContentDisplayDialog))
