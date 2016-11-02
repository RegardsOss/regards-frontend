import * as React from "react"
import TextField from "material-ui/TextField"


class UserForm extends React.Component {

  render () {
    return (
      <form>
        <TextField
          floatingLabelText="Nom"
        /><br />
        <TextField
          floatingLabelText="Mot de passe"
          type="password"
        /><br />
        <TextField
          floatingLabelText="Mot de passe (confirmer)"
          type="password"
        />
      </form>
    )
  }

}

export default UserForm
