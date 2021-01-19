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
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import FeedbackDisplayComponent from '../../../components/user/feedback/FeedbackDisplayComponent'

// get default selectors for basket state
const defaultBasketSelectors = OrderClient.getOrderBasketSelectors()

/**
 * Feedback display container: connects feedback components with current basket operations state
 * @author Raphaël Mechali
 */
export class FeedbackDisplayContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isAddingToBasket: defaultBasketSelectors.isAddingToBasket(state),
      lastAddStatusCode: defaultBasketSelectors.getStatusCode(state),
    }
  }

  static propTypes = {
    // from mapStateToProps
    isAddingToBasket: PropTypes.bool,
    lastAddStatusCode: PropTypes.number,
  }

  render() {
    const { isAddingToBasket = false, lastAddStatusCode } = this.props
    // when adding to basket
    let operationStatus = FeedbackDisplayComponent.OPERATION_STATUS.DONE_OK
    if (lastAddStatusCode >= 400) {
      operationStatus = FeedbackDisplayComponent.OPERATION_STATUS.FAILED
    } else if (lastAddStatusCode > 200) {
      operationStatus = FeedbackDisplayComponent.OPERATION_STATUS.DONE_EMPTY
    }
    return (
      <FeedbackDisplayComponent
        isAddingToBasket={isAddingToBasket}
        operationStatus={operationStatus}
      />
    )
  }
}
export default connect(FeedbackDisplayContainer.mapStateToProps)(FeedbackDisplayContainer)
