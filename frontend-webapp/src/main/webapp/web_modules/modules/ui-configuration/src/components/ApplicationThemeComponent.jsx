/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'
import Save from 'material-ui/svg-icons/content/save'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import DropDownMenu from 'material-ui/DropDownMenu'
import { themeContextType } from '@regardsoss/theme'
import { muiTheme } from '@regardsoss/components/src/storybook-addon-material-ui/src/muiTheme'
import MaterialUiComponentsShowcase from '@regardsoss/components/src/MaterialUiComponentsShowcase'

/**
 * React component defining the user interface for customizing the themes of Regards.
 *
 * @author Xavier-Alexandre Brochard
 */
class ApplicationThemeComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    value: 2,
  };

  handleChange = (event, index, value) => this.setState({ value })

  handleClose = () => {
    console.log('handleClose')
  }

  handleSave = () => {
    console.log('handleSave')
  }

  handleDownload = () => {
    console.log('handleDownload')
  }

  render() {
    const appPreview = <MaterialUiComponentsShowcase />
    const themeConfigurer = muiTheme()(() => (appPreview))
    const style = {
      toolbar: {
        root: {
          backgroundColor: this.context.muiTheme.palette.primary1Color,
        },
        title: {
          color: this.context.muiTheme.palette.alternateTextColor,
        },
        icon: {
          color: this.context.muiTheme.palette.alternateTextColor,
        },
        themeDropDownMenu: {
          style: {
            top: -2,
            left: -10,
          },
          labelStyle: {
            color: this.context.muiTheme.palette.alternateTextColor,
            paddingLeft: 0,
            fontSize: this.context.muiTheme.toolbar.titleFontSize,
            fontWeight: 'bold',
          },
        },
      },
      contentLayout: {
        display: 'flex',
        justifyContent: 'center',
      },
    }
    return (
      <Card style={{ position: 'relative' }}>
        <Toolbar style={style.toolbar.root}>
          <ToolbarGroup firstChild>
            <IconButton onTouchTap={this.handleClose}><Close color={style.toolbar.icon.color} /></IconButton>
            <ToolbarTitle
              text={<FormattedMessage id="application.theme.title" />}
              style={style.toolbar.title}
            />
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              style={style.toolbar.themeDropDownMenu.style}
              labelStyle={style.toolbar.themeDropDownMenu.labelStyle}
            >
              <MenuItem value={2} primaryText="CDPP" />
              <MenuItem value={3} primaryText="SSALTO" />
              <Divider />
              <Subheader>Default</Subheader>
              <MenuItem value={0} primaryText="Light" />
              <MenuItem value={1} primaryText="Dark" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <IconButton
              onTouchTap={this.handleSave}
              tooltip={<FormattedMessage id="application.theme.save" />}
            ><Save color={style.toolbar.icon.color} /></IconButton>
            <IconButton
              onTouchTap={this.handleDownload}
              tooltip={<FormattedMessage id="application.theme.download" />}
            ><FileDownload color={style.toolbar.icon.color} /></IconButton>
          </ToolbarGroup>
        </Toolbar>
        <CardText>
          <div style={style.contentLayout}>
            {themeConfigurer}
            {appPreview}
          </div>
        </CardText>
      </Card>
    )
  }
}

export default ApplicationThemeComponent
