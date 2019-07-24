/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isFunction from 'lodash/isFunction'
import intlStub from './IntlStub'
import themeStub from './MuiThemeStub'

/**
 * Builds test module styles
 * @param {function|{styles: {function}}} moduleStyles modules styles provided (may be a function of an object like {styles: function})
 * @return {*} test module styles
 */
function buildStyles(moduleStyles) {
  const stylesBuilder = isFunction(moduleStyles) ? moduleStyles : moduleStyles.styles
  return stylesBuilder(themeStub)
}

/**
 * Builds context stub
 * @param {function|{styles: {function}}} styles module styles function or object with styles function (not mandatory)
 * @param {*} otherFields other field in context (not mandatory)
 * @return {*} appliable context
 */
export default function buildTestContext(moduleStyles = () => { }, otherFields = {}) {
  return {
    intl: intlStub,
    muiTheme: themeStub,
    mainTheme: themeStub,
    alternativeTheme: themeStub,
    moduleTheme: buildStyles(moduleStyles),
    ...otherFields,
  }
}
