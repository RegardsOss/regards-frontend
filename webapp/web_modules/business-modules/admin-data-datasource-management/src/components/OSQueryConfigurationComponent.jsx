
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
import { CardActions, CardTitle, Card } from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

/**
 * Comment Here
 * @author Maxime Bouveron
 */
class OSQueryConfigurationComponent extends React.Component {
static propTypes = {
  backUrl: PropTypes.string,
  nextUrl: PropTypes.string,
}

static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }


  render() {
    return (<Card>
      <CardTitle
        title="Create the query"
        subtitle="Query stuff"
      />
      <OpenSearchStepperComponent stepIndex={1} />
      <CardActions>
        <CardActionsComponent
          mainButtonUrl={this.props.nextUrl}
        // isMainButtonDisabled={this.props.submitting || this.props.invalid}
          mainButtonLabel={
            <FormattedMessage
              id="datasource.form.create.action.next"
            />
              }
          secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.create.action.previous' })}
          secondaryButtonUrl={this.props.backUrl}
        />
      </CardActions>
    </Card>
    )
  }
}
export default OSQueryConfigurationComponent
