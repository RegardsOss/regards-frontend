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
import get from 'lodash/get'
import trim from 'lodash/trim'
import { connect } from '@regardsoss/redux'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import Avatar from 'material-ui/Avatar'
import { formValueSelector } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { DataProviderShapes } from '@regardsoss/shape'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, reduxForm } from '@regardsoss/form-utils'
import { PluginFormComponent } from './PluginFormComponent'
import generationChainPluginTypes from './GenerationChainPluginTypes'
import styles from '../styles'
import messages from '../i18n'
/**
* Component to display a form of GenerationChain entity
* @author Sébastien Binda
*/
class GenerationChainFormComponent extends React.Component {
  static propTypes = {
    chain: DataProviderShapes.GenerationChain,
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

  static defaultProps = {}

  render() {
    const {
      chain, onBack, onSubmit, invalid, submitting, handleSubmit,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { pluginStyles, avatarStyles }, muiTheme: { palette } } = this.context

    const scanPlugin = get(chain, 'scanAcquisitionPluginConf', null)
    const checkPlugin = get(chain, 'checkAcquisitionPluginConf', null)
    const genPlugin = get(chain, 'generateSipPluginConf', null)
    const postProcessPlugin = get(chain, 'postProcessSipPluginConf', null)

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          {!chain ?
            <CardTitle
              title={formatMessage({ id: 'generation-chain.form.create.title' })}
            /> :
            <CardTitle
              title={formatMessage({ id: 'generation-chain.form.edit.title' }, { name: chain.name })}
            />
          }
          <CardText>
            <Field
              name="label"
              fullWidth
              disabled={!!chain}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'generation-chain.form.create.input.label' })}
              normalize={trim}
            />
            <div style={pluginStyles}>
              <Avatar
                size={30}
                style={avatarStyles}
                color={palette.textColor}
                backgroundColor={palette.primary1Color}
              > 1
              </Avatar>
              <PluginFormComponent
                key="scan"
                title={formatMessage({ id: 'generation-chain.form.plugins.scan.label' })}
                selectLabel={formatMessage({ id: 'generation-chain.form.plugins.select.label' })}
                ingestPluginType={generationChainPluginTypes.SCAN}
                pluginConf={scanPlugin}
                fieldNamePrefix="scanAcquisitionPluginConf"
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
              > 2
              </Avatar>
              <PluginFormComponent
                key="check"
                title={formatMessage({ id: 'generation-chain.form.plugins.check.label' })}
                selectLabel={formatMessage({ id: 'generation-chain.form.plugins.select.label' })}
                ingestPluginType={generationChainPluginTypes.CHECK}
                pluginConf={checkPlugin}
                fieldNamePrefix="checkAcquisitionPluginConf"
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
              > 3
              </Avatar>
              <PluginFormComponent
                key="generation"
                title={formatMessage({ id: 'generation-chain.form.plugins.gen-sip.label' })}
                selectLabel={formatMessage({ id: 'generation-chain.form.plugins.select.label' })}
                ingestPluginType={generationChainPluginTypes.GENERATE_SIP}
                pluginConf={genPlugin}
                fieldNamePrefix="generateSipPluginConf"
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
              > 4
              </Avatar>
              <PluginFormComponent
                key="PostProcessing"
                title={formatMessage({ id: 'generation-chain.form.plugins.post-processing.label' })}
                selectLabel={formatMessage({ id: 'generation-chain.form.plugins.select.label' })}
                ingestPluginType={generationChainPluginTypes.POST_PROCESSING}
                pluginConf={postProcessPlugin}
                fieldNamePrefix="postProcessSipPluginConf"
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
                !chain ?
                  formatMessage({ id: 'generation-chain.form.create.action.create' }) :
                  formatMessage({ id: 'generation-chain.form.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'generation-chain.form.create.action.cancel' })}
              secondaryButtonTouchTap={onBack}
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

const ConnectedComponent = connect(mapStateToProps)(GenerationChainFormComponent)

const connectedReduxForm = reduxForm({
  form: 'generation-chain-form',
  validate,
})(ConnectedComponent)

export default withI18n(messages)(withModuleStyle(styles)(connectedReduxForm))
