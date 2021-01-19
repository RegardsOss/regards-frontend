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
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

/**
 * Shows loading with title and subtitle (optional) in a card (useing card overlay)
 */
class LoadingPaneComponent extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // styles: no specific
    // eslint-disable-next-line
    containerStyle: PropTypes.object,
    loadingComponentSize: PropTypes.number,
  }

  static defaultProps = {
    containerStyle: {
      display: 'flex',
      flexDirection: 'horizontal',
      paddingBottom: '90px',
      alignItems: 'center',
      height: '330px',
      justifyContent: 'space-around',
    },
    loadingComponentSize: 150,
  }

  render() {
    const {
      title, subtitle, containerStyle, loadingComponentSize,
    } = this.props
    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={title}
              subtitle={subtitle}
            />
}
        >
          <div style={containerStyle}>
            <CircularProgress size={loadingComponentSize} />
          </div>
        </CardMedia>
      </Card>
    )
  }
}

export default LoadingPaneComponent
