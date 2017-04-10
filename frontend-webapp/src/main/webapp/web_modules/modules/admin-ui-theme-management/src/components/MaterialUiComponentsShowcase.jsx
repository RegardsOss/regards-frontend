import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import withWidth from 'material-ui/utils/withWidth'
import ClearFix from 'material-ui/internal/ClearFix'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import {
  Checkbox,
  DatePicker,
  Dialog,
  DropDownMenu,
  FlatButton,
  MenuItem,
  Paper,
  RadioButton,
  RadioButtonGroup,
  RaisedButton,
  Snackbar,
  Slider,
  Tabs,
  Tab,
  TextField,
  Toggle,
} from 'material-ui'
import rocket from '../resources/rocket.png'
import stylesFunc from '../styles/styles'

function getStyles(muiTheme) {
  const styles = stylesFunc(muiTheme)

  return styles
}

class ThemesPage extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  state = {
    dialogOpen: false,
    snackbarOpen: false,
  };

  componentWillMount() {
    this.setState({
      valueTabs: 'light',
    })
  }

  getComponentGroup() {
    const styles = getStyles(this.context.muiTheme)

    return (
      <ClearFix>
        <div style={styles.showcase.group}>
          <div style={styles.showcase.containerCentered}>
            <RaisedButton label="Secondary" secondary />
          </div>
          <div style={styles.showcase.containerCentered}>
            <RaisedButton label="Primary" primary />
          </div>
          <div style={styles.showcase.containerCentered}>
            <RaisedButton label="Default" />
          </div>
        </div>
        <div style={styles.showcase.group}>
          <div style={styles.showcase.container}>
            <Checkbox
              name="checkboxName1"
              value="checkboxValue1"
              label="checkbox"
            />
            <Checkbox
              name="checkboxName2"
              value="checkboxValue2"
              label="disabled checkbox"
              disabled
            />
          </div>
          <div style={styles.showcase.container}>
            <RadioButtonGroup
              name="shipSpeed"
              defaultSelected="usd"
            >
              <RadioButton
                value="usd"
                label="USD"
              />
              <RadioButton
                value="euro"
                label="Euro"
              />
              <RadioButton
                value="mxn"
                label="MXN"
                disabled
              />
            </RadioButtonGroup>
          </div>
          <div style={styles.showcase.container}>
            <Toggle
              name="toggleName1"
              label="toggle"
            />
            <Toggle
              name="toggleName2"
              label="disabled toggle"
              defaultToggled
              disabled
            />
          </div>
        </div>
        <div style={Object.assign({}, styles.showcase.group, { marginTop: 0 })}>
          <div style={styles.showcase.container}>
            <TextField
              style={styles.showcase.textfield}
              hintText="TextField"
            />
          </div>
          <div style={styles.showcase.container}>
            <DatePicker
              hintText="Landscape Dialog"
              mode="landscape"
              style={{ width: '100%' }}
            />
          </div>
          <div style={styles.showcase.container}>
            <DropDownMenu value={3} style={{ width: '100%' }}>
              <MenuItem value={1} primaryText={'Never'} />
              <MenuItem value={2} primaryText={'Every Night'} />
              <MenuItem value={3} primaryText={'Weeknights'} />
              <MenuItem value={4} primaryText={'Weekends'} />
              <MenuItem value={5} primaryText={'Weekly'} />
            </DropDownMenu>
          </div>
        </div>
        <div style={styles.showcase.groupSlider}>
          <Slider style={styles.showcase.slider} name="slider2" defaultValue={0.5} />
        </div>
        <div style={styles.showcase.groupSlider}>
          <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar={rocket}
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
              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
              <img src={rocket} alt="A rocket illustration" />
            </CardMedia>
            <CardTitle title="Card title" subtitle="Card subtitle" expandable />
            <CardText expandable>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton label="Expand" onTouchTap={this.handleExpand} />
              <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
            </CardActions>
          </Card>
        </div>
        <div style={styles.showcase.group}>
          <div style={styles.showcase.containerCentered}>
            <FlatButton label="View Dialog" onTouchTap={this.handleTouchTapDialog} />
            <Dialog
              open={this.state.dialogOpen}
              title="Dialog With Standard Actions"
              actions={[
                <FlatButton
                  label="Cancel"
                  keyboardFocused
                  onTouchTap={this.handleRequestCloseDialog}
                  primary
                />,
                <FlatButton
                  label="Submit"
                  onTouchTap={this.handleRequestCloseDialog}
                  primary
                />,
              ]}
              onRequestClose={this.handleRequestCloseDialog}
            >
              The actions in this window are created from tan array
              of element&#39;s that&#39;s passed in.
            </Dialog>
          </div>
        </div>
        <div style={styles.showcase.group}>
          <div style={styles.showcase.containerCentered}>
            <FlatButton
              onTouchTap={this.handleTouchTapSnackbar}
              label="Snackbar"
            />
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            onRequestClose={this.handleRequestCloseSnackbar}
            message="This is a snackbar"
            action="Got It!"
            onActionTouchTap={this.handleRequestCloseSnackbar}
          />
        </div>
      </ClearFix>
    )
  }

  getThemeExamples() {
    return (
      <div>
        <Tabs
          value={this.state.valueTabs}
          onChange={() => {
          }}
        >
          <Tab
            label="The Left Tab"
            value="light"
          />
          <Tab
            label="The Right Tab"
            value="dark"
          />
        </Tabs>
        {this.getComponentGroup()}
      </div>
    )
  }

  handleTouchTapDialog = () => {
    this.setState({
      dialogOpen: true,
    })
  };

  handleRequestCloseDialog = () => {
    this.setState({
      dialogOpen: false,
    })
  };

  handleTouchTapSnackbar = () => {
    this.setState({
      snackbarOpen: true,
    })
  };

  handleRequestCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    })
  };

  handleExpand = () => {
    this.setState({
      expanded: true,
    })
  }

  handleReduce = () => {
    this.setState({
      expanded: false,
    })
  }

  render() {
    const styles = getStyles(this.context.muiTheme)

    return (
      <Paper style={styles.showcase.liveExamplePaper}>
        <ClearFix style={styles.showcase.liveExampleBlock}>
          {this.getThemeExamples()}
        </ClearFix>
      </Paper>
    )
  }
}

export default muiThemeable()(withWidth()(ThemesPage))
