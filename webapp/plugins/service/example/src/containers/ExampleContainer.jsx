/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isNumber from 'lodash/isNumber'
import isNaN from 'lodash/isNaN'
import isString from 'lodash/isString'
import map from 'lodash/map'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { AccessShapes } from '@regardsoss/shape'
import { AccessDomain } from '@regardsoss/domain'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ScrollArea } from '@regardsoss/adapters'
import ExampleChartDisplayer from '../components/ExampleChartDisplayer'

/**
 * An example service plugin container
 *
 * About plugin service properties and mechanism, see [documentation server]/frontend/plugin-services/ page
 * Writing service plugin
 *
 * @author Raphaël Mechali
 * @author Leo Mieulet
 */
export class ExampleContainer extends React.Component {
  /**
   * Redux connector to state: allows retrieving store elements. Used here to demo how to some fetched data from central store
   * @param {*} state redux dispatch function
   * note: non redux properties are also availble as second parameter
   */
  static mapStateToProps = (state) => {
    // select the stuff we want in central redux store
    const authenticationInfo = AuthenticationClient.authenticationSelectors.getAuthenticationResult(state)
    // if there is some info, then return user login
    return {
      user: get(authenticationInfo, 'result.sub', null), // note : for bundle size issues, we should never import all lodash, but only the function required, here 'get'
    }
  }

  /**
   * Redux connector to dispatch: allows dispatching action. used here to demo the reduce promise on runtime target
   * @param {*} dispatch redux dispatch function
   * @param {*} props this properties (non redux injected)
   */
  static mapDispatchToProps = (dispatch, { runtimeTarget }) => ({
    // we apply partially the method getReducePromise to ignore dispatch reference at runtime
    getReducePromise: (reducer, initialValue) => runtimeTarget.getReducePromise(dispatch, reducer, initialValue),
    // We also demonstrate here how to use the fetch action direction. However, that method should not be priviledged
    // as being more verbose
    fetchSelectionThroughAction: (...args) => dispatch(runtimeTarget.getFetchAction(...args)),
  })

  static propTypes = {
    /** Plugin identifier (Note: wee keep that property only for demo purposes, as it is standard property
     * for plugin services, but we do not use it. see below how we disable the eslint warning one one line only
     * for a specific warning type (VS Code or IntelliJfetchSelectionThroughAction normally shows the corresponding rule as tooltip) */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired,
    /** Runtime target: see regards documentation for more details */
    runtimeTarget: AccessShapes.RuntimeTarget.isRequired,
    /** Static and dynamic configurations: see regards documentation for more details */
    configuration: AccessShapes.RuntimeConfiguration.isRequired,
    // From mapStateToProps
    user: PropTypes.string, // user login or null, see mapStateToProps
    // From mapDispatchToProps
    getReducePromise: PropTypes.func.isRequired, // partially applied reduce promise, see mapStateToProps and later code demo
    fetchSelectionThroughAction: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  // the scroll area styles
  static SCROLL_AREA_STYLES = { height: '100%' }

  // the document styles
  static DOCUMENT_STYLES = {
    padding: '5px 15px 5px 5px',
    // Material UI look and feel
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
  }

  // any content styles
  static CONTENT_STYLES = {
    paddingLeft: '25px',
    color: 'rgba(255, 255, 255, 0.85)',
  }

  /**
   * Standard lyfecycle method of a React component, componentWillMount is called before the the component mounts and renders.
   * It is a good place to initialize component state.
   */
  componentWillMount() {
    const { runtimeTarget } = this.props
    //  set up in state some loading information for first rendering
    this.setState({
      loading: true,
      errorMessage: null, // will be set by promise catch
      currentIndex: 0,
      totalElements: runtimeTarget.entitiesCount,
      lastLoadedEntity: null, // will be set by the reducer, step by step
      results: null, // will be set after reducing promise returned
    })
  }

  /**
   * Standard lyfecycle method of a React component, componentDidMount is called before the the component mounts and renders. It
   * is the best lifecycle hook to start fetching data
   * Demo: We are illustrating here the use of reduce promise to store a result in state
   * Warning: reduce promise may work with all ONE, MANY and QUERY target types (which is the case here, depending on user
   * selection). But, as it can last a very long time, it is a good practice to show advancement to the user. Also, AVOID
   * keeping every entity in memory to not break up the browser. Note that currently, only 10 000 entities will be retrieved into
   * the catalog, not all elements. Last consideration, getReducePromise will provide entity content to the reducer as
   * an Entity.content object, where Entity comes from @regardsoss/shape/rs-catalog (exported CatalogShapes). That means the entity
   * will look like: { id: long, ipId: string, sipId: string, label: string, entityType: entityType, tags: array, ... }
   */
  componentDidMount() {
    // 1 - get  fetcher and pDate value
    const { getReducePromise, configuration: { dynamic: { pDate } } } = this.props

    // 2 - For demo purpose, reduce all entities available and count elements before the date and after the
    // Note: this illustrates the most convenient way to fetch server information without writing specific code by
    // target type. When in query mode, excluded elements from selection will be automatically handled (we do not need to
    // care about it)
    // WARNING: be aware of the following points when fetching on a query target type:
    // - When performing query, a lot of entities can be fetched so, it can be
    // - There is a current limitation to 10 000 entities.
    getReducePromise((previousResult, entity, index) => {
      // R.1 - let's update the state, so that user can see the advancement
      this.setState({ currentIndex: index, lastLoadedEntity: entity.label })// react is cool,ithe will only change those fields in state!
      // R.2 - check if STOP_DATE, from TIME_PERIOD fragment is before or after this date pameter. Note
      // that all fragments are set up in properties attribute. Also note that dates, in backend model, are actually saved as string
      let { beforeDateCount, afterDateCount, unknown } = previousResult
      const entityStopDate = get(entity, 'properties.TIME_PERIOD.STOP_DATE')
      if (!entityStopDate) {
        unknown += 1 // model date is not set
      } else {
        // make sure we have a date
        const comparableDate = isDate(entityStopDate) ? entityStopDate : new Date(entityStopDate)
        if (isNaN(comparableDate.getTime())) {
          unknown += 1 // model date is invalid
        } else if (comparableDate.getTime() > pDate.getTime()) {
          afterDateCount += 1 // date is after user parameter
        } else {
          beforeDateCount += 1 // date is before user parameter
        }
      }
      // return the next results
      return { beforeDateCount, afterDateCount, unknown }
    }, { beforeDateCount: 0, afterDateCount: 0, unknown: 0 }) // initial reduction value
      .then((results) => { // here results is the last reducer returned value
        // the reduction promise finished, update state to store results
        this.onResultsCounted(results)
      })
      .catch((e) => {
        console.error('An error occured: ', e)
        this.setState({ loading: false, errorMessage: e ? e.message : 'unknown error' })
      })

    // For demo purpose, we demonstrate here the manual fetching
    this.loadThroughActions()
  }

  /**
   * Results counted through reduction promise
   * Note 1: Externalizing events callback methods is a good pratice as we
   * will be able to call it directly in tests
   * Note 2: The lambda notation is a good practice for on{Event} methods, as we do not need to bind lambda functions through react
   * (we can use them with this in JSX code). Obsviously it is not useful here, it is only a demonstration of such notation
   * @param results {beforeDateCount: number, afterDateCount: number, unknown: number} reduction results
   */
  onResultsCounted = (results) => {
    this.setState({ loading: false, results })
  }

  /**
   * Demonstrates loading through fetch actions dispatching
   */
  loadThroughActions() {
    // note: it is possible to access and dispatch the fetch actions manually, like demonstrated here.
    // however, we do prefer most of the time the reduce method, as being less verbose and more functional oriented
    const { runtimeTarget, fetchSelectionThroughAction } = this.props
    switch (runtimeTarget.type) {
      case AccessDomain.RuntimeTargetTypes.ONE:
        // no parameter, one element
        fetchSelectionThroughAction()
          .then(result => console.info('[ONE] I fetched one element', result))
          .catch(err => console.error('[ONE] I failed fetching, error says', err))
        break
      case AccessDomain.RuntimeTargetTypes.MANY:
        // many elements: fetch all (map to a promise array)
        Promise.all(runtimeTarget.entities.map(ipId => fetchSelectionThroughAction(ipId)))
          .then(result => console.info('[MANY] I fetched many elements', result))
          .catch(err => console.error('[MANY] I failed fetching, error says', err))
        break
      case AccessDomain.RuntimeTargetTypes.QUERY:
        {
          // query: lets fetch all pages. Note: this is a really wrong practice, as it may overflow the client browser memory
          const total = runtimeTarget.entitiesCount
          const pageSize = 4000
          const pageCount = Math.ceil(total / pageSize)
          const promises = []
          for (let i = 0; i < pageCount; i += 1) {
            promises.push(fetchSelectionThroughAction(i, pageSize))
          }
          Promise.all(promises)
            // Note: here, we should exclude from handled elements the runtimeTarget.excludedIpIds (this is not automatic when using actions)
            .then(result => console.info('[QUERY] I fetched query elements', result))
            .catch(err => console.error('[QUERY] I failed fetching, error says', err))
        }
        break
      default:
        console.error('Unknown target type ', runtimeTarget.type)
    }
  }

  /**
   * Renders the configuration value into DOM (knowing only string can be rendered)
   */
  renderValue = (value) => {
    if (!value) {
      return 'value not set'
    }
    if (isDate(value)) {
      // parameters of type date
      return `${value.toString()} (date)`
    }
    if (isBoolean(value)) {
      // parameters of type boolean
      return `${value.toString()} (boolean)`
    }
    if (isNumber(value)) {
      // parameters of type int or float
      return `${value.toString()} (number)`
    }
    if (isString(value)) {
      // parameters of type string or char
      return `${value} (string)`
    }
    return `unknown value type ${value}`
  }

  /**
   * Standard react component render method
   * Rendering considerations:
   * - Regards is based, for rendering, on material UI. Hence, HTML styles are virgin,
   * meaning, h1, h2, p and so on will not render correctly without CSS. Therefore, prefer using material components
   * or inline 'style' attribute to get graphics rendered correctly
   * - Regards uses and provides to plugins the following COTS:
   *   - material UI, for general inputs and graphics see http://www.material-ui.com/#/components
   *   - react-chartjs-2, for charts (see @regardsoss/adapters/ChartAdapter component and https://github.com/jerairrest/react-chartjs-2)
   *   - react-ace, for code files displaying (see @regardsoss/adapters/AceEditorAdapter component and https://github.com/securingsincity/react-ace)
   *   - react-scrollbar, for scrollable areas displaying (see @regardsoss/adapters/ScrollAreaAdapter and https://www.npmjs.com/package/react-scrollbar)
   * - Regards provides re usable components in @regardsoss/components and in some of the utils modules (@regardsoss/display-control or
   * @regardsoss/form-utils for instance)
   * - Normally, react containers are not supposed carrying of the graphics (style and such), but for the demo pruposes, we did
   * not split the code file in container / components files
   * - we could access plugin styles using:
   * const { moduleTheme } = this.context (styles function results is in moduleTheme variable)
   */
  render() {
    const {
      loading, currentIndex, totalElements, lastLoadedEntity, errorMessage, results,
    } = this.state
    const { configuration, runtimeTarget, user } = this.props
    // here we render the whole content in vertical scrollable area, to not assert the client screen height is sufficient
    // please note that scroll area requires a height constraints when in vertical mode (height: '100%' here)
    return (
      <ScrollArea vertical style={ExampleContainer.SCROLL_AREA_STYLES}>
        <div style={ExampleContainer.DOCUMENT_STYLES}>
          { /* 1 -let's show the target mode (illustates immediately invoked function pattern and type switch)  */}
          <Subheader><FormattedMessage id="title.plugin.top.message" /></Subheader>
          {(() => {
            let myWord = null
            switch (runtimeTarget.type) {
              case AccessDomain.RuntimeTargetTypes.ONE:
                myWord = 'one element'
                break
              case AccessDomain.RuntimeTargetTypes.MANY:
                myWord = 'many elements'
                break
              case AccessDomain.RuntimeTargetTypes.QUERY:
                myWord = 'all elements in query'
                break
              default:
                myWord = 'an unknwon target, so scary!?'
            }
            return (
              <div style={ExampleContainer.CONTENT_STYLES}>
                [Not internationalized] The plugin runs for
                {myWord}
                . Thank you
                {user || 'patient unknown person'}
              </div>
            )
          })()
          }
          { /* 2 - lets shows the static configuration, using i18n message.
        Note: it would normally be better place in a component, as it holds graphics notions (container should be
        reserved for logical operations like fetching data, converting, hiding / showing....
        */ }
          <Subheader><FormattedMessage id="title.static.configuration" /></Subheader>
          { // using lodash map, we extract parameters and keys to display them. Note that react needs keys in children arrays
            map(configuration.static, (value, key) => (
              <div style={ExampleContainer.CONTENT_STYLES} key={key}>
                <div style={{ display: 'inline' }}>
                  <em>
                    {key}
                    :
                  </em>
                </div>
                <div style={{ display: 'inline' }}>{this.renderValue(value)}</div>
              </div>))
          }
          { /* 3 - now dynamic configurationcomponent  */}
          <Subheader><FormattedMessage id="title.dynamic.configuration" /></Subheader>
          { // very same mapping for dynamic elements
            map(configuration.dynamic, (value, key) => (
              <div style={ExampleContainer.CONTENT_STYLES} key={key}>
                <div style={{ display: 'inline' }}>
                  <em>
                    {key}
                    :
                  </em>
                </div>
                <div style={{ display: 'inline' }}>{this.renderValue(value)}</div>
              </div>))
          }
          { /* 4 - now we show loading or the component, if loading is done  */}
          <Subheader><FormattedMessage id="title.plugin.content" /></Subheader>
          {
            // 4.1 - loading rendering
            loading ? (
              // show an updatable loading message with placeholders. Note that creating an object during render (values),
              // is a usually bad practice. Note: 0 is false too in JS, hence the currentIndex || '0' instruction
              // you see below how to disable the warning from eslint
              <div style={ExampleContainer.CONTENT_STYLES}>
                <FormattedMessage
                  id="plugin.content.loading"
                  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                  values={{ currentIndex: currentIndex || '0', totalElements, lastLoadedEntity: lastLoadedEntity || '-' }}
                />
              </div>) : null
          }
          {
            // 4.2 - error rendering
            errorMessage ? (
              <div style={ExampleContainer.CONTENT_STYLES}>
                <FormattedMessage
                  id="plugin.content.error"
                  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                  values={{ errorMessage }}
                />
              </div>) : null
          }
          {
            // 4.3 - results rendering
            results ? (
              <div style={ExampleContainer.CONTENT_STYLES}>
                { /* react shorthand notation to inject all properties, knowing results has all fields expected by ExampleChartDisplayer */}
                <ExampleChartDisplayer {...results} />
              </div>) : null
          }
        </div>
      </ScrollArea>
    )
  }
}

export default connect(ExampleContainer.mapStateToProps, ExampleContainer.mapDispatchToProps)(ExampleContainer)
