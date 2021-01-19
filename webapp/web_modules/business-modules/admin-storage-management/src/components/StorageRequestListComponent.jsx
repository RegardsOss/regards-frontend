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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { storageRequestActions, storageRequestSelectors } from '../clients/StorageRequestClient'
import messages from '../i18n'

/**
* Comment Here
* @author Sébastien Binda
*/
class StorageRequestListComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    storageLocation: PropTypes.string.isRequired, // eslint wont fix: used in onPropertiesUpdated (rule broken)
    // eslint-disable-next-line react/no-unused-prop-types
    requestsType: PropTypes.string.isRequired, // eslint wont fix: used in onPropertiesUpdated (rule broken)
    // eslint-disable-next-line react/no-unused-prop-types
    requestsStatus: PropTypes.string.isRequired, // eslint wont fix: used in onPropertiesUpdated (rule broken)
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static PAGE_SIZE = 100

  static MIN_ROW_COUNT = 5

  static MAX_ROW_COUNT = 8

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    this.setState({
      pathParams: {
        storage: newProps.storageLocation,
        type: newProps.requestsType,
      },
      requestParameters: {
        status: newProps.requestsStatus,
      },
    })
  }

  render() {
    const { pathParams, requestParameters } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <TableLayout>
        <PageableInfiniteTableContainer
          name="request-list"
          pageActions={storageRequestActions}
          pageSelectors={storageRequestSelectors}
          queryPageSize={StorageRequestListComponent.PAGE_SIZE}
          minRowCount={StorageRequestListComponent.MIN_ROW_COUNT}
          maxRowCount={StorageRequestListComponent.MAX_ROW_COUNT}
          // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
          columns={[ // eslint wont fix: API issue, requires major rework
            new TableColumnBuilder('column.error').titleHeaderCell().label(formatMessage({ id: 'storage.location.errors.view.table.label' })).propertyRenderCell('content.fileName')
              .fixedSizing(300)
              .build(),
            new TableColumnBuilder('column.error').titleHeaderCell().label(formatMessage({ id: 'storage.location.errors.view.table.error' })).propertyRenderCell('content.errorCause')
              .build()]}
          pathParams={pathParams}
          requestParams={requestParameters}
        />
      </TableLayout>
    )
  }
}

export default withI18n(messages)(StorageRequestListComponent)
