/** @module common */
import * as React from "react"
import { map } from "lodash"
import MenuItem from "material-ui/MenuItem"
import DropDownMenu from "material-ui/DropDownMenu"

interface SelectLocaleTypes {
  locales: Array<string>,
  currentLocale: string,
  setLocale: (locale: string) => void
}


/**
 * React component to display the language selector widget
 */
class SelectLocaleComponent extends React.Component<SelectLocaleTypes, any> {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event: any, index: any, value: any): any {
    this.props.setLocale(value)
  }

  render (): JSX.Element {
    const {locales, currentLocale} = this.props
    const items = map(locales, (locale: string) => {
      return <MenuItem value={locale} key={locale} primaryText={locale}/>
    })
    return (
      <DropDownMenu value={currentLocale} onChange={this.handleChange}>
        {items}
      </DropDownMenu>
    )
  }
}

export default SelectLocaleComponent
