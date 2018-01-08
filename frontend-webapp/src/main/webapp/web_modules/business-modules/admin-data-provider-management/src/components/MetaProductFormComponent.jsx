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
import AutoComplete from 'material-ui/AutoComplete'
import Divider from 'material-ui/Divider'
import { i18nContextType } from '@regardsoss/i18n'
import { Field } from 'redux-form'
import { RenderAutoCompleteField, RenderPageableAutoCompleteField, RenderCheckbox, ValidationHelpers } from '@regardsoss/form-utils'
import { ingestProcessingChainActions, ingestProcessingChainEntitiesKey } from '../clients/IngestProcessingChainClient'
/**
* Comment Here
* @author Sébastien Binda
*/
class MetaProductFormComponent extends React.PureComponent {
  static propTypes = {
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static defaultProps = {}

  static algorithms = ['MD4', 'MD5', 'MD6', 'SHA-1', 'SHA-512']

  render() {
    const { intl: { formatMessage } } = this.context

    const ingestChainsConfig = {
      text: 'name',
      value: 'name',
    }
    return (
      <div>
        <Field
          name="metaProduct.ingestChain"
          fullWidth
          component={RenderPageableAutoCompleteField}
          floatingLabelText={formatMessage({ id: 'generation-chain.form.create.metaproduct.ingest-chain.select' })}
          hintText={formatMessage({ id: 'generation-chain.form.create.metaproduct.ingest-chain.hint' })}
          pageSize={50}
          entitiesFilterProperty="name"
          entityActions={ingestProcessingChainActions}
          entitiesPayloadKey={ingestProcessingChainEntitiesKey}
          entitiesConfig={ingestChainsConfig}
          validate={ValidationHelpers.required}
        />
        <Field
          name="metaProduct.checksumAlgorithm"
          fullWidth
          component={RenderAutoCompleteField}
          hintText={formatMessage({ id: 'generation-chain.form.create.metaproduct.checksum.hint' })}
          floatingLabelText={formatMessage({ id: 'generation-chain.form.create.metaproduct.checksum.label' })}
          dataSource={MetaProductFormComponent.algorithms}
          filter={AutoComplete.caseInsensitiveFilter}
          validate={ValidationHelpers.required}
        />
        <Field
          name="metaProduct.cleanOriginalFile"
          fullWidth
          component={RenderCheckbox}
          label={formatMessage({ id: 'generation-chain.form.create.metaproduct.clean.label' })}
        />
        <br />
        <Divider />
      </div>
    )
  }
}
export default MetaProductFormComponent
