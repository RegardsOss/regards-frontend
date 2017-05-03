import metadataV1 from './definitions/metadatav1'
import { MetadataList } from './model/Metadata'
import MetadataField from './components/MetadataField'
import messagesFR from './i18n/messages.fr.i18n'
import messagesEN from './i18n/messages.en.i18n'

export default {
  Locales: {
    fr: messagesFR,
    en: messagesEN,
  },
  MetadataList,
  MetadataField,
  ...metadataV1,
}
