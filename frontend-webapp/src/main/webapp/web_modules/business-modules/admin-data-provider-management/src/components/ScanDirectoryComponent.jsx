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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { Field, RenderTextField, ValidationHelpers } from '@regardsoss/form-utils'
import messages from '../i18n'

const {
  required, validStringSize,
} = ValidationHelpers
const validRequiredString255 = [required, validStringSize(1, 255)]
/**
* Component to render a ScanDirectory entity configuration form
* @author Sébastien Binda
*/
class ScanDirectoryComponent extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { name } = this.props
    return (
      <div>
        <Field
          key="scanDir"
          name={`${name}.scanDir`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'generation-chain.form.create.metaFile.scanDirectory' })}
          validate={validRequiredString255}
        />
      </div>
    )
  }
}
export default withI18n(messages)(ScanDirectoryComponent)
