import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 10,
}

export default ({ theme }) => (
  <div>
    <RaisedButton style={style} label="Primary" primary />
    <RaisedButton style={style} label="Secondary" secondary />
  </div>
)
