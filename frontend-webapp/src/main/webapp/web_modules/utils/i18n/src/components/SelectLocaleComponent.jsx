/** @module common */

import { map } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'


/**
 * React component to display the language selector widget
 */
class SelectLocaleComponent extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, index, value) {
    this.props.setLocale(value)
  }

  render() {
    const { locales, currentLocale } = this.props
    const items = map(locales, (locale) => {
      return <MenuItem value={locale} key={locale} primaryText={locale} />
    })
    return (
      <DropDownMenu value={currentLocale} onChange={this.handleChange}>
        {items}
      </DropDownMenu>
    )
  }
}
SelectLocaleComponent.propTypes = {
  locales: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  currentLocale: React.PropTypes.string,
  setLocale: React.PropTypes.func,
}
export default SelectLocaleComponent
