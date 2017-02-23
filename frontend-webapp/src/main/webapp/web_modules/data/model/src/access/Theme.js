/**
 * LICENSE_PLACEHOLDER
 **/
const ThemeShape = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
  configuration: React.PropTypes.object,
}).isRequired

const Theme = React.PropTypes.shape({
  content: ThemeShape,
  links: [],
}).isRequired

const ThemeList = React.PropTypes.shape(Theme)

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
