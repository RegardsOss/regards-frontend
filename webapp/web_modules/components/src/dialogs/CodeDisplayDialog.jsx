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
import isEmpty from 'lodash/isEmpty'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { CardActionsComponent, CodeFileDisplayer, PositionedDialog } from '@regardsoss/components'
import styles from './styles'
import messages from './i18n'

export class CodeDisplayDialog extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    displayedContent: PropTypes.any,
    contentType: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultPropTypes = {
    contentType: MIME_TYPES.JSON_MIME_TYPE,
    displayedContent: null,
    errorMessage: '',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      displayedContent, onClose, contentType, title, errorMessage,
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
          jsonContentViewerStyle,
          errorMessageStyle,
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
          {
            !isEmpty(errorMessage) ? <div style={errorMessageStyle}>{errorMessage}</div> : null
          }
          <CodeFileDisplayer
            content={displayedContent ? JSON.stringify(displayedContent, null, '\t') : formatMessage({ id: 'code.display.dialog.no.data' })}
            contentType={contentType}
            style={jsonContentViewerStyle}
          />
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

export default withModuleStyle(styles, true)(withI18n(messages, true)(CodeDisplayDialog))
