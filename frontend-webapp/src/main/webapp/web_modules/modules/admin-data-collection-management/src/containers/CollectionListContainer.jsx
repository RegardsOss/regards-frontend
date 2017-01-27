/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Collection } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import CollectionActions from '../model/CollectionActions'
import CollectionSelectors from '../model/CollectionSelectors'
import CollectionListComponent from '../components/CollectionListComponent'

/**
 * Show the collection list
 */
export class CollectionListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    collectionList: React.PropTypes.objectOf(Collection),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchCollectionList: React.PropTypes.func,
    deleteCollection: React.PropTypes.func,
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
    return `/admin/${project}/data/collection/${collectionId}/duplicate`
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
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
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
  collectionList: CollectionSelectors.getList(state),
  isFetching: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(CollectionActions.fetchPagedEntityList(0, 100)),
  deleteCollection: id => dispatch(CollectionActions.deleteEntity()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionListContainer)
