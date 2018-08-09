/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { RenderTextField, RenderSelectField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import messages from '../i18n'


/**
* Render for selected levels field
*/
class EntitiesFilesRefFieldArray extends React.Component {
  static propTypes = {
    mimeTypeList: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { mimeTypeList, name } = this.props
    return (
      <div>
        <Field
          name={`${name}.uri`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.uri' })}
        />
        <Field
          name={`${name}.mimeType`}
          fullWidth
          component={RenderSelectField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.mimeType' })}
        >
          {map(mimeTypeList, mimeType => (
            <MenuItem
              key={mimeType}
              value={mimeType}
              primaryText={mimeType}
            />
          ))}
        </Field>
        <Field
          name={`${name}.filename`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.filename' })}
        />
        <Field
          name={`${name}.imageWidth`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.imageWidth' })}
        />
        <Field
          name={`${name}.imageHeight`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.imageHeight' })}
        />
      </div>
    )
  }
}

export default withI18n(messages, true)(EntitiesFilesRefFieldArray)
