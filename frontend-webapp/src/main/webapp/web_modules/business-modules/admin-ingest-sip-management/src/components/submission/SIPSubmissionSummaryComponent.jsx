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
 **/
import map from 'lodash/map'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { IngestShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import SIPsubmissionComponent from './SIPSubmissionComponent'

/**
* Component to display sip submission synchrone results from server. May contain rejected or handled SIP.
* @author Sébastien Binda
*/
class SIPsubmissionSummaryComponent extends React.Component {
  static propTypes = {
    submitedSips: PropTypes.arrayOf(IngestShapes.SIPSubmited),
    onBack: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  render = () => (
    <Card>
      <CardTitle
        title={this.context.intl.formatMessage({ id: 'sips.submission-summary.title' })}
        subtitle={this.context.intl.formatMessage({ id: 'sips.submission-summary.subtitle' })}
      />
      <CardText>
        {map(this.props.submitedSips, sip => <SIPsubmissionComponent key={sip.id} sip={sip} />)}
      </CardText>
      <CardActions>
        <CardActionsComponent
          mainButtonLabel={this.context.intl.formatMessage({ id: 'sips.submission-summary.back.button' })}
          mainButtonTouchTap={this.props.onBack}
        />
      </CardActions>
    </Card>
  )
}
export default SIPsubmissionSummaryComponent
