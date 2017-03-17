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
    const { facet } = this.props
    return (
      <div />
    )
  }
}
export default WordFacetSelectorComponent
