import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import AttributeModelListComponent from '../components/AttributeModelListComponent'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class AttributeModelListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    attrModelArray: DataManagementShapes.AttributeModelArray,
    // from mapDispatchToProps
    fetchAttrModelList: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deleteAttrModel: PropTypes.func,
    throwError: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentWillMount() {
    this.props.fetchAttrModelList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/attribute/model/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleEdit = (attrModelId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/attribute/model/${attrModelId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(attrModelId) => {
    this.props.throwError('Delete is not applicable on attributes yet.')
    // FIXME : Handle delete attribute into backend with new indexation of elasticsearch
    // this.props.deleteAttrModel(attrModelId)
  }


  render() {
    const { attrModelArray } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-attributemodel-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={this.state.isLoading}>
          <AttributeModelListComponent
            attrModelArray={attrModelArray}
            createUrl={this.getCreateUrl()}
            backUrl={this.getBackUrl()}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  attrModelArray: attributeModelSelectors.getArrayOrderedUsingFragmentAndAttributeName(state),
})
const mapDispatchToProps = dispatch => ({
  fetchAttrModelList: () => dispatch(attributeModelActions.fetchEntityList()),
  deleteAttrModel: id => dispatch(attributeModelActions.deleteEntity(id)),
  throwError: message => dispatch(ApplicationErrorAction.throwError(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelListContainer)

