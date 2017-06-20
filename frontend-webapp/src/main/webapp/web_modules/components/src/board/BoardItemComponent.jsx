/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasDisplayDecorator, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import {
  ConfirmDialogComponent,
  ShowableAtRender,
} from '@regardsoss/components'
import { Link } from 'react-router'
import BoardItemShape from './BoardItemShape'
import styles from './styles/styles'
import BaseBoardItemComponent from './BaseBoardItemComponent'
import BoardItemAction from './BoardItemAction'


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

  state = {
    confirmDialogOpened: false,
    actionToConfirm: null,
  }

  /**
   * Callback to close the confirm action dialog
   */
  closeConfirmDialog = () => {
    this.setState({
      confirmDialogOpened: false,
      actionToConfirm: null,
    })
  }

  /**
   * Callback to open the delete confirmation dialog.
   * @param entity Dataset to delete.
   */
  openConfirmDialog = (actionToConfirm) => {
    this.setState({
      confirmDialogOpened: true,
      actionToConfirm,
    })
  }

  /**
   * Render the confirmation delete dialog
   * @returns {XML}
   */
  renderConfirmDialog = () => (
    <ShowableAtRender
      show={this.state.confirmDialogOpened}
    >
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponent.dialogTypes.CONFIRM}
        onConfirm={this.state.actionToConfirm ? this.state.actionToConfirm.touchTapAction : () => {}}
        onClose={this.closeConfirmDialog}
        title={this.state.actionToConfirm ? this.state.actionToConfirm.confirmMessage : ''}
      />
    </ShowableAtRender>
    )

  render() {
    const { item } = this.props
    const computedStyles = styles(this.context.muiTheme)
    const actions = map(item.actions, (action, index) => (
      <HateoasDisplayDecorator
        requiredEndpoints={action.hateoasDependencies}
        hateoasDisplayLogic={someMatchHateoasDisplayLogic}
        key={index}
      >
        <Link
          to={action.path}
          style={computedStyles.links}
        >
          <BoardItemAction
            openConfirmDialog={this.openConfirmDialog}
            action={action}
          />
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

    const requiredEndpoints = actionWhitoutDependencies ? [] : actionsHateoasRequiredEnpoints

    return (
      <HateoasDisplayDecorator
        requiredEndpoints={requiredEndpoints}
        hateoasDisplayLogic={someMatchHateoasDisplayLogic}
      >
        <BaseBoardItemComponent
          title={item.title}
          subtitle={item.subtitle}
          description={item.description}
          actions={actions}
          advanced={item.advanced}
          renderConfirmDialog={this.renderConfirmDialog}
        />
      </HateoasDisplayDecorator>
    )
  }
}

export default BoardItemComponent
