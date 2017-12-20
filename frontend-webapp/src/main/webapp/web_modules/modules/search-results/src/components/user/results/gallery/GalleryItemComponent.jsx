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
import { Card, CardMedia, CardText } from 'material-ui/Card'
import has from 'lodash/has'
import ImageOff from 'mdi-material-ui/ImageOff'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Dialog from 'material-ui/Dialog'
import { AccessShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/display-control'
import ListViewEntityCellComponent from '../cells/ListViewEntityCellComponent'
import GalleryParametersComponent from './GalleryParametersComponent'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
}

class GalleryItemComponent extends React.PureComponent {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    gridWidth: PropTypes.number,
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired,
    onAddElementToCart: PropTypes.func, // callback to add element to cart, null when disabled
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getColumnSpanFromProps = props => 1


  static getHeightFromProps = (props, columnSpan, columnGutter, gridWidth, itemProps) => {
    // when there is no attributes, we do not display footer
    let footerHeight = 0
    if (itemProps.attributePresentationModels.length > 0) {
      footerHeight = (itemProps.attributePresentationModels.length * 19) + 23
    }
    // Check if the entity has a quicklook to display
    if (has(props, 'content.files.QUICKLOOK_SD[0]')) {
      const height = props.content.files.QUICKLOOK_SD[0].imageHeight
      const width = props.content.files.QUICKLOOK_SD[0].imageWidth
      return ((gridWidth / width) * height) + footerHeight
    }
    return gridWidth + footerHeight
  }


  constructor(props) {
    super(props)
    this.state = {
      showModalQuicklook: false,
      attributesRenderData: [],
      cardStyle: {
        position: 'absolute',
        left: `${props.left}px`,
        top: `${props.top}px`,
        width: `${props.width}px`,
        padding: 0,
      },
      iconStyle: {
        height: '100 %',
        width: '100 %',
      },
    }
  }

  handleClickPreview = () => {
    this.setState({
      showModalQuicklook: true,
    })
  }

  handleClosePreview = () => {
    this.setState({
      showModalQuicklook: false,
    })
  }

  renderImage(hasImage) {
    const { attributesRenderData, iconStyle } = this.state
    const { entity, attributePresentationModels, onAddElementToCart } = this.props
    const { descriptionContainer } = this.context.moduleTheme.user.galleryViewStyles

    const image = hasImage ? (
      <img
        src={entity.content.files.QUICKLOOK_SD[0].uri}
        alt=""
      />) : (<ImageOff style={iconStyle} />)
    return [
      <CardMedia
        key="media"
        overlay={
          <ListViewEntityCellComponent
            // Entity to display
            entity={entity}
            enableDownload={false}
            gridAttributesRenderData={attributesRenderData}
            selectionEnabled={false}
            servicesEnabled={false}
            entitySelected={false}
            // Callback
            onSelectEntity={() => { }}
            onSearchEntity={null}
            onAddToCart={onAddElementToCart}
          />
        }
      >
        {image}
      </CardMedia>,
      <ShowableAtRender
        show={attributePresentationModels.length > 0}
        key="desc"
      >
        <CardText style={descriptionContainer}>
          <GalleryParametersComponent
            attributePresentationModels={attributePresentationModels}
            entity={entity}
          />
        </CardText>
      </ShowableAtRender>,
    ]
  }

  renderModal(hasImage) {
    const { entity } = this.props
    if (hasImage) {
      const modalAction = [
        <FlatButton
          key="close-btn"
          label="Close"
          primary
          onClick={this.handleClosePreview}
        />,
      ]
      return (
        <Dialog
          modal={false}
          actions={modalAction}
          open={this.state.showModalQuicklook}
          onRequestClose={this.handleClosePreview}
          autoScrollBodyContent
          contentStyle={customContentStyle}
        >
          <img
            src={entity.content.files.QUICKLOOK_MD[0].uri}
            alt=""
          />
        </Dialog>
      )
    }
    return null
  }

  render() {
    const { cardStyle } = this.state
    const { entity } = this.props
    const hasImage = has(entity, 'content.files.QUICKLOOK_SD[0]')
    return (
      <Card
        style={cardStyle}
      >
        {this.renderModal(hasImage)}
        {this.renderImage(hasImage)}
      </Card>
    )
  }
}

export default GalleryItemComponent
