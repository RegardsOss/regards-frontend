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
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightListContainer from './AccessRightListContainer'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'

export class AccessGroupAccessRightsContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      accessgroup: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    accessGroup: DataManagementShapes.AccessGroup,
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
  }

  state = {
    loading: true,
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAccessGroup(this.props.params.accessgroup)])
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { params, accessGroup } = this.props
    const { loading } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={loading}
        isContentError={!loading && !accessGroup}
      >
        {() => (
          <AccessRightListContainer
            params={params}
            accessGroup={accessGroup}
          />
        )}
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroup: accessGroupSelectors.getById(state, ownProps.params.accessgroup),
})

const mapDispatchToProps = (dispatch) => ({
  fetchAccessGroup: (accessGroupName) => dispatch(accessGroupActions.fetchEntity(accessGroupName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
