import { browserHistory } from 'react-router'
import connect from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AttributeModel } from '@regardsoss/model'
import AttributeModelActions from '../model/AttributeModelActions'
import AttributeModelSelectors from '../model/AttributeModelSelectors'
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

  componentWillMount() {
    this.props.fetchAttrModelList()
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
        <AttributeModelListComponent
          attrModelList={attrModelList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  attrModelList: AttributeModelSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchAttrModelList: () => dispatch(AttributeModelActions.fetchEntityList()),
  deleteAttrModel: id => dispatch(AttributeModelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelListContainer)

