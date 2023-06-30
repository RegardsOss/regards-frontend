/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import FileIcon from 'mdi-material-ui/FileImage'
import { i18nContextType } from '@regardsoss/i18n'
import { FileData } from '../../../../../shapes/DescriptionState'
import TreeLinkComponent from './TreeLinkComponent'

/**
 * Shows a tree cell for file as parameter
 * @author Raphaël Mechali
 */
export class FileCellComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(UIDomain.DESCRIPTION_BROWSING_SECTIONS).isRequired,
    index: PropTypes.number.isRequired,
    file: FileData.isRequired,
    selected: PropTypes.bool.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: file link clicked. Notify parent of this link selection
   */
  onLinkClicked = () => {
    const { type, index, onSelectInnerLink } = this.props
    onSelectInnerLink(type, index)
  }

  render() {
    const {
      selected, file: {
        label, mimeType,
      },
    } = this.props
    const { intl: { formatMessage } } = this.context
    const isPreviewAllowed = UIDomain.DisplayHelpers.isFileMimeType(mimeType)
    return (
      <TreeLinkComponent
        text={label}
        // when preview available, show action tooltip, otherwise, show file name
        tooltip={isPreviewAllowed
          ? formatMessage({ id: 'module.description.common.file.preview.tooltip' }, { fileName: label })
          : null}
        selected={selected}
        IconConstructor={FileIcon}
        section={false}
        onClick={this.onLinkClicked}
        // disabled when file preview is not available, or when file is an internal raw data and quota is consumed
        disabled={!isPreviewAllowed}
      />)
  }
}
export default FileCellComponent
