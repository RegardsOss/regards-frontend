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
 * */
import React from 'react'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import map from 'lodash/map'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { AccessShapes } from '@regardsoss/shape'
import { AccessDomain } from '@regardsoss/domain'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { ScrollArea } from '@regardsoss/adapters'
import ExampleChartDisplayer from '../components/ExampleChartDisplayer'

/**
 * An example service plugin container
 *
 * # About plugin service properties:
 * * test is provided by mapStateToProps, see redux connector at end of the file
 * * testDispatch is provided by mapDispatch to props, see redux connector at end of the file
 * * runtimeTarget has three objects types possibles described below
 * * configuration is the service plugin configuration. It contains two maps, 'static' and 'dynamic'
 * where static and dynamic containing parameters like key:value. The key is the one specified in plugin-info.json.
 * Note: only the parameters marked as required will always be present (the user decides if he fills others or not).
 *
 * # Runtime targets details:
 *
 * ## Common attributes:
 *
 * Every runtime target type (RuntimeTargetTypes.ONE,, RuntimeTargetTypes.MANY, RuntimeTargetTypes.QUERY, from AccessDomain)
 * define the following attributes:
 * * entitiesCount: A number, the count of selected entities for current target
 * * getFetchAction: A method to build a redux fetch action. Such action can be used with Redux
 * method dispatch(getFetchAction(...args)). Please note that function has different parameters, depending on query type
 * * getReducePromise: A function to apply a treatment on each entity . The promise will resolve with the applier result
 * the applier function must be like : (accumulator, entity: <entity unwrapped> ). The getReducePromise signature is
 * (reducer: func, initValue: *, pageSize: number) => Promise.
 * Please note that pageSize optional and is only defined for QUERY type
 *
 * ## By target type attributes:
 *
 * ### Type "ONE"
 *
 * * entity: that field contains entity IP ID, as a string
 * * getFetchAction: that method has signature () => (dipatchableAction:object)
 *
 * ### Type "MANY"
 *
 * * entities: that field contains entities IP ID, as an array of string
 * * getFetchAction: that method has signature (ipID:string) => (dipatchableAction:object). Note that in the specific case of MANY,
 * it should call for each entities
 *
 * ### Type "QUERY"
 *
 * * q: that field contains the open search query to retrieve elements
 * * entityType: that field contains the current entity type, as one of the enumation values ENTITY_TYPES_ENUM,
 * * getFetchAction: that method has signature (pageIndex: (optional) number, (optional) pageSize:number) => (dipatchableAction:object).
 * Note that in the specific case of QUERY, each page should be fetched
 *
 * # Wrting service plugin
 *
 * As it maybe painful to always switch between the target types, we propose the getReducePromise, that works exactly the same than a
 * standard reducer, except it needs the dispatch method from redux and result is available through then() (errors through catch()).
 * Please see the example below.
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
  })

  static propTypes = {
    /** Plugin identifier (Note: wee keep that property only for demo purposes, as it is standard property
     * for plugin services, but we do not use it. see below how we disable the eslint warning one one line only
     * for a specific warning type (VS Code or IntelliJ normally shows the corresponding rule as tooltip) */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: React.PropTypes.string.isRequired,
    /** Runtime target: see class comment */
    runtimeTarget: AccessShapes.RuntimeTarget.isRequired,
    configuration: AccessShapes.RuntimeConfiguration.isRequired,
    // From mapStateToProps
    user: PropTypes.string, // user login or null, see mapStateToProps
    // From mapDispatchToProps
    getReducePromise: PropTypes.func.isRequired, // partially applied reduce promise, see mapStateToProps and later code demo
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
    // target type.
    // WARNING: be aware of the following points when fetching on a query target type:
    // - When performing query, a lot of entities can be fetched so, it can be
    // - There is a current limitation to 10 000 entities.
    getReducePromise((previousResult, entity, index) => {
      // R.1 - let's update the state, so that user can see the advancement
      this.setState({ currentIndex: index, lastLoadedEntity: entity.label })// react is cool,ithe will only change those fields in state!
      // R.2 - check if STOP_DATE, from TIME_PERIOD fragment is before or after this date pameter. Note
      // that all fragments are set up in properties attribute. Also note that dates, in backend model, are actually saved as string
      let beforeDateCount = previousResult.beforeDateCount
      let afterDateCount = previousResult.afterDateCount
      let unknown = previousResult.unknown
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
        this.setState({ loading: false, results })
      })
      .catch((e) => {
        console.error('An error occured: ', e)
        this.setState({ loading: false, errorMessage: e ? e.message : 'unknown error' })
      })
  }


  /**
   * Renders the configuration value into DOM (knowing only string can be rendered)
   */
  renderValue = (value) => {
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
   */
  render() {
    const { loading, currentIndex, totalElements, lastLoadedEntity, errorMessage, results } = this.state
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
                [Not internationalized] The plugin runs for {myWord}. Thank you {user || 'patient unknown person'}
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
                <div style={{ display: 'inline' }}><em>{key}:</em></div>
                <div style={{ display: 'inline' }}>{this.renderValue(value)}</div>
              </div>))
          }
          { /* 3 - now dynamic configurationcomponent  */}
          <Subheader><FormattedMessage id="title.dynamic.configuration" /></Subheader>
          { // very same mapping for dynamic elements
            map(configuration.dynamic, (value, key) => (
              <div style={ExampleContainer.CONTENT_STYLES} key={key}>
                <div style={{ display: 'inline' }}><em>{key}:</em></div>
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
