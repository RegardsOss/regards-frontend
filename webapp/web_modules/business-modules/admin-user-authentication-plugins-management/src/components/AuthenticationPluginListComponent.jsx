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
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, CardActionsComponent, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { CommonShapes } from '@regardsoss/shape'
import { AuthenticationDomain } from '@regardsoss/domain'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AuthenticationPluginEditAction from './AuthenticationPluginEditAction'
import ServiceProviderEditAction from './ServiceProviderEditAction'
import AuthenticationPluginActivationAction from './AuthenticationPluginActivationAction'
import ServiceProviderDeleteAction from './ServiceProviderDeleteAction'
import { tableActions } from '../clients/TableClient'
import { pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'
import { serviceProviderActions, serviceProviderSelectors } from '../clients/ServiceProviderClient'
import messages from '../i18n'
import styles from '../styles'

const MICROSERVICE = STATIC_CONF.MSERVICES.AUTHENTICATION

/**
* Component to display list of authentication plugin configurations
* @author Sébastien Binda
*/
export class AuthenticationPluginListComponent extends React.Component {
  static addDependencies = [pluginConfigurationByPluginIdActions.getMsDependency(RequestVerbEnum.POST, MICROSERVICE)]

  static addServiceProviderDependencies = [serviceProviderActions.getMsDependency(RequestVerbEnum.POST, MICROSERVICE)]

  static PAGE_SIZE = 100

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onAddNewConf: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onActivateToggle: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    entities: CommonShapes.PluginConfigurationArray,
    isLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    entitytoDelete: null,
    pluginType: null,
  }

  onConfirmDelete = (pluginType) => {
    this.closeDeleteDialog()
    if (this.state.entitytoDelete) {
      this.props.onDelete(this.state.entitytoDelete.content, pluginType)
    }
  }

  onDelete = (entitytoDelete, pluginType) => {
    this.setState({
      entitytoDelete,
      pluginType,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      entitytoDelete: null,
      pluginType: null,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { entitytoDelete, pluginType } = this.state
    if (entitytoDelete) {
      const name = pluginType === AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER ? entitytoDelete.content.name : entitytoDelete.content.label
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'user.authentication.plugins.list.confirm.delete.title' }, { name })}
          onConfirm={() => this.onConfirmDelete(pluginType)}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const {
      entities, isLoading, onEdit, onActivateToggle, onRefresh, onAddNewConf, onBack,
    } = this.props
    const { intl: { formatMessage }, moduleTheme, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    // Table columns to display
    const emptyComponent = (
      <NoContentComponent
        titleKey="user.authentication.plugins.list.empty.title"
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'user.authentication.plugins.list.title' })}
          subtitle={formatMessage({ id: 'user.authentication.plugins.list.subtitle' })}
        />
        <CardText style={moduleTheme.root}>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length} />
            <InfiniteTableContainer
              // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
              columns={[ // eslint wont fix: Infinite table APi issue
                new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.label')
                  .label(formatMessage({ id: 'user.authentication.plugins.list.header.name.label' }))
                  .build(),
                new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.pluginId')
                  .label(formatMessage({ id: 'user.authentication.plugins.list.header.type.label' }))
                  .build(),
                new TableColumnBuilder('column.active').titleHeaderCell()
                  .rowCellDefinition({
                    Constructor: AuthenticationPluginActivationAction, // custom cell
                    props: { onToggle: onActivateToggle },
                  })
                  .label(formatMessage({ id: 'user.authentication.plugins.list.header.active.label' }))
                  .build(),
                new TableColumnBuilder().optionsColumn([{
                  OptionConstructor: AuthenticationPluginEditAction,
                  optionProps: { onEdit },
                }, {
                  OptionConstructor: TableDeleteOption,
                  optionProps: {
                    onDelete: this.onDelete,
                    fetchPage: onRefresh,
                    handleHateoas: true,
                    disableInsteadOfHide: true,
                    queryPageSize: 20,
                  },
                }]).build(),
              ]}
              entities={entities}
              emptyComponent={emptyComponent}
              entitiesCount={entities.length}
              minRowCount={0}
              maxRowCount={30}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'user.authentication.plugins.list.add.button' })}
            mainButtonClick={() => onAddNewConf(AuthenticationDomain.PluginTypeEnum.AUTHENTICATION)}
            mainHateoasDependencies={AuthenticationPluginListComponent.addDependencies}
            secondaryButtonLabel={formatMessage({ id: 'user.authentication.plugins.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
        <CardText style={moduleTheme.root}>
          <TableLayout>
            <TableHeaderLineLoadingAndResults />
            <PageableInfiniteTableContainer
              // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
              columns={[ // eslint wont fix: Infinite table APi issue
                new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.name')
                  .label(formatMessage({ id: 'user.authentication.plugins.list.header.name' }))
                  .build(),
                new TableColumnBuilder('column.pluginId').titleHeaderCell().propertyRenderCell('content.pluginConfiguration.pluginId')
                  .label(formatMessage({ id: 'user.authentication.plugins.list.header.pluginId' }))
                  .build(),
                new TableColumnBuilder().optionsColumn([{
                  OptionConstructor: ServiceProviderEditAction,
                  optionProps: { onEdit },
                }, {
                  OptionConstructor: ServiceProviderDeleteAction,
                  optionProps: {
                    onDelete: this.onDelete,
                  },
                }]).build(),
              ]}
              pageActions={serviceProviderActions}
              pageSelectors={serviceProviderSelectors}
              tableActions={tableActions}
              emptyComponent={emptyComponent}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              pageSize={AuthenticationPluginListComponent.PAGE_SIZE}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'user.authentication.external.plugins.list.add.button' })}
            mainButtonClick={() => onAddNewConf(AuthenticationDomain.PluginTypeEnum.SERVICE_PROVIDER)}
            mainHateoasDependencies={AuthenticationPluginListComponent.addServiceProviderDependencies}
            secondaryButtonLabel={formatMessage({ id: 'user.authentication.plugins.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AuthenticationPluginListComponent))
