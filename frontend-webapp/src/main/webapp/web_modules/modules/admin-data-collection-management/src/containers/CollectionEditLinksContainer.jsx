/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Collection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { partition, some } from 'lodash'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import CollectionSelectors from './../model/CollectionSelectors'
import CollectionActions from './../model/CollectionActions'
import CollectionEditLinksComponent from '../components/CollectionEditLinksComponent'

/**
 * Show the collection form
 */
export class CollectionEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      collectionId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentCollection: Collection,
    collectionList: React.PropTypes.objectOf(Collection),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    updateCollection: React.PropTypes.func,
    fetchCollectionList: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchCollectionList()
  }

  getBackUrl = () => {
    const { params: { project, collectionId } } = this.props
    return `/admin/${project}/data/collection/${collectionId}/edit`
  }

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/list`
  }

  handleUpdate = (values) => {
    const updatedCollection = {}
    Promise.resolve(this.props.updateCollection(this.props.attrModel.content.id, updatedCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getDoneUrl()
          browserHistory.push(url)
        }
      })
  }
  handleAdd = () => {
    console.log('Add')
  }

  handleDelete = () => {
    console.log('Delete')
  }

  getRemainingCollection = (currentCollection, collectionList) => {
    partition(collectionList, (collection) => {
      some(currentCollection.content.tags, tag => tag === '')
    })
  }

  render() {
    const { isFetching, currentCollection, collectionList } = this.props
    const collectionRemaining = this.getRemainingCollection(currentCollection, collectionList)
    console.log(isFetching, typeof currentCollection)
    const isLoading = isFetching || typeof currentCollection === 'undefined'
    return (
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (
            <CollectionEditLinksComponent
              currentCollection={currentCollection}
              handleAdd={this.handleAdd}
              handleDelete={this.handleDelete}
              backUrl={this.getBackUrl()}
            />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: CollectionSelectors.getById(state, ownProps.params.collectionId),
  collectionList: CollectionSelectors.getList(state),
  isFetching: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(CollectionActions.fetchPagedEntityList(0, 100)),
  updateCollection: (id, values) => dispatch(CollectionActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditLinksContainer)
