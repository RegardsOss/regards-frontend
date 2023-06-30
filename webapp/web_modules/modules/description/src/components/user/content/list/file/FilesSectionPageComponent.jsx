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
import { UIDomain } from '@regardsoss/domain'
import { FileData } from '../../../../../shapes/DescriptionState'
import ListSectionPageComponent from '../common/ListSectionPageComponent'
import FileLinkComponent from './FileLinkComponent'

/**
 * Files section page component, showing files list
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class FilesSectionPageComponent extends React.Component {
  static propTypes = {
    section: PropTypes.oneOf(UIDomain.DESCRIPTION_BROWSING_SECTIONS).isRequired,
    files: PropTypes.arrayOf(FileData).isRequired,
    scrollAreaHeight: PropTypes.number,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
  }

  /**
   * Renders a file
   * @param {*} file matching DescriptionState.FileData
   * @param {number} fileIndex file index in files array
   * @return {React.ReactElement} render element
   */
  renderFile = (file, fileIndex) => {
    const { section, onSelectInnerLink } = this.props
    return (
      <FileLinkComponent
        key={file.uri}
        section={section}
        index={fileIndex}
        file={file}
        onSelectInnerLink={onSelectInnerLink}
      />)
  }

  render() {
    const { files, scrollAreaHeight } = this.props
    return (
      <ListSectionPageComponent
        elements={files}
        buildElementNode={this.renderFile}
        scrollAreaHeight={scrollAreaHeight}
      />
    )
  }
}
export default FilesSectionPageComponent
