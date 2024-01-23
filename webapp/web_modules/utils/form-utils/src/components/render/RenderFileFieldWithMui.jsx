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
import compose from 'lodash/fp/compose'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import File from 'mdi-material-ui/File'
import Cancel from 'mdi-material-ui/Cancel'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import messages from '../../i18n'
import styles from '../../styles'
/**
* RenderFileFieldWithMui
* @author Sébastien Binda
*/
export class RenderFileFieldWithMui extends React.Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    fullWidth: PropTypes.bool,
    accept: PropTypes.string,
    label: PropTypes.string,
    changeLabel: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static ICON_STYLES = { width: '70px', height: '70px' }

  static PROP_STYLES = { margin: '5px' }

  static ROW_CONTAINER = { display: 'flex', flexDirection: 'row', alignContent: 'stretch' }

  static COLUMNS_CONTAINER_CENTER = { display: 'flex', flexDirection: 'column', justifyContent: 'center' }

  static COLUMNS_CONTAINER_SPACED = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }

  static HIDDEN_FIELD = { display: 'none' }

  static adaptFileEventToValue(delegate) {
    return (e) => delegate(e.target.files[0])
  }

  static transformSize(size) {
    const capacity = new storage.StorageCapacity(size, storage.units.BYTE)
    const scale = capacity.scaleAndConvert(storage.StorageUnitScale.bytesScale)
    return (<storage.FormattedStorageCapacity
      capacity={scale}
    />)
  }

  renderFilePreview = (file) => {
    const { intl } = this.context
    if (!file || !file.name) {
      return (
        <div style={RenderFileFieldWithMui.ROW_CONTAINER}>
          <Cancel style={RenderFileFieldWithMui.ICON_STYLES} />
          <div style={RenderFileFieldWithMui.COLUMNS_CONTAINER_CENTER}>
            <div style={RenderFileFieldWithMui.PROP_STYLES}>{intl.formatMessage({ id: 'renderer.fileField.no.file.selected' })}</div>
          </div>
        </div>
      )
    }
    return (
      <div style={RenderFileFieldWithMui.ROW_CONTAINER}>
        <File style={RenderFileFieldWithMui.ICON_STYLES} />
        <div style={RenderFileFieldWithMui.COLUMNS_CONTAINER_SPACED}>
          <div style={RenderFileFieldWithMui.PROP_STYLES}>
            {intl.formatMessage({ id: 'renderer.fileField.file.name' })}
            {' : '}
            {file.name}
          </div>
          <div style={RenderFileFieldWithMui.PROP_STYLES}>
            {intl.formatMessage({ id: 'renderer.fileField.file.type' })}
            {' : '}
            {file.type}
          </div>
          <div style={RenderFileFieldWithMui.PROP_STYLES}>
            {intl.formatMessage({ id: 'renderer.fileField.file.size' })}
            {' : '}
            {RenderFileFieldWithMui.transformSize(file.size)}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { intl } = this.context
    const {
      input: {
        value, onChange, onBlur, ...inputProps
        // eslint-disable-next-line
      }, meta, fullWidth, accept, label, changeLabel, ...otherProps
    } = this.props
    const buttonLabel = value ? changeLabel || label || intl.formatMessage({ id: 'renderer.fileField.button.change.label' }) : label || intl.formatMessage({ id: 'renderer.fileField.button.select.label' })
    return (
      <div>
        {this.renderFilePreview(value)}
        <RaisedButton
          containerElement="label"
          fullWidth={fullWidth}
          label={buttonLabel}
          {...otherProps}
        >
          <input
            onChange={RenderFileFieldWithMui.adaptFileEventToValue(onChange)}
            onBlur={RenderFileFieldWithMui.adaptFileEventToValue(onBlur)}
            type="file"
            accept={accept}
            {...inputProps}
            style={RenderFileFieldWithMui.HIDDEN_FIELD}
          />
        </RaisedButton>
      </div>
    )
  }
}

export default compose(
  withI18n(messages),
  withModuleStyle(styles),
)(RenderFileFieldWithMui)
