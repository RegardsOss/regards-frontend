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
import isEqual from 'lodash/isEqual'
import { AttributeModelController } from '@regardsoss/domain/dam'
import { CatalogShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { DatasetAttributesArrayForGraph } from '../../shapes/DatasetAttributesForGraph'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'
import GraphContextActions from '../../model/graph/GraphContextActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import DatasetItem from '../../components/user/DatasetItem'

/** must be present in dataset links for it to be unlocked */
const accesGrantedRel = 'dataobjects'

/**
* An item entity container
*/
export class DatasetItemContainer extends React.Component {
  static mapStateToProps = (state, { levelIndex, dataset }) => {
    const levelSelection = GraphContextSelectors.getSelectionForLevel(state, levelIndex)
    // a dataset is locked when the user cannot acces a link with rel field 'dataobjects'
    const locked = !dataset.links.find(({ rel }) => rel.toLowerCase().includes(accesGrantedRel))
    const selected = !!levelSelection && levelSelection.id === dataset.content.id
    return {
      attributesVisible: GraphContextSelectors.areDatasetAttributesVisible(state),
      locked,
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, dataset }) => ({
    dispatchSelected: () => dispatch(GraphContextActions.selectEntity(levelIndex, dataset)),
  })

  static propTypes = {
    dataset: CatalogShapes.Entity.isRequired,
    attributesVisible: PropTypes.bool.isRequired, // are dataset attributes currently visible?
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    descriptionProperties: DescriptionProperties.isRequired, // From description HOC
    // from map state to props
    locked: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: PropTypes.func.isRequired,
  }

  UNSAFE_componentWillMount = () => {
    // compute dataset attributes
    this.storeDatasetAttributes(this.props)
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { dataset, graphDatasetAttributes } = this.props
    const { dataset: nextDataset, graphDatasetAttributes: nextAttributes } = nextProps
    if (!isEqual(dataset, nextDataset) || !isEqual(graphDatasetAttributes, nextAttributes)) {
      // update dataset attributes
      this.storeDatasetAttributes(nextProps)
    }
  }

  onSelected = () => {
    const {
      dispatchSelected, locked,
    } = this.props
    if (!locked) {
      dispatchSelected()
    }
  }

  /**
   * Stores dataset attributes in state, to be used at render time
   * @param {dataset, graphDatasetAttributes} object (properties) holding the displayed dataset and
   * the graph dataset attributes as resolved by user module container
   */
  storeDatasetAttributes = ({ dataset, graphDatasetAttributes = [] }) => this.setState({
    // build dataset attributes with only useful data for component: label, render, value or null / undefined
    datasetAttributes: graphDatasetAttributes.map(({
      label, render, attributePath, precision, unit,
    }) => {
      const attributeValue = AttributeModelController.getEntityAttributeValue(dataset, attributePath)
      return {
        label,
        render,
        // prepare a render key for child mapping
        renderKey: attributePath,
        // render value, prepared for renderers
        renderValue: attributeValue || null,
        renderProps: {
          precision,
          unit,
        },
      }
    }),
  })

  render() {
    const {
      dataset, descriptionProperties, selected, locked, attributesVisible,
    } = this.props
    const { datasetAttributes } = this.state
    return (
      <DatasetItem
        dataset={dataset}
        attributesVisible={attributesVisible}
        datasetAttributes={datasetAttributes}
        descriptionProperties={descriptionProperties}
        locked={locked}
        selected={selected}
        onSelect={this.onSelected}
      />
    )
  }
}

export default connect(
  DatasetItemContainer.mapStateToProps,
  DatasetItemContainer.mapDispatchToProps,
)(DatasetItemContainer)
