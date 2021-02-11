/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Link } from 'react-router'
import map from 'lodash/map'
import noop from 'lodash/noop'
import reduce from 'lodash/reduce'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender, withResourceDisplayControl, someListMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import ConfirmDialogComponent, { ConfirmDialogComponentTypes } from '../dialogs/ConfirmDialogComponent'
import BoardItemShape from './BoardItemShape'
import styles from './styles/styles'
import BaseBoardItemComponent from './BaseBoardItemComponent'
import BoardItemAction from './BoardItemAction'

const ListWithResourceDisplayControl = withResourceDisplayControl(Link)
const BaseBoardItemComponentWithResourceDisplayControl = withResourceDisplayControl(BaseBoardItemComponent)

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
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        onConfirm={this.state.actionToConfirm ? this.state.actionToConfirm.touchTapAction : noop}
        errorMessage={this.state.actionToConfirm ? this.state.actionToConfirm.errorMessage : null}
        onClose={this.closeConfirmDialog}
        title={this.state.actionToConfirm ? this.state.actionToConfirm.confirmMessage : ''}
      />
    </ShowableAtRender>
  )

  render() {
    const { item } = this.props
    const computedStyles = styles(this.context.muiTheme)
    // Create list of all need endpoints for all board actions
    const actionsHateoasRequiredEndpoints = reduce(item.actions, (acc, action) => action.hateoasDependencies && action.hateoasDependencies.length
      ? [...acc, action.hateoasDependencies] : acc, [])

    return (
      <BaseBoardItemComponentWithResourceDisplayControl
        displayLogic={someListMatchHateoasDisplayLogic}
        resourceDependencies={actionsHateoasRequiredEndpoints}
        title={item.title}
        subtitle={item.subtitle}
        description={item.description}
        actions={map(item.actions, (action, index) => (
          <ListWithResourceDisplayControl
            key={index}
            resourceDependencies={action.hateoasDependencies}
            to={action.path}
            style={computedStyles.links}
          >
            <BoardItemAction
              openConfirmDialog={this.openConfirmDialog}
              action={action}
            />
          </ListWithResourceDisplayControl>
        ))}
        advanced={item.advanced}
        renderConfirmDialog={this.renderConfirmDialog}
      />
    )
  }
}

export default BoardItemComponent
