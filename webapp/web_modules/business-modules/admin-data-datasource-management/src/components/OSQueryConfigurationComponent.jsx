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
import { CardActionsComponent } from '@regardsoss/components'
import {
  Field,
  FieldArray,
  reduxForm,
  RenderSelectField,
  RenderTextField,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  Card, CardActions, CardText, CardTitle, MenuItem,
} from 'material-ui'
import { FormattedMessage } from 'react-intl'
import AddFilterDialogComponent from './AddFilterDialogComponent'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

const { number, required } = ValidationHelpers

const requiredNumberValidator = [number, required]

/**
 * Comment Here
 * @author Maxime Bouveron
 */
export class OSQueryConfigurationComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.obj, // TODO Precise
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { initialValues } = this.props

    this.props.initialize(initialValues)
  }

  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title="Create the query" subtitle="Query stuff" />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            Select feature last update parameter
            <br />
            <Field
              name="lastUpdate"
              component={RenderSelectField}
              type="text"
              label="Parameter"
              validate={required}
            >
              {this.props.filters.parameter.map(filter => (
                <MenuItem key={filter.name} value={filter.name} primaryText={filter.name} />
              ))}
            </Field>
            <br />
            Enter the number of results per page
            <br />
            <Field
              name="pageSize"
              component={RenderTextField}
              type="number"
              label="Page size"
              validate={requiredNumberValidator}
            />
            <br />
            <br />
            <br />
            <FieldArray name="filters" component={AddFilterDialogComponent} filters={this.props.filters} />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={this.props.submitting || this.props.invalid}
              mainButtonLabel={<FormattedMessage id="datasource.form.create.action.next" />}
              secondaryButtonLabel={this.context.intl.formatMessage({
                id: 'datasource.form.create.action.previous',
              })}
              secondaryButtonClick={this.props.onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}
export default reduxForm({
  form: 'opensearch-query-form',
})(OSQueryConfigurationComponent)
