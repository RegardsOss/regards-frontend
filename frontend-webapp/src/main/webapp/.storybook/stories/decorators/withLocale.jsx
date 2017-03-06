import { I18nProvider } from '@regardsoss/i18n'
import * as I18nActions from '@regardsoss/i18n/src/model/I18nActions'
import { select } from '@kadira/storybook-addon-knobs'
import store from '../store'

const localeList = ['', 'Français', 'English']
const defaultLocale = 'English'

function setLocale(locale) {
  switch (locale) {
    case 'Français':
      store.dispatch(I18nActions.updateLocale('fr'))
      break
    case 'English':
      store.dispatch(I18nActions.updateLocale('en'))
      break
    default:
      throw new Error('Unknown locale', locale)
  }
}

/**
 * Storybook decorator providing a moduleTheme in the context of the decorated story
 *
 * WARNING: Must be registered in the decorators BEFORE the withKnobs decorator, like so:
 * ....
 *   .addDecorator(withLocale('path/to/the/i18n/folder))
 *   .addDecorator(withKnobs)
 * .....
 *
 * @param messageDir
 */
const withI18n = messageDir => (story) => {
  const locale = select('Locale', localeList, defaultLocale)
  setLocale(locale)
  return (
    <I18nProvider messageDir={messageDir}>
      {story()}
    </I18nProvider>
  )
}
export default withI18n
