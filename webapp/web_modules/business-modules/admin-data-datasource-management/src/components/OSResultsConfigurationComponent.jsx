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
  CardActions,
  CardTitle,
  Card,
  CardText,
  MenuItem,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import {
  RenderSelectField,
  ValidationHelpers,
  Field,
  RenderTextField,
  reduxForm,
} from '@regardsoss/form-utils'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'

const { required } = ValidationHelpers

/**
 * Comment Here
 * @author Maxime Bouveron
 */
export class OSResultsConfigurationComponent extends React.Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  render() {
    const fieldStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      width: 400,
    }

    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title="Create the results" subtitle="Results stuff" />
          <OpenSearchStepperComponent stepIndex={2} />
          <CardText>
            <Field
              name="modelName"
              component={RenderSelectField}
              type="text"
              label="Regards Model"
              validate={required}
            >
              {/* TODO: Map on models */}
            </Field>
            <div style={{ fontSize: '1.2em', marginTop: 20 }}>Standard attributes</div>
            <hr align="left" width="400px" />
            <div style={fieldStyle}>
              <div>Label</div>
              <Field
                name="propertiesLabel"
                component={RenderTextField}
                type="text"
                label="Value"
                validate={required}
              />
            </div>
            <div style={fieldStyle}>
              <div>Geometry</div>
              <Field
                name="propertiesGeometry"
                component={RenderTextField}
                type="text"
                label="Value"
                validate={required}
              />
            </div>
            <div style={{ fontSize: '1.2em', marginTop: 20 }}>Associated files</div>
            <hr align="left" width="400px" />
            <div style={fieldStyle}>
              <div>RAWDATA</div>
              <Field
                name="rawDataURLPath"
                component={RenderTextField}
                type="text"
                label="Value"
                validate={required}
              />
            </div>

            <div style={fieldStyle}>
              <div>QUICKLOOK</div>
              <Field
                name="quicklookURLPath"
                component={RenderTextField}
                type="text"
                label="Value"
                validate={required}
              />
            </div>

            <div style={fieldStyle}>
              <div>THUMBNAIL</div>
              <Field
                name="thumbnailURLPath"
                component={RenderTextField}
                type="text"
                label="Value"
                validate={required}
              />
            </div>
            <div style={{ fontSize: '1.2em', marginTop: 20 }}>Dynamic attributes</div>
            <hr align="left" width="400px" />
            {[{ label: 'orbitNumber' }, { label: 'trucmuche' }, { label: 'truc' }].map(
              attribute => (
                <div key={attribute.label} style={fieldStyle}>
                  <div>{attribute.label}</div>
                  <Field
                    component={RenderTextField}
                    name={attribute.label}
                    type="text"
                    label="Value"
                  />
                </div>
              ),
            )}
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
  form: 'opensearch-results-form',
})(OSResultsConfigurationComponent)
