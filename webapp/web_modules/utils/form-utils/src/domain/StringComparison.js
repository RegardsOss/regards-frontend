/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'

export default class StringComparison {
  static charToAccentMap = {
    a: ['à', 'á', 'â', 'ã', 'ä', 'å', 'æ'],
    c: ['ç'],
    e: ['è', 'é', 'ê', 'ë', 'æ'],
    i: ['ì', 'í', 'î', 'ï'],
    n: ['ñ'],
    o: ['ò', 'ó', 'ô', 'õ', 'ö', 'ø'],
    s: ['ß'],
    u: ['ù', 'ú', 'û', 'ü'],
    y: ['ÿ'],
  }

  /**
   * Returns a comparable string from string as parameter (removes accents and case)
   * @param {*} str string
   * @return comparable string
   */
  static getComparableLabel(str) {
    return reduce(
      StringComparison.charToAccentMap,
      (acc, accents, char) => accents.reduce((innerAcc, accent) => innerAcc.split(accent).join(char), acc),
      str.toLowerCase(),
    )
  }

  /**
   * Compares strings as parameter
   * @param {*} str1 first string
   * @param {*} str2  second string
   */
  static compare(str1, str2) {
    const comparableStr1 = StringComparison.getComparableLabel(str1)
    const comparableStr2 = StringComparison.getComparableLabel(str2)
    if (comparableStr1 < comparableStr2) {
      return -1
    }
    if (comparableStr1 > comparableStr2) {
      return 1
    }
    return 0
  }
}
