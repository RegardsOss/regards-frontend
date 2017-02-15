/**
 * LICENSE_PLACEHOLDER
 **/
export const ThemeShape = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  active: React.PropTypes.bool,
  current: React.PropTypes.bool,
}).isRequired

const Theme = React.PropTypes.shape({
  content: ThemeShape,
  links: [],
}).isRequired

export default Theme
export const ThemeList = React.PropTypes.objectOf(Theme)
