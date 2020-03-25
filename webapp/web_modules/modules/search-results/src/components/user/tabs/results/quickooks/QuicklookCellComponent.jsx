/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isFinite from 'lodash/isFinite'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import isEqual from 'lodash/isEqual'
import ImageOff from 'mdi-material-ui/ImageOff'
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import { ThumbnailHelper } from '@regardsoss/domain/ui'
import OneElementServicesContainer from '../../../../../containers/user/tabs/results/common/options/OneElementServicesContainer'
import AddElementToCartContainer from '../../../../../containers/user/tabs/results/common/options/AddElementToCartContainer'
import QuicklookCellAttributesComponent from './QuicklookCellAttributesComponent'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'

export const specificCellPropertiesFields = {
  tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
  presentationModels: PropTypes.arrayOf(UIShapes.AttributePresentationModel).isRequired,
  // Services management
  enableServices: PropTypes.bool.isRequired,
  // Description management
  descriptionAvailable: PropTypes.bool.isRequired,
  onShowDescription: PropTypes.func,
  // Download management
  enableDownload: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  // Basket management
  onAddElementToCart: PropTypes.func, // used in onPropertiesUpdated
  // Embed in map control
  embedInMap: PropTypes.bool,
  mapThumbnailHeight: PropTypes.number,
  primaryQuicklookGroup: PropTypes.string.isRequired,
  // Pure component restrictions: provide locale as context
  locale: PropTypes.string.isRequired,
  // Note: current theme should also be provided to ensure redraw is done on theme change, but it is not
  // consumed by this component
}


/**
 * Specific cell properties, ie properties not provided by the infinite gallery
 */
export const SpecificCellProperties = PropTypes.shape({
  ...specificCellPropertiesFields,
})

/**
 * Displays a quicklook cell
 */
class QuicklookCellComponent extends React.PureComponent {
  static propTypes = {
    // from quicklook API
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    gridWidth: PropTypes.number,
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    // specific cell properties
    ...specificCellPropertiesFields,
    // locale and theme should be added, also this component do not use them, to force re-render on context change
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** XXX-Workaround for unknwon theme (better behavior requires context in getHeightFromProps) */
  static EXPECTED_ATTRIBUTE_ROW_HEIGHT = 19

  static EXPECTED_ATTRIBUTES_PADDING = 20

  /**
   * Can picture file as parameter be displayed as quicklook
   * @param {*} pictureFile picture file, matching DataManagementShapes.DataFile
   * @return {boolean} true when picture is available and has valid dimensions
   */
  static canDisplayAsQuicklook(pictureFile) {
    return DamDomain.DataFileController.isAvailableNow(pictureFile) && get(pictureFile, 'imageWidth', 0) > 0 && get(pictureFile, 'imageHeight', 0) > 0
  }

  /**
   * Computes the picture to show in entity as parameter (avoids returning pictures with missing dimensions)
   * @param {*} entity matching AccessShapes.EntityWithServices.isRequired
   * @param {string} primaryQuicklookGroup primary quicklook group key, from UI settings
   * @param {string} accessToken user access token
   * @param {string} projectName current project name
   * @param {boolean} embedInMap is embed in map?
   * @return {*} picture to show, matching DataManagementShapes.DataFile, with valid dimensions or null
   */
  static getPictureToShow(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap) {
    // build groups with fallback (nota: when embed in map, dimensions are not mandatory)
    const isValidPicture = embedInMap ? DamDomain.DataFileController.isAvailableNow : QuicklookCellComponent.canDisplayAsQuicklook
    const groups = UIDomain.QuicklookHelper.getQuicklooksIn(entity, primaryQuicklookGroup, accessToken, projectName, isValidPicture)
    // 1 - Use thumbnail quicklook fallback system to compute the quicklook to use (primary group first, if it
    // exists, then smaller dimension first)
    const preferredQuicklook = ThumbnailHelper.getQuicklookFallback(groups)
    if (preferredQuicklook) {
      return preferredQuicklook // found: return immeditaly
    }
    // 2 - Attempt to replace by a thumbnail with dimensions when not found
    return ThumbnailHelper.getThumbnail(
      get(entity, `content.files.${CommonDomain.DATA_TYPES_ENUM.THUMBNAIL}`), accessToken, projectName, isValidPicture)
  }

  /** Used by Infinite gallery API */
  static getColumnSpanFromProps = props => 1

  /**
   * Used by Infinite gallery API
   * @param {*} entity matching AccessShapes.EntityWithServices.isRequired
   * @param {number} columnSpan
   * @param {number} columnGutter
   * @param {number} gridWidth
   * @param {*} itemProps properties
   * @return {number} height to use in layout
   */
  static getHeightFromProps = (entity, columnSpan, columnGutter, gridWidth, itemProps) => {
    const {
      presentationModels, embedInMap, mapThumbnailHeight,
      primaryQuicklookGroup, accessToken, projectName,
    } = itemProps
    // when there is no attributes, we do not display footer
    let footerHeight = 0
    if (presentationModels.length > 0) {
      footerHeight = (presentationModels.length * QuicklookCellComponent.EXPECTED_ATTRIBUTE_ROW_HEIGHT)
      + (presentationModels.length ? QuicklookCellComponent.EXPECTED_ATTRIBUTES_PADDING : 0)
    }
    // Get quicklook to display
    const image = QuicklookCellComponent.getPictureToShow(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap)

    // A - There is a valid picture OR quicklook is embedded in map (map quicklooks have constant height)
    if (image || embedInMap) {
      let imageHeight
      if (embedInMap) {
        // A.1 - in map mode, use thumbnail height directly
        imageHeight = mapThumbnailHeight
      } else {
        // A.2 - in default mode, compute height to preserve picture ratio
        const height = image.imageHeight
        const width = image.imageWidth
        // A.2.a - When width is smaller than effective gridwidth, allow full height
        if (gridWidth >= width) {
          imageHeight = height
        } else { // A.2.b - when croping horizontally, apply same ratio vertically
          imageHeight = Math.ceil((gridWidth / width) * height)
        }
      }
      return imageHeight + footerHeight
    }
    // B - No valid picture AND not display for map: simply consume space for icons
    return (gridWidth * 7 / 10) + footerHeight + 15
  }

  static OPTIONS_BAR_RESERVED_WIDTH = 34

  /** State holds dynamic styles, to avoid building them at render time */
  state = {
    cardStyle: null,
    iconStyle: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

   /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
   onPropertiesUpdated = (oldProps, newProps) => {
     const nextState = { ...this.state }
     const {
       left, top, width, gridWidth,
     } = newProps
     if (!isEqual(left, oldProps.left) || !isEqual(top, oldProps.top) || !isEqual(width, oldProps.width)) {
       nextState.cardStyle = {
         position: 'absolute',
         left: isFinite(left) && left > 0 ? left : 0,
         top: isFinite(top) && top > 0 ? top : 0,
         width: isFinite(width) && width > 0 ? width : 0,
         padding: 0,
         transition: undefined, // remove MUI transition that is quite inadequate
       }
     }

     if (!isEqual(gridWidth, oldProps.gridWidth)) {
       const alignedWidth = gridWidth - QuicklookCellComponent.OPTIONS_BAR_RESERVED_WIDTH // XXX-workaround-quicklooks-alignement
       nextState.iconStyle = {
         width: alignedWidth / 2,
         height: alignedWidth / 2,
         margin: `${alignedWidth / 10}px ${alignedWidth / 4}px`,
       }
     }

     if (!isEqual(nextState, this.state)) {
       this.setState(nextState)
     }
   }

  /**
   * User callback: show description request
   */
  onShowDescription = () => {
    const { entity, onShowDescription } = this.props
    onShowDescription(entity)
  }

  render() {
    const {
      cardStyle, iconStyle,
    } = this.state
    const {
      tabType, entity, presentationModels,
      enableDownload, accessToken, projectName,
      descriptionAvailable, onAddElementToCart,
      enableServices,
      primaryQuicklookGroup,
      embedInMap, locale,
    } = this.props
    const {
      quicklookViewStyles,
      mapViewStyles: { quicklookImage },

    } = this.context.moduleTheme.user

    const {
      imageStyle, cardContentContainer, quicklookContainerStyle,
      pictureAndAttributesContainer,
      attributesContainer, optionsBarStyles, option,
    } = quicklookViewStyles
    // select the actual image style
    const actualImageStyle = embedInMap ? quicklookImage : imageStyle

    const image = QuicklookCellComponent.getPictureToShow(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap)
    return (
      <Card
        style={cardStyle}
        containerStyle={cardContentContainer}
      >
        { /** 1 - render vertically the picture and attributes */ }
        <div style={pictureAndAttributesContainer}>
          {/* 1.a - picture */}
          <div style={image ? quicklookContainerStyle : null}>
            { /** Swap picture or missing icon, depending on the case */
              image ? (
                <img
                  src={image.uri}
                  alt=""
                  style={actualImageStyle}
                  onClick={descriptionAvailable ? this.onShowDescription : null}
                />)
                : <ImageOff style={iconStyle} />
            }
          </div>
          {/* 1.b - Render attributes */}
          <ShowableAtRender
            show={presentationModels.length > 0}
            key="desc"
          >
            <CardText style={attributesContainer}>
              <QuicklookCellAttributesComponent
                presentationModels={presentationModels}
                entity={entity}
                locale={locale}
              />
            </CardText>
          </ShowableAtRender>
        </div>
        { /** 2 - Render options bar on right */ }
        <div style={optionsBarStyles}>
          {/* 2.a - Description  */}
          <ShowableAtRender show={descriptionAvailable}>
            <EntityDescriptionComponent
              entity={entity}
              onShowDescription={this.onShowDescription}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
          {/* 2.b - services, when enabled */}
          <ShowableAtRender show={enableServices && get(entity, 'content.services.length', 0) > 0}>
            <OneElementServicesContainer
              tabType={tabType}
              entity={entity}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />
          </ShowableAtRender>
          {/* 2.c - add to cart,  when available (ie has callback) - not showable because callback is required by the AddElementToCartContainer */}
          { onAddElementToCart ? (
            <AddElementToCartContainer
              entity={entity}
              onAddElementToCart={onAddElementToCart}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
            />) : null
            }
          {/* 2.d - Download, when available. Like below, due to props, we can't use a showable at render */}
          <ShowableAtRender show={enableDownload}>
            <DownloadEntityFileComponent
              entity={entity}
              style={option.buttonStyles}
              iconStyle={option.iconStyles}
              accessToken={accessToken}
              projectName={projectName}
            />
          </ShowableAtRender>
        </div>
      </Card>
    )
  }
}

export default QuicklookCellComponent
