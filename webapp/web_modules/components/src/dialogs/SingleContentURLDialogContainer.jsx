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
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import PositionedDialog from './PositionedDialog'
import URIContentDisplayer from '../content/preview/URIContentDisplayer'
import styles from './styles'

/**
 * Loadable content dialog showing only one content with its URL
 */
export class SingleContentURLDialogContainer extends React.Component {
  static propTypes = {
    contentURL: CommonShapes.URL.isRequired,
    open: PropTypes.bool.isRequired,
    dialogHeightPercent: CommonShapes.Percent.isRequired,
    dialogWidthPercent: CommonShapes.Percent.isRequired,
    title: UIShapes.OptionalIntlMessage,
    titleStyle: PropTypes.objectOf(PropTypes.any),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      contentURL, open, dialogWidthPercent, dialogHeightPercent, title, ...otherDialogProps
    } = this.props
    const { intl, moduleTheme: { urlContentDialog } } = this.context

    return (
      <PositionedDialog
        title={title ? title[intl.locale] || null : null}
        open={open}
        dialogHeightPercent={dialogHeightPercent}
        dialogWidthPercent={dialogWidthPercent}
        bodyStyle={urlContentDialog.bodyStyle}
        {...otherDialogProps}
      >
        <URIContentDisplayer uri={contentURL} />
      </PositionedDialog>
    )
  }
}

export default withModuleStyle(styles)(SingleContentURLDialogContainer)
