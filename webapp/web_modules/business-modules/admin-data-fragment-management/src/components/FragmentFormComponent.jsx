/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import {
  RenderTextField, RenderFileFieldWithMui, Field, ValidationHelpers, reduxForm,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

const nameValidators = [ValidationHelpers.validAlphaNumericUnderscore, ValidationHelpers.lengthMoreThan(3), ValidationHelpers.lengthLessThan(32)]

/**
 * Form component to edit and create fragment
 *
 * @author Léo Mieulet
 */
export class FragmentFormComponent extends React.Component {
  static propTypes = {
    currentFragment: DataManagementShapes.Fragment,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentFragment } = this.props
      const initialValues = {
        description: currentFragment.content.description,
      }
      this.props.initialize(initialValues)
    }
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const { pristine, submitting, invalid } = this.props
    const title = this.props.isCreating
      ? this.context.intl.formatMessage({ id: 'fragment.create.title' })
      : this.context.intl.formatMessage({ id: 'fragment.edit.title' }, { name: this.props.currentFragment.content.name })
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.props.isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'fragment.form.name' })}
                validate={nameValidators}
              />
            </ShowableAtRender>
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'fragment.form.description' })}
            />
            <ShowableAtRender show={this.props.isCreating}>
              <div>
                <hr />
                <br />
                <FormattedMessage id="fragment.form.file" />
                <Field
                  name="file"
                  component={RenderFileFieldWithMui}
                  accept=".xml"
                />
              </div>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'fragment.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'fragment.form.action.cancel' })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fragment-form',
})(FragmentFormComponent)
