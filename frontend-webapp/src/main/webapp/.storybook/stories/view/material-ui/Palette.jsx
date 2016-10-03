import Paper from "material-ui/Paper";
import { map } from "lodash";

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  paddingTop: 60,
  fontSize: 'small'
}

const hexaStyle = {
  fontWeight: 900,
  fontSize: '1.3em',
}

const merge = (style, color) => Object.assign({}, style, {backgroundColor: color})

export default class Palette extends React.Component {
  render() {
    const theme = this.props.theme
    return (
      <div>
        {
          map(theme.palette, (value, key) => {
            return (
              <Paper
                key={key}
                style={merge(style, value)}
              >
                <div>
                  {key}
                  <br />
                  <div style={hexaStyle}>{value}</div>
                </div>
              </Paper>
            )
          })
        }
      </div>
    )
  }
}

