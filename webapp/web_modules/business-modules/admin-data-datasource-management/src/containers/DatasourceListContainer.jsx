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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceActions, datasourceSelectors } from '../clients/DatasourceClient'
import DatasourceListComponent from '../components/DatasourceListComponent'
import messages from '../i18n'
import EditionHelper from '../domain/EditionHelper'

/**
 * Show the datasource list
 */
export class DatasourceListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    datasourceList: PropTypes.arrayOf(DataManagementShapes.Datasource),
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchDatasourceList: PropTypes.func,
    deleteDatasource: PropTypes.func,
    updateDatasource: PropTypes.func,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchDatasourceList()
  }

  onToggleState = (datasource) => {
    const updatedDatasource = { ...datasource }
    updatedDatasource.content.active = !updatedDatasource.content.active
    this.props.updateDatasource(updatedDatasource.content.businessId, updatedDatasource.content)
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/create/interface`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/board`
  }

  /**
   * Redirect the user to the corresponding page
   */
  handleEdit = (datasource) => {
    const { params: { project } } = this.props
    const datasourceId = datasource.content.businessId
    const type = EditionHelper.getDatasourcePluginType(datasource)

    const url = `/admin/${project}/data/acquisition/datasource/${type}/${datasourceId}/edit`

    browserHistory.push(url)
  }

  handleDelete = (datasourceId) => {
    this.props.deleteDatasource(datasourceId)
  }

  refreshDatasourceList = () => {
    this.props.fetchDatasourceList()
  }

  render() {
    const { datasourceList, isFetching } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <DatasourceListComponent
            datasourceList={datasourceList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
            refreshDatasourceList={this.refreshDatasourceList}
            onToggleState={this.onToggleState}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  datasourceList: datasourceSelectors.getOrderedList(state),
  isFetching: datasourceSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchDatasourceList: () => dispatch(datasourceActions.fetchEntityList()),
  deleteDatasource: (id) => dispatch(datasourceActions.deleteEntity(id)),
  updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceListContainer)
