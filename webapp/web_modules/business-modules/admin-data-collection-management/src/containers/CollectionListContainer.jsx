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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import get from 'lodash/get'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import CollectionListComponent from '../components/CollectionListComponent'
import messages from '../i18n'

/**
 * Show the collection list
 */
export class CollectionListContainer extends React.Component {
  static propTypes = {
    meta: PropTypes.shape({
      // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDispatchToProps
    fetchCollectionList: PropTypes.func,
    deleteCollection: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchCollectionList()).then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  onRefresh = (filters) => {
    const { meta, fetchCollectionList } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchCollectionList(0, CollectionListComponent.PAGE_SIZE * (curentPage + 1), {}, filters)
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/collection/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/board`
  }

  navigateToCreateCollection = () => {
    browserHistory.push(this.getCreateUrl())
  }

  handleDuplicate = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/collection/${collectionId}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/collection/${collectionId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (collectionId) => {
    this.props.deleteCollection(collectionId)
  }

  render() {
    const { fetchCollectionList } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={this.state.isLoading}>
          <CollectionListComponent
            fetchCollectionList={fetchCollectionList}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            onRefresh={this.onRefresh}
            backUrl={this.getBackUrl()}
            navigateToCreateCollection={this.navigateToCreateCollection}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: collectionSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionList: (pageIndex, pageSize, requestParams, queryParams) => dispatch(collectionActions.fetchPagedEntityList(pageIndex, pageSize, requestParams, queryParams)),
  deleteCollection: (id) => dispatch(collectionActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionListContainer)
