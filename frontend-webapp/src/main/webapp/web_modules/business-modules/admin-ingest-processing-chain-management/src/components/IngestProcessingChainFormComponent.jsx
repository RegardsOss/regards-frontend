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
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, reduxForm } from '@regardsoss/form-utils'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PluginFormComponent } from './PluginFormComponent'
import IngestProcessingPluginTypes from './IngestProcessingPluginType'

/**
 * Display edit and create project form
 */
export class IngestProcessingChainFormComponent extends React.Component {

  static propTypes = {
    processingChain: IngestShapes.IngestProcessingChain,
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.string.isRequired,
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.processingChain === undefined,
      popoverOpen: false,
      tempGroups: [],
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    this.props.initialize(this.props.processingChain)
  }

  render() {
    const { invalid, submitting, processingChain } = this.props
    const { intl: { formatMessage } } = this.context
    const preprocessingPlugin = get(processingChain, 'preprocessingPlugin', null)
    const validationPlugin = get(processingChain, 'validationPlugin', null)
    const generationPlugin = get(processingChain, 'generationPlugin', null)
    const tagPlugin = get(processingChain, 'tagPlugin', null)
    const postprocessingPlugin = get(processingChain, 'postprocessingPlugin', null)


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
            <PluginFormComponent
              key={'preprocessing'}
              title={'Choose a pre-processing plugin : '}
              ingestPluginType={IngestProcessingPluginTypes.PRE_PROCESSING}
              pluginConf={preprocessingPlugin}
              fieldNamePrefix={'preprocessingPlugin'}
              reduxFormChange={this.props.change}
              reduxFormInitialize={this.props.initialize}
              hideGlobalParameterConf
            />
            <PluginFormComponent
              key={'validation'}
              title={'Choose a validation plugin : '}
              ingestPluginType={IngestProcessingPluginTypes.VALIDATION}
              pluginConf={validationPlugin}
              fieldNamePrefix={'validationPlugin'}
              reduxFormChange={this.props.change}
              reduxFormInitialize={this.props.initialize}
              hideGlobalParameterConf
            />
            <PluginFormComponent
              key={'generation'}
              title={'Choose a generation plugin : '}
              ingestPluginType={IngestProcessingPluginTypes.GENERATION}
              pluginConf={generationPlugin}
              fieldNamePrefix={'generationPlugin'}
              reduxFormChange={this.props.change}
              reduxFormInitialize={this.props.initialize}
              hideGlobalParameterConf
            />
            <PluginFormComponent
              key={'tag'}
              title={'Choose a tag plugin : '}
              ingestPluginType={IngestProcessingPluginTypes.POST_PROCESSING}
              pluginConf={tagPlugin}
              fieldNamePrefix={'generationPlugin'}
              reduxFormChange={this.props.change}
              reduxFormInitialize={this.props.initialize}
              hideGlobalParameterConf
            />
            <PluginFormComponent
              key={'postprocessing'}
              title={'Choose a post-processing plugin : '}
              ingestPluginType={'fr.cnes.regards.modules.ingest.domain.plugin.ISipPreprocessing'}
              pluginConf={postprocessingPlugin}
              fieldNamePrefix={'postprocessingPlugin'}
              reduxFormChange={this.props.change}
              reduxFormInitialize={this.props.initialize}
              hideGlobalParameterConf
            />
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

const connectedReduxForm = reduxForm({
  form: 'ingest-processing-chain-form',
  validate,
})(IngestProcessingChainFormComponent)

export default connectedReduxForm

