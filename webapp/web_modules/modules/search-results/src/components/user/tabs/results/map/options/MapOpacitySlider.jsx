/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Slider from 'material-ui/Slider'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Option to edit opacity
 * @author Léo Mieulet
 */
class MapOpacitySlider extends React.Component {
  static propTypes = {
    handleChangeOpacity: PropTypes.func.isRequired, // (mode) => ()
    opacity: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static sliderStyle = {
    width: '100%',
    margin: 0,
  }

  static sliderLegendStyle = {
    fontSize: '0.8em',
    color: '#00AAFF',
    display: 'flex',
    justifyContent: 'space-between',
    fontStyle: 'italic',
    width: '75%',
  }

  static sliderContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }

  static slider = {
    width: '75%',
  }

  /**
   * User callback: opacity changed
   * @param {*} e event
   * @param {number} value new opacity value
   */
  onOpacityChanged = (e, value) => this.props.handleChangeOpacity(value)

  render() {
    const { opacity } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <div style={MapOpacitySlider.sliderContainer}>
        <div style={MapOpacitySlider.sliderLegendStyle}>
          <span>{formatMessage({ id: 'results.map.tools.transparent' })}</span>
          <span>{formatMessage({ id: 'results.map.tools.opaque' })}</span>
        </div>
        <Slider
          step={0.01}
          value={opacity}
          style={MapOpacitySlider.slider}
          sliderStyle={MapOpacitySlider.sliderStyle}
          onChange={this.onOpacityChanged}
        />
      </div>
    )
  }
}
export default MapOpacitySlider
