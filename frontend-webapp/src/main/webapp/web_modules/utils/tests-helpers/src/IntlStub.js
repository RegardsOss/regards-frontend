/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Intl object stub for tests (avoids react warnings)
 */
const IntlStub = {
  formatMessage: m => m.id,
  formatDate: () => {},
  formatTime: () => {},
  formatRelative: () => {},
  formatNumber: () => {},
  formatPlural: () => {},
  formatHTMLMessage: () => {},
  now: () => {},
}

export default IntlStub
