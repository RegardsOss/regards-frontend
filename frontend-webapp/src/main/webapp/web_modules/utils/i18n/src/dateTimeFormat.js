
import areIntlLocalesSupported from 'intl-locales-supported'

let dateTimeFormat

const localesAppSupports = [
  'fr',
]

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(localesAppSupports)) {
  dateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = import('intl')
    .then(() => {
      dateTimeFormat = IntlPolyfill.DateTimeFormat
      import('intl/locale-data/jsonp/fr')
    })
}

export default dateTimeFormat