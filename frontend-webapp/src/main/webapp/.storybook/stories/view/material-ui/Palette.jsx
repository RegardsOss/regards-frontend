import Paper from 'material-ui/Paper'
import { map } from 'lodash'
import { themeContextType } from '@regardsoss/theme'

const style = {
  wrapper: {
    width: '100%',
  },
  paletteItem: {
    height: 200,
    width: 200,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    paddingTop: 60,
    fontSize: 'small',
  },
  paletteItemHexaText: {
    fontWeight: 900,
    fontSize: '1.3em',
  },
}

const merge = (sourceStyle, color) => (
  Object.assign({}, sourceStyle, { backgroundColor: color })
)

export default class NewPalette extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    return (
      <div style={style.wrapper}>
        {
          map(this.context.muiTheme.palette, (value, key) => (
            <Paper
              key={key}
              style={merge(style.paletteItem, value)}
            >
              <div>
                {key}
                <br />
                <div style={style.paletteItemHexaText}>{value}</div>
              </div>
            </Paper>
          ))
        }
      </div>
    )
  }

}
