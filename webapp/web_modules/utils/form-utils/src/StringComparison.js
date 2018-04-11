/**
* LICENSE_PLACEHOLDER
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
      (acc, accents, char) =>
        accents.reduce((innerAcc, accent) => innerAcc.split(accent).join(char), acc)
      , str.toLowerCase(),
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
