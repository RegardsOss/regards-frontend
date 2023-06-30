/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessProjectClient } from '@regardsoss/client'
import { UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import TagCriterionComponent from '../../../../../../components/user/tabs/results/header/filter/TagCriterionComponent'

/** Default UI settings selectors instance, retrieving common user app settings data */
const uiSettingsSelectors = AccessProjectClient.getUISettingsSelectors()

/**
 * Tag criterion container (provides ui settings required by TagCriterion component)
 * @author Raphaël Mechali
 */
export class TagCriterionContainer extends React.Component {
  static propTypes = {
    tagCriterion: UIShapes.TagCriterion.isRequired,
    onUnselectTagFilter: PropTypes.func.isRequired,
    // from mapStateToProps
    settings: UIShapes.UISettings.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: uiSettingsSelectors.getSettings(state),
    }
  }

  render() {
    const { tagCriterion, onUnselectTagFilter, settings } = this.props
    return (
      <TagCriterionComponent
        tagCriterion={tagCriterion}
        settings={settings}
        onUnselectTagFilter={onUnselectTagFilter}
      />)
  }
}
export default connect(TagCriterionContainer.mapStateToProps)(TagCriterionContainer)
