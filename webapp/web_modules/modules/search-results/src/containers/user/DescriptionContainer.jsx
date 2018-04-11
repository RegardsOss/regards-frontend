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
import { EntityDescriptionContainer } from '@regardsoss/entities-common'
import { Tag } from '../../models/navigation/Tag'
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../clients/DescriptionLevelClient'
import navigationContextActions from '../../models/navigation/NavigationContextActions'

/**
* Description adapter container (provides both styles and actions to common component)
*/
export class DescriptionContainer extends React.Component {
  static mapDispatchToProps = dispatch => ({
    dispatchAddSearchTag: tag => dispatch(navigationContextActions.addSearchTag(tag)),
  })

  static propTypes = {
    dispatchAddSearchTag: PropTypes.func.isRequired,
  }

  /**
   * On user search tag callback - packs the new tag into a Tag model and then dispatches action
   * @param descriptionTag description tag, as callback from tag selection in description component
   */
  onSearchTag = (descriptionTag) => {
    const { dispatchAddSearchTag } = this.props
    dispatchAddSearchTag(Tag.fromDescriptionTag(descriptionTag))
  }

  render() {
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        onSearchTag={this.onSearchTag}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
      />
    )
  }
}
export default connect(null, DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
