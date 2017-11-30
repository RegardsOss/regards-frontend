/**
* LICENSE_PLACEHOLDER
**/
import Badge from 'material-ui/Badge'
import { ShowableAtRender } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import styles from './styles/styles'

/**
* Card action icon, showing notificatations count (usable as board item action icon, for sub categories)
*/
class ActionIconWithNotifications extends React.Component {
  static propTypes = {
    notificationsCount: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    iconStyle: PropTypes.object, // CSS styles to apply, or none if default styles should be used
    // eslint-disable-next-line react/forbid-prop-types
    badgeStyle: PropTypes.object, // CSS styles to apply, or none if default styles should be used
  }

  static defaultProps = {
    notificationsCount: 0,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      notificationsCount, icon, iconStyle, badgeStyle,
    } = this.props
    // render styles, as not provided by a dynamic module
    let usedIconStyle = iconStyle
    let usedBadgeStyle = badgeStyle
    if (!usedIconStyle || !usedIconStyle) {
      // compute theme style
      const { actionIconWithNotifications: { badgeStyles: themeBadgeStyle, iconStyles: themeIconStyle } } = styles(this.context.muiTheme)
      // used theme style when not user specified
      usedIconStyle = usedIconStyle || themeIconStyle
      usedBadgeStyle = usedBadgeStyle || themeBadgeStyle
    }

    return (
      <div >
        <ShowableAtRender show={!!notificationsCount}>
          <Badge
            badgeContent={notificationsCount}
            badgeStyle={usedBadgeStyle}
            primary
          />
        </ShowableAtRender>
        {React.cloneElement(icon, {
          // clone element to center it in parent button
          style: usedIconStyle,
        })}
      </div>
    )
  }
}
export default ActionIconWithNotifications
