import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  margin: 10
}

export default ({theme}) => (
  <div>
    <RaisedButton style={style} label="Primary" primary={true}/>
    <RaisedButton style={style} label="Secondary" secondary={true}/>
  </div>
)
