/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import compose from 'lodash/fp/compose'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import RoleListComponent from '../components/RoleListComponent'
import styles from '../styles'
import messages from '../i18n'

/**
 * React container to manage project role list.
 *
 */
export class RoleListContainer extends React.Component {
  static propTypes = {
    roleList: AdminShapes.RoleList,
    fetchRoleList: PropTypes.func,
    deleteRole: PropTypes.func,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
    }).isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      roleList: roleSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
      deleteRole: (roleName) => dispatch(roleActions.deleteEntity(roleName)),
    }
  }

  UNSAFE_componentWillMount() {
    this.props.fetchRoleList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  handleEdit = (roleName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/role/${roleName}/edit`
    browserHistory.push(url)
  }

  handleEditResourceAccess = (roleName) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/role-resource-access/${roleName}/edit`
    browserHistory.push(url)
  }

  handleDelete = (roleName) => {
    this.props.deleteRole(roleName)
  }

  render() {
    const { roleList } = this.props
    return (
      <I18nProvider messages={messages}>
        <RoleListComponent
          roleList={roleList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleEditResourceAccess={this.handleEditResourceAccess}
          handleOpen={this.handleOpen}
        />
      </I18nProvider>
    )
  }
}

export default compose(
  connect(RoleListContainer.mapStateToProps, RoleListContainer.mapDispatchToProps),
  withModuleStyle(styles))(RoleListContainer)
