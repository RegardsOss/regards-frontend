import * as React from "react"
import { connect } from "react-redux"
import { map, keys } from "lodash"
import { setTheme } from "../actions/ThemeActions"
import MenuItem from "material-ui/MenuItem"
import ThemeHelper from "../ThemeHelper"
import IconButton from "material-ui/IconButton"
import Palette from "material-ui/svg-icons/image/palette"
import IconMenu from "material-ui/IconMenu"
/*
interface SelectThemeProps {
  // From mapStateToProps
  theme?,
  // From mapDispatchToProps
  setTheme?,
}*/

export class SelectTheme extends React.Component {

  constructor () {
    super()
  }

  handleChange = (event, value) => {
    this.props.setTheme(value)
  }

  componentWillMount () {
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

const mapStateToProps = (state) => ({
  theme: state.common.theme
})
const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme: string) => dispatch(setTheme(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectTheme)
