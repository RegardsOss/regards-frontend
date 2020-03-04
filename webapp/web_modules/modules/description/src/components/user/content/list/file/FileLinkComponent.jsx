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
import FileIcon from 'mdi-material-ui/FileImage'
import DownloadIcon from 'mdi-material-ui/Download'
import { i18nContextType } from '@regardsoss/i18n'
import { DownloadButton } from '@regardsoss/components'
import { BROWSING_SECTIONS } from '../../../../../domain/BrowsingSections'
import { FileData } from '../../../../../shapes/DescriptionState'
import PageLinkCellComponent from '../common/PageLinkCellComponent'
import PageElement from '../common/PageElement'
import PageElementOption from '../common/PageElementOption'

/**
 * A file link component for list page displaying (displays as simple text when file is offline)
 * @author Raphaël Mechali
 */
class FileLinkComponent extends React.Component {
  static propTypes = {
    section: PropTypes.oneOf(BROWSING_SECTIONS).isRequired,
    index: PropTypes.number.isRequired,
    file: FileData.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: file link clicked. Notify parent of this link selection
   */
  onFileLinkClicked = () => {
    const { section, index, onSelectInnerLink } = this.props
    onSelectInnerLink(section, index)
  }

  render() {
    const { file: { label, available, uri } } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <PageElement>
        <PageLinkCellComponent
          text={label}
          tooltip={formatMessage({ id: 'module.description.common.file.preview.tooltip' }, { fileName: label })}
          LinkIconConstructor={FileIcon}
          disabled={!available}
          onClick={this.onFileLinkClicked}
        />
        { // Download button when URI is available
           available ? (
             <DownloadButton
               ButtonConstructor={PageElementOption}
               tooltip={formatMessage({ id: 'module.description.common.download.file.tooltip' }, { fileName: label })}
               downloadURL={uri}
               IconConstructor={DownloadIcon}
             />) : null // hide option when not available
        }
      </PageElement>
    )
  }
}
export default FileLinkComponent
