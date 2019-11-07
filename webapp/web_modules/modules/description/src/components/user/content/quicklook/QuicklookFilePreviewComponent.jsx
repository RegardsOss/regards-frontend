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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'

/**
 * Shows a quicklook file preview (based on small definition file) and renders its selection state. Allows group selection.
 * @author Raphaël Mechali
 */
class QuicklookFilePreviewComponent extends React.Component {
  static propTypes = {
    groupIndex: PropTypes.number.isRequired, // this group index in list
    selected: PropTypes.bool.isRequired,
    quicklookFile: UIShapes.QuicklookDefinition.isRequired,
    onSelectGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Callback: user selected this group, propagate the event to parent (except when the group is already selected)
   */
  onSelectGroup = () => {
    const { selected, groupIndex, onSelectGroup } = this.props
    if (!selected) {
      onSelectGroup(groupIndex)
    }
  }


  render() {
    const { selected, quicklookFile } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        user: {
          main: {
            content: {
              quicklook: {
                groupLists: {
                  pictureContainer, picture,
                },
              },
            },
          },
        },
      },
    } = this.context
    const groupLabel = quicklookFile.label || formatMessage({ id: 'module.description.content.quicklook.group.unknown' })
    return (
      <div
        style={selected ? pictureContainer.selected : pictureContainer.unselected}
        onClick={this.onSelectGroup}
      >
        <img
          src={quicklookFile[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD].uri}
          alt={groupLabel}
          title={groupLabel}
          style={picture}
        />
      </div>)
  }
}
export default QuicklookFilePreviewComponent
