import React from 'react'
import AppBar from 'material-ui/AppBar'
import AutoComplete from 'material-ui/AutoComplete'
import Badge from 'material-ui/Badge'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import {
  Card, CardActions, CardHeader, CardText
} from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import DatePicker from 'material-ui/DatePicker'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'
import { Menu, MenuItem } from 'material-ui/Menu'
import Popover from 'material-ui/Popover'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import Snackbar from 'material-ui/Snackbar'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import Toggle from 'material-ui/Toggle'

import ContentAdd from 'mdi-material-ui/Plus'
import FavoriteIcon from 'mdi-material-ui/Heart'
import LocationOnIcon from 'mdi-material-ui/MapMarker'
import NotificationsIcon from 'mdi-material-ui/Bell'
import MenuIcon from 'mdi-material-ui/Menu'
import RestoreIcon from 'mdi-material-ui/History'

import { orange500 } from 'material-ui/styles/colors'

import ComplexTable from './ComplexTable'
import InfiniteTable from './InfiniteTable'

const ComponentWrapper = ({ title, children, style }) => (
  <tr>
    <td style={{ width: 100, padding: 20 }}>{title}</td>
    <td style={{ width: '100%', paddingLeft: 10, ...style }}>{children}</td>
  </tr>
)

const style = {
  button: {
    margin: '12px'
  },
  checkbox: {
    display: 'inline-block',
    marginRight: '40px',
    width: 'auto'
  },
  slider: {
    marginBottom: '10px',
    width: 'calc(100% - 20px)'
  },
  toggle: {
    width: '200px',
    margin: '20px auto 20px 0',
    borderSpacing: 0
  },
  errorStyle: {
    color: orange500,
  }
}

export default class Components extends React.PureComponent {
  constructor(props, context) {
    super(props, context)

    this.state = {
      dataSource: [],
      drawerOpen: false,
      dialogOpen: false,
      snackbarOpen: false,
      popoverOpen: false,
      dropDownValue: 2
    }
  }

    handleAutoCompleteUpdateInput = (value) => {
      this.setState({
        dataSource: [
          value,
          value + value,
          value + value + value,
        ],
      })
    };

    handleToggleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

    handleCloseDrawer = () => this.setState({ drawerOpen: false });

    handleOpenDialog = () => this.setState({ dialogOpen: true });

    handleCloseDialog = () => this.setState({ dialogOpen: false });

    handleOpenSnackbar = () => this.setState({ snackbarOpen: true });

    handleCloseSnackbar = () => this.setState({ snackbarOpen: false });

    handleChangeDropDown = (event, index, dropDownValue) => this.setState({ dropDownValue });

    handleOpenPopover = (event) => {
      event.preventDefault()
      this.setState({
        popoverOpen: true,
        anchorEl: event.currentTarget,
      })
    };

    handleClosePopover = () => this.setState({ popoverOpen: false });


    render() {
      return (
        <table style={{
          width: '100%', tableLayout: 'fixed', borderCollapse: 'separate', borderSpacing: '0 2em'
        }}
        >
          <tbody>
            <ComponentWrapper title="AppBar / Drawer">
              <AppBar
                title="Title"
                iconElementLeft={<IconButton onClick={this.handleToggleDrawer}><MenuIcon /></IconButton>}
              />
              <Drawer
                docked={false}
                width={300}
                open={this.state.drawerOpen}
                onRequestChange={drawerOpen => this.setState({ drawerOpen })}
              >
                <AppBar title="AppBar" />
                <MenuItem onClick={this.handleCloseDrawer}>Menu Item</MenuItem>
                <MenuItem onClick={this.handleCloseDrawer}>Menu Item 2</MenuItem>
              </Drawer>
            </ComponentWrapper>

            <ComponentWrapper title="AutoComplete">
              <AutoComplete
                hintText="Type anything"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleAutoCompleteUpdateInput}
              />
            </ComponentWrapper>

            <ComponentWrapper title="Badge">
              <Badge
                badgeContent={4}
                primary
              >
                <NotificationsIcon />
              </Badge>
              <Badge
                badgeContent={10}
                secondary
                badgeStyle={{ top: 12, right: 12 }}
              >
                <IconButton tooltip="Notifications">
                  <NotificationsIcon />
                </IconButton>
              </Badge>
            </ComponentWrapper>

            <ComponentWrapper title="BottomNavigation">
              <BottomNavigation selectedIndex={0}>
                <BottomNavigationItem
                  label="Recents"
                  icon={<RestoreIcon />}
                />
                <BottomNavigationItem
                  label="Favorites"
                  icon={<FavoriteIcon />}
                />
                <BottomNavigationItem
                  label="Nearby"
                  icon={<LocationOnIcon />}
                />
              </BottomNavigation>
            </ComponentWrapper>

            <ComponentWrapper title="FlatButton">
              <FlatButton label="Default" />
              <FlatButton label="Primary" primary />
              <FlatButton label="Secondary" secondary />
              <FlatButton label="Disabled" disabled />
            </ComponentWrapper>

            <ComponentWrapper title="RaisedButton">
              <RaisedButton label="Default" style={style.button} />
              <RaisedButton label="Primary" primary style={style.button} />
              <RaisedButton label="Secondary" secondary style={style.button} />
              <RaisedButton label="Disabled" disabled style={style.button} />
            </ComponentWrapper>

            <ComponentWrapper title="FloatingActionButton">
              <FloatingActionButton style={style.button}>
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton secondary style={style.button}>
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton disabled style={style.button}>
                <ContentAdd />
              </FloatingActionButton>
            </ComponentWrapper>

            <ComponentWrapper title="Card">
              <Card>
                <CardHeader
                  title="Without Avatar"
                  subtitle="Subtitle"
                  actAsExpander
                  showExpandableButton
                />
                <CardActions>
                  <FlatButton label="Action1" />
                  <FlatButton label="Action2" />
                </CardActions>
                <CardText expandable>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </Card>
            </ComponentWrapper>

            <ComponentWrapper title="Chip">
              <Chip style={{ margin: '10px' }} onRequestDelete={() => alert('chip :)')}>
                            Chip
              </Chip>
            </ComponentWrapper>

            <ComponentWrapper title="DatePicker">
              <DatePicker hintText="DatePicker Dialog" mode="landscape" />
            </ComponentWrapper>

            <ComponentWrapper title="Dialog">
              <RaisedButton label="Dialog" onClick={this.handleOpenDialog} />
              <Dialog
                title="Dialog With Actions"
                actions={
                <>
                <FlatButton
                  label="Cancel"
                  primary
                  onClick={this.handleCloseDialog}
                />
                <FlatButton
                  label="Submit"
                  primary
                  keyboardFocused
                  onClick={this.handleCloseDialog}
                />
                </>
                }
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={this.handleCloseDialog}
              >
                            The actions in this window were passed in as an array of React objects.
              </Dialog>
            </ComponentWrapper>

            <ComponentWrapper title="DropDown">
              <DropDownMenu value={this.state.dropDownValue} onChange={this.handleChangeDropDown}>
                <MenuItem value={1} primaryText="Never" />
                <MenuItem value={2} primaryText="Every Night" />
                <MenuItem value={3} primaryText="Weeknights" />
                <MenuItem value={4} primaryText="Weekends" />
                <MenuItem value={5} primaryText="Weekly" />
              </DropDownMenu>
            </ComponentWrapper>

            <ComponentWrapper title="Popover">
              <RaisedButton
                onClick={this.handleOpenPopover}
                label="Popover"
              />
              <Popover
                open={this.state.popoverOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleClosePopover}
              >
                {/*<Paper style={{ display: 'inline-block', borderSpacing: 0 }}>*/}
                <Menu>
                  <MenuItem primaryText="Back" />
                  <MenuItem primaryText="Forward" disabled />
                  <Divider />
                  <MenuItem primaryText="Recently closed" disabled />
                  <MenuItem primaryText="Google" disabled />
                  <MenuItem primaryText="YouTube" />
                </Menu>
              </Popover>
            </ComponentWrapper>

            <ComponentWrapper title="Slider">
              <Slider sliderStyle={style.slider} defaultValue={0.3} />
            </ComponentWrapper>

            <ComponentWrapper title="Checkbox">
              <Checkbox label="Unchecked" style={style.checkbox} />
              <Checkbox label="Checked" style={style.checkbox} checked />
              <Checkbox label="Disabled" style={style.checkbox} disabled />
            </ComponentWrapper>

            <ComponentWrapper title="RadioButton">
              <RadioButtonGroup name="shipSpeed" defaultSelected={0}>
                <RadioButton value={0} label="Unchecked" style={style.checkbox} />
                <RadioButton value={1} label="Checked" style={style.checkbox} />
                <RadioButton value={2} label="Disabled" style={style.checkbox} disabled />
              </RadioButtonGroup>
            </ComponentWrapper>

            <ComponentWrapper title="Toggle">
              <Toggle label="Simple" style={style.toggle} />
              <Toggle label="Toggled by default" defaultToggled style={style.toggle} />
              <Toggle label="Disabled" disabled style={style.toggle} />
            </ComponentWrapper>

            <ComponentWrapper title="Snakcbar">
              <RaisedButton
                onClick={this.handleOpenSnackbar}
                label="Open Snackbar"
              />
              <Snackbar
                open={this.state.snackbarOpen}
                message="Simple message"
                action="undo"
                autoHideDuration={10000}
                onActionClick={this.handleCloseSnackbar}
                onRequestClose={this.handleCloseSnackbar}
              />
            </ComponentWrapper>

            <ComponentWrapper title="Table">
              <ComplexTable />
            </ComponentWrapper>

            <ComponentWrapper title="Tabs">
              <Tabs value={this.state.value}>
                <Tab label="Tab A" />
                <Tab label="Tab B" />
                <Tab label="Tab C" />
                <Tab label="Tab D" />
              </Tabs>
            </ComponentWrapper>

            <ComponentWrapper title="TextField">
              <TextField
                defaultValue="Default Value"
                floatingLabelText="Floating Label Text"
              />
              <br />
              <TextField
                hintText="Hint Text"
                errorText="This field is required"
                floatingLabelText="Floating Label Text"
              />
              <br />
              <TextField
                hintText="Custom error color"
                errorText="This field is required."
                errorStyle={style.errorStyle}
              />
              <br />
              <TextField
                disabled
                hintText="Disabled Hint Text"
                defaultValue="Disabled With Floating Label"
                floatingLabelText="Floating Label Text"
              />
            </ComponentWrapper>

            <ComponentWrapper title="TimePicker">
              <TimePicker
                hintText="12hr Format with auto ok"
                autoOk
              />
            </ComponentWrapper>
            <ComponentWrapper title="Infinite table">
              <InfiniteTable />
            </ComponentWrapper>

          </tbody>
        </table>
      )
    }
}
