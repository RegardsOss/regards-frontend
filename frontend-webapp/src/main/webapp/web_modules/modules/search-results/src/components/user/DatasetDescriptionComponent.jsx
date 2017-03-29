/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { CatalogEntity } from '@regardsoss/model'

/**
 * Component to display dataset description
 *
 * @author Sébastien binda
 */
class DatasetDescriptionComponent extends React.Component {

  static propTypes = {
    entity: CatalogEntity.isRequired,
    onClose: React.PropTypes.func,
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={this.props.onClose}
      />,
    ]

    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title={`Description du jeu ${this.props.entity.content.label}`}
          actions={actions}
          modal={false}
          open
          onRequestClose={this.props.onClose}
        >
          TODO description
        </Dialog>
      </div>
    )
  }

}
export default DatasetDescriptionComponent
