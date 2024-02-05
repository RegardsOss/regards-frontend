/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AutoComplete from 'material-ui/AutoComplete'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  RenderTextField, Field, ValidationHelpers, RenderAutoCompleteField,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import messages from '../i18n'

const {
  required, validMimeType,
} = ValidationHelpers
const requiredMimeType = [required, validMimeType]

/**
* Render for form for external file
*/
export class EntitiesFilesRefFieldArray extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    mimeTypeList: PropTypes.arrayOf(PropTypes.object),
    allowImage: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static autocompleteMimeTypeConfig = {
    text: 'label',
    value: 'mime',
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { name, allowImage, mimeTypeList } = this.props
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
          key="mimeType"
          fullWidth
          component={RenderAutoCompleteField}
          floatingLabelText={formatMessage({ id: 'entities-files.form.mimeType' })}
          hintText={formatMessage({ id: 'entities-files.form.mimeType' })}
          dataSource={mimeTypeList}
          dataSourceConfig={EntitiesFilesRefFieldArray.autocompleteMimeTypeConfig}
          filter={AutoComplete.caseInsensitiveFilter}
          validate={requiredMimeType}
        />
        <Field
          name={`${name}.filename`}
          fullWidth
          component={RenderTextField}
          type="text"
          validate={ValidationHelpers.required}
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
