/** @module common */

import { map } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
/*
interface SelectLocaleTypes {
  locales: Array<string>,
  currentLocale: string,
  setLocale: (locale: string) => void
}*/


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

export default SelectLocaleComponent
