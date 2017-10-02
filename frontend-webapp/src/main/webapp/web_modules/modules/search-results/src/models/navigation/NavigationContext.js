/**
* LICENSE_PLACEHOLDER
**/
import { SearchResultsTargetsEnum } from '@regardsoss/domain/catalog'
import NavigationLevel from './NavigationLevel'
import DisplayModeEnum from './DisplayModeEnum'

/**
 * The navigation context
 */
export default PropTypes.shape({
  viewObjectType: PropTypes.oneOf([SearchResultsTargetsEnum.DATAOBJECT_RESULTS, SearchResultsTargetsEnum.DATASET_RESULTS]).isRequired,
  displayMode: PropTypes.oneOf([DisplayModeEnum.LIST, DisplayModeEnum.TABLE]).isRequired,
  levels: PropTypes.arrayOf(PropTypes.instanceOf(NavigationLevel)),
})
