/**
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
 **/
import map from 'lodash/map'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  RenderTextField, RenderSelectField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import messages from '../i18n'

/**
* Render for form for external file
*/
export class EntitiesFilesRefFieldArray extends React.Component {
  static propTypes = {
    mimeTypeList: PropTypes.arrayOf(PropTypes.string),
    allowImage: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { mimeTypeList, name, allowImage } = this.props
    return (
      <div>
        <Field
          name={`${name}.uri`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.uri' })}
          validate={ValidationHelpers.uri}
        />
        <Field
          name={`${name}.mimeType`}
          fullWidth
          component={RenderSelectField}
          type="text"
          label={formatMessage({ id: 'entities-files.form.mimeType' })}
        >
          {map(mimeTypeList, (mimeType) => (
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
        {allowImage ? [
          <Field
            key="imageWidth"
            name={`${name}.imageWidth`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={formatMessage({ id: 'entities-files.form.imageWidth' })}
          />,
          <Field
            key="imageHeight"
            name={`${name}.imageHeight`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={formatMessage({ id: 'entities-files.form.imageHeight' })}
          />,
        ] : null}
      </div>
    )
  }
}

export default withI18n(messages, true)(EntitiesFilesRefFieldArray)
