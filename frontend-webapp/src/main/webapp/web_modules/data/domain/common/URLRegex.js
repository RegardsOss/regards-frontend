/**
 * LICENSE_PLACEHOLDER
 **/
const relativeURLRegexp =
  /^(\.\.?\/)*([-a-z\d%_.~+]+)(\/[-a-z\d%_:.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i


const validURLRegexp =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.:~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i

export default {
  relativeURLRegexp,
  validURLRegexp,
}
