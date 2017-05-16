/**
 * LICENSE_PLACEHOLDER
 **/
const ThemeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  configuration: PropTypes.object,
}).isRequired

const Theme = PropTypes.shape({
  content: ThemeShape,
  links: PropTypes.array,
}).isRequired

const ThemeList = PropTypes.shape(Theme)

const defaultTheme = {
  content: {
    id: 0,
    name: 'Default',
    active: true,
    configuration: {},
  },
}

export default {
  ThemeShape,
  Theme,
  ThemeList,
  defaultTheme,
}
