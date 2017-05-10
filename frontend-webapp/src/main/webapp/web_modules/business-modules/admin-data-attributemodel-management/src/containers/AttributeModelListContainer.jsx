import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { attributeModelActions, attributeModelSelectors } from '../client/AttributeModelClient'
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
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    attrModelList: React.PropTypes.objectOf(AttributeModel),
    // from mapDispatchToProps
    fetchAttrModelList: React.PropTypes.func,
    deleteAttrModel: React.PropTypes.func,
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
    this.props.deleteAttrModel(attrModelId)
  }


  render() {
    const { attrModelList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-attributemodel-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={this.state.isLoading}>
          <AttributeModelListComponent
            attrModelList={attrModelList}
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
  attrModelList: attributeModelSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchAttrModelList: () => dispatch(attributeModelActions.fetchEntityList()),
  deleteAttrModel: id => dispatch(attributeModelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelListContainer)

