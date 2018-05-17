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
import downloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { ModelAttributesActions, ModelAttributesSelectors } from '../../clients/ModelAttributeClient'
import { descriptionLevelActions, descriptionLevelSelectors } from '../../model/description/DescriptionLevelModel'
import graphContextActions from '../../model/graph/GraphContextActions'

/**
 * Entity description container
 */
export class DescriptionContainer extends React.Component {
  static mapDispatchToProps(dispatch) {
    return {
      dispatchSearchTag: tag => dispatch(graphContextActions.setSearchTag(tag)),
    }
  }

  static propTypes = {
    dispatchSearchTag: PropTypes.func.isRequired,
  }

  render() {
    const { dispatchSearchTag } = this.props
    return (
      <EntityDescriptionContainer
        levelActions={descriptionLevelActions}
        levelSelectors={descriptionLevelSelectors}
        fetchModelAttributesActions={ModelAttributesActions}
        fetchModelAttributesSelectors={ModelAttributesSelectors}
        downloadDescriptionClient={downloadDescriptionClient}
        onSearchTag={dispatchSearchTag}
      />
    )
  }
}


export default connect(null, DescriptionContainer.mapDispatchToProps)(DescriptionContainer)
