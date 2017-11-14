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
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import partition from 'lodash/partition'
import some from 'lodash/some'
import filter from 'lodash/filter'
import startsWith from 'lodash/startsWith'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import CollectionEditLinksComponent from '../components/CollectionEditLinksComponent'
import { collectionLinkActions } from '../clients/CollectionLinkClient'
import messages from '../i18n'

/**
 * Show the collection form
 */
export class CollectionEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      collectionId: PropTypes.string,
    }),
    // from mapStateToProps
    currentCollection: DataManagementShapes.Collection,
    collectionList: DataManagementShapes.CollectionList,
    // from mapDispatchToProps
    removeTagFromCollection: PropTypes.func,
    addTagToCollection: PropTypes.func,
    fetchCollection: PropTypes.func,
    fetchCollectionList: PropTypes.func,
  }

  state = {
    collectionName: '',
    isLoading: true,
  }

  componentDidMount() {
    this.props.fetchCollectionList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project, collectionId } } = this.props
    return `/admin/${project}/data/collections/collection/${collectionId}/edit`
  }

  getComponent = collectionLinkedToCurrentCollection => (
    <CollectionEditLinksComponent
      linkedCollections={collectionLinkedToCurrentCollection[0]}
      remainingCollections={collectionLinkedToCurrentCollection[1]}
      handleAdd={this.handleAdd}
      handleDelete={this.handleDelete}
      handleSearch={this.handleSearch}
      backUrl={this.getBackUrl()}
      doneUrl={this.getDoneUrl()}
    />)

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/collection/list`
  }

  /**
   * Devide the collectionList into 2 sets, one linked to the current collection
   * and remaining collection can be associated with current collection
   * @param currentCollection
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollection = (currentCollection, collectionList) => {
    const { collectionName } = this.state
    const collectionLinkedToCurrentCollection = partition(collectionList, collection => some(currentCollection.content.tags, tag => tag === collection.content.ipId,
    ))
    return [
      collectionLinkedToCurrentCollection[0],
      // Remove the currentCollection from collectionList and use, if setup, the search input value
      filter(collectionLinkedToCurrentCollection[1], collection =>
        collection.content.id !== currentCollection.content.id && startsWith(collection.content.label.toLowerCase(), collectionName),
      ),
    ]
  }

  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = tag => Promise.resolve(this.props.addTagToCollection(this.props.currentCollection.content.id, [tag]))
    .then(actionResult => this.props.fetchCollection(this.props.params.collectionId))
  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = tag => Promise.resolve(this.props.removeTagFromCollection(this.props.currentCollection.content.id, [tag]))
    .then(actionResult => this.props.fetchCollection(this.props.params.collectionId))

  handleSearch = (event, collectionName) => {
    this.setState({
      collectionName: collectionName.toLowerCase(),
    })
  }

  render() {
    const { currentCollection, collectionList } = this.props
    const { isLoading } = this.state
    const collectionLinkedToCurrentCollection = this.getRemainingCollection(currentCollection, collectionList)
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getComponent(collectionLinkedToCurrentCollection)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: collectionSelectors.getById(state, ownProps.params.collectionId),
  collectionList: collectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(collectionActions.fetchEntityList()),
  fetchCollection: id => dispatch(collectionActions.fetchEntity(id)),
  addTagToCollection: (collectionId, tags) => dispatch(collectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'associate' })),
  removeTagFromCollection: (collectionId, tags) => dispatch(collectionLinkActions.sendSignal('PUT', tags, { collection_id: collectionId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditLinksContainer)
