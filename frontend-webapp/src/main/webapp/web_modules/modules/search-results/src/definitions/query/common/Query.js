/**
* LICENSE_PLACEHOLDER
**/

/**
 *  Common query model
 */
export default class Query {

  /**
   * Query constructor
   * @param rootQuery root query path (optional)
   * @param parameters query parameters [{StaticQueryParameter}]
   * @param separator query parameters separator (like '&' or )
   */
  constructor(rootQuery, parameters, separator) {
    this.rootQuery = rootQuery
    this.parameters = parameters
    this.separator = separator
  }

  toQueryString() {
    // inner recursive function to generate query string
    const makeQueryChain = (parameters) => {
      if (parameters.length === 0) {
        return this.rootQuery || ''
      }
      // A - generate the previous parameters research
      const previousParameters = parameters.slice(0, -1)
      const previousQueryChain = makeQueryChain(previousParameters)

      // B - append the current parameter with the right separator symbol
      const [lastParameter] = parameters.slice(-1)
      const paramSeparator = previousQueryChain ? this.separator : ''
      const lastParamString = lastParameter.toQueryString()
      if (lastParamString && lastParamString !== '') {
        return `${previousQueryChain}${paramSeparator}${lastParameter.toQueryString()}`
      }
      return `${previousQueryChain}`
    }

    return makeQueryChain(this.parameters)
  }

}
