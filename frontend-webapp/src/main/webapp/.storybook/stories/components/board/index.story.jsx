import React from 'react'
import ExtensionIcon from 'material-ui/svg-icons/action/extension'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Palette from 'material-ui/svg-icons/image/palette'
import ActionHome from 'material-ui/svg-icons/action/home'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import HardwareVideogameAsset from 'material-ui/svg-icons/hardware/videogame-asset'
import { muiTheme } from 'storybook-addon-material-ui'
import IconButton from 'material-ui/IconButton'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { BoardComponent, BaseBoardItemComponent } from '@regardsoss/components'
import withStore from '../../decorators/withStore'

const items = [
  {
    title: 'A title',
    subtitle: 'This is the subtitle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi tortor, pharetra et porta vitae, luctus at mauris. Proin dignissim porta vehicula. Suspendisse eleifend nulla sapien, sed sollicitudin orci maximus sit amet. Maecenas eget lorem elementum, sagittis mi non, congue enim. Integer maximus nibh ut sollicitudin hendrerit.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi tortor, pharetra et porta vitae, luctus at mauris. Proin dignissim porta vehicula. Suspendisse eleifend nulla sapien, sed sollicitudin orci maximus sit amet. Maecenas eget lorem elementum, sagittis mi non, congue enim. Integer maximus nibh ut sollicitudin hendrerit.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi tortor, pharetra et porta vitae, luctus at mauris. Proin dignissim porta vehicula. Suspendisse eleifend nulla sapien, sed sollicitudin orci maximus sit amet. Maecenas eget lorem elementum, sagittis mi non, congue enim.',
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

storiesOf('Board', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('Base board item', () => (
    <BaseBoardItemComponent
      title={'This is the title'}
      subtitle={'It has a subtitle'}
      description={'This is the description'}
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
        </IconButton>,
      ]}
    />
  ))
  .add('BoardComponent', () => (
    <BoardComponent items={items} />
  ))
