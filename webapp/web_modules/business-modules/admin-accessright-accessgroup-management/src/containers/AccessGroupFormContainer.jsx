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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import AccessGroupFormComponent from '../components/AccessGroupFormComponent'
import messages from '../i18n'

/**
 * Show the group form
 */
export class AccessGroupFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      accessGroupName: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from mapStateToProps
    currentAccessGroup: DataManagementShapes.AccessGroup,
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
    updateAccessGroup: PropTypes.func,
    createAccessGroup: PropTypes.func,
  }

  state = {
    isCreating: this.props.params.accessGroupName === undefined,
    isEditing: this.props.params.accessGroupName !== undefined && this.props.params.mode === 'edit',
    isDuplicating: this.props.params.accessGroupName !== undefined && this.props.params.mode === 'duplicate',
    isLoading: this.props.params.accessGroupName !== undefined,
    isError: false,
  }

  componentDidMount() {
    // If creation mode no accessGroup to fetch
    if (this.state.isCreating === false) {
      // Else, fetch the required accessGroup
      Promise.resolve(this.props.fetchAccessGroup(this.props.params.accessGroupName))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            this.setState({
              isLoading: false,
            })
          } else {
            this.setState({
              isLoading: false,
              isError: true,
            })
          }
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/access-group/list`
  }

  /**
   * Handle form submission on duplication / creation
   * Create a new AccessGroup
   * @param values form values
   */
  handleCreate = (values) => {
    const defaultValues = {
      users: [],
      accessRights: [],
    }
    if (this.state.isDuplicating) {
      defaultValues.users = this.props.currentAccessGroup.content.users
      defaultValues.accessRights = this.props.currentAccessGroup.content.accessRights
    }
    const newAccessGroup = {
      ...defaultValues,
      name: values.name,
      isPublic: values.isPublic,
    }
    Promise.resolve(this.props.createAccessGroup(newAccessGroup))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          browserHistory.push(this.getBackUrl())
        }
      })
  }

  /**
   * Handle form submission on update AccessGroup
   * @param values form values
   */
  handleUpdate = (values) => {
    const updatedAccessGroup = { ...this.props.currentAccessGroup.content, isPublic: values.isPublic }
    Promise.resolve(this.props.updateAccessGroup(this.props.currentAccessGroup.content.name, updatedAccessGroup))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          browserHistory.push(this.getBackUrl())
        }
      })
  }

  renderAccessGroup = () => (
    <AccessGroupFormComponent
      isDuplicating={this.state.isDuplicating}
      isCreating={this.state.isCreating}
      isEditing={this.state.isEditing}
      currentAccessGroup={this.props.currentAccessGroup}
      onSubmit={this.state.isEditing ? this.handleUpdate : this.handleCreate}
      backUrl={this.getBackUrl()}
    />
  )

  render() {
    const { isError, isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isContentError={isError}
        >
          {this.renderAccessGroup}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentAccessGroup: ownProps.params.accessGroupName ? accessGroupSelectors.getById(state, ownProps.params.accessGroupName) : undefined,
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccessGroup: (name) => dispatch(accessGroupActions.fetchEntity(name)),
  createAccessGroup: (values) => dispatch(accessGroupActions.createEntity(values)),
  updateAccessGroup: (name, values) => dispatch(accessGroupActions.updateEntity(name, values)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupFormContainer)
