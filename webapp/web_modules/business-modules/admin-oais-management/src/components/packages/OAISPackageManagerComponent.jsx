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
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { AIP_STATUS } from '@regardsoss/domain/ingest'
import Dialog from 'material-ui/Dialog'
import { aipActions, aipSelectors } from '../../clients/AIPClient'
import messages from '../../i18n'
import styles from '../../styles'
import { aipTableSelectors, aipTableActions } from '../../clients/AIPTableClient'
import StorageArrayRender from './StorageArrayRender'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import AIPStoreRetryOption from '../aip/options/AIPStoreRetryOption'
import AIPDetailOption from '../aip/options/AIPDetailOption'
import DeleteAIPOnSomeStoragesOption from '../aip/options/DeleteAIPOnSomeStoragesOption'
import DeleteAIPOnAllStoragesOption from '../aip/options/DeleteAIPOnAllStoragesOption'
import AIPDetailComponent from '../aip/AIPDetailComponent'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    onRetryAIPStorage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    componentFilters: {},
    requestParameters: {},
    aipToView: null,
    deleteOperation: null, // current delete operation or null
  }

  componentWillReceiveProps(nextProps) {
    const { featureManagerFilters } = this.state
    if (!isEqual(nextProps.featureManagerFilters, featureManagerFilters)) {
      this.setState({
        requestParameters: {
          ...this.state.requestParameters,
          ...nextProps.featureManagerFilters,
        },
      })
    }
  }

  onApplyFilters = () => {
    const { componentFilters, requestParameters } = this.state

    this.setState({
      componentFilters,
      requestParameters: {
        ...requestParameters,
        ...componentFilters,
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const { componentFilters } = this.state

    this.setState({
      componentFilters: {
        ...componentFilters,
        ...newFilterValue,
      },
    })
  }

  changeStateFilter = (event, index, values) => {
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ type: values })
  }

  changeCategoryFilter = (event, index, values) => {
    this.onFilterUpdated({ categories: values })
  }

  /**
   * User callback: retry AIP storage
   */
  onRetryAIPStorage = aip => this.props.onRetryAIPStorage(aip)

  onViewAIPDetail = (aipToView) => {
    this.setState({
      aipToView: aipToView || null,
    })
  }

  onCloseDetails = () => {
    this.setState({
      aipToView: null,
    })
  }

  /**
   * Callback: user asked to delete AIP files on every storages. Show corresponding dialog.
   * @param {string} aipSelectionMode selection mode for AIP to delete (included or excluded, from TableSelectionModes)
   * @param {[*]} toggleAIPs toggled AIP list (either to include or exclude from deletion request)
   */
  onDeleteEverywhere = (aipSelectionMode, toggleAIPs) => {
    this.setState({
      deleteOperation: {
        aipDeletionMode: 'DELETE_ON_ALL_STORAGES',
        aipSelectionMode,
        toggleAIPs,
      },
    })
  }

  /**
   * Callback: user asked to delete AIP files on some storages. Show corresponding dialog.
   * @param {string} aipSelectionMode selection mode for AIP to delete (included or excluded, from TableSelectionModes)
   * @param {[*]} toggleAIPs toggled AIP list (either to include or exclude from deletion request)
   */
  onDeleteOnSomeStorages = (aipSelectionMode, toggleAIPs) => {
    this.setState({
      deleteOperation: {
        aipDeletionMode: 'DELETE_ON_SOME_STORAGES',
        aipSelectionMode,
        toggleAIPs,
      },
    })
  }

  /**
   * After delete request was confirmed and performed or cancelled. Hide dialog
   */
  onCloseDeleteDialog = () => {
    this.setState({
      deleteOperation: null,
    })
  }

  renderAIPDetail = () => {
    const { intl } = this.context
    const { aipToView } = this.state

    if (!aipToView) {
      return null
    }
    return (
      <Dialog
        title={intl.formatMessage({ id: 'oais.aips.list.aip-details.title' })}
        open
        onRequestClose={this.handleaipToView}
      >
        <AIPDetailComponent
          aip={this.state.aipToView}
          onClose={this.onCloseDetails}
        />
      </Dialog>
    )
  }

  /**
   * Renders delete dialog for current deletion context (mode and selection)
   */
  renderDeleteDialog = () => {
    const { onRefresh } = this.props
    const { deleteOperation, requestParameters } = this.state
    // TODO
    return null
  }

  render() {
    const { intl, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize } = this.props
    const { componentFilters, requestParameters } = this.state
    const states = AIP_STATUS
    const types = ENTITY_TYPES

    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.state')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .build(),
      new TableColumnBuilder('column.lastUpdate').titleHeaderCell().propertyRenderCell('content.lastUpdate')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .build(),
      new TableColumnBuilder('column.version').titleHeaderCell().propertyRenderCell('content.aipId')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.version' }))
        .build(),
      new TableColumnBuilder('column.storages').titleHeaderCell()
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.data.storages' }))
        .propertyRenderCell('content.ingestMetadata.storages', StorageArrayRender)
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AIPStoreRetryOption,
        optionProps: { onRetry: this.onRetryAIPStorage },
      }, {
        OptionConstructor: AIPDetailOption,
        optionProps: { onViewDetail: this.onViewAIPDetail },
      }, { // Delete on some storage
        OptionConstructor: DeleteAIPOnSomeStoragesOption,
        optionProps: {
          onDelete: this.onDeleteOnSomeStorages,
        },
      }, { // Delete on all storages
        OptionConstructor: DeleteAIPOnAllStoragesOption,
        optionProps: {
          onDelete: this.onDeleteEverywhere,
        },
      }])
        .build(),
    ]

    return (
      <div>
        <TableLayout>
          <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
            <TableHeaderOptionGroup key="first">
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.type',
                })}
                value={componentFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(types, type => <MenuItem key={type} value={type} primaryText={type} />)}
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.state',
                })}
                value={componentFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(states, state => <MenuItem key={state} value={state} primaryText={state} />)}
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="apply"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.apply' })}
                icon={<Filter />}
                onClick={this.onApplyFilters}
              />
              <FlatButton
                key="modify"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                icon={<Filter />}
                onClick={this.onApplyFilters}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <PageableInfiniteTableContainer
            name="package-management-table"
            pageActions={aipActions}
            pageSelectors={aipSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={requestParameters}
          />
        </TableLayout>
        {this.renderAIPDetail()}
        {this.renderDeleteDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISPackageManagerComponent))
