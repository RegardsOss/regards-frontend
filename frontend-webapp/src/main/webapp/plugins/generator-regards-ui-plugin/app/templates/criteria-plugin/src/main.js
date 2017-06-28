/**
 * LICENSE_PLACEHOLDER
 **/
import SampleCriteria from './components/SampleCriteria'
import { initPlugin } from './common/RegardsPlugin'
import messagesEn from './i18n/messages.en.i18n'
import messagesFr from './i18n/messages.fr.i18n'
import pluginInfo from './plugin-info.json'
import reducer from './reducer'

const messages = {
  en: messagesEn,
  fr: messagesFr,
}

initPlugin(SampleCriteria, reducer, messages, pluginInfo)