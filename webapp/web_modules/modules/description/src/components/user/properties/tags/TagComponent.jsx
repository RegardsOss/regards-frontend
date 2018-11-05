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
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import TagWithDescriptionIcon from 'material-ui/svg-icons/action/label'
import TagIcon from 'material-ui/svg-icons/action/label-outline'
import DetailIcon from 'material-ui/svg-icons/action/info-outline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * A single tag component
 * @author Raphaël Mechali
 */
class TagComponent extends React.Component {
  static propTypes = {
    tagLabel: PropTypes.string.isRequired,
    isEntity: PropTypes.bool.isRequired,
    // callback: on search tag (or null)
    onSearchTag: PropTypes.func,
    // callback: on show description (or null)
    onShowDescription: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      tagLabel, isEntity, onSearchTag, onShowDescription,
    } = this.props
    const {
      rowStyle, iconCellStyle, iconStyle, infoIconStyle, labelStyle, actionStyle, buttonStyle,
    } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab.tags.tagsContainer
    const { intl: { formatMessage } } = this.context
    return (
      <div style={rowStyle}>
        <div style={iconCellStyle}>
          {
            isEntity
              ? <TagWithDescriptionIcon style={iconStyle} />
              : <TagIcon style={iconStyle} />
          }
        </div>
        <div style={labelStyle}>{tagLabel}</div>
        { /* Render tag search if allowed (as it is forbidden for all elements of a group when disabled here) */
          onSearchTag ? (
            <div style={actionStyle}>
              <IconButton
                title={formatMessage({ id: 'module.description.properties.tag.search.tooltip' })}
                onClick={onSearchTag}
                style={buttonStyle}
                iconStyle={iconStyle}
              >
                <SearchIcon />
              </IconButton>
            </div>) : null
        }
        { /* render description option (always, as it may be disabled for some elements and not others) */}
        <div style={actionStyle}>
          <IconButton
            title={formatMessage({ id: 'module.description.properties.tag.show.description.tooltip' })}
            disabled={!onShowDescription}
            onClick={onShowDescription}
            style={buttonStyle}
            iconStyle={infoIconStyle}
          >
            <DetailIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}
export default TagComponent
