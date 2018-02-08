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
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import { Field, RenderFileFieldWithMui, reduxForm } from '@regardsoss/form-utils'
import {
  CardActionsComponent,
  FormErrorMessage,
} from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Component to start an ingest process
 * @author Sébastien Binda
 */
export class SIPSubmissionFormComponent extends React.Component {
  static propTypes = {
    submitSips: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func,
  }

  static contextTypes = {
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    const {
      isLoading, handleSubmit, submitSips, isError, onBack,
    } = this.props
    return (
      <form onSubmit={handleSubmit(submitSips)}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <Card>
            <CardTitle
              title={intl.formatMessage({ id: 'sips.submit.title' })}
              subtitle={intl.formatMessage({ id: 'sips.submit.subtitle' })}
            />
            <CardText>
              {isError ?
                <FormErrorMessage>{intl.formatMessage({ id: 'sips.submit.error.message' })}</FormErrorMessage>
                : null
              }
              <Field
                name="sips"
                component={RenderFileFieldWithMui}
                label={intl.formatMessage({ id: 'sips.submit.select.file.button' })}
                changeLabel={intl.formatMessage({ id: 'sips.submit.change.file.button' })}
                accept=".json"
              />
            </CardText>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={intl.formatMessage({ id: 'sips.submit.submit.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={isLoading}
                secondaryButtonLabel={intl.formatMessage({ id: 'sips.submit.back.button' })}
                secondaryButtonClick={onBack}
                isSecondaryButtonDisabled={isLoading}
              />
            </CardActions>
          </Card>
        </LoadableContentDisplayDecorator>
      </form>
    )
  }
}

const connectedReduxForm = reduxForm({
  form: 'suip-submit-form',
})(SIPSubmissionFormComponent)

export default connectedReduxForm
