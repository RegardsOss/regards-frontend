/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Fragment } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FragmentListComponent from '../components/FragmentListComponent'
import { fragmentActions, fragmentSelectors } from '../client/FragmentClient'
import { authenticationSelectors } from '../client/AuthenticationClient'

/**
 * React container to manage the fragment list.
 * @author Léo Mieulet
 */
export class FragmentListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    fragmentList: React.PropTypes.objectOf(Fragment),
    accessToken: React.PropTypes.string,
    // from mapDispatchToProps
    fetchFragmentList: React.PropTypes.func,
    deleteFragment: React.PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentWillMount() {
    this.props.fetchFragmentList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
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
    const { fragmentList, accessToken, params: { project } } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-fragment-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={this.state.isLoading}>
          <FragmentListComponent
            fragmentList={fragmentList}
            createUrl={this.getCreateUrl()}
            backUrl={this.getBackUrl()}
            accessToken={accessToken}
            projectName={project}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  fragmentList: fragmentSelectors.getList(state),
  accessToken: authenticationSelectors.getAccessToken(state),
})
const mapDispatchToProps = dispatch => ({
  fetchFragmentList: () => dispatch(fragmentActions.fetchEntityList()),
  deleteFragment: id => dispatch(fragmentActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentListContainer)

