/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import { withI18n } from '@regardsoss/i18n'
import DeleteDatedItemSelectionComponent from '../../../components/user/options/DeleteDatedItemSelectionComponent'
import messages from '../../../i18n'

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()

/**
* Container to display delete dated item component in basket
* @author Raphaël Mechali
*/
export class DeleteDatedItemSelectionContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { datasetSelectionId, itemsSelectionDate }) {
    return {
      dispatchDelete: () => dispatch(orderBasketActions.removeItemsSelectionFromBasket(datasetSelectionId, itemsSelectionDate)),
    }
  }

  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    datasetSelectionId: PropTypes.number.isRequired, // used only in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    itemsSelectionDate: PropTypes.string.isRequired, // used only in mapDispatchToProps
    // from mapDispatchToProps
    dispatchDelete: PropTypes.func.isRequired,
  }

  render() {
    const { disabled, dispatchDelete } = this.props
    return (
      <DeleteDatedItemSelectionComponent disabled={disabled} onDelete={dispatchDelete} />
    )
  }
}

export default compose(
  connect(null, DeleteDatedItemSelectionContainer.mapDispatchToProps),
  withI18n(messages),
)(DeleteDatedItemSelectionContainer)
