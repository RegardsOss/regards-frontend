/**
* LICENSE_PLACEHOLDER
**/
import IconButton from 'material-ui/IconButton'
import TagWithDescriptionIcon from 'material-ui/svg-icons/action/label'
import TagIcon from 'material-ui/svg-icons/action/label-outline'
import SearchIcon from 'material-ui/svg-icons/action/search'
import DetailIcon from 'material-ui/svg-icons/action/info-outline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
* A single tag component
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

  renderSearchTag = () => {
    const { onSearchTag } = this.props
    const { iconStyle, actionStyle, buttonStyle } =
      this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab.tags.tagsContainer
    const { intl: { formatMessage } } = this.context
    // render search option if available
    if (onSearchTag) {
      return (
        <div style={actionStyle}>
          <IconButton
            title={formatMessage({ id: 'entities.common.properties.tag.search.tooltip' })}
            onTouchTap={onSearchTag}
            style={buttonStyle}
            iconStyle={iconStyle}
          >
            <SearchIcon />
          </IconButton>
        </div>
      )
    }
    return null
  }

  render() {
    const { tagLabel, isEntity, onShowDescription } = this.props
    const { rowStyle, iconCellStyle, iconStyle, infoIconStyle, labelStyle, actionStyle, buttonStyle } =
      this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab.tags.tagsContainer
    const { intl: { formatMessage } } = this.context
    return (
      <div style={rowStyle}>
        <div style={iconCellStyle}>
          {
            isEntity ?
              <TagWithDescriptionIcon style={iconStyle} /> :
              <TagIcon style={iconStyle} />
          }
        </div>
        <div style={labelStyle}>{tagLabel}</div>
        {this.renderSearchTag()}
        {
          // render description option if available
          onShowDescription ?
            <div style={actionStyle}>
              <IconButton
                title={formatMessage({ id: 'entities.common.properties.tag.show.description.tooltip' })}
                onTouchTap={onShowDescription}
                style={buttonStyle}
                iconStyle={infoIconStyle}
              >
                <DetailIcon />
              </IconButton>
            </div>
            : null
        }
      </div>
    )
  }
}
export default TagComponent
