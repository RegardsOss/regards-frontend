/**
* LICENSE_PLACEHOLDER
**/
import { StringFacet } from '../model/FacetShape'

/**
* Word facet selector
*/
class WordFacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: StringFacet.isRequired,
  }

  static defaultProps = {}

  render() {
    const { facet: { attributeName, type } } = this.props
    return (
      <div>
        {attributeName} : {type}
      </div>
    )
  }
}
export default WordFacetSelectorComponent
