/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardMedia, CardActions,
} from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { storageRequestActions, storageRequestSelectors } from '../clients/StorageRequestClient'

/**
* Comment Here
* @author Sébastien Binda
*/
export class StorageRequestListComponent extends React.Component {
  static propTypes = {
    storageLocation: PropTypes.string.isRequired,
    requestsType: PropTypes.string.isRequired,
    requestsStatus: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const pageSize = 100
    const minRowCount = 5
    const maxRowCount = 20

    const pathParams = {
      storage: this.props.storageLocation,
      type: this.props.requestsType,
    }
    const requestParameters = {
      status: this.props.requestsStatus,
    }

    const columns = [
      new TableColumnBuilder('column.error').titleHeaderCell().propertyRenderCell('content.errorCause').build()]

    return (
      <CardMedia>
        <TableLayout>
          <PageableInfiniteTableContainer
            name="request-list"
            pageActions={storageRequestActions}
            pageSelectors={storageRequestSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            pathParams={pathParams}
            requestParams={requestParameters}
          />
        </TableLayout>
      </CardMedia>
    )
  }
}

export default StorageRequestListComponent
