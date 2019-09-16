/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  RenderTextField, RenderCheckbox, Field,
} from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
 * Fields Array Renderer for List of storages
 * @author Kévin Picart
 */
export class StoragesFieldArrayRenderer extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      getAll: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  renderStorageCheckbox = (member, index, fields) => {
    const {
      intl: { formatMessage }, moduleTheme: {
        chainForm: {
          tr, tdCheckbox, tdTextField, input,
        },
      },
    } = this.context
    return (
      <tr style={tr} key={`${member}tr`}>
        <td style={tdCheckbox} key={`${member}active`}>
          <Field
            //key={`${member}active`}
            name={`${member}.active`}
            component={RenderCheckbox}
            label={fields.get(index).label}
          />
        </td>
        <td style={tdTextField} key={`${member}path`}>
          <Field
            name={`${member}.path`}
            component={RenderTextField}
            type="text"
            label={`${formatMessage({ id: 'acquisition-chain.form.general.section.path' })}`}
            style={input}
          />
        </td>
      </tr>
    )
  }

  render() {
    const { fields } = this.props
    const { intl: { formatMessage }, moduleTheme: { chainForm: { info } } } = this.context
    return (
      <React.Fragment>
        <p style={info}>{formatMessage({ id: 'acquisition-chain.form.general.section.info' })}</p>
        <table>
          <tbody>
            {fields.map(this.renderStorageCheckbox)}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}
