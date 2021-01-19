/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export { default as themeContextType } from './contextType'
export { default as ThemeInjector } from './ThemeInjector'
export { default as injectTheme } from './ThemeInjectionDecorator'
export { default as reducers } from './model/reducers'
export { default as getCurrentTheme } from './model/selectors/getCurrentTheme'
export { default as setCurrentTheme } from './model/actions/setCurrentTheme'
export { default as ThemeProvider } from './containers/ThemeProvider'
export { default as defaultCustomConfiguration } from './custom/defaultCustomConfiguration'
export { default as getAlternativeThemeConfSubset } from './custom/getAlternativeThemeConfSubset'
export {
  themeSelectors as ThemeSelectors,
  themeActions as ThemeActions,
} from './clients/ThemeClient'
export { themeInstanceActions as ThemeInstanceActions } from './clients/ThemeInstanceClient'
export { default as ModuleStyleProvider } from './containers/ModuleStyleProvider'
export { default as withModuleStyle } from './decorators/withModuleStyle'
export { default as SwitchThemeDecorator } from './containers/SwitchThemeDecorator'
export { default as ThemeBuilder } from './ThemeBuilder'
