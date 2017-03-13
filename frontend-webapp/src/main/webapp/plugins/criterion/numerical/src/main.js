/**
 * LICENSE_PLACEHOLDER
 **/
import NumericalCriteria from './components/NumericalCriteriaComponent'
import { initPlugin } from './common/RegardsPlugin'
import messagesEn from './i18n/messages.en.i18n'
import messagesFr from './i18n/messages.fr.i18n'
import pluginInfo from './plugin-info.json'

const messages = {
  en: messagesEn,
  fr: messagesFr,
}

initPlugin(NumericalCriteria, null, messages, pluginInfo)
