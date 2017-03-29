/**
 * LICENSE_PLACEHOLDER
 **/
import IntegerAttributeCell from './IntegerAttributeCell'
import RangeAttributeCell from './RangeAttributeCell'
import DateAttributeCell from './DateAttributeCell'
import DateRangeAttributeCell from './DateRangeAttributeCell'
import DateArrayAttributeCell from './DateArrayAttributeCell'
import UrlAttributeCell from './UrlAttributeCell'
import BooleanAttributeCell from './BooleanAttributeCell'
import ThumbmailCell from './ThumbmailCell'

/**
 * Enum to associate attribute type to cell renderer component.
 * @author Sébastien Binda
 */
export default {
  INTEGER: IntegerAttributeCell,
  DATE_ISO8601: DateAttributeCell,
  INTEGER_INTERVAL: RangeAttributeCell,
  DOUBLE_INTERVAL: RangeAttributeCell,
  LONG_INTERVAL: RangeAttributeCell,
  DATE_INTERVAL: DateRangeAttributeCell,
  DATE_ARRAY: DateArrayAttributeCell,
  URL: UrlAttributeCell,
  BOOLEAN: BooleanAttributeCell,
  THUMBMAIL: ThumbmailCell,
}
