/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import File from 'mdi-material-ui/File'
import Cancel from 'mdi-material-ui/Cancel'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import messages from '../i18n/Locales'
import styles from '../styles'
/**
* RenderFileFieldWithMui
* @author Sébastien Binda
*/
export class RenderFileFieldWithMui extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
    }),
    meta: PropTypes.shape({
      error: PropTypes.string,
    }),
    fullWidth: PropTypes.bool,
    accept: PropTypes.string,
    label: PropTypes.string,
    changeLabel: PropTypes.string,
  }


  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static iconStyles = { width: '70px', height: '70px' }
  static propStyles = { margin: '5px' }

  adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

  transformSize = (size) => {
    const capacity = new storage.StorageCapacity(size, storage.StorageUnits.BYTE)
    const scale = capacity.scaleAndConvert(storage.StorageUnitScale.bytesScale)
    return (<storage.FormattedStorageCapacity
      capacity={scale}
    />)
  }

  renderFilePreview = (file) => {
    const { intl } = this.context
    if (!file || !file.name) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'stretch' }}>
          <Cancel style={RenderFileFieldWithMui.iconStyles} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={RenderFileFieldWithMui.propStyles}>{intl.formatMessage({ id: 'renderer.fileField.no.file.selected' })}</div>
          </div>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'stretch' }}>
        <File style={RenderFileFieldWithMui.iconStyles} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={RenderFileFieldWithMui.propStyles}>{intl.formatMessage({ id: 'renderer.fileField.file.name' })} : {file.name}</div>
          <div style={RenderFileFieldWithMui.propStyles}>{intl.formatMessage({ id: 'renderer.fileField.file.type' })} : {file.type}</div>
          <div style={RenderFileFieldWithMui.propStyles}>
            {intl.formatMessage({ id: 'renderer.fileField.file.size' })} :
            {this.transformSize(file.size)}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { intl } = this.context
    // eslint-disable-next-line
    const { input: { value, onChange, onBlur, ...inputProps }, meta: { omitMeta }, fullWidth, accept, label, changeLabel, ...otherProps } = this.props
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
            onChange={this.adaptFileEventToValue(onChange)}
            onBlur={this.adaptFileEventToValue(onBlur)}
            type="file"
            accept={accept}
            {...inputProps}
            style={{ display: 'none' }}
          />
        </RaisedButton>
      </div >
    )
  }
}

export default compose(
  withI18n(messages),
  withModuleStyle(styles),
)(RenderFileFieldWithMui)

