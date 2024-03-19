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
import map from 'lodash/map'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Display form to copy files from one storage to an other one
 * @author Sébastien Binda
 */
class StorageCopyform extends React.Component {
  static propTypes = {
    storageLocation: StorageShapes.StorageLocation.isRequired,
    availablableDestinations: StorageShapes.StorageLocationArray.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    copyPathSource: '',
    copyPathTarget: '',
    copyStorageTarget: null,
  }

  /**
   * Dialog for Copy Files
   */
  handleStorageSelect = (event, key) => {
    const { availablableDestinations } = this.props
    this.setState({ copyStorageTarget: availablableDestinations[key].content.name })
  }

  handlePathSource = (event, value) => {
    this.setState({ copyPathSource: value })
  }

  handlePathDestination = (event, value) => {
    this.setState({ copyPathTarget: value })
  }

  onSubmit = () => {
    const {
      copyPathSource, copyPathTarget, copyStorageTarget,
    } = this.state
    this.props.onSubmit(this.props.storageLocation.content.name, copyPathSource, copyStorageTarget, copyPathTarget, [])
    this.props.onClose()
  }

  isDisabled = (location) => (location.content.name === this.props.storageLocation.content.name) || get(location, 'content.configuration.storageType', null) === 'CACHE' || get(location, 'content.configuration.storageType', null) === 'OFFLINE'

  render() {
    const { storageLocation, availablableDestinations } = this.props
    const {
      copyPathSource, copyPathTarget, copyStorageTarget,
    } = this.state
    const { intl: { formatMessage }, moduleTheme: { dropdown } } = this.context

    return (
      <div>
        <div>
          <div>
            {formatMessage({ id: 'storage.location.copy.from.label' })}
            {' '}
            {storageLocation.content.name}
          </div>
          <TextField
            hintText={formatMessage({ id: 'storage.location.copy.confirm.path-source' })}
            value={copyPathSource}
            onChange={this.handlePathSource}
            fullWidth
          />
        </div>
        <div>
          <span>
            {formatMessage({ id: 'storage.location.copy.to.label' })}
            <DropDownMenu
              value={copyStorageTarget}
              onChange={this.handleStorageSelect}
              style={dropdown}
            >
              {map(availablableDestinations, (dest) => (
                <MenuItem
                  value={dest.content.name}
                  key={dest.content.name}
                  primaryText={dest.content.name}
                  disabled={this.isDisabled(dest)}
                />
              ))}
            </DropDownMenu>
          </span>
          <TextField
            hintText={formatMessage({ id: 'storage.location.copy.confirm.path-destination' })}
            value={copyPathTarget}
            onChange={this.handlePathDestination}
            fullWidth
          />
        </div>
        <div>
          <FlatButton
            key="close"
            label={formatMessage({ id: 'storage.location.dialogs.cancel' })}
            onClick={this.props.onClose}
          />
          <FlatButton
            key="confirm"
            label={formatMessage({ id: 'storage.location.copy.submit' })}
            primary
            onClick={this.onSubmit}
            disabled={!copyStorageTarget}
          />
        </div>
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(StorageCopyform))
