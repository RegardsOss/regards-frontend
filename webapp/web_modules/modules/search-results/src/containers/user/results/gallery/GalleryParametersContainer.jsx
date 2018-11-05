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
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nSelectors } from '@regardsoss/i18n'
import GalleryParametersComponent from '../../../../components/user/results/gallery/GalleryParametersComponent'

/**
 * Gallery parameters container: ensures the gallery parameters component redraws on locale change
 * @author Raphaël Mechali
 */
export class GalleryParametersContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }


  static propTypes = {
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    presentationModels: AccessShapes.AttributePresentationModelArray.isRequired,
    // from mapStateToProps
    locale: PropTypes.oneOf(UIDomain.LOCALES),
  }

  static defaultProps = {
    locale: UIDomain.LOCALES_ENUM.en,
  }

  render() {
    const { entity, presentationModels, locale } = this.props
    return (
      <GalleryParametersComponent
        entity={entity}
        presentationModels={presentationModels}
        locale={locale}
      />)
  }
}
export default connect(GalleryParametersContainer.mapStateToProps)(GalleryParametersContainer)
