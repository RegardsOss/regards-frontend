/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import React from 'react'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import Dialog from 'material-ui/Dialog'
import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import ClearFix from 'material-ui/internal/ClearFix'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Slider from 'material-ui/Slider'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Call from 'material-ui/svg-icons/communication/call'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import Toggle from 'material-ui/Toggle'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import withWidth from 'material-ui/utils/withWidth'
import { themeContextType } from '@regardsoss/theme'
import exampleImage from '../resources/example-image.png'
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
    const dialogButtons = [
      <FlatButton
        key="Cancel"
        label="Cancel"
        keyboardFocused
        onTouchTap={this.handleRequestCloseDialog}
        primary
      />,
      <FlatButton
        key="Submit"
        label="Submit"
        onTouchTap={this.handleRequestCloseDialog}
        primary
      />,
    ]

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
          <div style={styles.showcase.containerCentered}>
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <div style={styles.showcase.containerCentered}>
            <FloatingActionButton secondary mini>
              <Call />
            </FloatingActionButton>
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
              hintText="Date Picker"
              mode="landscape"
              style={styles.showcase.datePicker}
            />
          </div>
          <div style={styles.showcase.container}>
            <TimePicker
              format="24hr"
              hintText="Time Picker"
            />
          </div>
          <div style={styles.showcase.container}>
            <DropDownMenu value={3} style={styles.fullWidth}>
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
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
              avatar={exampleImage}
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
              <img src={exampleImage} alt="Staring at the skies" />
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
              actions={dialogButtons}
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
            onActionClick={this.handleRequestCloseSnackbar}
          />
        </div>
      </ClearFix>
    )
  }

  getThemeExamples() {
    return (
      <div>
        <AppBar
          title="AppBar"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Toolbar>
          <ToolbarGroup firstChild>
            <DropDownMenu value={1}>
              <MenuItem value={1} primaryText="ToolBar" />
              <MenuItem value={2} primaryText="All Voice" />
              <MenuItem value={3} primaryText="All Text" />
              <MenuItem value={4} primaryText="Complete Voice" />
              <MenuItem value={5} primaryText="Complete Text" />
              <MenuItem value={6} primaryText="Active Voice" />
              <MenuItem value={7} primaryText="Active Text" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Options" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton label="Create Broadcast" primary />
            <IconMenu
              iconButtonElement={
                <IconButton touch>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
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
