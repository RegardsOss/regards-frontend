export interface LocaleMessagesStore {
  messagesDir: string,
  messages: Object
}

export interface I18nStore {
  locale: string,
  messages: Array<LocaleMessagesStore>
}
