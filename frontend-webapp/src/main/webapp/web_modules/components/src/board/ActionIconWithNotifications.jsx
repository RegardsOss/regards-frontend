/**
* LICENSE_PLACEHOLDER
**/
import Badge from 'material-ui/Badge'
import { themeContextType } from '@regardsoss/theme'
import ShowableAtRender from '../cards/ShowableAtRender'
import styles from './styles/styles'

/**
* Card action icon, showing notificatations count (usable as board item action icon, for sub categories)
*/
class ActionIconWithNotifications extends React.Component {

  static propTypes = {
    notificationsCount: PropTypes.number.isRequired,
    icon: PropTypes.element.isRequired,
  }

  static defaultProps = {
    notificationsCount: 0,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { notificationsCount, icon } = this.props
    // render styles, as not provided by a dynamic module
    const { actionIconWithNotifications: { badgeCustomStyles, iconStyles } } = styles(this.context.muiTheme)
    return (
      <div >
        <ShowableAtRender show={!!notificationsCount}>
          <Badge
            badgeContent={notificationsCount}
            badgeStyle={badgeCustomStyles}
            primary
          />
        </ShowableAtRender>
        {React.cloneElement(icon, {
          // clone element to center it in parent button
          style: iconStyles,
        })}
      </div>
    )
  }
}
export default ActionIconWithNotifications
