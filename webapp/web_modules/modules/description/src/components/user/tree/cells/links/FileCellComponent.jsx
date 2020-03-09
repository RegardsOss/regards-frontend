/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { BROWSING_SECTIONS } from '../../../../../domain/BrowsingSections'
import { FileData } from '../../../../../shapes/DescriptionState'
import TreeLinkComponent from './TreeLinkComponent'

/**
 * Shows a tree cell for file as parameter
 * @author Raphaël Mechali
 */
class FileCellComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(BROWSING_SECTIONS).isRequired,
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
    const { file: { label, available }, selected } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TreeLinkComponent
        text={label}
        // when available, show action tooltip, otherwise, show file name
        tooltip={available ? formatMessage({ id: 'module.description.common.file.preview.tooltip' }, { fileName: label }) : label}
        selected={selected}
        IconConstructor={FileIcon}
        section={false}
        onClick={this.onLinkClicked}
        disabled={!available}
      />)
  }
}
export default FileCellComponent
