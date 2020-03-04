/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import DownloadIcon from 'mdi-material-ui/Download'
import { DownloadButton } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { FileData } from '../../../../../shapes/DescriptionState'

/** Button constructor for inner download button graphics */
const DownloadInnerButton = props => <IconButton {...props}><DownloadIcon /></IconButton>

/**
 * Cell showing download option
 * @author Raphaël Mechali
 */
class DownloadCellComponent extends React.Component {
  static propTypes = {
    file: FileData.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { file: { available, label, uri } } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { main: { tree: { cell: { iconButton } } } } } } = this.context
    return available ? (
      <DownloadButton
        ButtonConstructor={DownloadInnerButton}
        downloadName={label}
        downloadURL={uri}
        tooltip={formatMessage({ id: 'module.description.common.download.file.tooltip' }, { fileName: label })}
        style={iconButton.style}
        iconStyle={iconButton.iconStyle}
      />) : null // hide option when not available
  }
}
export default DownloadCellComponent
