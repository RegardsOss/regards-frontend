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
import { fieldArrayFieldsPropTypes } from 'redux-form'
import ErrorIcon from 'mdi-material-ui/Alert'
import Paper from 'material-ui/Paper'
import Storage from 'mdi-material-ui/Database'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

/**
 * Fields Array Renderer for List of storages
 * @author Kévin Picart
 */
export const DATA_TYPES_ENUM = {
  RAWDATA: 'RAWDATA',
  QUICKLOOK_SD: 'QUICKLOOK_SD',
  QUICKLOOK_MD: 'QUICKLOOK_MD',
  QUICKLOOK_HD: 'QUICKLOOK_HD',
  THUMBNAIL: 'THUMBNAIL',
  DESCRIPTION: 'DESCRIPTION',
}
export class StoragesFieldArrayRenderer extends React.Component {
  static propTypes = {
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
    changeField: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  switchActive = (member, newValue) => {
    this.props.changeField(`${member}.rawdata`, newValue)
    this.props.changeField(`${member}.quicklook`, newValue)
    this.props.changeField(`${member}.thumbnail`, newValue)
    this.props.changeField(`${member}.description`, newValue)
  }

  renderStorageCheckbox = (member, index, fields) => {
    const {
      intl: { formatMessage }, moduleTheme: {
        chainForm: {
          papers, storageRepository,
          storageTitleBar, storageTitle,
        },
      },
    } = this.context
    return (
      <Paper style={papers} zDepth={3} key={`${member}-paper`}>
        <div style={storageTitleBar}>
          <div style={storageTitle}>
            <Field
              name={`${member}.active`}
              style={storageTitle}
              component={RenderCheckbox}
              label={fields.get(index).label}
              onChange={(event, newValue, previousValue, name) => this.switchActive(member, newValue)}
            />
          </div>
          <Storage />
        </div>
        <div style={storageRepository}>
          <Field
            name={`${member}.storePath`}
            component={RenderTextField}
            type="text"
            label={`${formatMessage({ id: 'acquisition-chain.form.general.section.path' })}`}
            fullWidth
          />
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <Field
                  name={`${member}.rawdata`}
                  component={RenderCheckbox}
                  label="Rawdata"
                  noSpacing
                />
              </td>
              <td>
                <Field
                  name={`${member}.description`}
                  component={RenderCheckbox}
                  label="Description"
                  noSpacing
                />
              </td>
            </tr>
            <tr>
              <td>
                <Field
                  name={`${member}.thumbnail`}
                  component={RenderCheckbox}
                  label="Thumbnail"
                  noSpacing
                />
              </td>
              <td>
                <Field
                  name={`${member}.quicklook`}
                  component={RenderCheckbox}
                  label="Quicklook"
                  noSpacing
                />
              </td>

            </tr>
          </tbody>
        </table>
      </Paper>
    )
  }

  render() {
    const { fields } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        chainForm: {
          info, paperFlexContainer, errorMessage, errorIcon,
        },
      },
    } = this.context
    return (
      <>
        <p style={info}>{formatMessage({ id: 'acquisition-chain.form.general.section.info.storage' })}</p>
        { /** Storages list or error message */
        fields.length ? (
          <div style={paperFlexContainer}>
            {fields.map(this.renderStorageCheckbox)}
          </div>
        ) : (
          <div style={errorMessage}>
            <ErrorIcon style={errorIcon} />
            {formatMessage({ id: 'acquisition-chain.form.general.section.info.storage.no.data' })}
          </div>)
        }
      </>
    )
  }
}
