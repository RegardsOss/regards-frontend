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
import themeContextType from './contextType'
import ThemeInjector from './ThemeInjector'
import injectTheme from './ThemeInjectionDecorator'
import reducers from './model/reducers'
import getCurrentTheme from './model/selectors/getCurrentTheme'
import setCurrentTheme from './model/actions/setCurrentTheme'
import ThemeProvider from './containers/ThemeProvider'
import defaultCustomConfiguration from './custom/defaultCustomConfiguration'
import getAlternativeThemeConfSubset from './custom/getAlternativeThemeConfSubset'
import {
  themeSelectors as ThemeSelectors,
  themeActions as ThemeActions,
} from './clients/ThemeClient'
import { themeInstanceActions as ThemeInstanceActions } from './clients/ThemeInstanceClient'
import ModuleStyleProvider from './containers/ModuleStyleProvider'
import withModuleStyle from './decorators/withModuleStyle'
import SwitchThemeDecorator from './containers/SwitchThemeDecorator'
import ThemeBuilder from './ThemeBuilder'

export {
  themeContextType,
  ThemeInjector,
  injectTheme,
  reducers,
  ThemeSelectors,
  getCurrentTheme,
  setCurrentTheme,
  ThemeActions,
  ThemeInstanceActions,
  defaultCustomConfiguration,
  getAlternativeThemeConfSubset,
  ThemeProvider,
  ModuleStyleProvider,
  SwitchThemeDecorator,
  withModuleStyle,
  ThemeBuilder,
}
