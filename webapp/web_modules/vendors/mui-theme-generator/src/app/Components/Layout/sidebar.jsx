import React from 'react'
import pick from 'lodash/pick'
import concat from 'lodash/concat'
import omit from 'lodash/omit'
import { List, ListItem } from 'material-ui/List'
import PaletteIcon from 'material-ui/svg-icons/image/palette'
import ComponentIcon from 'material-ui/svg-icons/action/view-quilt'

import { createAttributes } from '../ThemeSelector/Attribute'


export const SideBar = ({
  overwrites, theme, customConfigurationKeys, addToOverwrites, removeFromOverwrites, handleResetOverwrite
}) => {
  const {
    alternativeTheme,
    mainTheme: {
      palette,
      ...otherMainThemes
    }
  } = theme
  const materialUIProps = omit(otherMainThemes, concat(customConfigurationKeys, 'rawTheme', 'baseTheme', 'themeName'))
  const regardsCustomComp = pick(otherMainThemes, customConfigurationKeys)
  const paletteItems = createAttributes(palette, overwrites, addToOverwrites, removeFromOverwrites, handleResetOverwrite, ['mainTheme', 'palette'], false, true)
  const materialItems = createAttributes(materialUIProps, overwrites, addToOverwrites, removeFromOverwrites, handleResetOverwrite, ['mainTheme'], true, true)
  const regardsItems = createAttributes(regardsCustomComp, overwrites, addToOverwrites, removeFromOverwrites, handleResetOverwrite, ['mainTheme'], true, true)
  const alternativeItems = createAttributes(alternativeTheme, overwrites, addToOverwrites, removeFromOverwrites, handleResetOverwrite, ['alternativeTheme'], true, true)

  return (
    <div>
      <List>
        <ListItem
          primaryText="Palette"
          leftIcon={<PaletteIcon />}
          primaryTogglesNestedList
          nestedItems={paletteItems}
        />
        <ListItem
          primaryText="Material components"
          leftIcon={<ComponentIcon />}
          primaryTogglesNestedList
          nestedItems={materialItems}
        />
        <ListItem
          primaryText="Regards components"
          leftIcon={<ComponentIcon />}
          primaryTogglesNestedList
          nestedItems={regardsItems}
        />
        <ListItem
          primaryText="Secondary theme"
          leftIcon={<ComponentIcon />}
          primaryTogglesNestedList
          nestedItems={alternativeItems}
        />
      </List>
    </div>
  )
}
