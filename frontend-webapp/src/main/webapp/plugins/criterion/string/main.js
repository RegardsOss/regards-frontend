/**
 * LICENSE_PLACEHOLDER
 **/
import StringCriteria from 'components/StringCriteriaComponent'
import { initPlugin } from 'common/RegardsPlugin'
import messagesEn from './i18n/messages.en.i18n'
import messagesFr from './i18n/messages.fr.i18n'

const messages = {
  en: messagesEn,
  fr: messagesFr
}

initPlugin("string-criteria",StringCriteria,messages)
