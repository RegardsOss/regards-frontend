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
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, Field, reduxForm } from '@regardsoss/form-utils'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Display edit and create project form
 */
export class IngestProcessingChainFormComponent extends React.Component {

  static propTypes = {
    processingChain: IngestShapes.IngestProcessingChain,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
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


  render() {
    const { invalid, submitting } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          {this.state.isCreating ?
            <CardTitle
              title={formatMessage({ id: 'ingest.processing.chain.form.create.title' })}
              subtitle={formatMessage({ id: 'ingest.processing.chain.form.create.message' })}
            /> :
            <CardTitle
              title={formatMessage({ id: 'ingest.processing.chain.form.edit.title' })}
            />
          }
          <CardText>
            <Field
              name="name"
              fullWidth
              disabled={!this.state.isCreating}
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'ingest.processing.chain.form.create.input.name' })}
              normalize={trim}
            />
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={formatMessage({ id: 'ingest.processing.chain.form.create.input.description' })}
              normalize={trim}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={
                this.state.isCreating ?
                  formatMessage({ id: 'ingest.processing.chain.form.create.action.create' }) :
                  formatMessage({ id: 'ingest.processing.chain.form.edit.action.save' })
              }
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'ingest.processing.chain.form.create.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
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

