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
import SelectThemeContainer from './containers/SelectThemeContainer'
import injectTheme from './ThemeInjectionDecorator'
import reducers from './model/reducers'
import getCurrentTheme from './model/selectors/getCurrentTheme'
import ThemeProvider from './containers/ThemeProvider'
import defaultCustomConfiguration from './custom/defaultCustomConfiguration'
import {
  themeSelectors as ThemeSelectors,
  themeActions as ThemeActions,
} from './clients/ThemeClient'
import {
  themeInstanceActions as ThemeInstanceActions,
} from './clients/ThemeInstanceClient'
import defaultTheme from './model/defaultTheme'
import ModuleStyleProvider from './components/ModuleStyleProvider'
import withModuleStyle from './decorators/withModuleStyle'

export {
  themeContextType,
  ThemeInjector,
  SelectThemeContainer,
  injectTheme,
  reducers,
  ThemeSelectors,
  getCurrentTheme,
  ThemeActions,
  ThemeInstanceActions,
  defaultCustomConfiguration,
  defaultTheme,
  ThemeProvider,
  ModuleStyleProvider,
  withModuleStyle,
}
