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
import has from 'lodash/has'
import { CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { ScrollArea } from '@regardsoss/adapters'
import { MetadataList, MetadataField } from '@regardsoss/user-metadata-common'
import { reduxForm } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Profile edition form component
*/
export class ProfileEditionFormComponent extends React.Component {
  static propTypes = {
    // project metadata
    userMetadata: MetadataList.isRequired,
    // submit function
    onEdit: PropTypes.func.isRequired,
    // from redux form
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  UNSAFE_componentWillMount = () => {
    // this component is unmounted each time the dialog is no longer visible, what allows us to re-initialize
    // form fields values
    const { userMetadata } = this.props
    const initialFormValues = userMetadata.reduce((acc, { key, currentValue }) => ({
      ...acc,
      [key]: currentValue,
    }), {})
    this.props.initialize(initialFormValues)
  }

  onSave = (values) => {
    this.props.onEdit(values)
      .then((actionResult) => {
        // If the result seems good, let's reinitialize the form to show to the user that its changes have been saved
        if (!has(actionResult, 'error')) {
          this.props.initialize(values)
        }
      })
  }

  render() {
    const {
      userMetadata, pristine, submitting, invalid, handleSubmit,
    } = this.props
    const { moduleTheme: { user: { profile } } } = this.context
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSave)}>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'edit.profile.form.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'edit.profile.form.message' })}
          />
          <CardText>
            <ScrollArea
              vertical
              horizontal={false}
              style={profile.scrollArea.styles}
            >
              {
                // show only metadata that are meaningful after registration
                userMetadata.map((metadata) => metadata.onlyAtRegistration
                  ? null
                  : <MetadataField
                      key={metadata.key}
                      metadata={metadata}
                      fullWidth
                  />)
              }
            </ScrollArea>
          </CardText>
          <CardActions style={profile.actions.styles}>
            <RaisedButton
              disabled={submitting || invalid || pristine}
              label={this.context.intl.formatMessage({ id: 'edit.profile.form.save' })}
              primary
              type="submit"
            />
          </CardActions>
        </form>
      </div>
    )
  }
}

export default reduxForm({ form: 'profileEditionForm' })(ProfileEditionFormComponent)
