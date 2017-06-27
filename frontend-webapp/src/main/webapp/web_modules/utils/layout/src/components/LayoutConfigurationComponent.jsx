/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider } from '@regardsoss/i18n'
import LayoutConfigurationComponentInternal from './LayoutConfigurationComponentInternal'

const DELETE_ACTION = 'DELETE'
const ADD_ACTION = 'ADD'
const EDIT_ACTION = 'EDIT'

/**
 * Wraps LayoutConfigurationComponentInternal in order to provide i18n properly
 * @author Sébastien Binda
 */
class LayoutConfigurationComponent extends React.Component {

  render() {
    return (
      <I18nProvider messageDir="utils/layout/src/i18n">
        <LayoutConfigurationComponentInternal {...this.props} />
      </I18nProvider>
    )
  }

}

export default LayoutConfigurationComponent

export {
  ADD_ACTION,
  DELETE_ACTION,
  EDIT_ACTION,
}
