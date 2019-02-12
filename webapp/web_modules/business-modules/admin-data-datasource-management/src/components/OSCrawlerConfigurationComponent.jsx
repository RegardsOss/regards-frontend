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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Field, RenderTextField, reduxForm } from '@regardsoss/form-utils'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

/**
  * Comment Here
  * @author Maxime Bouveron
  */
export class OSCrawlerConfigurationComponent extends React.Component {
  static propTypes = {
    backUrl: PropTypes.string,
    onSubmit: PropTypes.func,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
      >
        <Card>
          <CardTitle
            title="Create a new crawler"
            subtitle="Specify which OpenSource ressource to crawl"
          />

          <OpenSearchStepperComponent stepIndex={0} />
          <CardText>
            <Field
              name="name"
              fullWidth
              component={RenderTextField}
              type="text"
              label="Crawler name"
            //   validate={labelValidators}
            />
            <Field
              name="refreshRate"
              fullWidth
              component={RenderTextField}
              type="number"
              label="Refresh rate"
            //   validate={labelValidators}
            />
            <Field
              name="descriptor"
              fullWidth
              component={RenderTextField}
              type="url"
              label="OpenSearch descriptor URL"
            //   validate={labelValidators}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={this.props.submitting || this.props.invalid}
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
      </form>
    )
  }
}
export default reduxForm({
  form: 'opensearch-form',
})(OSCrawlerConfigurationComponent)
