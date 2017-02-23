/**
 * LICENSE_PLACEHOLDER
 **/
import { connect as reduxConnect } from 'react-redux'
import { getCurrentTheme } from '@regardsoss/theme'
import { i18nSelectors } from '@regardsoss/i18n'

/**
 * Merge the given mapStateToProps function to add the theme and i18n properties.
 * @param mapStateToProps
 * @author Sébastien Binda
 */
const mergeMapStateToProps = mapStateToProps => (
  (state, ownProps) => ({
    ...mapStateToProps(state, ownProps),
    theme: getCurrentTheme(state),
    i18n: i18nSelectors.getMessages(state),
  })
)

/**
 * Overrides connect from redux library. It is necessary to ensure that the connected react components are
 * refreshed when theme or i18n messages changed.
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @author Sébastien Binda
 */
const connect = (mapStateToProps, mapDispatchToProps) => {
  const newMapStateToProps = mapStateToProps ? mergeMapStateToProps(mapStateToProps) : null
  return reduxConnect(newMapStateToProps, mapDispatchToProps)
}

export default connect
