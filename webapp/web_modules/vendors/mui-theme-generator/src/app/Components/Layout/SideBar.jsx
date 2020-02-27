import React from 'react'
import pick from 'lodash/pick'
import concat from 'lodash/concat'
import omit from 'lodash/omit'
import { List, ListItem } from 'material-ui/List'
import PaletteIcon from 'material-ui/svg-icons/image/palette'
import MUIComponentsIcon from 'material-ui/svg-icons/action/view-quilt'
import RegardsComponentsIcon from 'material-ui/svg-icons/image/remove-red-eye'
import ModulesThemeIcon from 'mdi-material-ui/Puzzle'
import { createAttributes } from '../ThemeSelector/Attribute'

import { i18nContextType } from '@regardsoss/i18n'

export class SideBar extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render(){
  const {
    overwrites, theme, customConfigurationKeys, addToOverwrites, 
    removeFromOverwrites, handleResetOverwrite,
  } = this.props
 
  const {
    alternativeTheme,
    mainTheme: {
      palette,
      ...otherMainThemes
    }
  } = theme
  const { intl: { formatMessage } } = this.context 

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
          primaryText={formatMessage({id : 'palette.label'})}
          leftIcon={<PaletteIcon />}
          primaryTogglesNestedList
          nestedItems={paletteItems}
        />
        <ListItem
          primaryText={formatMessage({id : 'material.components.label'})}
          leftIcon={<MUIComponentsIcon />}
          primaryTogglesNestedList
          nestedItems={materialItems}
        />
        <ListItem
          primaryText={formatMessage({id : 'regards.components.label'})}
          leftIcon={<RegardsComponentsIcon />}
          primaryTogglesNestedList
          nestedItems={regardsItems}
        />
        <ListItem
          primaryText={formatMessage({id : 'secondary.theme.label'})}
          leftIcon={<ModulesThemeIcon />}
          primaryTogglesNestedList
          nestedItems={alternativeItems}
        />
      </List>
    </div>)
  }
}
