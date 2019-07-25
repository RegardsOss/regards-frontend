/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { roleResourceActions, roleResourceSelectors } from '../clients/RoleResourceClient'
import ResourceAccessFormComponent from '../components/ResourceAccessFormComponent'
import messages from '../i18n'

/**
 * React container to edit resource access allowed for the
 * current role
 */
export class ResourceAccessFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      role_name: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    role: AdminShapes.Role,
    isRoleFetching: PropTypes.bool,
    roleResources: AdminShapes.ResourceArray,
    isResourcesFetching: PropTypes.bool,
    // from fetchRole
    fetchRole: PropTypes.func,
    fetchRoleResources: PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchRole(this.props.params.role_name)
    this.props.fetchRoleResources(this.props.params.role_name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.role_name !== nextProps.params.role_name) {
      this.props.fetchRole(nextProps.params.role_name)
      this.props.fetchRoleResources(nextProps.params.role_name)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/list`
  }

  getForm = () => {
    const {
      role, isRoleFetching, roleResources, isResourcesFetching,
    } = this.props
    if ((isRoleFetching && !role) || (isResourcesFetching && !roleResources)) {
      return (<FormLoadingComponent />)
    }
    if (role) {
      return (
        <ResourceAccessFormComponent
          microserviceList={values(STATIC_CONF.MSERVICES)}
          backUrl={this.getBackUrl()}
          editRoleResources={this.editRoleResources}
          currentRole={role}
          roleResources={roleResources}
        />)
    }
    return (<FormEntityNotFoundComponent />)
  }

  editRoleResources = (role) => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/role-resource-access/${role.content.name}/edit`)
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        {this.getForm()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  role: roleSelectors.getById(state, ownProps.params.role_name),
  roleResources: roleResourceSelectors.getOrderedList(state),
  isRoleFetching: roleSelectors.isFetching(state),
  isResourcesFetching: roleResourceSelectors.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchRole: roleName => dispatch(roleActions.fetchEntity(roleName)),
  fetchRoleResources: roleName => dispatch(roleResourceActions.fetchEntityList({ role_name: roleName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceAccessFormContainer)
