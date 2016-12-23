/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardText } from 'material-ui/Card'
import CardActions from 'material-ui/Card/CardActions'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { map } from 'lodash'
import { Link } from 'react-router'
import BoardItemShape from './BoardItemShape'
import styles from './styles/styles'

/**
 * React component to display a board item.
 * Every BoardItem as a list of BoardAction
 */
class BoardItemComponent extends React.Component {

  static propTypes = {
    item: BoardItemShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const boardItemStyles = styles(this.context.muiTheme)
    const { item } = this.props
    return (
      <div className={boardItemStyles.board.items.classes}>
        <Card
          initiallyExpanded
          style={boardItemStyles.board.items.styles}
          containerStyle={boardItemStyles.board.items.contentStyles}
        >
          <CardText>
            {item.title}
          </CardText>
          <CardText >
            {item.description}
          </CardText>
          <CardActions>
            {map(item.actions, (action, id) => (
              <Link
                to={action.path}
                style={boardItemStyles.board.links}
                key={id}
              >
                <IconButton tooltip={action.tooltipMsg}>
                  { action.icon }
                </IconButton>
              </Link>
            ))}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default BoardItemComponent
