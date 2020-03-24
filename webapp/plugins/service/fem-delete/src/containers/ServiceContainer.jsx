/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import Subheader from 'material-ui/Subheader'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteIcon from 'mdi-material-ui/Delete'
import { i18nContextType } from '@regardsoss/i18n'
import { requestsActions } from '../clients/RequestsClient'
/**
 * Main fem-delete plugin container
 * @author C-S
 */
export class ServiceContainer extends React.Component {
  // the document styles
  static DOCUMENT_STYLES = {
    padding: '5px 15px 5px 5px',
    // Material UI look and feel
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
  }

  // any content styles
  static CONTENT_STYLES = {
    paddingTop: '25px',
    color: 'rgba(255, 255, 255, 0.85)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }

  static BUTTONS_STYLES = {
    paddingTop: '25px',
    display: 'flex',
  }

  static BUTTON_STYLE = {
  }
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // TODO use or DELETE
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { runtimeTarget }) {
    return {
      // we apply partially the method getReducePromise to ignore dispatch reference at runtime
      getReducePromise: (reducer, initialValue) => runtimeTarget.getReducePromise(dispatch, reducer, initialValue),
      deleteFeatures: (searchContext) => dispatch(requestsActions.delete(searchContext)),
    }
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    pluginInstanceId: PropTypes.string.isRequired,
    runtimeTarget: AccessShapes.RuntimeTarget.isRequired,
    configuration: AccessShapes.RuntimeConfiguration.isRequired,
    // From mapDispatchToProps
    getReducePromise: PropTypes.func.isRequired, // partially applied reduce promise, see mapStateToProps and later code demo
  }

  static contextTypes = {
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  state = {
    runtimeObjects: [],
  }

  componentDidMount() {
    // Start fetching and converting entities: append each new entity in array
    // Note: It isn't a good pratice to keep complete entities in memory as it result
    // in heavy memory load (just demonstrated here)
    const { getReducePromise } = this.props

    getReducePromise((previouslyRetrieved, entity) => [...previouslyRetrieved, entity], [])
      .then(runtimeObjects => this.setState({ runtimeObjects }))
      .catch(err => console.error('Could not retrieve service runtime entities', err))
  }

  notifyFem = () => {
    console.error("let's notify")
    this.props.deleteFeatures().then(() => {
      this.props.onClose()
    })
    
  }
  cancel = () => {

    this.props.onClose()
  }

  render() {
    const { intl: { formatMessage } } = this.context

    const { runtimeObjects } = this.state
    return (
      <div style={ServiceContainer.DOCUMENT_STYLES}>
        <Subheader><FormattedMessage id="plugin.title" /></Subheader>
        <div style={ServiceContainer.CONTENT_STYLES}>
          <FormattedMessage id="plugin.message" />
          <div style={ServiceContainer.BUTTONS_STYLES}>
            <RaisedButton
              label={formatMessage({ id: 'plugin.cancel' })}
              style={ServiceContainer.BUTTON_STYLE}
              onClick={this.cancel}
            />
            <RaisedButton
              label={formatMessage({ id: 'plugin.valid' })}
              style={ServiceContainer.BUTTON_STYLE}
              primary
              onClick={this.notifyFem}
              icon={<DeleteIcon />}
            />
          </div>
        </div>
      </div>
    )
  }
}

// export REDUX connected container
export default connect(
  ServiceContainer.mapStateToProps,
  ServiceContainer.mapDispatchToProps)(ServiceContainer)
