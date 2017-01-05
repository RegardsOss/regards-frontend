import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Fragment } from '@regardsoss/model'
import FragmentActions from '../model/FragmentActions'
import FragmentSelectors from '../model/FragmentSelectors'
import FragmentListComponent from '../components/FragmentListComponent'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class FragmentListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    fragmentList: React.PropTypes.objectOf(Fragment),
    // from mapDispatchToProps
    fetchFragmentList: React.PropTypes.func,
    deleteFragment: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchFragmentList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/fragment/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

  handleEdit = (fragmentId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/fragment/${fragmentId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(fragmentId) => {
    this.props.deleteFragment(fragmentId)
  }

  handleOpen =(projectName) => {
    const url = `/admin/${projectName}`
    browserHistory.push(url)
  }

  render() {
    const { fragmentList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-fragment-management/src/i18n">
        <FragmentListComponent
          fragmentList={fragmentList}
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
  fragmentList: FragmentSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchFragmentList: () => dispatch(FragmentActions.fetchEntityList(dispatch)),
  deleteFragment: id => dispatch(FragmentActions.deleteEntity(id, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentListContainer)

