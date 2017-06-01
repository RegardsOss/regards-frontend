/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Collection } from '@regardsoss/model'
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
    collectionList: PropTypes.objectOf(Collection),
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
