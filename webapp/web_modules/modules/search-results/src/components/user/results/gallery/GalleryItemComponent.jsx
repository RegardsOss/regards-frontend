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
import { Card, CardMedia, CardText } from 'material-ui/Card'
import has from 'lodash/has'
import isEqual from 'lodash/isEqual'
import ImageOff from 'mdi-material-ui/ImageOff'
import ImageBroken from 'mdi-material-ui/ImageBroken'
import { themeContextType } from '@regardsoss/theme'
import { URLAuthInjector } from '@regardsoss/domain/common'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/display-control'
import { TableColumnBuilder } from '@regardsoss/components'
import { ColumnPresentationModelArray } from '../../../../models/table/TableColumnModel'
import ListViewEntityCellComponent from '../cells/ListViewEntityCellComponent'
import GalleryParametersContainer from '../../../../containers/user/results/gallery/GalleryParametersContainer'

class GalleryItemComponent extends React.PureComponent {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    gridWidth: PropTypes.number,
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    presentationModels: ColumnPresentationModelArray.isRequired,
    isDescAvailableFor: PropTypes.func.isRequired,
    onAddElementToCart: PropTypes.func, // callback to add element to cart, null when disabled
    enableDownload: PropTypes.bool,
    onShowDescription: PropTypes.func.isRequired,
    // auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
  }

  static defaultProps = {
    enableDownload: true,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getColumnSpanFromProps = props => 1

  /**
   * Retains only attributes presentation model in presentation models list
   * @param {[ColumnPresentationModel]} presentationModels all presentation model
   * @return {[AttributePresentationModel]} filtered attributes presentation models
   */
  static filterAttributesPresentationModels(presentationModels) {
    return presentationModels.filter(model => model.key !== TableColumnBuilder.selectionColumnKey
      && model.key !== TableColumnBuilder.optionsColumnKey)
  }

  static getHeightFromProps = (props, columnSpan, columnGutter, gridWidth, itemProps) => {
    // when there is no attributes, we do not display footer
    let footerHeight = 0
    const attributesPresentationModels = GalleryItemComponent.filterAttributesPresentationModels(itemProps.presentationModels)
    if (attributesPresentationModels.length > 0) {
      footerHeight = attributesPresentationModels.length * 19
    }
    // Check if the entity has a quicklook to display

    const hasImage = has(props, 'content.files.QUICKLOOK_SD[0]')
    const hasIssueWithImage = !has(props, 'content.files.QUICKLOOK_SD[0].imageWidth') || !has(props, 'content.files.QUICKLOOK_SD[0].imageHeight')

    if (hasImage && !hasIssueWithImage) {
      const height = props.content.files.QUICKLOOK_SD[0].imageHeight
      const width = props.content.files.QUICKLOOK_SD[0].imageWidth
      return Math.ceil(((gridWidth / width) * height) + footerHeight)
    }
    return (gridWidth * 7 / 10) + footerHeight + 15
  }

  constructor(props) {
    super(props)
    const listViewEntityCellComponentWidth = 34
    const iconTotalWidth = props.gridWidth - listViewEntityCellComponentWidth
    this.state = {
      attributesRenderData: [],
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

  /**
   * User callback: show description request
   */
  onShowDescription = () => {
    const { entity, onShowDescription } = this.props
    onShowDescription(entity)
  }

  renderImage(hasImage, hasIssueWithImage) {
    const {
      attributesRenderData, iconStyle, imageStyle, imageAndOptionsContainer, imageContainer,
    } = this.state
    const {
      entity, presentationModels, accessToken, projectName, isDescAvailableFor,
      onAddElementToCart, enableDownload, onShowDescription,
    } = this.props
    const { descriptionContainer } = this.context.moduleTheme.user.galleryViewStyles

    const attributesPresentationModels = GalleryItemComponent.filterAttributesPresentationModels(presentationModels)

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
          onClick={isDescAvailableFor(entity.content.entityType) ? this.onShowDescription : null}
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
        <div>
          <ListViewEntityCellComponent
            key="entity"
            // Entity to display
            entity={entity}
            enableDownload={enableDownload}
            gridAttributesRenderData={attributesRenderData}
            selectionEnabled={false}
            servicesEnabled
            entitySelected={false}
            displayLabel={false}
            isDescAvailableFor={isDescAvailableFor}
            displayVertically
            // auth info
            accessToken={accessToken}
            projectName={projectName}
            // Callback
            onSelectEntity={() => { }}
            onSearchEntity={null}
            onAddToCart={onAddElementToCart}
            onShowDescription={onShowDescription}
          />
        </div>
      </div>,
      <ShowableAtRender
        show={attributesPresentationModels.length > 0}
        key="desc"
      >
        <CardText style={descriptionContainer}>
          <GalleryParametersContainer
            presentationModels={attributesPresentationModels}
            entity={entity}
          />
        </CardText>
      </ShowableAtRender>,
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

export default GalleryItemComponent
