/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Collection } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
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
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    updateCollection: React.PropTypes.func,
    fetchCollection: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchCollection(this.props.params.collectionId)
  }

  getBackUrl = () => {
    const { params: { project }, currentCollection } = this.props
    return `/admin/${project}/data/collection/${currentCollection.content.id}/edit`
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

  render() {
    const { isFetching, currentCollection } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isFetching}
        >
          <CollectionEditLinksComponent
            currentCollection={currentCollection}
            onSubmit={this.handleEdit}
            backUrl={this.getBackUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: CollectionSelectors.getById(state, ownProps.params.collectionId),
  isFetching: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(CollectionActions.fetchEntity(id)),
  updateCollection: (id, values) => dispatch(CollectionActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEditLinksContainer)
