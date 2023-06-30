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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import map from 'lodash/map'
import some from 'lodash/some'
import MenuItem from 'material-ui/MenuItem'
import RadioButton, { RadioButtonGroup } from 'material-ui/RadioButton'

import {
  Field, RenderSelectField, FieldArray, StringComparison, ValidationHelpers,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes, DataProviderShapes } from '@regardsoss/shape'
import { DATA_TYPES_ENUM, StoragesFieldArrayRenderer } from './StoragesFieldArrayRenderer'

/**
 * Component to display acquisition chain storages confugation.
 * Configuration can be done with two modes :
 * - STORE : Acquired files has to be stored by regards. Configuration needs list of storages where to store files.
 * - REF : Acquired files are already stored. Configuration needs the storage configuration businessId where files are stored.
 * @author Sébastien Binda
 */
export class AcquisitionProcessingChainStorageConfComponent extends React.Component {
  static STORE_MODE = 'STORE_MODE'

  static REF_MODE = 'REF_MODE'

  static propTypes = {
    chain: DataProviderShapes.AcquisitionProcessingChain,
    storages: CommonShapes.PluginConfigurationArray.isRequired,
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static isStorageFileTypeSelected = (storage, targetType) => {
    if (isNil(storage)) {
      return false
    }
    if (get(storage, 'targetTypes')) {
      if (get(storage, 'targetTypes').length > 0) {
        return !!get(storage, 'targetTypes').includes(targetType)
      }
      return true
    }
    return true
  }

  static validateStorages(value) {
    return some(value, { active: true }) ? undefined : true
  }

  static initDefaultStorages = (storages) => map(storages, (serverStorage) => ({
    label: serverStorage.content.label,
    active: false,
    storePath: '',
    description: false,
    rawdata: false,
    thumbnail: false,
    quicklook: false,
  }))

  static initStorages = (chain, storages) => map(storages, (serverStorage) => {
    const findStorage = find(chain.content.storages, (s) => serverStorage.content.label === s.pluginBusinessId)
    return {
      label: serverStorage.content.label,
      active: !!findStorage,
      storePath: findStorage ? findStorage.storePath : '',
      rawdata: AcquisitionProcessingChainStorageConfComponent.isStorageFileTypeSelected(findStorage, DATA_TYPES_ENUM.RAWDATA),
      description: AcquisitionProcessingChainStorageConfComponent.isStorageFileTypeSelected(findStorage, DATA_TYPES_ENUM.DESCRIPTION),
      thumbnail: AcquisitionProcessingChainStorageConfComponent.isStorageFileTypeSelected(findStorage, DATA_TYPES_ENUM.THUMBNAIL),
      quicklook: AcquisitionProcessingChainStorageConfComponent.isStorageFileTypeSelected(findStorage, DATA_TYPES_ENUM.QUICKLOOK_SD),
    }
  }).sort(({ label: l1 }, { label: l2 }) => StringComparison.compare(l1, l2))

  state = {
    mode: AcquisitionProcessingChainStorageConfComponent.STORE_MODE,
  }

  UNSAFE_componentWillMount() {
    const { chain } = this.props
    this.setState({
      mode: get(chain, 'content.productsStored', true) === true ? AcquisitionProcessingChainStorageConfComponent.STORE_MODE : AcquisitionProcessingChainStorageConfComponent.REF_MODE,
    })
  }

  onChangeMode = (event, mode) => {
    this.setState({
      mode,
    }, () => { this.props.changeField('productsStored', mode === AcquisitionProcessingChainStorageConfComponent.STORE_MODE) })
  }

  render() {
    const { changeField, storages } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageInfos: { storageTabStyle, storageTypeListStyle, typeStyle } } } = this.context
    let component

    if (this.state.mode === AcquisitionProcessingChainStorageConfComponent.STORE_MODE) {
      component = <FieldArray
        name="storages"
        component={StoragesFieldArrayRenderer}
        props={{ changeField }}
        elementLabel="Test"
        canBeEmpty={false}
        validate={AcquisitionProcessingChainStorageConfComponent.validateStorages}
      />
    } else {
      component = <Field
        name="referenceLocation"
        fullWidth
        component={RenderSelectField}
        label={this.context.intl.formatMessage({ id: 'acquisition-chain.form.general.section.storage.ref.select' })}
        validate={ValidationHelpers.required}
      >
        {map(storages, (storage) => (
          <MenuItem
            value={get(storage, 'content.businessId')}
            key={get(storage, 'content.businessId')}
            primaryText={get(storage, 'content.label')}
          />
        ))}
      </Field>
    }

    return (
      <div style={storageTabStyle}>
        {formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.info' })}
        <div style={storageTypeListStyle}>
          <ul>
            <li>
              <span style={typeStyle}>{formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.store.name' })}</span>
              {formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.store' })}
            </li>
            <li>
              <span style={typeStyle}>{formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.ref.name' })}</span>
              {formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.ref' })}
            </li>
          </ul>
        </div>
        <div>
          <RadioButtonGroup
            name="display-types"
            onChange={this.onChangeMode}
            valueSelected={this.state.mode}
          >
            <RadioButton
              value={AcquisitionProcessingChainStorageConfComponent.STORE_MODE}
              label={formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.store.name' })}
            />
            <RadioButton
              value={AcquisitionProcessingChainStorageConfComponent.REF_MODE}
              label={formatMessage({ id: 'acquisition-chain.form.general.section.storage.mode.ref.name' })}
            />
          </RadioButtonGroup>
        </div>
        {component}
      </div>
    )
  }
}

export default AcquisitionProcessingChainStorageConfComponent
