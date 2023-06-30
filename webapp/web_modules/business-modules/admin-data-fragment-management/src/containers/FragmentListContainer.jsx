/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FragmentListComponent from '../components/FragmentListComponent'
import { fragmentActions, fragmentSelectors } from '../clients/FragmentClient'
import { authenticationSelectors } from '../clients/AuthenticationClient'
import messages from '../i18n'

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
    fragmentList: DataManagementShapes.FragmentList,
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    fetchFragmentList: PropTypes.func,
    deleteFragment: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchFragmentList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/fragment/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/board`
  }

  handleEdit = (fragmentId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/models/fragment/${fragmentId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (fragmentId) => {
    this.props.deleteFragment(fragmentId)
  }

  handleOpen = (projectName) => {
    const url = `/admin/${projectName}`
    browserHistory.push(url)
  }

  render() {
    const { fragmentList, accessToken } = this.props
    return (
      <I18nProvider messages={messages}>
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
const mapStateToProps = (state) => ({
  fragmentList: fragmentSelectors.getListWithoutNoneFragment(state),
  accessToken: authenticationSelectors.getAccessToken(state),
})
const mapDispatchToProps = (dispatch) => ({
  fetchFragmentList: () => dispatch(fragmentActions.fetchEntityList()),
  deleteFragment: (id) => dispatch(fragmentActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentListContainer)
