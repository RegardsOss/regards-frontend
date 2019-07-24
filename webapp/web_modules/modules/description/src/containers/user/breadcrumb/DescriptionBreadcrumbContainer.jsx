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
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import { descriptionLevelsActions, descriptionLevelsSelectors } from '../../../clients/DescriptionLevelClient'
import DescriptionBreadcrumbComponent from '../../../components/user/breadcrumb/DescriptionBreadcrumbComponent'

/**
 * Description breadcrumb container
 * @author Raphaël Mechali
 */
export class DescriptionBreadcrumbContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      descriptionPath: descriptionLevelsSelectors.getCurrentDescriptionPath(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { levelActions }) {
    return {
      dispatchEntitySelected: levelIndex => dispatch(descriptionLevelsActions.jumpToLevel(levelIndex)),
    }
  }

  static propTypes = {
    // from mapStateToProps
    descriptionPath: PropTypes.arrayOf(CatalogShapes.Entity),
    // from map dispatch to props
    dispatchEntitySelected: PropTypes.func.isRequired,
  }

  /**
   * User callback: user selected an entity on breadcrumb
   */
  onEntitySelected = (entity, index) => this.props.dispatchEntitySelected(index)

  render() {
    const { descriptionPath } = this.props
    return (
      <DescriptionBreadcrumbComponent descriptionPath={descriptionPath} onEntitySelected={this.onEntitySelected} />
    )
  }
}
export default connect(
  DescriptionBreadcrumbContainer.mapStateToProps,
  DescriptionBreadcrumbContainer.mapDispatchToProps,
)(DescriptionBreadcrumbContainer)
