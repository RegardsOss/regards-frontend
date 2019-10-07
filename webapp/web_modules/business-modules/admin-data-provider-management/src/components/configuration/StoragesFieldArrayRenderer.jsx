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
import Paper from 'material-ui/Paper'
import Storage from 'material-ui/svg-icons/device/storage'
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
          papers, paperContainer,
        },
      },
    } = this.context
    return (
      <Paper style={papers} zDepth={3} key={`${member}-paper`}>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}><Storage /></div>
        <Field
          name={`${member}.active`}
          component={RenderCheckbox}
          label={fields.get(index).label}
        />
        <Field
          name={`${member}.path`}
          component={RenderTextField}
          type="text"
          label={`${formatMessage({ id: 'acquisition-chain.form.general.section.path' })}`}
            // style={input}
          fullWidth
        />
        <div
          style={paperContainer}
          key={`${member}type`}
        >
          <Field
            //key={`${member}active`}
            name={`${member}.rawdata`}
            component={RenderCheckbox}
            label="Rawdata"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.quicklook`}
            component={RenderCheckbox}
            label="Quicklook"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.document`}
            component={RenderCheckbox}
            label="Document"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.thumbnail`}
            component={RenderCheckbox}
            label="Thumbnail"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.aip`}
            component={RenderCheckbox}
            label="Aip"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.description`}
            component={RenderCheckbox}
            label="Description"
          />
          <Field
            //key={`${member}active`}
            name={`${member}.other`}
            component={RenderCheckbox}
            label="Other"
          />
        </div>
      </Paper>
    )
  }

  render() {
    const { fields } = this.props
    const { intl: { formatMessage }, moduleTheme: { chainForm: { info, paperFlexContainer } } } = this.context
    return (
      <React.Fragment>
        <p style={info}>{formatMessage({ id: 'acquisition-chain.form.general.section.info.storage' })}</p>
        <div style={paperFlexContainer}>
          {fields.map(this.renderStorageCheckbox)}
          {/* <div>
            {fields.map(this.renderStoragePaths)}
          </div>
          <div style={{ flexGrow: '2' }}>
            {fields.map(this.renderStorageCheckboxes)}
          </div> */}
        </div>
      </React.Fragment>
    )
  }
}