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
import { CatalogShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'
import GraphContextActions from '../../model/graph/GraphContextActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import CollectionItem from '../../components/user/CollectionItem'

/**
 * Displays a collection
 */
export class CollectionItemContainer extends React.Component {
  static mapStateToProps = (state, { levelIndex, collection }) => {
    const levelSelection = GraphContextSelectors.getSelectionForLevel(state, levelIndex)
    const selected = levelSelection ? levelSelection.id === collection.content.id : false
    return {
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, collection }) => ({
    dispatchSelected: () => dispatch(GraphContextActions.selectEntity(levelIndex, collection)),
  })

  static propTypes = {
    collection: CatalogShapes.Entity.isRequired,
    descriptionProperties: DescriptionProperties.isRequired, // From description HOC
    isLastLevel: PropTypes.bool.isRequired,
    // from map state to props
    selected: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: PropTypes.func.isRequired,
  }

  onSelected = () => {
    const { dispatchSelected } = this.props
    dispatchSelected()
  }

  render() {
    const {
      isLastLevel, collection, descriptionProperties, selected,
    } = this.props
    return (
      <CollectionItem
        collection={collection}
        descriptionProperties={descriptionProperties}
        selected={selected}
        onSelect={this.onSelected}
        expensible={!isLastLevel}
      />
    )
  }
}
export default connect(
  CollectionItemContainer.mapStateToProps,
  CollectionItemContainer.mapDispatchToProps,
)(CollectionItemContainer)
