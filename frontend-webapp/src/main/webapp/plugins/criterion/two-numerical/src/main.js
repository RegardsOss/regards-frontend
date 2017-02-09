/**
 * LICENSE_PLACEHOLDER
 **/
import TwoNumericalCriteria from './components/TwoNumericalCriteriaComponent'
import { initPlugin } from './common/RegardsPlugin'
import messagesEn from './i18n/messages.en.i18n'
import messagesFr from './i18n/messages.fr.i18n'
import pluginInfo from './plugin-info.json'
import reducer from './model/pluginReducer'

const messages = {
  en: messagesEn,
  fr: messagesFr,
}

initPlugin(TwoNumericalCriteria, reducer, messages, pluginInfo)
