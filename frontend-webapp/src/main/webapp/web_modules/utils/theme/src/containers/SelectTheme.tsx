import * as React from "react"
import { connect } from "react-redux"
import { map, keys } from "lodash"
import { setTheme } from "../actions/ThemeActions"
import MenuItem from "material-ui/MenuItem"
import ThemeHelper from "../ThemeHelper"
import IconButton from "material-ui/IconButton"
import Palette from "material-ui/svg-icons/image/palette"
import IconMenu from "material-ui/IconMenu"

interface SelectThemeProps {
  // From mapStateToProps
  theme?: any,
  // From mapDispatchToProps
  setTheme?: any,
}

export class SelectTheme extends React.Component<SelectThemeProps, any> {

  constructor () {
    super()
  }

  handleChange = (event: any, value: any) => {
    this.props.setTheme(value)
  }

  componentWillMount (): any {
    this.handleChange = this.handleChange.bind(this)
  }

  render (): JSX.Element {
    const themes = ThemeHelper.getThemes()
    const themeNames = keys(themes)
    const items = map(themeNames, (themeName: string) => {
      return <MenuItem value={themeName} key={themeName} primaryText={themeName}/>
    })
    console.log("SelectTheme", this.props.theme)

    return (
      <IconMenu
        iconButtonElement={<IconButton><Palette /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
        value={this.props.theme}
        onChange={this.handleChange}
      >
        {items}
      </IconMenu>
    )
  }
}

const mapStateToProps = (state: any) => ({
  theme: state.common.theme
})
const mapDispatchToProps = (dispatch: any) => ({
  setTheme: (theme: string) => dispatch(setTheme(theme))
})

export default connect<{}, {}, SelectThemeProps>(mapStateToProps, mapDispatchToProps)(SelectTheme)
