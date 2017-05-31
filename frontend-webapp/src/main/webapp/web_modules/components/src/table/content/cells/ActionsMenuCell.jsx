/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'
import ActionsMenuCellComponent from './ActionsMenuCellComponent'

/**
 * Only add i18nProvider for message internationalization around ActionsMenuCellComponent
 *
 * @param props
 * @param context
 * @returns {XML}
 * @constructor
 * @author Sébastien Binda
 */
const ActionsMenuCell = props => (
  <I18nProvider
    messageDir={'components/src/table/i18n'}
  >
    <ActionsMenuCellComponent {...props} />
  </I18nProvider>
  )

export default ActionsMenuCell
