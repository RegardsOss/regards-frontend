/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'
import { orderListActions, orderListSelectors } from '../clients/OrderListClient'
import OrderListComponent from '../components/OrderListComponent'

/**
* Orders list container
* @author Raphaël Mechali
*/
export class OrderListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }).isRequired,
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/commands/board`
  }

  renderComponent = (filterSortingAndVisibilityProps) => {
    const { params: { project } } = this.props
    return (
      <OrderListComponent
        {...filterSortingAndVisibilityProps}
        project={project}
        backUrl={this.getBackURL()}
        ordersActions={orderListActions}
        ordersSelectors={orderListSelectors}
      />
    )
  }

  render() {
    return (
      <TableFilterSortingAndVisibilityContainer
        pageActions={orderListActions}
        pageSelectors={orderListSelectors}
        defaultFiltersState={OrderListComponent.DEFAULT_FILTERS_STATE}
      >
        {this.renderComponent}
      </TableFilterSortingAndVisibilityContainer>
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(OrderListContainer)
