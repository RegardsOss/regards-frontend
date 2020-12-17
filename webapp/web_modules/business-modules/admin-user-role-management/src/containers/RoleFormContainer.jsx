/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent, EnumInputsHelper } from '@regardsoss/form-utils'
import { AdminShapes } from '@regardsoss/shape'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import RoleFormComponent from '../components/RoleFormComponent'
import messages from '../i18n'

export class RoleFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      // eslint-disable-next-line camelcase
      role_name: PropTypes.string, // eslint wont fix: matches server format (although it is used here as local parameter)
    }),
    // from mapStateToProps
    roleList: AdminShapes.RoleList,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    createRole: PropTypes.func.isRequired,
    fetchRoleList: PropTypes.func.isRequired,
    updateRole: PropTypes.func.isRequired,
  }

  state = {
    isEditing: this.props.params.role_name !== undefined,
  }

  componentDidMount() {
    this.props.fetchRoleList()
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/role/list`
  }

  getFormComponent = () => {
    const { roleList } = this.props
    if (this.state.isEditing) {
      const { isFetching, params } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      const role = roleList[params.role_name]
      if (role) {
        return (<RoleFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentRole={role}
          roleList={roleList}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<RoleFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
      roleList={roleList}
    />)
  }

  handleUpdate = (values) => {
    const role = this.props.roleList[this.props.params.role_name]
    const authorizedAddresses = EnumInputsHelper.formValuesIntoApiData(values, 'authorizedAddresses')
    const updatedRole = {
      ...role.content,
      authorizedAddresses,
      name: values.name,
      isCorsRequestsAuthorized: values.isCorsRequestsAuthorized,
    }
    // The PUBLIC role doesn't have any parent
    if (this.props.params.role_name !== 'PUBLIC') {
      updatedRole.parentRole = this.props.roleList[values.parentRole].content
    }
    Promise.resolve(this.props.updateRole(role.content.name, updatedRole))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleCreate = (values) => {
    const authorizedAddresses = EnumInputsHelper.formValuesIntoApiData(values, 'authorizedAddresses')
    const parentRole = this.props.roleList[values.parentRole].content
    Promise.resolve(this.props.createRole({
      name: values.name,
      isCorsRequestsAuthorized: values.isCorsRequestsAuthorized,
      authorizedAddresses,
      parentRole,
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
    return (
      <I18nProvider messages={messages}>
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  roleList: roleSelectors.getList(state),
  isFetching: roleSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  createRole: (values) => dispatch(roleActions.createEntity(values)),
  updateRole: (roleName, values) => dispatch(roleActions.updateEntity(roleName, values)),
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
