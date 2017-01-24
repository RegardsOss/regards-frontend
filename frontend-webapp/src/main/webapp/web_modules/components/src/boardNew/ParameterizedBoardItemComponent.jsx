/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { map } from 'lodash'
import { Link } from 'react-router'
import BoardItemShape from './BoardItemShape'
import styles from './styles/styles'
import BoardItemComponent from './BoardItemComponent'

/**
 * Adapter to facilitate the use of the {@link BoardItemComponent} by passing an parameter object.
 */
class ParameterizedBoardItemComponent extends React.Component {

  static propTypes = {
    item: BoardItemShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { item } = this.props
    const computedStyles = styles(this.context.muiTheme) 
    const actions = map(item.actions, (action, index) => (
      <Link
        to={action.path}
        style={computedStyles.links}
        key={index}
      >
        <IconButton 
          iconStyle={computedStyles.icon.smallIcon}
          style={computedStyles.icon.small}
          tooltip={action.tooltipMsg}
        >
          {action.icon}
        </IconButton>
      </Link>
    ))

    return (
      <BoardItemComponent
        title={item.title}
        subtitle={item.subtitle}
        description={item.description}
        actions={actions}
        advanced={item.advanced}
      />
    )
  }
}

export default ParameterizedBoardItemComponent
