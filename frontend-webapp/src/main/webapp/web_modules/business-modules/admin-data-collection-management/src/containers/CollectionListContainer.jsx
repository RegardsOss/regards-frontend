/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import CollectionListComponent from '../components/CollectionListComponent'

/**
 * Show the collection list
 */
export class CollectionListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    collectionList: DataManagementShapes.CollectionList,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchCollectionList: PropTypes.func,
    deleteCollection: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchCollectionList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleDuplicate = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collection/${collectionId}/duplicate`
    browserHistory.push(url)
  }

  handleEdit = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collection/${collectionId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(collectionId) => {
    this.props.deleteCollection(collectionId)
  }

  render() {
    const { collectionList, isFetching } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <CollectionListComponent
            collectionList={collectionList}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  collectionList: collectionSelectors.getList(state),
  isFetching: collectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(collectionActions.fetchEntityList()),
  deleteCollection: id => dispatch(collectionActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionListContainer)
