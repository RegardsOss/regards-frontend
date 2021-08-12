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
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import {
  TableLayout, PageableInfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingSelectAllAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, CardActionsComponent,
} from '@regardsoss/components'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import DatasetLabel from './DatasetLabel'
import SearchEngineConfigurationEditAction from './SearchEngineConfigurationEditAction'
import SearchEngineConfigurationInfoAction from './SearchEngineConfigurationInfoAction'
import SearchEngineConfigurationInfoDialog from './SearchEngineConfigurationInfoDialog'
import { searchEngineConfigurationsActions, searchEngineConfigurationsSelectors } from '../../clients/SearchEngineConfigurationsClient'
import messages from '../../i18n'
import styles from '../../styles'

/**
* Component to display search engine configurations list
* @author Sébastien Binda
*/
export class SearchEngineConfigurationListComponent extends React.Component {
  static addDependencies = [searchEngineConfigurationsActions.getDependency(RequestVerbEnum.POST)]

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onAddNewConf: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,
    datasetList: DataManagementShapes.DatasetList,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    entitytoDelete: null,
    engineForInfos: null,
  }

  onCloseInfoDialog = () => this.showInformation(null)

  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.entitytoDelete) {
      this.props.onDelete(this.state.entitytoDelete.content)
    }
  }

  onDelete = (entitytoDelete) => {
    this.setState({
      entitytoDelete,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      entitytoDelete: null,
    })
  }

  showInformation = (engine) => {
    this.setState({
      engineForInfos: engine,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { entitytoDelete } = this.state
    if (entitytoDelete) {
      const name = entitytoDelete.content.label
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'dataaccess.searchengines.list.confirm.delete.title' }, { name })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const {
      resultsCount, isLoading, onAddNewConf, onEdit, onBack, datasetList,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context

    // Table columns to display
    const columns = [
      // id column
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.label')
        .label(formatMessage({ id: 'dataaccess.searchengines.list.header.label' }))
        .build(),
      new TableColumnBuilder('column.engine').titleHeaderCell().propertyRenderCell('content.configuration.pluginId')
        .label(formatMessage({ id: 'dataaccess.searchengines.list.header.engine' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.datasetUrn', DatasetLabel, { datasetList })
        .label(formatMessage({ id: 'dataaccess.searchengines.list.header.dataset' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: SearchEngineConfigurationInfoAction,
        optionProps: { onClick: this.showInformation },
      }, {
        OptionConstructor: SearchEngineConfigurationEditAction,
        optionProps: { onEdit },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          handleHateoas: true,
          disableInsteadOfHide: true,
          fetchPage: this.props.fetchPage,
          onDelete: this.onDelete, // note: this will not be used (refresh is handled locally)
          queryPageSize: 20,
        },
      }]).build(),
    ]

    const emptyComponent = (
      <NoContentComponent
        titleKey="dataaccess.searchengines.list.empty.title"
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'dataaccess.searchengines.list.title' })}
          subtitle={formatMessage({ id: 'dataaccess.searchengines.list.subtitle' })}
        />
        <CardText style={moduleTheme.root}>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <TableHeaderLineLoadingSelectAllAndResults isFetching={isLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="search-engines"
              pageActions={searchEngineConfigurationsActions}
              pageSelectors={searchEngineConfigurationsSelectors}
              pageSize={20}
              minRowCount={2}
              maxRowCount={10}
              columns={columns}
              emptyComponent={emptyComponent}
            />
          </TableLayout>
          <SearchEngineConfigurationInfoDialog
            searchEngineConfiguration={this.state.engineForInfos}
            onClose={this.onCloseInfoDialog}
          />
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'dataaccess.searchengines.list.add.button' })}
            mainButtonClick={onAddNewConf}
            mainHateoasDependencies={SearchEngineConfigurationListComponent.addDependencies}
            secondaryButtonLabel={formatMessage({ id: 'dataaccess.searchengines.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(SearchEngineConfigurationListComponent))
