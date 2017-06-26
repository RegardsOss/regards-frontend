/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import map from 'lodash/map'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import styles from './styles/styles'

/**
 * React component to display a board item.
 * Every BoardItem as a list of BoardAction.
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
class BaseBoardItemComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.element),
    renderConfirmDialog: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { title, subtitle, description, actions } = this.props
    const keyedActions = map(actions, (action, index) => <div key={index}>{action}</div>)
    const computedStyles = styles(this.context.muiTheme)

    const titleStyle = {
      backgroundColor: this.context.muiTheme.palette.accent2Color,
    }
    return (
      <div className={computedStyles.items.classes}>
        {this.props.renderConfirmDialog()}
        <Card
          style={computedStyles.items.styles}
          containerStyle={computedStyles.items.contentStyles}
        >
          <CardTitle
            title={title}
            subtitle={subtitle}
            style={titleStyle}
          />
          <CardText>
            {description}
          </CardText>
          <CardActions style={computedStyles.cardActionsStyles}>
            {keyedActions}
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default BaseBoardItemComponent
