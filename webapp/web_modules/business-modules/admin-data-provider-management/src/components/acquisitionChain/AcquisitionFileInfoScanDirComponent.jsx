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
import {
  Field, RenderTextField, RenderDateTimeField, ValidationHelpers,
} from '@regardsoss/form-utils'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import messages from '../../i18n'

export class AcquisitionFileInfoScanDirComponent extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { name } = this.props
    const { intl: { formatMessage } } = this.context

    return [
      <Field
        key="scannedDirectory"
        name={`${name}.scannedDirectory`}
        fullWidth
        component={RenderTextField}
        type="text"
        label={formatMessage({ id: 'acquisition-chain.form.fileInfo.scanDir.scannedDirectory' })}
        validate={ValidationHelpers.isValidAbsolutePath}
      />,
      <br key="separator" />,
      <Field
        key="lastModificationDate"
        name={`${name}.lastModificationDate`}
        fullWidth
        component={RenderDateTimeField}
        label={formatMessage({ id: 'acquisition-chain.form.fileInfo.scanDir.lastModificationDate' })}
      />,
    ]
  }
}

export default withI18n(messages)(AcquisitionFileInfoScanDirComponent)
