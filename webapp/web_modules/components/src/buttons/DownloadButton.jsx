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
import FlatButton from 'material-ui/FlatButton'
import DownloadIcon from 'mdi-material-ui/Download'

/**
* A download button, can be used with any material UI button types
* @author Raphaël Mechali
*/
class DownloadButton extends React.Component {
  static propTypes = {
    ButtonConstructor: PropTypes.func,
    ButtonIcon: PropTypes.func, // not mandatory, can use a simple label
    label: PropTypes.string, // not mandatory, can use a simple icon
    tooltip: PropTypes.string,
    disabled: PropTypes.bool,
    downloadURL: PropTypes.string, // not mandatory, for disabled cases
    downloadName: PropTypes.string,
    isBlank: PropTypes.bool,
    hidden: PropTypes.bool,
    // ... other button properties, provided at runtime to the button
  }

  static defaultProps = {
    ButtonConstructor: FlatButton,
    ButtonIcon: DownloadIcon,
    downloadName: 'download',
  }

  static UNDECORATED_LINK_STYLE = {
    textDecoration: 'none',
  }

  /** Button reference */
  linkComponent = React.createRef()

  forceDownload = () => {
    if (this.linkComponent.current) {
      this.linkComponent.current.click()
    }
  }

  render() {
    const {
      ButtonConstructor, ButtonIcon, label, disabled, tooltip, downloadURL, downloadName, isBlank, hidden, ...otherProperties
    } = this.props
    const buttonRender = (
      <ButtonConstructor
        label={label}
        icon={ButtonIcon && <ButtonIcon />}
        title={tooltip}
        disabled={disabled}
        {...otherProperties}
      />)

    if (disabled) {
      // do not return the link as it cannot be disabled
      return buttonRender
    }

    return (
      <a
        ref={this.linkComponent}
        href={downloadURL}
        style={hidden ? { display: 'none' } : DownloadButton.UNDECORATED_LINK_STYLE}
        download={isBlank ? downloadName : null}
        target={isBlank ? '_blank' : null}
      >
        {buttonRender}
      </a>
    )
  }
}
export default DownloadButton
