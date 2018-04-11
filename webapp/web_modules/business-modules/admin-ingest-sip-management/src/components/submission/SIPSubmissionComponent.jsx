/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Error from 'material-ui/svg-icons/alert/error'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import Avatar from 'material-ui/Avatar'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { IngestShapes } from '@regardsoss/shape'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import styles from '../../styles'
/**
* Component to display a SIP submission result from server.
* @author Sébastien Binda
*/
export class SIPSubmissionComponent extends React.Component {
  static propTypes = {
    sip: IngestShapes.SIPSubmited,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
  }

  static VALID_STATE = 'CREATED'

  static iconStyle = {
    width: 60,
    height: 60,
  }

  static cardStyles = {
    margin: '5px',
  }

  renderSipErrors = (sip) => {
    if (sip.rejectionCauses && sip.rejectionCauses.length > 0) {
      return (
        <CardText>
          <ul>
            {map(sip.rejectionCauses, c => <li key={c}>{c}</li>)}
          </ul>
        </CardText>
      )
    } else if (!sip.state) {
      return (
        <ul>
          {map(sip, message => <li>{message}</li>)}
        </ul>
      )
    }
    return null
  }

  render() {
    const { sip } = this.props
    const { moduleTheme } = this.context
    let avatar
    if (sip.state === SIPSubmissionComponent.VALID_STATE) {
      avatar = (<Avatar
        icon={<CheckCircle />}
        backgroundColor={moduleTheme.import.validColor}
      />)
    } else {
      avatar = (<Avatar
        icon={<Error />}
        backgroundColor={moduleTheme.import.errorColor}
      />)
    }

    return (
      <Card style={SIPSubmissionComponent.cardStyles}>
        <CardHeader
          title={sip.id}
          subtitle={sip.state}
          avatar={avatar}
          actAsExpander={false}
          showExpandableButton={false}
        />
        {this.renderSipErrors(sip)}
      </Card>
    )
  }
}
export default withModuleStyle(styles)(SIPSubmissionComponent)
