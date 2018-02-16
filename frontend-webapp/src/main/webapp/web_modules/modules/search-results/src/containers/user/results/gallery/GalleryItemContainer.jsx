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
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { descriptionLevelModel } from '@regardsoss/entities-common'
import { descriptionLevelActions } from '../../../../clients/DescriptionLevelClient'
import GalleryItemComponent from '../../../../components/user/results/gallery/GalleryItemComponent'

/**
 * Gallery item container
 * @author Léo Mieulet
 */
export class GalleryItemContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchShowQuicklook: (entity, tab) => dispatch(descriptionLevelActions.show(entity, tab)),
    }
  }

  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired,
    // from mapDispatchToProps
    dispatchShowQuicklook: PropTypes.func.isRequired,
  }

  /** List of property keys that should not be reported to sub component */
  static NON_REPORTED_PROPS = ['dispatchShowQuicklook']

  static getColumnSpanFromProps = props => GalleryItemComponent.getColumnSpanFromProps(props)


  static getHeightFromProps = (props, columnSpan, columnGutter, gridWidth, itemProps) => GalleryItemComponent.getHeightFromProps(props, columnSpan, columnGutter, gridWidth, itemProps)

  /**
   * Callback when user wants to see the quicklook larger - only called when there is a quicklook available
   */
  onShowQuicklook = () => {
    const { entity, dispatchShowQuicklook } = this.props
    dispatchShowQuicklook(entity, descriptionLevelModel.DescriptionLevelActions.TABS_ENUM.QUICKLOOK)
  }

  render() {
    const subComponentProperties = omit(this.props, GalleryItemContainer.NON_REPORTED_PROPS)
    return (
      <GalleryItemComponent
        entity={this.props.entity}
        onShowQuicklook={this.onShowQuicklook}
        {...subComponentProperties}
      />)
  }
}

export default connect(null, GalleryItemContainer.mapDispatchToProps)(GalleryItemContainer)
