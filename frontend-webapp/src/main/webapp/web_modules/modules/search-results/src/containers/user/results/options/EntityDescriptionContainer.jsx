/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { descriptionLevelActions } from '../../../../clients/DescriptionLevelClient'
import EntityDescriptionComponent from '../../../../components/user/results/options/EntityDescriptionComponent'

/**
 * Entity description option container
 * @author Raphaël Mechali
 */
export class EntityDescriptionContainer extends React.Component {

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowDescription: entity => dispatch(descriptionLevelActions.show(entity)),
    }
  }

  static propTypes = {
    // Entity. Note: when used in options column, this is provided by the table cell API
    entity: AccessShapes.EntityWithServices.isRequired,
    // from mapDispatchToProps
    dispatchShowDescription: PropTypes.func.isRequired,
  }

  /**
 * Callback when user asks description
 */
  onShowDescription = () => {
    // dispatch show description event
    const { entity, dispatchShowDescription } = this.props
    dispatchShowDescription(entity)
  }

  render() {
    const subComponentProperties = omit(this.props, keys(EntityDescriptionContainer.propTypes))
    return <EntityDescriptionComponent onShowDescription={this.onShowDescription} {...subComponentProperties} />
  }
}

export default connect(null, EntityDescriptionContainer.mapDispatchToProps)(EntityDescriptionContainer)
