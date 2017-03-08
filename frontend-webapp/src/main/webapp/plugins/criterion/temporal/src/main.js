/**
 * LICENSE_PLACEHOLDER
 **/
import TemporalCriteriaComponent from './components/TemporalCriteriaComponent'
import { initPlugin } from './common/RegardsPlugin'
import messagesEn from './i18n/messages.en.i18n'
import messagesFr from './i18n/messages.fr.i18n'
import pluginInfo from './plugin-info.json'

const messages = {
  en: messagesEn,
  fr: messagesFr,
}

initPlugin(TemporalCriteriaComponent, null, messages, pluginInfo)
