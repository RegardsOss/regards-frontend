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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { CommonDomain } from '@regardsoss/domain'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import {
  CardActionsComponent, SettingsTextField, SettingsMainComponent, SettingsFieldsGroup,
} from '@regardsoss/components'
import {
  reduxForm, Field, RenderTextField, ValidationHelpers,
} from '@regardsoss/form-utils'
import dependencies from '../dependencies'

const {
  getValue, getUpdatedSettingValue,
} = CommonDomain.SettingsUtils

export const SETTINGS = {
  S3_SERVER: 's3_server',
  DELIVERY_BUCKET: 'delivery_bucket',
  REQUEST_TTL: 'request_ttl',
  BUILD_BUCKET: 'build_bucket',
}

export const S3_SERVER_SETTINGS = {
  HOST: 'host',
  PORT: 'port',
  KEY: 'key',
  SECRET: 'secret',
  REGION: 'region',
  SCHEME: 'scheme',
}

/**
 * @author Théo Lasserre
 */
export class SettingsComponent extends React.Component {
  static propTypes = {
    settings: CommonShapes.SettingsList,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func,
    editedRequestTtl: PropTypes.number,
    editedBuildBucket: PropTypes.string,
    editedDeliveryBucket: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    editedS3Server: PropTypes.object,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Lifecycle method component will mount, used here to initialize form values */
  UNSAFE_componentWillMount() {
    const { settings, initialize } = this.props
    initialize({
      [SETTINGS.S3_SERVER]: getValue(settings, SETTINGS.S3_SERVER) || {},
      [SETTINGS.DELIVERY_BUCKET]: getValue(settings, SETTINGS.DELIVERY_BUCKET) || '',
      [SETTINGS.REQUEST_TTL]: getValue(settings, SETTINGS.REQUEST_TTL) || 0,
      [SETTINGS.BUILD_BUCKET]: getValue(settings, SETTINGS.BUILD_BUCKET) || '',
    })
  }

  /**
   * User callback: submit. Converts edited values into publishable values
   * @param {*} values form edited values
   */
  onSubmit = (values) => {
    const { onSubmit, settings } = this.props
    onSubmit({
      [SETTINGS.S3_SERVER]: getUpdatedSettingValue(settings, SETTINGS.S3_SERVER, values[SETTINGS.S3_SERVER]),
      [SETTINGS.DELIVERY_BUCKET]: getUpdatedSettingValue(settings, SETTINGS.DELIVERY_BUCKET, values[SETTINGS.DELIVERY_BUCKET]),
      [SETTINGS.REQUEST_TTL]: getUpdatedSettingValue(settings, SETTINGS.REQUEST_TTL, values[SETTINGS.REQUEST_TTL]),
      [SETTINGS.BUILD_BUCKET]: getUpdatedSettingValue(settings, SETTINGS.BUILD_BUCKET, values[SETTINGS.BUILD_BUCKET]),
    })
  }

  render() {
    const {
      submitting, pristine, invalid, change,
      handleSubmit, onBack, settings, editedS3Server,
      editedRequestTtl, editedBuildBucket, editedDeliveryBucket,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'delivery.settings.card.title' })}
            subtitle={formatMessage({ id: 'delivery.settings.card.subtitle' })}
          />
          <CardText>
            <SettingsMainComponent
              settings={settings}
              change={change}
            >
              <SettingsTextField
                label={formatMessage({ id: 'delivery.settings.field.request_ttl' })}
                settingKey={SETTINGS.REQUEST_TTL}
                editedSetting={editedRequestTtl}
                addAlternateStyle
              />
              <SettingsTextField
                label={formatMessage({ id: 'delivery.settings.field.build_bucket' })}
                settingKey={SETTINGS.BUILD_BUCKET}
                editedSetting={editedBuildBucket}
                addAlternateStyle
              />
              <SettingsTextField
                label={formatMessage({ id: 'delivery.settings.field.delivery_bucket' })}
                settingKey={SETTINGS.DELIVERY_BUCKET}
                editedSetting={editedDeliveryBucket}
                addAlternateStyle
              />
              <SettingsFieldsGroup
                label={formatMessage({ id: 'delivery.settings.field.s3_server' })}
                settingKey={SETTINGS.S3_SERVER}
                editedSetting={editedS3Server}
              >
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.HOST}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.HOST}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.host' })}
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.PORT}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.PORT}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.port' })}
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.KEY}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.KEY}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.key' })}
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.SECRET}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.SECRET}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.secret' })}
                  type="password"
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.REGION}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.REGION}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.region' })}
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
                <Field
                  key={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.SCHEME}`}
                  name={`${SETTINGS.S3_SERVER}.${S3_SERVER_SETTINGS.SCHEME}`}
                  label={formatMessage({ id: 'delivery.settings.field.s3_server.region' })}
                  component={RenderTextField}
                  validate={ValidationHelpers.required}
                  fullWidth
                />
              </SettingsFieldsGroup>
            </SettingsMainComponent>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'delivery.settings.action.confirm' })}
              mainButtonType="submit"
              mainHateoasDependencies={dependencies.settingDependencies}
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'delivery.settings.action.cancel' })}
              secondaryButtonClick={onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

const formID = 'delivery-settings-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function selectedSetting(state) {
  return {
    editedRequestTtl: parseInt(formValuesSelector(state, [SETTINGS.REQUEST_TTL]), 10),
    editedBuildBucket: formValuesSelector(state, [SETTINGS.BUILD_BUCKET]),
    editedDeliveryBucket: formValuesSelector(state, [SETTINGS.DELIVERY_BUCKET]),
    editedS3Server: formValuesSelector(state, [SETTINGS.S3_SERVER]),
  }
}

export default connect(selectedSetting)(reduxForm({ form: formID })(SettingsComponent))
