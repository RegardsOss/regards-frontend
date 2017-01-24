import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { ParameterizedBoardComponent, BoardItemComponent } from '@regardsoss/components'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeDecorator } from '../../utils/decorators'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Palette from 'material-ui/svg-icons/image/palette'
import ActionHome from 'material-ui/svg-icons/action/home'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import IconButton from 'material-ui/IconButton'

const items = [
  {
    title: 'A title',
    subtitle: 'This is the subtitle',
    description: 'A description',
    advanced: false,
    actions: [{
      path: '/some/path',
      icon: <ExtensionIcon />,
      tooltipMsg: 'Tooltip message',
    }, {
      path: '/some/other/path',
      icon: <ViewQuilt />,
      tooltipMsg: 'Other tooltip message',
    }, {
      path: '/a/path',
      icon: <Palette />,
      tooltipMsg: 'Hello',
    }],
  },
  {
    title: 'An other title',
    subtitle: 'This is the subtitle',
    description: 'An other description',
    advanced: false,
    actions: [{
      path: '/some/other/path',
      icon: <ExtensionIcon />,
      tooltipMsg: 'Other tooltip message',
    }, {
      path: '/some/other/path',
      icon: <ViewQuilt />,
      tooltipMsg: 'Other tooltip message',
    }, {
      path: '/an/Other/path',
      icon: <Palette />,
      tooltipMsg: 'Other tootlip message',
    }],
  },
  {
    title: 'An advanced title',
    subtitle: 'This is the subtitle',
    description: 'A advanced description',
    advanced: true,
    actions: [{
      path: '/some/advanced/path',
      icon: <ExtensionIcon />,
      tooltipMsg: 'Advanced tooltip message',
    }, {
      path: '/some/advanced/path',
      icon: <ViewQuilt />,
      tooltipMsg: 'Advanced tooltip message',
    }, {
      path: '/an/advanced/path',
      icon: <Palette />,
      tooltipMsg: 'Advanced tooltip message',
    }],
  },
]

const iconStyles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  mediumIcon: {
    width: 48,
    height: 48,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
}

storiesOf('Test more sexy BoardItemComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Board item', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <BoardItemComponent 
          title={"This is the title"} 
          subtitle={"It has a subtitle"}
          description={"This is the description"}
          actions={[
             <IconButton
               iconStyle={iconStyles.smallIcon}
               style={iconStyles.small}
           >
             <ActionHome />
           </IconButton>,
           <IconButton
              iconStyle={iconStyles.smallIcon}
              style={iconStyles.small}
            >
              <FileCloudDownload />
            </IconButton>,
            <IconButton
             iconStyle={iconStyles.smallIcon}
             style={iconStyles.small}
             >
               <HardwareVideogameAsset />
             </IconButton>
          ]}
        />
      </ThemeDecorator>
    )
  })
  .add('ParameterizedBoardComponent', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeDecorator theme={themeName}>
        <ParameterizedBoardComponent items={items} />
      </ThemeDecorator>
    )
  })
