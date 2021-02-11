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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceSelectors, datasourceActions } from '../clients/DatasourceClient'
import DatasetCreateOrPickDatasourceComponent from '../components/DatasetCreateOrPickDatasourceComponent'
import messages from '../i18n'

/**
 * Pick the datasource if existing or ask the user to create a new one
 */
export class DatasetCreateOrPickDatasourceContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    datasourceList: DataManagementShapes.DatasourceList,
    // from mapDispatchToProps
    fetchDatasourceList: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchDatasourceList())
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/dataset/list`
  }

  getCreateDatasourceUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/datasource/create/interface`
  }

  redirectToForm = (datasourceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/create/${datasourceId}`
    browserHistory.push(url)
  }

  render() {
    const { datasourceList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <DatasetCreateOrPickDatasourceComponent
            datasourceList={datasourceList}
            createDatasourceUrl={this.getCreateDatasourceUrl()}
            backUrl={this.getBackUrl()}
            handleDone={this.redirectToForm}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  datasourceList: datasourceSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchDatasourceList: () => dispatch(datasourceActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetCreateOrPickDatasourceContainer)
