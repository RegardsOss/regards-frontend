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
import isFinite from 'lodash/isFinite'
import Card from 'material-ui/Card/Card'
import CardText from 'material-ui/Card/CardText'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import ImageOff from 'mdi-material-ui/ImageOff'
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes, CatalogShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import { ZoomedPictureDialog } from '@regardsoss/components'
import { QuicklookHelper } from '@regardsoss/domain/ui'
import OneElementServicesContainer from '../../../../../containers/user/tabs/results/common/options/OneElementServicesContainer'
import AddElementToCartContainer from '../../../../../containers/user/tabs/results/common/options/AddElementToCartContainer'
import QuicklookCellAttributesComponent from './QuicklookCellAttributesComponent'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'
import QuicklookZoomToOptionComponent from './QuicklookZoomToOptionComponent'
import QuicklookShowZoomedPictureComponent from './QuicklookShowZoomedPictureComponent'

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
  // Product selection management
  selectedProducts: PropTypes.objectOf(CatalogShapes.Entity).isRequired, // inner object is entity type
  onProductSelected: PropTypes.func,
  // Handler when zoom to button is fired
  onZoomToFeature: PropTypes.func,
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
    // eslint-disable-next-line react/no-unused-prop-types
    top: PropTypes.number, // eslint wont fix: rule issue, used in onPropertiesChanged
    // eslint-disable-next-line react/no-unused-prop-types
    left: PropTypes.number, // eslint wont fix: rule issue, used in onPropertiesChanged
    // eslint-disable-next-line react/no-unused-prop-types
    width: PropTypes.number, // eslint wont fix: rule issue, used in onPropertiesChanged
    // eslint-disable-next-line react/no-unused-prop-types
    gridWidth: PropTypes.number, // eslint wont fix: rule issue, used in onPropertiesChanged
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

  static OPTIONS_BAR_RESERVED_WIDTH = 34

  /**
   * Can picture file as parameter be displayed as quicklook
   * @param {*} pictureFile picture file, matching DataManagementShapes.DataFile
   * @return {boolean} true when picture is available and has valid dimensions
   */
  static canDisplayAsQuicklook(pictureFile) {
    return DamDomain.DataFileController.isAvailableNow(pictureFile) && get(pictureFile, 'imageWidth', 0) > 0 && get(pictureFile, 'imageHeight', 0) > 0
  }

  /**
   * Picks a group of quicklooks to use for default and zoomed picture. It works as following:
   * - (A) when there is a primary group, prefer it (if it has at least one valid picture)
   * - (B) otherwise, prefer any group with a valid picture of SD type, then MD type, then HD type (see Quicklook order preference)
   * - (C) When no group with picture was found, return null
   * To search for best matching group (B), we introduce the precedence index, that is expressed as the index of QL type in preference
   * array, except for primary group that has highest precedence (with lowest value, set at -1)
   * @param groups {*} as an array of UIShapes.QuicklookDefinition (holding only valid picture files in context)
   * @return {*} found group matching UIShapes.QuicklookDefinition or null
   */
  static getQLGroup(groups) {
    // Precedence algorithm: see method comment
    const { fg: foundGroup = null } = groups.reduce(({ fg, precedence }, g) => {
      // find available pic index in group
      const validPicIndex = QuicklookHelper.QUICKLOOK_FALLBACK_PREFERENCE[CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD].findIndex((qlType) => !!g[qlType])
      if (validPicIndex >= 0) {
        // (A) is it primary group?
        if (g.primary) { // (A) Yes: highest precedence (lowest value)
          return { fg: g, precedence: -1 }
        }
        // (B): Is it a better match than previously found group?
        if (validPicIndex < precedence) {
          return { fg: g, precedence: validPicIndex }
        }
      }
      // other cases (lower precedence (B) or no picture (C)): keep previous value unchanged
      return { fg, precedence }
    }, { fg: null, precedence: Number.POSITIVE_INFINITY })
    return foundGroup
  }

  /**
   * Computes the pictures to show as default and when zoomed (HD) in entity as parameter:
   * Returns default picture to show in defaultPic field and picture to show on zoom in zoomPic.
   * It ensure that picture displayed:
   * - Has dimensions, in quicklooks mode
   * - Is available for download
   * @param {*} entity matching AccessShapes.EntityWithServices.isRequired
   * @param {string} primaryQuicklookGroup primary quicklook group key, from UI settings
   * @param {string} accessToken user access token
   * @param {string} projectName current project name
   * @param {boolean} embedInMap is embed in map?
   * @return {{defaultPic: *, zoomPic: *}} pictures to show in default and zoom modes, matching DataManagementShapes.DataFile, or null if none
   */
  static getPictures(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap) {
    // A - build groups with fallback, removing any invalid picture for current context (nota: when in QL view, dimensions are mandatory, but not in map view)
    const isValidPicture = embedInMap ? DamDomain.DataFileController.isAvailableNow : QuicklookCellComponent.canDisplayAsQuicklook
    const groups = UIDomain.QuicklookHelper.getQuicklooksIn(entity, primaryQuicklookGroup, accessToken, projectName, isValidPicture)
    const qlGroup = QuicklookCellComponent.getQLGroup(groups)
    // A - If there a group was found, use its files as default and zoom pictures
    if (qlGroup) {
      return {
        defaultPic: QuicklookHelper.getQLDimensionOrFallback(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_SD, qlGroup),
        zoomPic: QuicklookHelper.getQLDimensionOrFallback(CommonDomain.DATA_TYPES_ENUM.QUICKLOOK_HD, qlGroup),
      }
    }
    // B - No quicklook was found for current entity / view mode, attempt to replace it by thumbnail when available
    const thumbnailPic = UIDomain.ThumbnailHelper.getThumbnail(
      get(entity, `content.files.${CommonDomain.DATA_TYPES_ENUM.THUMBNAIL}`), accessToken, projectName, isValidPicture)
    return {
      defaultPic: thumbnailPic,
      zoomPic: thumbnailPic,
    }
  }

  /** Used by Infinite gallery API */
  static getColumnSpanFromProps = (props) => 1

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
    // when there is no attributes, we display one attribute height footer to show all available options
    const nbLines = presentationModels.length || 1
    const footerHeight = (nbLines * QuicklookCellComponent.EXPECTED_ATTRIBUTE_ROW_HEIGHT)
        + QuicklookCellComponent.EXPECTED_ATTRIBUTES_PADDING
    // Get quicklook to display
    const { defaultPic } = QuicklookCellComponent.getPictures(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap)

    // A - There is a valid picture OR quicklook is embedded in map (map quicklooks have constant height)
    if (defaultPic || embedInMap) {
      let imageHeight
      if (embedInMap) {
        // A.1 - in map mode, use thumbnail height directly
        imageHeight = mapThumbnailHeight
      } else {
        // A.2 - in default mode, compute height to preserve picture ratio
        const height = defaultPic.imageHeight
        const width = defaultPic.imageWidth
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

  static isProductSelected(selectedProducts, productId) {
    return find(selectedProducts, (selectedProduct) => (selectedProduct.content.id === productId))
  }

  /** State holds dynamic styles, to avoid building them at render time */
  state = {
    cardStyle: null,
    iconStyle: null,
    zoomOpen: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    const {
      left, top, width, gridWidth, selectedProducts, entity,
    } = newProps
    const { muiTheme } = this.context
    if (!isEqual(left, oldProps.left)
      || !isEqual(top, oldProps.top)
      || !isEqual(width, oldProps.width)
      || !isEqual(selectedProducts, oldProps.selectedProducts)) {
      nextState.cardStyle = {
        position: 'absolute',
        left: isFinite(left) && left > 0 ? left : 0,
        top: isFinite(top) && top > 0 ? top : 0,
        width: isFinite(width) && width > 0 ? width : 0,
        padding: 0,
        transition: undefined, // remove MUI transition that is quite inadequate
        backgroundColor: QuicklookCellComponent.isProductSelected(selectedProducts, entity.content.id)
          ? muiTheme.module.searchResults.map.quicklooks.selectedColor
          : 'transparent',
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

  /** User callback: open zoom view on quicklook */
  onOpenZoom = () => this.setState({ zoomOpen: true })

  /** User callback: close zoom view */
  onCloseZoom = () => this.setState({ zoomOpen: false })

  onImageClicked = () => {
    const {
      onProductSelected, entity,
    } = this.props
    const selectedProduct = [entity.content]
    // Handle second click on selectedProduct -> remove selection
    onProductSelected(selectedProduct)
  }

  render() {
    const {
      tabType, entity, presentationModels,
      enableDownload, accessToken, projectName,
      descriptionAvailable, onAddElementToCart,
      enableServices, onZoomToFeature,
      primaryQuicklookGroup,
      embedInMap, locale,
    } = this.props
    const { cardStyle, iconStyle, zoomOpen } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          quicklookViewStyles, mapViewStyles: { quicklookImage },
        },
      },
    } = this.context

    const {
      imageStyle, cardContentContainer, quicklookContainerStyle,
      pictureAndAttributesContainer,
      attributesContainer, optionsBarStyles, option,
    } = quicklookViewStyles
    // select the actual image style
    const actualImageStyle = embedInMap ? quicklookImage : imageStyle
    const { defaultPic, zoomPic } = QuicklookCellComponent.getPictures(entity, primaryQuicklookGroup, accessToken, projectName, embedInMap)

    return (
      <>
        <Card
          style={cardStyle}
          containerStyle={cardContentContainer}
        >
          { /** 1 - render vertically the picture and attributes */}
          <div
            style={pictureAndAttributesContainer}
            onClick={this.onImageClicked}
          >
            {/* 1.a - picture */}
            <div style={defaultPic ? quicklookContainerStyle : null}>
              {
                defaultPic ? (
                  <img
                    src={defaultPic.uri}
                    alt={formatMessage({ id: 'results.quicklooks.picture.alt' })}
                    style={actualImageStyle}
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
          { /** 2 - Render options bar on right */}
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
            {/* 2.b - Show thumbnail  */}
            <ShowableAtRender show={!!defaultPic}>
              <QuicklookShowZoomedPictureComponent
                onOpenZoom={this.onOpenZoom}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />
            </ShowableAtRender>
            {/* 2.c - services, when enabled */}
            <ShowableAtRender show={enableServices && get(entity, 'content.services.length', 0) > 0}>
              <OneElementServicesContainer
                tabType={tabType}
                entity={entity}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />
            </ShowableAtRender>
            {/* 2.d - add to cart,  when available (ie has callback) - not showable because callback is required by the AddElementToCartContainer */}
            {onAddElementToCart ? (
              <AddElementToCartContainer
                entity={entity}
                onAddElementToCart={onAddElementToCart}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />) : null}
            {/* 2.e - Download, when available. Like below, due to props, we can't use a showable at render */}
            <ShowableAtRender show={enableDownload}>
              <DownloadEntityFileComponent
                entity={entity}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
                accessToken={accessToken}
                projectName={projectName}
              />
            </ShowableAtRender>
            {/* 2.f - zoom to product button, when available. */}
            <ShowableAtRender show={embedInMap}>
              <QuicklookZoomToOptionComponent
                entity={entity}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
                onZoomToFeature={onZoomToFeature}
              />
            </ShowableAtRender>
          </div>
        </Card>
        <ZoomedPictureDialog
          picURL={zoomPic ? zoomPic.uri : null}
          alt={formatMessage({ id: 'results.quicklooks.picture.alt' })}
          open={zoomOpen}
          onClose={this.onCloseZoom}
        />
      </>)
  }
}

export default QuicklookCellComponent
