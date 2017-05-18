/**
* LICENSE_PLACEHOLDER
**/
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import NavigationLevel from './NavigationLevel'

/**
 * The navigation context
 */
export default PropTypes.shape({
  viewObjectType: PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
  levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)),
})
