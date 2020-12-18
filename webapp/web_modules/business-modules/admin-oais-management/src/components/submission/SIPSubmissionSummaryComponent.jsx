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
import get from 'lodash/get'
import map from 'lodash/map'
import size from 'lodash/size'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import DeviceIcon from 'mdi-material-ui/OpenInNew'
import AddIcon from 'mdi-material-ui/PlusCircleOutline'
import ValidIcon from 'mdi-material-ui/Check'
import InfoIcon from 'mdi-material-ui/InformationOutline'
import ErrorIcon from 'mdi-material-ui/AlertCircleOutline'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'

/**
* Component to display sip submission synchrone results from server. May contain rejected or handled SIP.
* @author Sébastien Binda
*/
class SIPsubmissionSummaryComponent extends React.Component {
  static propTypes = {
    submissionResponse: IngestShapes.SIPSubmissionResponse,
    onBack: PropTypes.func.isRequired,
    goToSessionMonitoring: PropTypes.func.isRequired,
    goToSumissionForm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  goToSessionMonitoring = () => {
    const sessionOwner = get(this.props.submissionResponse, 'sessionOwner')
    const session = get(this.props.submissionResponse, 'session')
    this.props.goToSessionMonitoring(sessionOwner, session)
  }

  render() {
    const { submissionResponse, onBack } = this.props
    const { intl: { formatMessage }, moduleTheme: { summary: { granted: grantedStyles, denied: deniedStyles, gotoSubmission } } } = this.context

    const granted = get(submissionResponse, 'granted', {})
    const grantedCount = size(granted)

    const denied = get(submissionResponse, 'denied', {})
    const deniedCount = size(denied)

    const sessionOwner = get(submissionResponse, 'sessionOwner')
    const session = get(submissionResponse, 'session')

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'sips.submission-summary.title' })}
          subtitle={formatMessage({ id: 'sips.submission-summary.subtitle' })}
        />
        <CardText>
          <>
            <div style={grantedStyles.mainMessage}>
              { /* A.1 information or success icon for granted elements */
                  grantedCount
                    ? <ValidIcon style={grantedStyles.icon.valid} />
                    : <InfoIcon style={grantedStyles.icon.info} />
                }
              { // A.2 - Granted features message
                  formatMessage({ id: 'sips.submission-summary.granted.count.message' }, { count: grantedCount })
                }
            </div>
            { // B - Denied features message
                deniedCount ? (
                  <>
                    { /* B.1 - Error icon */ }
                    <div style={deniedStyles.mainMessage}>
                      <ErrorIcon style={deniedStyles.icon} />
                      {/* B.2 - Errors group title */
                      formatMessage({ id: 'sips.submission-summary.denied.count.message' }, { count: deniedCount })
                      }
                    </div>
                    { /* B.3 - Error by feature */
                      map(denied, (value, key) => (
                        <div key={key} style={deniedStyles.featureErrorMessage}>
                          {formatMessage({ id: 'sip.submission-summary.denied.feature.message' }, { label: key, reason: value })}
                        </div>
                      ))
                    }
                  </>
                ) : null
              }
            <div>
              <br />
              {
                  grantedCount
                    ? <RaisedButton
                      onClick={this.goToSessionMonitoring}
                      label={formatMessage({ id: 'sips.submission-summary.go.to.session' }, { sessionOwner, session })}
                      primary
                      icon={<DeviceIcon />}
                    />
                    : null
                }
              <RaisedButton
                onClick={this.props.goToSumissionForm}
                label={formatMessage({ id: 'sips.submission-summary.go.to.submission' })}
                secondary
                icon={<AddIcon />}
                style={gotoSubmission}
              />
            </div>
          </>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'sips.submission-summary.back.button' })}
            mainButtonClick={onBack}
          />
        </CardActions>
      </Card>)
  }
}
export default SIPsubmissionSummaryComponent
