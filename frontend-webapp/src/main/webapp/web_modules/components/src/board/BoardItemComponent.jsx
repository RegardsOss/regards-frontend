/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasDisplayDecorator, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { Link } from 'react-router'
import BoardItemShape from './BoardItemShape'
import styles from './styles/styles'
import BaseBoardItemComponent from './BaseBoardItemComponent'


/**
 * Adapter to facilitate the use of the {@link BaseBoardItemComponent} by passing an parameter object.
 *
 * @author Xavier-Alexandre Brochard
 */
class BoardItemComponent extends React.Component {

  static propTypes = {
    item: BoardItemShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  renderActionButton = (action) => {
    if (action.customRender) {
      return action.customRender
    }
    return (<IconButton
      tooltip={action.tooltipMsg}
      onTouchTap={action.touchTapAction}
    >
      {action.icon}
    </IconButton>)
  }

  render() {
    const { item } = this.props
    const computedStyles = styles(this.context.muiTheme)
    const actions = map(item.actions, (action, index) => (
      <HateoasDisplayDecorator
        requiredEndpoints={action.hateoasDependencies}
        hateoasDisplayLogic={someMatchHateoasDisplayLogic}
      >
        <Link
          to={action.path}
          style={computedStyles.links}
          key={index}
        >
          {this.renderActionButton(action)}
        </Link>
      </HateoasDisplayDecorator>
    ))

    // Create list of all need endpoints for all board actions
    const actionsHateoasRequiredEnpoints = []
    let actionWhitoutDependencies = false
    forEach(item.actions, (action, index) => {
      if (action.hateoasDependencies) {
        if (action.hateoasDependencies.length === 0) {
          actionWhitoutDependencies = true
        } else {
          actionsHateoasRequiredEnpoints.push(...action.hateoasDependencies)
        }
      }
    })

    return (
      <HateoasDisplayDecorator
        requiredEndpoints={actionWhitoutDependencies ? [] : actionsHateoasRequiredEnpoints}
        hateoasDisplayLogic={someMatchHateoasDisplayLogic}
      >
        <BaseBoardItemComponent
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          actions={actions}
          advanced={item.advanced}
        />
      </HateoasDisplayDecorator>
    )
  }
}

export default BoardItemComponent
