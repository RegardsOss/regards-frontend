/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { FeedbackDisplayer } from '@regardsoss/components'
import CartIcon from 'mdi-material-ui/Cart'
import DoneEmptyIcon from 'mdi-material-ui/Close'

/**
 * Component to display long operations on module
 * @author Raphaël Mechali
 */
class FeedbackDisplayComponent extends React.Component {
  /**
   * Operation result status
   */
  static OPERATION_STATUS = {
    DONE_OK: 'DONE_OK',
    DONE_EMPTY: 'DONE_EMPTY',
    FAILED: 'FAILED',
  }

  static propTypes = {
    // is currently adding to basket?
    isAddingToBasket: PropTypes.bool.isRequired,
    operationStatus: PropTypes.oneOf(values(FeedbackDisplayComponent.OPERATION_STATUS)).isRequired,
  }

  render() {
    const { isAddingToBasket, operationStatus } = this.props
    let doneIcon
    let doneWithError = false
    switch (operationStatus) {
      case FeedbackDisplayComponent.OPERATION_STATUS.DONE_EMPTY:
        doneIcon = <DoneEmptyIcon />
        break
      case FeedbackDisplayComponent.OPERATION_STATUS.FAILED:
        doneWithError = true
        break
      // By default, icon is undefined, which means we use the default done icon from FeedbackDisplayer
      case FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK:
      default:
    }

    return (
      <FeedbackDisplayer
        isFetching={isAddingToBasket}
        doneWithError={doneWithError}
        fetchingIcon={<CartIcon />}
        doneIcon={doneIcon}
      />
    )
  }
}
export default FeedbackDisplayComponent
