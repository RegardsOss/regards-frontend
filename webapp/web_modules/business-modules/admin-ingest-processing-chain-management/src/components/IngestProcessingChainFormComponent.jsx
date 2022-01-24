/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import trim from 'lodash/trim'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import {
  RenderTextField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { RenderPluginField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { ImportFromFileDialogButton } from '@regardsoss/file-utils'
import IngestProcessingPluginTypes from './IngestProcessingPluginType'
import messages from '../i18n'
import styles from '../styles'

const { required, validStringSize, validAlphaNumericUnderscore } = ValidationHelpers
const validString50 = [required, validStringSize(1, 50), validAlphaNumericUnderscore]
const validString128 = [validStringSize(0, 128)]

/**
 * Display edit and create ingest processing chain form
 * @author Sébastien Binda
 */
export class IngestProcessingChainFormComponent extends React.Component {
  static propTypes = {
    processingChain: IngestShapes.IngestProcessingChain,
    onSubmit: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    // from reduxForm
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isCreating: this.props.processingChain === undefined,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getPluginConfigurator = (index, title, selectLabel, ingestPluginType, pluginConf, fieldNamePrefix, isRequired) => {
    const { moduleTheme: { pluginStyles, avatarStyles }, muiTheme: { palette } } = this.context
    const defaultPluginLabel = `${fieldNamePrefix}-${Date.now()}`
    return (
      <div style={pluginStyles}>
        <Avatar
          size={30}
          style={avatarStyles}
          color={palette.textColor}
          backgroundColor={palette.primary1Color}
        >
          {index}
        </Avatar>
        <Field
          name={fieldNamePrefix}
          component={RenderPluginField}
          fullWidth
          title={title}
          selectLabel={selectLabel}
          pluginType={ingestPluginType}
          defaultPluginConfLabel={defaultPluginLabel}
          validate={isRequired ? ValidationHelpers.required : null}
          microserviceName={STATIC_CONF.MSERVICES.INGEST}
          hideGlobalParameterConf
          hideDynamicParameterConf
        />
      </div>
    )
  }

  handleInitialize = () => {
    if (this.props.processingChain) {
      this.props.initialize(this.props.processingChain)
    }
  }

  onSubmit = (fields) => {
    const formatedFields = cloneDeep(fields)
    formatedFields.preProcessingPlugin = PluginFormUtils.formatPluginConf(fields.preProcessingPlugin ? fields.preProcessingPlugin : null)
    formatedFields.validationPlugin = PluginFormUtils.formatPluginConf(fields.validationPlugin ? fields.validationPlugin : null)
    formatedFields.generationPlugin = PluginFormUtils.formatPluginConf(fields.generationPlugin ? fields.generationPlugin : null)
    formatedFields.tagPlugin = PluginFormUtils.formatPluginConf(fields.tagPlugin ? fields.tagPlugin : null)
    formatedFields.postProcessingPlugin = PluginFormUtils.formatPluginConf(fields.postProcessingPlugin ? fields.postProcessingPlugin : null)
    return this.props.onSubmit(formatedFields)
  }

  render() {
    const { invalid, submitting, processingChain } = this.props
    const { isCreating } = this.state
    const { intl: { formatMessage }, moduleTheme } = this.context
    const preprocessingPlugin = get(processingChain, 'preprocessingPlugin', null)
    const validationPlugin = get(processingChain, 'validationPlugin', null)
    const generationPlugin = get(processingChain, 'generationPlugin', null)
    const tagPlugin = get(processingChain, 'tagPlugin', null)
    const postprocessingPlugin = get(processingChain, 'postprocessingPlugin', null)

    return (
      <Card>
        {this.state.isCreating
          ? <CardTitle title={formatMessage({ id: 'processing-chain.form.create.title' })} />
          : <CardTitle title={formatMessage({ id: 'processing-chain.form.edit.title' }, { name: processingChain.name })} />}
        {// import button (when creating only)
          isCreating ? (
            <ImportFromFileDialogButton
              onImport={this.props.onImport}
              onImportSucceed={this.props.onBack}
              style={moduleTheme.importButtonStyles}
            />) : null
        }
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <CardText>
            <Field
              name="name"
              fullWidth
              disabled={!this.state.isCreating}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'processing-chain.form.create.input.name' })}
              normalize={trim}
              validate={validString50}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              validate={validString128}
              label={formatMessage({ id: 'processing-chain.form.create.input.description' })}
            />
            {this.getPluginConfigurator(
              1, formatMessage({ id: 'processing-chain.form.preprocessing.plugin.label' }),
              formatMessage({ id: 'processing-chain.form.plugins.none.selected' }),
              IngestProcessingPluginTypes.PRE_PROCESSING,
              preprocessingPlugin,
              'preProcessingPlugin',
            )}
            {this.getPluginConfigurator(
              2, formatMessage({ id: 'processing-chain.form.validation.plugin.label' }),
              formatMessage({ id: 'processing-chain.form.plugins.none.selected.mandatory' }),
              IngestProcessingPluginTypes.VALIDATION,
              validationPlugin,
              'validationPlugin',
              true,
            )}
            {this.getPluginConfigurator(
              3, formatMessage({ id: 'processing-chain.form.generation.plugin.label' }),
              formatMessage({ id: 'processing-chain.form.plugins.none.selected.mandatory' }),
              IngestProcessingPluginTypes.GENERATION,
              generationPlugin,
              'generationPlugin',
              true,
            )}
            {this.getPluginConfigurator(
              4, formatMessage({ id: 'processing-chain.form.tag.plugin.label' }),
              formatMessage({ id: 'processing-chain.form.plugins.none.selected' }),
              IngestProcessingPluginTypes.TAG,
              tagPlugin,
              'tagPlugin',
            )}
            {this.getPluginConfigurator(
              5, formatMessage({ id: 'processing-chain.form.postprocessing.plugin.label' }),
              formatMessage({ id: 'processing-chain.form.plugins.none.selected' }),
              IngestProcessingPluginTypes.POST_PROCESSING,
              postprocessingPlugin,
              'postProcessingPlugin',
            )}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={
                this.state.isCreating
                  ? formatMessage({ id: 'processing-chain.form.create.action.create' })
                  : formatMessage({ id: 'processing-chain.form.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'processing-chain.form.create.action.cancel' })}
              secondaryButtonClick={this.props.onBack}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

function validate(fieldValues) {
  const errors = {}
  return errors
}

const selector = formValueSelector('plugin-configuration-form')
const mapStateToProps = (state) => ({
  getField: (field) => selector(state, field),
})

const ConnectedComponent = connect(mapStateToProps)(IngestProcessingChainFormComponent)

const connectedReduxForm = reduxForm({
  form: 'ingest-processing-chain-form',
  validate,
})(ConnectedComponent)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
