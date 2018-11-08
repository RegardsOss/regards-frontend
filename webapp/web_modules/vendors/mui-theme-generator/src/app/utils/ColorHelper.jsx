import * as ColorTones from 'material-ui/styles/colors'


export class ColorTone {
  color;

  tone;

  constructor(value) {
    const colorTone = ColorHelper.colorToneRegex.exec(value)
    this.tone = colorTone[2] || colorTone[1]
    this.color = colorTone[2] && colorTone[1] || ''
  }

  get() {
    return ((this.color || '') + (this.tone || '')).trim()
  }
}

export class RgbaColor {
  r;

  g;

  b;

  a;

  constructor(r, g, b, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  get() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  getHex() {
    return `#${(`00000${(this.r << 16 | this.g << 8 | this.b).toString(16)}`).slice(-6)}`
  }
}

export class ColorInfo {
  rgba;

  colorTone;

  constructor(value) {
    this.parse(value)
  }

  parse(value) {
    value = (value || '').trim()
    this.rgba = null
    this.colorTone = null

    if (value) {
      if (ColorHelper.colorToneRegex.test(value)) {
        value = ColorTones[value]
      }

      if (ColorHelper.hexRegex.test(value)) {
        return this.setHex(value)
      }

      if (ColorHelper.rgbaRegex.test(value)) {
        return this.setRgba(value)
      }
    }

    throw new Error('Not valid')
  }

  setAlpha(alpha) {
    this.rgba.a = alpha || this.getAlpha() || 1
  }

  setHex(hex) {
    this.rgba = ColorHelper.parseHex(hex)
    this.resetKey()
  }

  setRgba(rgba) {
    this.rgba = ColorHelper.parseRgba(rgba)
    this.resetKey()
  }

  resetKey() {
    this.colorTone = ColorHelper.reverseColorMap[this.get()]
      || ColorHelper.reverseColorMap[this.rgba.getHex()]
      || {}
  }

  getAlpha() {
    return this.rgba.a
  }

  get() {
    return this.getAlpha() == 1 ? this.rgba.getHex() : this.rgba.get()
  }
}


export class ColorHelper {
  static hexRegex = /^#?([a-f\d]{3,6})$/i;

  static rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

  static colorToneRegex = /^([^#][^A\d]+)([A?\d]+)?$/;


  static reverseColorMap = (() => Object.keys(ColorTones).reduce((result, key) => {
    const value = ColorTones[key]
    result[value] = new ColorTone(key)
    return result
  }, {}))();

  static colorToneList = (() => Object.keys(ColorTones).reduce((result, value) => {
    const colorInfo = new ColorInfo(value)
    const color = colorInfo.colorTone.color
    const tone = colorInfo.colorTone.tone

    result[color] = result[color] || {}
    result[color][tone] = colorInfo

    return result
  }, {}))();

  static getDefaultColor(colorInfo) {
    var colorInfo = ColorHelper.colorToneList[colorInfo]['500']

    return colorInfo && colorInfo.get() || '#fff'
  }

  static parseNumber(number) {
    return parseFloat(number) || 0
  }

  static parseRgba(rgba) {
    const result = ColorHelper.rgbaRegex.exec(rgba)
    return new RgbaColor(
      ColorHelper.parseNumber(result[1]),
      ColorHelper.parseNumber(result[2]),
      ColorHelper.parseNumber(result[3]),
      ColorHelper.parseNumber(result[4]))
  }

  static parseHex(hex) {
    hex = ColorHelper.hexRegex.exec(hex)[1]
    const arrBuff = new ArrayBuffer(4)
    const vw = new DataView(arrBuff)
    vw.setUint32(0, parseInt(hex, 16), false)
    const arrByte = new Uint8Array(arrBuff)

    return new RgbaColor(arrByte[1], arrByte[2], arrByte[3])
  }
}


/**
 * Regex that match color
 * @source https://gist.github.com/olmokramer/82ccce673f86db7cda5e
 */
export const regexColor = /^(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))$/i


