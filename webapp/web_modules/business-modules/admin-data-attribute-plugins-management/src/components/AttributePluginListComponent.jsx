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
  NoContentComponent, TableHeaderLineLoadingSelectAllAndResults, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, CardActionsComponent,
} from '@regardsoss/components'
import { CommonShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AttributePluginEditAction from './AttributePluginEditAction'
import AttributePluginActivationAction from './AttributePluginActivationAction'
import AttributePluginListDuplicateAction from './AttributePluginListDuplicateAction'
import { pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'
import messages from '../i18n'
import styles from '../styles'

const MICROSERVICE = STATIC_CONF.MSERVICES.DAM

/**
* Component to display list of attribute calculation plugin configurations
* @author Sébastien Binda
*/
export class AttributePluginListComponent extends React.Component {
  static addDependencies = [pluginConfigurationByPluginIdActions.getMsDependency(RequestVerbEnum.POST, MICROSERVICE)]

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onAddNewConf: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
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
  }

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

  renderDeleteConfirmDialog = () => {
    const { entitytoDelete } = this.state
    if (entitytoDelete) {
      const name = entitytoDelete.content.label
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'model.attribute.calculation.plugins.list.confirm.title' }, { name })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const {
      entities, isLoading, onEdit, onActivateToggle, onRefresh, onAddNewConf, onBack,
      onDuplicate,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context

    const emptyComponent = (
      <NoContentComponent
        titleKey="model.attribute.calculation.plugins.list.empty.title"
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'model.attribute.calculation.plugins.list.title' })}
          subtitle={formatMessage({ id: 'model.attribute.calculation.plugins.list.subtitle' })}
        />
        <CardText style={moduleTheme.root}>
          {this.renderDeleteConfirmDialog()}
          <TableLayout>
            <TableHeaderLineLoadingSelectAllAndResults isFetching={isLoading} resultsCount={entities.length} />
            <InfiniteTableContainer
              // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
              columns={[ // eslint wont fix: API issue, requires major rework
                new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.label')
                  .label(formatMessage({ id: 'model.attribute.calculation.plugins.list.header.name.label' }))
                  .build(),
                new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.pluginId')
                  .label(formatMessage({ id: 'model.attribute.calculation.plugins.list.header.type.label' }))
                  .build(),
                new TableColumnBuilder('column.active').titleHeaderCell()
                  .rowCellDefinition({
                    Constructor: AttributePluginActivationAction, // custom cell
                    props: { onToggle: onActivateToggle },
                  })
                  .label(formatMessage({ id: 'model.attribute.calculation.plugins.list.header.active.label' }))
                  .build(),
                new TableColumnBuilder().optionsColumn([{
                  OptionConstructor: AttributePluginEditAction,
                  optionProps: { onEdit },
                }, {
                  OptionConstructor: AttributePluginListDuplicateAction,
                  optionProps: { onDuplicate },
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
            mainButtonLabel={formatMessage({ id: 'model.attribute.calculation.plugins.list.add.button' })}
            mainButtonClick={onAddNewConf}
            mainHateoasDependencies={AttributePluginListComponent.addDependencies}
            secondaryButtonLabel={formatMessage({ id: 'model.attribute.calculation.plugins.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AttributePluginListComponent))
