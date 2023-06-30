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
import Archive from 'mdi-material-ui/Archive'
import CallSplit from 'mdi-material-ui/CallSplit'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import {
  CardActionsComponent,
  ErrorCardComponent,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Information message to inform user that the SIP Submission fonctionality is not available yet.
* @author Sébastien Binda
*/
class SIPSubmissionNotReadyComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onConfigureAllocationStrategies: PropTypes.func.isRequired,
    onConfigureDataStorages: PropTypes.func.isRequired,
    onConfigureCatalogSecurity: PropTypes.func.isRequired,
    serverMessage: PropTypes.string,
  }

  static defaultProps = {}

  static contextTypes = {
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  static buttonStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '20px 0px',
  }

  static flexStyles = {
    display: 'flex',
    flexDirection: 'column',
  }

  renderServerMessage = () => {
    const { intl } = this.context
    if (this.props.serverMessage && this.props.serverMessage !== '') {
      return (
        <div>
          <br />
          <div>{intl.formatMessage({ id: 'sips.submission.not.ready.server.message' })}</div>
          <ErrorCardComponent
            message={this.props.serverMessage}
          />
        </div>
      )
    }
    return null
  }

  render() {
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'sips.submission.not.ready.title' })}
        />
        <CardText>
          <div style={SIPSubmissionNotReadyComponent.flexStyles}>
            <div>{intl.formatMessage({ id: 'sips.submission.not.ready.information.message' })}</div>
            {this.renderServerMessage()}
            <div style={SIPSubmissionNotReadyComponent.buttonStyles}>
              <RaisedButton
                label={intl.formatMessage({ id: 'sips.submission.not.ready.config.allocations.link.button' })}
                primary
                icon={<CallSplit />}
                onClick={this.props.onConfigureAllocationStrategies}
              />
              <RaisedButton
                label={intl.formatMessage({ id: 'sips.submission.not.ready.config.storages.link.button' })}
                primary
                icon={<Archive />}
                onClick={this.props.onConfigureDataStorages}
              />
              <RaisedButton
                label={intl.formatMessage({ id: 'sips.submission.not.ready.config.catalog.security.link.button' })}
                primary
                icon={<Archive />}
                onClick={this.props.onConfigureCatalogSecurity}
              />
            </div>
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'sips.submission.not.ready.back.button' })}
            mainButtonClick={this.props.onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default SIPSubmissionNotReadyComponent
