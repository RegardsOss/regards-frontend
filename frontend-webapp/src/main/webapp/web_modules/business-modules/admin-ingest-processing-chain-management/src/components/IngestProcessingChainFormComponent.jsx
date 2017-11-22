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
import trim from 'lodash/trim'
import get from 'lodash/get'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, reduxForm } from '@regardsoss/form-utils'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PluginFormComponent } from './PluginFormComponent'
import IngestProcessingPluginTypes from './IngestProcessingPluginType'

/**
 * Display edit and create ingest processing chain form
 * @author Sébastien Binda
 */
export class IngestProcessingChainFormComponent extends React.Component {

  static propTypes = {
    processingChain: IngestShapes.IngestProcessingChain,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    // from reduxForm
    change: PropTypes.func,
    initialize: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    getField: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.processingChain === undefined,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (this.props.processingChain) {
      this.props.initialize(this.props.processingChain)
    }
  }

  render() {
    const { invalid, submitting, processingChain } = this.props
    const { intl: { formatMessage } } = this.context
    const preprocessingPlugin = get(processingChain, 'preprocessingPlugin', null)
    const validationPlugin = get(processingChain, 'validationPlugin', null)
    const generationPlugin = get(processingChain, 'generationPlugin', null)
    const tagPlugin = get(processingChain, 'tagPlugin', null)
    const postprocessingPlugin = get(processingChain, 'postprocessingPlugin', null)

    const pluginStyles = {
      display: 'flex',
      alignItems: 'baseline',
    }

    const avatarStyles = {
      marginRight: 10,
    }

    const palette = this.context.muiTheme.palette

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          {this.state.isCreating ?
            <CardTitle
              title={formatMessage({ id: 'processing-chain.form.create.title' })}
            /> :
            <CardTitle
              title={formatMessage({ id: 'processing-chain.form.edit.title' }, { name: processingChain.name })}
            />
          }
          <CardText>
            <Field
              name="name"
              fullWidth
              disabled={!this.state.isCreating}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'processing-chain.form.create.input.name' })}
              normalize={trim}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'processing-chain.form.create.input.description' })}
              normalize={trim}
            />
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 1 </Avatar>
              <PluginFormComponent
                key={'preprocessing'}
                title={'[Optional] Pre-processing plugin'}
                selectLabel={'None'}
                ingestPluginType={IngestProcessingPluginTypes.PRE_PROCESSING}
                pluginConf={preprocessingPlugin}
                fieldNamePrefix={'preprocessingPlugin'}
                reduxFormChange={this.props.change}
                reduxFormInitialize={this.props.initialize}
                reduxFormGetField={this.props.getField}
                hideGlobalParameterConf
              />
            </div>
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 2 </Avatar>
              <PluginFormComponent
                key={'validation'}
                title={'Validation plugin'}
                selectLabel={'Choose a plugin ...'}
                ingestPluginType={IngestProcessingPluginTypes.VALIDATION}
                pluginConf={validationPlugin}
                fieldNamePrefix={'validationPlugin'}
                reduxFormChange={this.props.change}
                reduxFormInitialize={this.props.initialize}
                reduxFormGetField={this.props.getField}
                hideGlobalParameterConf
              />
            </div>
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 3 </Avatar>
              <PluginFormComponent
                key={'generation'}
                title={'AIP GEneration plugin'}
                selectLabel={'Choose a plugin ...'}
                ingestPluginType={IngestProcessingPluginTypes.GENERATION}
                pluginConf={generationPlugin}
                fieldNamePrefix={'generationPlugin'}
                reduxFormChange={this.props.change}
                reduxFormInitialize={this.props.initialize}
                reduxFormGetField={this.props.getField}
                hideGlobalParameterConf
              />
            </div>
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 4 </Avatar>
              <PluginFormComponent
                key={'tag'}
                title={'[Optional] AIP Tag plugin'}
                selectLabel={'None'}
                ingestPluginType={IngestProcessingPluginTypes.TAG}
                pluginConf={tagPlugin}
                fieldNamePrefix={'tagPlugin'}
                reduxFormChange={this.props.change}
                reduxFormInitialize={this.props.initialize}
                reduxFormGetField={this.props.getField}
                hideGlobalParameterConf
              />
            </div>
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 5 </Avatar>
              <PluginFormComponent
                key={'postprocessing'}
                title={'[Optional] Post-processing plugin'}
                selectLabel={'None'}
                ingestPluginType={IngestProcessingPluginTypes.POST_PROCESSING}
                pluginConf={postprocessingPlugin}
                fieldNamePrefix={'postprocessingPlugin'}
                reduxFormChange={this.props.change}
                reduxFormInitialize={this.props.initialize}
                reduxFormGetField={this.props.getField}
                hideGlobalParameterConf
              />
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={
                this.state.isCreating ?
                  formatMessage({ id: 'processing-chain.form.create.action.create' }) :
                  formatMessage({ id: 'processing-chain.form.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'processing-chain.form.create.action.cancel' })}
              secondaryButtonTouchTap={this.props.onBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

function validate(fieldValues) {
  const errors = {}
  return errors
}

const selector = formValueSelector('plugin-configuration-form')
const mapStateToProps = state => ({
  getField: field => selector(state, field),
})

const ConnectedComponent = connect(mapStateToProps)(IngestProcessingChainFormComponent)

const connectedReduxForm = reduxForm({
  form: 'ingest-processing-chain-form',
  validate,
})(ConnectedComponent)

export default connectedReduxForm

