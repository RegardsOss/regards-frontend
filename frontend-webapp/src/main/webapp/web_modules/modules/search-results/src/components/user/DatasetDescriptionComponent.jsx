/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import map from 'lodash/map'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
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
    onSearchTag: React.PropTypes.func,
  }

  displayTabs = () => (
    <Paper>
      <Tabs>
        <Tab label="Description">
          {this.renderDescription()}
        </Tab>
        <Tab label="Attributes">
          {this.renderAttributes()}
        </Tab>
      </Tabs>
    </Paper>
  )

  renderAttributes = () =>
    // TODO : Display all attributes of the current dataset
    <h1>Attributes</h1>

  renderDescription = () =>
    // TODO : Display description as markdown or PDF file
    <h1>Description</h1>

  renderTags = () =>
    // TODO : Display tags and allow to run a new search on the selected tag
    (
      <Paper
        style={{
          marginTop: 20,
        }}
      >
        <h1 style={{ margin: 5 }}>Tags</h1>
        <Divider />
        <div style={{ display: 'flex' }}>
          {map(this.props.entity.content.tags, tag =>
            <Chip
              key={tag}
              onTouchTap={() => this.props.onSearchTag(tag)}
              style={{ margin: 5 }}
            >
              {tag}
            </Chip>)}
        </div>
      </Paper>
    )

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
          title={this.props.entity.content.label}
          actions={actions}
          modal={false}
          open
          onRequestClose={this.props.onClose}
        >
          {this.displayTabs()}
          {this.renderTags()}
        </Dialog>
      </div>
    )
  }

}
export default DatasetDescriptionComponent
