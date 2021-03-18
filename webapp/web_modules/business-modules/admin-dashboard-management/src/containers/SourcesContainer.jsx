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
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { SourcesComponent } from '../components/SourcesComponent'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class SourcesContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSourceSelected: PropTypes.func.isRequired,
  // from mapStateToProps
  // from mapDispatchToProps
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  /**
     * Initial state
     */
   state = {
     isLoading: true,
   }

   UNSAFE_componentWillMount() {
     // this.props.fetchSources().then((actionResult) => {
     //   if (!actionResult.error) {
     //     this.setState({
     //       isLoading: false,
     //     })
     //   }
     // })
   }

   render() {
     const {
       project, onSourceSelected,
     } = this.props
     const {
       isLoading,
     } = this.state
     return (
       <LoadableContentDisplayDecorator isLoading={isLoading}>
         <SourcesComponent
           project={project}
           onSourceSelected={onSourceSelected}
         />
       </LoadableContentDisplayDecorator>
     )
   }
}
export default connect(
  SourcesContainer.mapStateToProps,
  SourcesContainer.mapDispatchToProps)(SourcesContainer)
