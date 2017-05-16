/**
* LICENSE_PLACEHOLDER
**/
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from './NavigationLevel'

/**
 * The navigation context
 */
export default React.PropTypes.shape({
  viewObjectType: React.PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
  levels: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavigationLevel)),
})
