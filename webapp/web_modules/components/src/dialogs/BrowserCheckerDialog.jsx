/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import root from 'window-or-global'
import { detect } from 'detect-browser'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import messages from './i18n'
import styles from './styles'

/**
 * Browser checker: checks browser and version to notify the user with a message
 * when the browser is unsupported or too old to be compatible with browserRequirements.
 * When user choose to not  show dialog again, stores in local storage the corresponding key.
 * @author Raphaël Mechali
 */
export class BrowserCheckerDialog extends React.Component {
  /** Expected version separator */
  static VERSION_SEPARATOR = '.'

  /** Error types */
  static BROWSER_ERROR_TYPES = {
    UNSUPPORTED: 'unsupported',
    TOO_OLD: 'too.old',
  }

  /** parses version number even if it contains some characters */
  static VERSION_NUMBER_PARSER = /([0-9]+).*/

  /**
   * Parse a number out of version, that could be compound with characters and digits
   * @param {string} number text
   * @return {number} parsed number or default value
   */
  static parseNumberFromVersion = (numberText = '') => {
    const matched = numberText.match(BrowserCheckerDialog.VERSION_NUMBER_PARSER)
    return (matched && matched.length && matched[1]) || 0
  }

  /**
   * Checks recursively  if browser version matches the required versions. Versions are number array
   * ordered from most important (major) to less important (build index)
   * @param {[number]} requiredVersions required versions
   * @param {[number]} browserVersions browser version
   * @return {BrowserCheckerDialog.BROWSER_ERROR_TYPES} error if one was found
   */
  static checkBrowerVersion(requiredVersions, browserVersions) {
    if (!requiredVersions.length || !browserVersions.length) {
      // break case: strictly the same version
      return null
    }
    const [topRequiredVersion, ...remainingRequiredVersions] = requiredVersions
    const [topActualVersion, ...remainingActualVersion] = browserVersions
    if (topRequiredVersion > topActualVersion) {
      // error case: browser version is too old
      return BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD
    }
    if (topActualVersion > topRequiredVersion) {
      // OK case: browser version is more recent
      return null
    }
    // current version is equal, check below versions
    return BrowserCheckerDialog.checkBrowerVersion(remainingRequiredVersions, remainingActualVersion)
  }

  /**
   * Checks browser state for requiremnts
   * @param {*} browser detected browser
   * @param {*} browserRequirements browser requirements dictionary (browser name is )
   * @return {BrowserCheckerDialog.BROWSER_ERROR_TYPES} found error or null
   */
  static checkBrowser(browser, browserRequirements) {
    // 1 - check browser
    if (!browser) {
      // could not detect
      return BrowserCheckerDialog.BROWSER_ERROR_TYPES.UNSUPPORTED
    }
    const requirements = browserRequirements[browser.name]
    if (!requirements) {
      // not in list
      return BrowserCheckerDialog.BROWSER_ERROR_TYPES.UNSUPPORTED
    }
    // 2 - check version
    // 2.a - recover order versions list from major to minor
    const requiredVersions = requirements.split(BrowserCheckerDialog.VERSION_SEPARATOR)
      .map(BrowserCheckerDialog.parseNumberFromVersion)
    const browserVersions = (browser.version || '').split(BrowserCheckerDialog.VERSION_SEPARATOR)
      .map(BrowserCheckerDialog.parseNumberFromVersion)

    // 2.b compare versions by priority order (fail if none was found)
    if (browserVersions.length < 1) {
      // in such case, browser versions could not be retrieved. It is consider too old
      return BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD
    }
    return BrowserCheckerDialog.checkBrowerVersion(requiredVersions, browserVersions)
  }

  static propTypes = {
    // map of browser name: version where version is the minimum version
    browserRequirements: PropTypes.objectOf(PropTypes.string).isRequired,
    // key in local storage
    localStorageKey: PropTypes.string,
  }

  static defaultProps = {
    localStorageKey: 'regards.hide.browser.warning',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    errorType: null,
  }

  /**
   * Lifecycle method component will mount, used here to resolved browser, retrieve local storage and deteminate
   * if the message should be shown to user
   */
  UNSAFE_componentWillMount() {
    const { browserRequirements } = this.props
    const hasStoredDoNoShowAgain = this.hasStoredDoNoShowAgain()
    // do not compute error if user asked not showing it again
    const browser = detect()
    const errorType = hasStoredDoNoShowAgain ? null : BrowserCheckerDialog.checkBrowser(browser, browserRequirements)
    this.setState({
      errorType,
    })
  }

  /**
   * User callback: on close dialog
   * @param doNotShowAgain should not show again?
   */
  onCloseDialog = (doNotShowAgain = false) => {
    // store "do not show again option" if asked by the user
    if (doNotShowAgain) {
      this.storeDoNotShowAgain()
    }
    // close dialog
    this.setState({ errorType: null })
  }

  /**
   * User callback: on do not show again clicked
   */
  onDoNoShowAgain = () => this.onCloseDialog(true)

  /**
   * Has the user stored do not show again?
   */
  hasStoredDoNoShowAgain = () => {
    const { localStorageKey } = this.props
    return !!root.localStorage.getItem(localStorageKey)
  }

  /**
   * Store do not show again for user
   */
  storeDoNotShowAgain = () => {
    const { localStorageKey } = this.props
    return root.localStorage.setItem(localStorageKey, true)
  }

  render() {
    const { errorType } = this.state
    const { intl: { formatMessage }, moduleTheme: { browserChecker } } = this.context

    // 1 - compute error message to show
    let errorMessage
    switch (errorType) {
      case BrowserCheckerDialog.BROWSER_ERROR_TYPES.UNSUPPORTED:
        errorMessage = formatMessage({ id: 'browser.check.fail.unsupported.browser.message' })
        break
      case BrowserCheckerDialog.BROWSER_ERROR_TYPES.TOO_OLD:
        errorMessage = formatMessage({ id: 'browser.check.fail.browser.too.older.message' })
        break
      default:
        errorMessage = null
    }

    // 2 - render
    return (
      <Dialog
        title={formatMessage({ id: 'browser.check.fail.title' })}
        open={!!errorType}
        bodyStyle={browserChecker.contentStyle}
        modal
      >
        {/* 1 - show  message */}
        <div style={browserChecker.messageStyle}>
          {errorMessage}
        </div>

        {/* 2 - show confirm button and do no show again option */}
        <div style={browserChecker.actionsStyle}>
          <FlatButton
            label={formatMessage({ id: 'browser.check.fail.do.not.show.again' })}
            onClick={this.onDoNoShowAgain}
          />
          <FlatButton
            label={formatMessage({ id: 'browser.check.fail.close' })}
            onClick={this.onCloseDialog}
          />
        </div>
      </Dialog>
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(BrowserCheckerDialog)
