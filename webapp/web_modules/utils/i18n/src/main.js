/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
/**
 * Main interface for i18n utils
 * @author Sébastien Binda
 */
export { default as I18nProvider } from './containers/I18nProvider'
export { setLocale } from './model/I18nActions'
export { default as i18nReducers } from './model/I18nReducers'
export { default as i18nSelectors } from './model/I18nSelectors'
export { default as i18nContextType } from './contextType'
export { default as withI18n } from './withI18n'
