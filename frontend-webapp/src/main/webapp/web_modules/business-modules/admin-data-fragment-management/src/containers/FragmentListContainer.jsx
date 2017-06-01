/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Fragment } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FragmentListComponent from '../components/FragmentListComponent'
import { fragmentActions, fragmentSelectors } from '../clients/FragmentClient'
import { authenticationSelectors } from '../clients/AuthenticationClient'

/**
 * React container to manage the fragment list.
 * @author Léo Mieulet
 */
export class FragmentListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    fragmentList: PropTypes.objectOf(Fragment),
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    fetchFragmentList: PropTypes.func,
    deleteFragment: PropTypes.func,
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
    const { fragmentList, accessToken } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-fragment-management/src/i18n">
        <LoadableContentDisplayDecorator isLoading={this.state.isLoading}>
          <FragmentListComponent
            fragmentList={fragmentList}
            createUrl={this.getCreateUrl()}
            backUrl={this.getBackUrl()}
            accessToken={accessToken}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  fragmentList: fragmentSelectors.getListWithoutNoneFragment(state),
  accessToken: authenticationSelectors.getAccessToken(state),
})
const mapDispatchToProps = dispatch => ({
  fetchFragmentList: () => dispatch(fragmentActions.fetchEntityList()),
  deleteFragment: id => dispatch(fragmentActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentListContainer)

