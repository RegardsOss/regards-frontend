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
import omit from 'lodash/omit'
import AutoComplete from 'material-ui/AutoComplete'
import {
  Field, FieldArray, RenderTextField, RenderAutoCompleteField,
  RenderCheckbox, ValidationHelpers, RenderArrayObjectField,
} from '@regardsoss/form-utils'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { mimeTypes } from '@regardsoss/mime-types'
import ScanDirectoryComponent from './ScanDirectoryComponent'
import messages from '../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validString255 = [validStringSize(0, 255)]
const validRequiredString255 = [required, validStringSize(1, 255)]

/**
* Display a form to create or edit a MetaFile entity from a dataprovider generation chain
* @author Sébastien Binda
*/
class MetaFileFormComponent extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  duplicateScanDirectory = scanDir => omit(scanDir, ['id'])

  render() {
    const { name } = this.props
    const { intl: { formatMessage } } = this.context

    const mimeTypesConfig = {
      text: 'label',
      value: 'mime',
    }
    return [
      <Field
        key="comment"
        name={`${name}.comment`}
        fullWidth
        component={RenderTextField}
        type="text"
        label={formatMessage({ id: 'generation-chain.form.create.metaFile.comment' })}
        validate={validString255}
      />,
      <Field
        key="fileNamePattern"
        name={`${name}.fileNamePattern`}
        fullWidth
        component={RenderTextField}
        type="text"
        label={formatMessage({ id: 'generation-chain.form.create.metaFile.fileNamePattern' })}
        validate={validRequiredString255}
      />,
      <Field
        key="mimeType"
        name={`${name}.fileType`}
        fullWidth
        component={RenderAutoCompleteField}
        hintText={formatMessage({ id: 'generation-chain.form.create.metaFile.mimeType.hint' })}
        floatingLabelText={formatMessage({ id: 'generation-chain.form.create.metaFile.mimeType.label' })}
        dataSource={mimeTypes}
        dataSourceConfig={mimeTypesConfig}
        filter={AutoComplete.caseInsensitiveFilter}
        validate={required}
      />,
      <FieldArray
        key="scanDirectory"
        name={`${name}.scanDirectories`}
        component={RenderArrayObjectField}
        label={formatMessage({ id: 'generation-chain.form.create.metaFile.scanDirectories' })}
        elementLabel={formatMessage({ id: 'generation-chain.form.create.metaFile.scanDirectory.list.item' })}
        fieldComponent={ScanDirectoryComponent}
        duplicationTransfromation={this.duplicateScanDirectory}
        canBeEmpty={false}
        listHeight="200px"
      />,
      <Field
        key="invalidFolder"
        name={`${name}.invalidFolder`}
        fullWidth
        component={RenderTextField}
        type="text"
        label={formatMessage({ id: 'generation-chain.form.create.metaFile.invalidFolder' })}
        validate={validRequiredString255}
      />,
      <Field
        key="mandatory"
        name={`${name}.mandatory`}
        fullWidth
        component={RenderCheckbox}
        label={formatMessage({ id: 'generation-chain.form.create.metaFile.mandatory' })}
      />,
    ]
  }
}
export default withI18n(messages)(MetaFileFormComponent)
