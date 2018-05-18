/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DescriptionLevelActions from '../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../model/description/DescriptionLevelSelectors'
import DescriptionBreadcrumbComponent from '../../../components/description/breadcrumb/DescriptionBreadcrumbComponent'

/**
* Description breadcrumb container
*/
export class DescriptionBreadcrumbContainer extends React.Component {
  static mapStateToProps(state, { levelSelectors }) {
    return {
      descriptionPath: levelSelectors.getCurrentDescriptionPath(state),
    }
  }

  static mapDispatchToProps(dispatch, { levelActions }) {
    return {
      dispatchEntitySelected: levelIndex => dispatch(levelActions.jumpToLevel(levelIndex)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired, // used by mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired, // used by mapStateToProps
    // from mapStateToProps
    descriptionPath: PropTypes.arrayOf(CatalogShapes.Entity),
    // from map dispatch to props
    dispatchEntitySelected: PropTypes.func.isRequired,
  }

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
