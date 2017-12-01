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
import GenerationChainFormPluginsComponent from './GenerationChainFormPluginsComponent'
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

  renderActionButtons = () => {
    const { intl: { formatMessage } } = this.context
    const { chain, invalid, submitting, onBack } = this.props
    const label = !chain ?
      formatMessage({ id: 'generation-chain.form.create.action.create' }) :
      formatMessage({ id: 'generation-chain.form.edit.action.save' })
    return (
      <CardActions>
        <CardActionsComponent
          mainButtonLabel={label}
          mainButtonType="submit"
          isMainButtonDisabled={submitting || invalid}
          secondaryButtonLabel={formatMessage({ id: 'generation-chain.form.create.action.cancel' })}
          secondaryButtonTouchTap={onBack}
        />
      </CardActions>
    )
  }

  render() {
    const { chain, onBack, onSubmit, invalid, submitting, handleSubmit, change, initialize, getField } = this.props
    const { intl: { formatMessage }, moduleTheme: { pluginStyles, avatarStyles }, muiTheme: { palette } } = this.context

    const title = !chain ?
      formatMessage({ id: 'generation-chain.form.create.title' }) :
      formatMessage({ id: 'generation-chain.form.edit.title' }, { name: chain.name })

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardTitle title={title} />
          <CardText>
            <Field
              name="label"
              fullWidth
              disabled={!!chain}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'generation-chain.form.create.input.label' })}
            />
            <GenerationChainFormPluginsComponent
              chain={chain}
              change={change}
              initialize={initialize}
              getField={getField}
            />
          </CardText>
          {this.renderActionButtons()}
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
