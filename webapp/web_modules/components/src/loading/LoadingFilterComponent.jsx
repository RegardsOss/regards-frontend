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
 */
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display a over filter for loading zone
 *
 * @author Sébastien Binda
 */
class LoadingFilterComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    text: PropTypes.string,
    display: PropTypes.bool,
  }

  static defaultProps = {
    display: false,
    text: '',
  }

  render() {
    const { muiTheme } = this.context
    return !this.props.display ? null : (
      <div style={{
        backgroundColor: muiTheme.palette.canvasColor,
        opacity: '0.8',
        position: 'absolute',
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
        zIndex: '5',
      }}
      >
        <div style={{ color: muiTheme.palette.primary1Color, zIndex: '10' }}>{this.props.text}</div>
        <CircularProgress />
      </div>
    )
  }
}

export default LoadingFilterComponent
