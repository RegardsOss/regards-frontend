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
import FlatButton from 'material-ui/FlatButton'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, InfiniteTableContainer, TableColumnBuilder,
  NoContentComponent, TableHeaderLineLoadingAndResults, Breadcrumb,
  CardActionsComponent, StorageCapacityRender, FitContentDialog, ShowableAtRender,
} from '@regardsoss/components'
import { StorageShapes } from '@regardsoss/shape'
import AIPFileListStateRenderer from './AIPFileListStateRenderer'

/**
* List AIP files
* @author Léo Mieulet
*/
export class AIPFileListComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    entities: StorageShapes.DataObjectArray,
    isLoading: PropTypes.bool.isRequired,
    session: PropTypes.string.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static wrapperPreserveWhitespace = {
    whiteSpace: 'pre-wrap',
  }

  state = {
    showModal: false,
    stacktraces: [],
  }


  onBreadcrumbAction = (element, index) => {
    this.props.onBack(index)
  }

  getDialogActions = () => [
    <FlatButton
      key="cancel"
      label={this.context.intl.formatMessage({ id: 'oais.aips.files.modal.action.close' })}
      primary
      onClick={this.closeDialog}
    />,
  ]


  closeDialog = () => {
    this.setState({
      stacktraces: [],
      showModal: false,
    })
  }

  openErrorDialog = (entity) => {
    this.setState({
      stacktraces: entity.content.failureCauses,
      showModal: true,
    })
  }

  /**
   * Render the dialog containing the stacktrace.
   */
  renderStacktraceDialog = () => (
    <ShowableAtRender
      show={this.state.showModal}
    >
      <FitContentDialog
        title={this.context.intl.formatMessage({ id: 'oais.aips.files.modal.title' })}
        modal
        open={this.state.showModal}
        onRequestClose={this.closeDialog}
        autoScrollBodyContent
        actions={this.getDialogActions()}
      >
        <div style={AIPFileListComponent.wrapperPreserveWhitespace}>
          {map(this.state.stacktraces, stacktrace => (
            <span>
              {stacktrace}
              <br />
            </span>
          ))}
        </div>
      </FitContentDialog>
    </ShowableAtRender>
  )

  renderBreadCrump = () => {
    const { session } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [
      formatMessage({ id: 'oais.aips.session.title' }),
      formatMessage({ id: 'oais.aips.session.aips.title' }, { session }),
      formatMessage({ id: 'oais.aips.files.title' }),
    ]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={this.onBreadcrumbAction}
      />
    )
  }

  render() {
    const {
      entities, isLoading, onBack,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context

    // Table columns to display
    const columns = [
      new TableColumnBuilder('column@name').titleHeaderCell().propertyRenderCell('content.name')
        .label(formatMessage({ id: 'oais.aips.files.table.headers.name' }))
        .build(),
      new TableColumnBuilder('column@state').titleHeaderCell()
        .rowCellDefinition({
          Constructor: AIPFileListStateRenderer,
          props: {
            onShow: this.openErrorDialog,
          },
        })
        .label(formatMessage({ id: 'oais.aips.files.table.headers.state' }))
        .build(),
      new TableColumnBuilder('column@type').titleHeaderCell().propertyRenderCell('content.dataType')
        .label(formatMessage({ id: 'oais.aips.files.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column@filesize').titleHeaderCell().propertyRenderCell('content.fileSize', StorageCapacityRender)
        .label(formatMessage({ id: 'oais.aips.files.table.headers.filesize' }))
        .build(),
    ]

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'oais.aips.files.table.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    return (
      <Card>
        <CardTitle
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'oais.aips.files.subtitle' })}
        />
        {this.renderStacktraceDialog()}
        <CardText style={moduleTheme.root}>
          <TableLayout>
            <TableHeaderLineLoadingAndResults isFetching={isLoading} resultsCount={entities.length} />
            <InfiniteTableContainer
              columns={columns}
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
            mainButtonLabel={formatMessage({ id: 'oais.aips.files.actions.back' })}
            mainButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default AIPFileListComponent
