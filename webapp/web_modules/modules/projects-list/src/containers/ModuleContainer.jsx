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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import ProjectListComponent from '../components/ProjectListComponent'
import ProjectsSelector from '../model/ProjectsSelector'
import ProjectsAction from '../model/ProjectsAction'
/**
 * Display news and project list on the homepage
 */
export class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // Set by mapStateToProps
    projects: AccessShapes.ProjectList,
    isFetching: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchProjects: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchProjects()
  }

  /**
   * @returns {React.Component}
   */
  render() {
    if (!this.props.projects && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }
    return (
      <div>
        <ProjectListComponent
          projects={values(this.props.projects)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  projects: ProjectsSelector(props.appName).getList(state),
  isFetching: ProjectsSelector(props.appName).isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(ProjectsAction.fetchPagedEntityList(0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
