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
import { themeContextType } from '@regardsoss/theme'
import {
  CardActionsComponent,
  ShowableAtRender,
  ConfirmDialogComponentTypes,
  TableHeaderOptionsArea,
  NoContentComponent, TableLayout,
  TableHeaderLine,
  TableHeaderOptionGroup,
  InfiniteTableContainer, TableColumnBuilder, ConfirmDialogComponent,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { ProcessingShapes } from '@regardsoss/shape'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { ProcessingDomain } from '@regardsoss/domain'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Refresh from 'mdi-material-ui/Refresh'
import Card from 'material-ui/Card'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import CardActions from 'material-ui/Card/CardActions'
import FlatButton from 'material-ui/FlatButton'
import processingDependencies from '../dependencies'
import ProcessingListFiltersComponent from './ProcessingListFiltersComponent'
import ProcessingProcessNameRenderer from './render/ProcessingProcessNameRenderer'
import ProcessingEditComponent from './ProcessingEditComponent'
import ProcessingDeleteComponent from './ProcessingDeleteComponent'

const FlatButtonWithResourceDisplayControl = withResourceDisplayControl(FlatButton)

/**
 * Component to display processing list in project
 * @author Théo Lasserre
 */
class ProcessingListComponent extends React.Component {
    static propTypes = {
      processingList: ProcessingShapes.ProcessingArray.isRequired,
      handleDelete: PropTypes.func.isRequired,
      handleEdit: PropTypes.func.isRequired,
      createUrl: PropTypes.string.isRequired,
      navigateToCreateProcessing: PropTypes.func.isRequired,
      onRefresh: PropTypes.func.isRequired,
      backUrl: PropTypes.string.isRequired,
    }

    static contextTypes = {
      ...themeContextType,
      ...i18nContextType,
    }

    static ICON_STYLE = {
      margin: 5,
    }

    state = {
      processingToDelete: null,
      deleteDialogOpened: false,
    }

    closeDeleteDialog = () => {
      this.setState({
        deleteDialogOpened: false,
        processingToDelete: null,
      })
    }

    openDeleteDialog = (processing) => {
      this.setState({
        deleteDialogOpened: true,
        processingToDelete: processing,
      })
    }

    renderDeleteConfirmDialog = () => {
      const name = this.state.processingToDelete
        ? ProcessingDomain.getProcessingName(this.state.processingToDelete)
        : 'processNameNotFound'
      const title = this.context.intl.formatMessage({ id: 'processing.management.list.delete.title' }, { name })
      return (
        <ShowableAtRender show={this.state.deleteDialogOpened}>
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.DELETE}
            onConfirm={() => {
              this.props.handleDelete(this.state.processingToDelete.content.pluginConfiguration.businessId)
            }}
            onClose={this.closeDeleteDialog}
            title={title}
          />
        </ShowableAtRender>
      )
    }

    render() {
      const {
        processingList, handleEdit, createUrl, backUrl, onRefresh, navigateToCreateProcessing,
      } = this.props
      const { intl: { formatMessage }, muiTheme } = this.context
      const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

      const columns = [
        // 1 - process name column
        new TableColumnBuilder('column.processName')
          .titleHeaderCell()
          .rowCellDefinition({ Constructor: ProcessingProcessNameRenderer })
          .label(formatMessage({ id: 'processing.monitoring.list.header.name.label' }))
          .build(),
        // 2 - process user role
        new TableColumnBuilder('column.userRole')
          .titleHeaderCell()
          .propertyRenderCell('content.rights.role')
          .label(formatMessage({ id: 'processing.monitoring.list.header.userRole' }))
          .build(),
        // 3 - Options
        new TableColumnBuilder('column.options')
          .label(formatMessage({ id: 'processing.monitoring.list.header.option' }))
          .optionsColumn([{
            OptionConstructor: ProcessingEditComponent,
            optionProps: { handleEdit },
          }, {
            OptionConstructor: ProcessingDeleteComponent,
            optionProps: { handleDelete: this.openDeleteDialog },
          }]).build(),
      ]

      const emptyContentAction = (
        <FlatButtonWithResourceDisplayControl
          resourceDependencies={processingDependencies.addProcessingDependencies}
          label={formatMessage({ id: 'processing.management.list.no.processing.subtitle' })}
          onClick={navigateToCreateProcessing}
          primary
        />
      )

      const emptyComponent = (
        <NoContentComponent
          titleKey="processing.management.list.no.processing.title"
          Icon={AddToPhotos}
          action={emptyContentAction}
        />
      )

      return (
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'processing.management.list.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'processing.management.list.subtitle' })}
          />
          <CardText>
            {this.renderDeleteConfirmDialog()}
            <TableLayout>
              <ProcessingListFiltersComponent onRefresh={onRefresh} />
              <TableHeaderLine>
                <TableHeaderOptionsArea>
                  <TableHeaderOptionGroup>
                    <FlatButton
                      label={formatMessage({ id: 'processing.management.table.refresh.button' })}
                      icon={<Refresh />}
                      onClick={this.props.onRefresh}
                    />
                  </TableHeaderOptionGroup>
                </TableHeaderOptionsArea>
              </TableHeaderLine>
              <InfiniteTableContainer
                minRowCount={minRowCount}
                maxRowCount={maxRowCount}
                columns={columns}
                emptyComponent={emptyComponent}
                entities={processingList}
              />
            </TableLayout>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonUrl={createUrl}
              mainButtonLabel={formatMessage({ id: 'processing.management.list.add.button' })}
              mainHateoasDependencies={processingDependencies.addProcessingDependencies}
              secondaryButtonLabel={formatMessage({ id: 'processing.management.list.cancel.button' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      )
    }
}
export default ProcessingListComponent
