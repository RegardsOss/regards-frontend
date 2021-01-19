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
import last from 'lodash/last'
import split from 'lodash/split'
import AutoComplete from 'material-ui/AutoComplete'
import {
  Field, RenderTextField, RenderAutoCompleteField,
  RenderCheckbox, ValidationHelpers, FieldArray, RenderArrayObjectField,
} from '@regardsoss/form-utils'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { mimeTypesDefinitions } from '@regardsoss/mime-types'
import { CommonDomain } from '@regardsoss/domain'
import AcquisitionProcessingChainPluginTypes from './AcquisitionProcessingChainPluginTypes'
import AcquisitionFileInfoScanDirComponent from './AcquisitionFileInfoScanDirComponent'
import messages from '../../i18n'

const {
  required, validStringSize, validMimeType,
} = ValidationHelpers
const validString255 = [validStringSize(0, 255)]
const requiredMimeType = [required, validMimeType]

/**
* Display a form to create or edit a MetaFile entity from a dataprovider generation chain
* @author Sébastien Binda
*/
export class AcquisitionFileInfoComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  renderScanDirInfoLabe = (item) => item.scannedDirectory ? last(split(item.scannedDirectory, '/')) : 'New directory'

  render() {
    const { name } = this.props
    const { intl: { formatMessage } } = this.context

    const mimeTypesConfig = {
      text: 'label',
      value: 'mime',
    }
    const componentProps = { changeField: this.props.changeField }
    return [
      <Field
        key="comment"
        name={`${name}.comment`}
        fullWidth
        component={RenderTextField}
        type="text"
        label={formatMessage({ id: 'acquisition-chain.form.fileInfo.comment' })}
        validate={validString255}
      />,
      <Field
        key="mandatory"
        name={`${name}.mandatory`}
        fullWidth
        component={RenderCheckbox}
        label={formatMessage({ id: 'acquisition-chain.form.fileInfo.mandatory' })}
      />,
      <FieldArray
        key="scanDirInfo"
        name={`${name}.scanDirInfo`}
        label={formatMessage({ id: 'acquisition-chain.form.fileInfo.scanDirInfos' })}
        component={RenderArrayObjectField}
        fieldProps={componentProps}
        elementLabel={this.renderScanDirInfoLabe}
        fieldComponent={AcquisitionFileInfoScanDirComponent}
        allowDuplicate={false}
        validate={required}
      />,
      <Field
        key="scanPlugin"
        name={`${name}.scanPlugin`}
        component={RenderPluginField}
        title={formatMessage({ id: 'acquisition-chain.form.fileInfo.plugin.scan.label' })}
        selectLabel={formatMessage({ id: 'acquisition-chain.form.fileInfo.plugin.scan.label' })}
        pluginType={AcquisitionProcessingChainPluginTypes.SCAN}
        defaultPluginConfLabel={`scanPlugin-${Date.now()}`}
        validate={ValidationHelpers.required}
        microserviceName={STATIC_CONF.MSERVICES.DATA_PROVIDER}
        hideDynamicParameterConf
        hideGlobalParameterConf
      />,
      <Field
        key="mimeType"
        name={`${name}.mimeType`}
        fullWidth
        component={RenderAutoCompleteField}
        hintText={formatMessage({ id: 'acquisition-chain.form.fileInfo.mimeType' })}
        floatingLabelText={formatMessage({ id: 'acquisition-chain.form.fileInfo.mimeType' })}
        dataSource={mimeTypesDefinitions}
        dataSourceConfig={mimeTypesConfig}
        filter={AutoComplete.caseInsensitiveFilter}
        validate={requiredMimeType}
      />,
      <Field
        key="dataType"
        name={`${name}.dataType`}
        fullWidth
        component={RenderAutoCompleteField}
        hintText={formatMessage({ id: 'acquisition-chain.form.fileInfo.dataType' })}
        floatingLabelText={formatMessage({ id: 'acquisition-chain.form.fileInfo.dataType' })}
        dataSource={CommonDomain.DATA_TYPES}
        filter={AutoComplete.caseInsensitiveFilter}
        validate={required}
      />,
    ]
  }
}
export default withI18n(messages)(AcquisitionFileInfoComponent)
