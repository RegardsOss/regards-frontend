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
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NoContentMessageInfo } from '@regardsoss/components'

/**
 * Displays file loading for file tab
 * @author Raphaël Mechali
 */
class FileMessageComponent extends React.Component {
  static propTypes = {
    titleKey: PropTypes.string.isRequired,
    messageKey: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { titleKey, messageKey } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { centeredFileContent } = moduleTheme.descriptionDialog.card.media.tabs.tab.filesTab
    return (
      <div style={centeredFileContent}>
        <NoContentMessageInfo
          noContent
          title={formatMessage({ id: titleKey })}
          message={formatMessage({ id: messageKey })}
          Icon={NoDataIcon}
        >
          <div />
        </NoContentMessageInfo>
      </div>
    )
  }
}
export default FileMessageComponent
