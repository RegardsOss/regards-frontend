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
import { connect } from '@regardsoss/redux'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DBDatasourceFormAttributesComponent from '../../components/db/DBDatasourceFormAttributesComponent'
import { modelSelectors, modelActions } from '../../clients/ModelClient'
import { connectionActions, connectionSelectors } from '../../clients/ConnectionClient'
import messages from '../../i18n'

/**
 * Show the datasource form
 */
export class DBDatasourceFormAttributesContainer extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    handleSave: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    currentConnectionId: PropTypes.string.isRequired,
    // from mapStateToProps
    modelList: DataManagementShapes.ModelList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    currentConnection: DataManagementShapes.Connection,
    // from mapDispatchToProps
    fetchModelList: PropTypes.func,
    fetchConnection: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchModelList(),
      this.props.fetchConnection(this.props.currentConnectionId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const {
      currentDatasource, currentConnection, pluginMetaDataList, modelList, handleSave, backUrl,
    } = this.props
    const { isLoading } = this.state

    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DBDatasourceFormAttributesComponent
            modelList={modelList}
            currentDatasource={currentDatasource}
            currentConnection={currentConnection}
            pluginMetaDataList={pluginMetaDataList}
            onSubmit={handleSave}
            backUrl={backUrl}
          />)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelList: modelSelectors.getList(state),
  currentConnection: connectionSelectors.getByBusinessId(state, ownProps.currentConnectionId),
})

const mapDispatchToProps = (dispatch) => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
  fetchConnection: (id) => dispatch(connectionActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DBDatasourceFormAttributesContainer)
