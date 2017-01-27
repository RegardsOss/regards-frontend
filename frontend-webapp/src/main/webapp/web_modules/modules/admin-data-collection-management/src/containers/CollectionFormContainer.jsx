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
import CollectionListComponent from '../components/CollectionListComponent'

/**
 * Show the collection form
 */
export class CollectionFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      collectionId: React.PropTypes.string,
      mode: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentCollection: Collection,
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createCollection: React.PropTypes.func,
    updateCollection: React.PropTypes.func,
    fetchCollection: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.collectionId === undefined,
      isEditing: props.params.collectionId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.collectionId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    if (this.state.isCreating === false) {
      this.props.fetchCollection(this.props.params.collectionId)
    }
  }
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collection/list`
  }

  handleUpdate = (values) => {
    const updatedCollection = {}
    Promise.resolve(this.props.updateCollection(this.props.attrModel.content.id, updatedCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }
  handleCreate = (values) => {
    Promise.resolve(this.props.createCollection({
      toto: 'titi',
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }
  render() {
    const { isFetching, currentCollection } = this.props
    const { isCreating, isEditing, isDuplicating } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-collection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={(isEditing || isDuplicating) && isFetching}
        >
          <CollectionListComponent
            currentCollection={(isEditing || isDuplicating) ? currentCollection : undefined}
            onSubmit={isEditing ? this.handleEdit : this.handleCreate}
            backUrl={this.getBackUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: ownProps.params.collectionId ? CollectionSelectors.getById(state, ownProps.params.collectionId) : null,
  isFetching: CollectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(CollectionActions.fetchEntity(id)),
  createCollection: values => dispatch(CollectionActions.createEntity(values)),
  updateCollection: (id, values) => dispatch(CollectionActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFormContainer)
