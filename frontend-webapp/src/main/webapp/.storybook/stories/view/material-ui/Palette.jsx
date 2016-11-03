import Paper from 'material-ui/Paper'
import { map } from 'lodash'

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  paddingTop: 60,
  fontSize: 'small',
}

const hexaStyle = {
  fontWeight: 900,
  fontSize: '1.3em',
}

const merge = (sourceStyle, color) => (
  Object.assign({}, sourceStyle, { backgroundColor: color })
)
function Palette(props) {
  const theme = props.theme
  return (
    <div>
      {
          map(theme.palette, (value, key) => (
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
            ))
        }
    </div>
    )
}
Palette.propTypes = {
  theme: React.PropTypes.objectOf(React.PropTypes.string),
}

export default Palette
