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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withAuthInfo } from '@regardsoss/authentication-utils'
import { URLAuthInjector } from '@regardsoss/domain/common'

/**
 * Shows entity thumbnail in description view
 * @author Raphaël Mechali
 */
class DescriptionThumbnailComponent extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    projectName: PropTypes.string,
    thumbnailURL: PropTypes.string.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { accessToken, projectName, thumbnailURL } = this.props
    const thumbnailURLWithAuth = URLAuthInjector(thumbnailURL, accessToken, projectName)
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { thumbnailStyle } = moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab

    return (
      <img
        src={thumbnailURLWithAuth}
        style={thumbnailStyle}
        alt={formatMessage({ id: 'module.description.properties.thumbnail.alt.text' })}

      />
    )
  }
}
export default withAuthInfo(DescriptionThumbnailComponent)
