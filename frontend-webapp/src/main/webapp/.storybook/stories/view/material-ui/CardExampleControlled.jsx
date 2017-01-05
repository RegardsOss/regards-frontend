import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded })
  }

  handleToggle = (event, toggle) => {
    this.setState({ expanded: toggle })
  }

  handleExpand = () => {
    this.setState({ expanded: true })
  }

  handleReduce = () => {
    this.setState({ expanded: false })
  }

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          avatar="http://www.material-ui.com/images/ok-128.jpg"
          actAsExpander
          showExpandableButton
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="This toggle controls the expanded state of the component."
          />
        </CardText>
        <CardMedia
          expandable
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}
        >
          <img src="http://www.material-ui.com/images/nature-600-337.jpg" alt="Background"/>
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable/>
        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand}/>
          <FlatButton label="Reduce" onTouchTap={this.handleReduce}/>
        </CardActions>
      </Card>
    )
  }
}