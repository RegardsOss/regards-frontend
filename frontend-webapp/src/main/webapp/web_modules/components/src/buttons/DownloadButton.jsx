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
import FlatButton from 'material-ui/FlatButton'
import DownloadIcon from 'material-ui/svg-icons/file/file-download'

/**
* A download button, can be used with any material UI button types
* @author Raphaël Mechali
*/
class DownloadButton extends React.Component {

  static propTypes = {
    ButtonConstructor: PropTypes.func.isRequired,
    ButtonIcon: PropTypes.func, // not mandatory, can use a simple label
    label: PropTypes.string, // not mandatory, can use a simple icon
    tooltip: PropTypes.string,
    downloadURL: PropTypes.string.isRequired,
    // ... other button properties, provided at runtime to the button
  }

  static defaultProps = {
    ButtonConstructor: FlatButton,
    ButtonIcon: DownloadIcon,
  }

  render() {
    const { ButtonConstructor, ButtonIcon, label, tooltip, downloadURL, ...otherProperties } = this.props
    return (
      <a download href={downloadURL} >
        <ButtonConstructor
          label={label}
          icon={ButtonIcon && <ButtonIcon />}
          title={tooltip}
          {...otherProperties}
        />
      </a>
    )
  }
}
export default DownloadButton
