/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardMedia } from 'material-ui/Card'
import has from 'lodash/has'
import isEqual from 'lodash/isEqual'
import ImageOff from 'mdi-material-ui/ImageOff'
import ImageBroken from 'mdi-material-ui/ImageBroken'
import { themeContextType } from '@regardsoss/theme'
import { URLAuthInjector } from '@regardsoss/domain/common'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'

class ItemComponent extends React.PureComponent {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    gridWidth: PropTypes.number,
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    // auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getColumnSpanFromProps = props => 1

  static getHeightFromProps = (props, columnSpan, columnGutter, gridWidth, itemProps) => itemProps.height

  constructor(props) {
    super(props)
    const listViewEntityCellComponentWidth = 34
    const iconTotalWidth = props.gridWidth - listViewEntityCellComponentWidth
    this.state = {
      cardStyle: {
        position: 'absolute',
        left: `${props.left}px`,
        top: `${props.top}px`,
        width: `${props.width}px`,
        padding: 0,
      },
      iconStyle: {
        width: `${iconTotalWidth / 2}px`,
        height: `${iconTotalWidth / 2}px`,
        margin: `${iconTotalWidth / 10}px ${iconTotalWidth / 4}px`,
      },
      imageStyle: {
        maxWidth: '100%',
        maxHeight: this.props.height,
      },
      imageAndOptionsContainer: {
        display: 'flex',
      },
      imageContainer: {
        cursor: 'zoom-in',
      },
    }
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.left, this.props.left) || !isEqual(newProps.top, this.props.top) || !isEqual(newProps.width, this.props.width)) {
      this.setState({
        cardStyle: {
          position: 'absolute',
          left: `${newProps.left}px`,
          top: `${newProps.top}px`,
          width: `${newProps.width}px`,
          padding: 0,
        },
      })
    }
  }

  renderImage(hasImage, hasIssueWithImage) {
    const {
      iconStyle, imageStyle, imageAndOptionsContainer, imageContainer,
    } = this.state
    const {
      entity, accessToken, projectName,
    } = this.props

    let image
    let imageContainerStyle = {}
    if (!hasImage) {
      image = (<ImageOff style={iconStyle} />)
    } else if (hasIssueWithImage) {
      image = (<ImageBroken style={iconStyle} />)
    } else {
      image = (
        <img
          src={URLAuthInjector(entity.content.files.QUICKLOOK_SD[0].uri, accessToken, projectName)}
          alt=""
          style={imageStyle}
        />)
      imageContainerStyle = imageContainer
    }
    return [
      <div
        key="img-and-options"
        style={imageAndOptionsContainer}
      >
        <CardMedia>
          <div style={imageContainerStyle}>
            {image}
          </div>
        </CardMedia>
      </div>,
    ]
  }


  render() {
    const { cardStyle } = this.state
    const { entity } = this.props
    const hasImage = has(entity, 'content.files.QUICKLOOK_SD[0]')
    const hasIssueWithImage = !has(entity, 'content.files.QUICKLOOK_SD[0].imageWidth') || !has(entity, 'content.files.QUICKLOOK_SD[0].imageHeight')
    return (
      <Card
        style={cardStyle}
      >
        {this.renderImage(hasImage, hasIssueWithImage)}
      </Card>
    )
  }
}

export default ItemComponent
