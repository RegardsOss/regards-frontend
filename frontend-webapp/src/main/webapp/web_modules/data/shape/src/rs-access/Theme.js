/**
 * LICENSE_PLACEHOLDER
 **/
const ThemeContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  configuration: PropTypes.object,
}).isRequired

const Theme = PropTypes.shape({
  content: ThemeContent,
  links: PropTypes.array,
}).isRequired

const ThemeList = PropTypes.objectOf(Theme)

export default {
  ThemeContent,
  Theme,
  ThemeList,
}
