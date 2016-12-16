/**
 * LICENSE_PLACEHOLDER
 **/
import { connect as reduxConnect } from 'react-redux'
import { ThemeSelectors } from '@regardsoss/theme'
import { i18nSelectors } from '@regardsoss/i18n'

/**
 * Merge the given mapStateToProps function to add the theme and i18n properties.
 * @param m
 */
const mergeMapStateToProps = m => (
  state => ({
    ...m(state),
    theme: ThemeSelectors.getCurrentTheme(state),
    i18n: i18nSelectors.getMessages(state),
  })
)

/**
 * Overrides connect from redux library. It is necessary to ensure that the connected react components are
 * refreshed when theme or i18n messages changed.
 * @param mapStateToProps
 * @param mapDispatchToProps
 */
const connect = (mapStateToProps, mapDispatchToProps) => reduxConnect(mergeMapStateToProps(mapStateToProps), mapDispatchToProps)

export default connect
