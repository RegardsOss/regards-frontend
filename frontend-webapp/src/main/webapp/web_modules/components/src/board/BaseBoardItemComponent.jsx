/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { map } from 'lodash'
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
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    description: React.PropTypes.string.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.element),
    advanced: React.PropTypes.bool,
  }

  static defaultProp = {
    advanced: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { title, subtitle, description, actions } = this.props
    const keyedActions = map(actions, (action, index) => <div key={index}>{action}</div>)
    const computedStyles = styles(this.context.muiTheme)

    return (
      <div className={computedStyles.items.classes}>
        <Card
          style={computedStyles.items.styles}
          containerStyle={computedStyles.items.contentStyles}
        >
          <CardTitle
            title={title}
            subtitle={subtitle}
            style={{
              backgroundColor: this.context.muiTheme.palette.primary3Color,
            }}
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
