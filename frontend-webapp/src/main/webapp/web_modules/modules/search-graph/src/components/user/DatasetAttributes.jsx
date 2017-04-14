/**
* LICENSE_PLACEHOLDER
**/
import values from 'lodash/values'
import { FormattedMessage } from 'react-intl'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { ResolvedDatasetAttributesArray } from '../../model/DatasetAttributesForGraph'
import ItemLink from './ItemLink'

/**
* Displays dataset attributes. Uses item link state to render
*/
class DatasetAttributes extends React.Component {

  static propTypes = {
    visible: React.PropTypes.bool.isRequired,
    state: React.PropTypes.oneOf(values(ItemLink.States)).isRequired,
    datasetAttributes: ResolvedDatasetAttributesArray.isRequired, // resolved attributes, empty array allowed
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { visible, state, datasetAttributes } = this.props
    const { moduleTheme: { user: { datasetItem: { attributes } } } } = this.context

    // compute styles for current state
    const containerStyles = ItemLink.selectStyles(state, attributes.container, attributes.container.commonStyles)
    const detailLabelStyles = attributes.detailsLabel.styles
    const detailValueStlyles = ItemLink.selectStyles(state, attributes.detailsValue, attributes.detailsValue.commonStyles)
    const lineStyles = attributes.line.styles

    return (
      <ShowableAtRender show={visible && datasetAttributes.length > 0}>
        <div style={containerStyles} >
          {
            // render values row
            datasetAttributes.map(({ renderValue, label: attributeLabel, render: TypeRender, renderKey }) =>
              <div key={renderKey} style={lineStyles}>
                <div style={detailLabelStyles}>{attributeLabel}</div>
                <div style={detailValueStlyles}>
                  {
                    renderValue ?
                      (<TypeRender attributes={renderValue} />) :
                      (<FormattedMessage id="search.graph.dataset.attribute.no.value" />)
                  }
                </div>
              </div>)
          }
        </div >
      </ShowableAtRender>
    )
  }
}
export default DatasetAttributes
