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
    isEditing: PropTypes.bool,
    filters: PropTypes.obj, //TODO : Shape it up
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  render() {
    const {
      handleSubmit, filters, onBack, submitting, invalid, isEditing,
    } = this.props
    const { formatMessage } = this.context.intl
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title={formatMessage({ id: isEditing ? 'opensearch.crawler.form.query.title.edit' : 'opensearch.crawler.form.query.title.create' })} subtitle={formatMessage({ id: 'opensearch.crawler.form.query.subtitle' })} />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
              <Field
                name="lastUpdate"
                component={RenderSelectField}
                type="text"
                label={formatMessage({ id: 'opensearch.crawler.form.query.lastUpdate' })}
                validate={required}
              >
                {filters.parameter.map(filter => (
                  <MenuItem key={`${filter.name}-lastUpdate`} value={filter.name} primaryText={filter.name} />
                ))}
              </Field>
              <Field
                name="pageSize"
                component={RenderTextField}
                type="number"
                label={formatMessage({ id: 'opensearch.crawler.form.query.pageSize' })}
                validate={requiredNumberValidator}
              />
            </div>
            <FieldArray name="filters" component={AddFilterDialogComponent} filters={filters} />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              mainButtonLabel={<FormattedMessage id="datasource.form.create.action.next" />}
              secondaryButtonLabel={formatMessage({
                id: 'datasource.form.create.action.previous',
              })}
              secondaryButtonClick={onBack}
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
