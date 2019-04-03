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
import has from 'lodash/has'
import Card from 'material-ui/Card/Card'
import CardMedia from 'material-ui/Card/CardMedia'
import CardText from 'material-ui/Card/CardText'
import isEqual from 'lodash/isEqual'
import ImageOff from 'mdi-material-ui/ImageOff'
import ImageBroken from 'mdi-material-ui/ImageBroken'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { URLAuthInjector } from '@regardsoss/domain/common'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import OneElementServicesContainer from '../../../../containers/user/results/common/options/OneElementServicesContainer'
import QuicklookCellAttributesComponent from './QuicklookCellAttributesComponent'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import AddElementToCartContainer from '../../../../containers/user/results/common/options/AddElementToCartContainer'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'

const specificCellPropertiesFields = {
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
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Used by Infinite gallery API */
  static getColumnSpanFromProps = props => 1

  /** Used by Infinite gallery API */
  static getHeightFromProps = (props, columnSpan, columnGutter, gridWidth, itemProps) => {
    const { presentationModels } = itemProps
    // when there is no attributes, we do not display footer
    let footerHeight = 0
    if (presentationModels.length > 0) {
      footerHeight = presentationModels.length * 19
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

  /** Reserved with  FIXME-ASAP-workaround-quicklooks-width */
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
         left: `${left}px`,
         top: `${top}px`,
         width: `${width}px`,
         padding: 0,
       }
     }

     if (!isEqual(gridWidth, oldProps.gridWidth)) {
       const alignedWidth = gridWidth - QuicklookCellComponent.OPTIONS_BAR_RESERVED_WIDTH // XXX-workaround-quicklooks-alignement
       nextState.iconStyle = {
         width: `${alignedWidth / 2}px`,
         height: `${alignedWidth / 2}px`,
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
      entity, presentationModels, enableServices,
      enableDownload, accessToken, projectName,
      descriptionAvailable, onAddElementToCart,
    } = this.props
    const {
      imageStyle, imageAndOptionsContainer, quicklookContainerStyle,
      attributesContainer, optionsBarStyles, option,
    } = this.context.moduleTheme.user.quicklookViewStyles
    const hasImage = has(entity, 'content.files.QUICKLOOK_SD[0]')
    const hasIssueWithImage = !has(entity, 'content.files.QUICKLOOK_SD[0].imageWidth') || !has(entity, 'content.files.QUICKLOOK_SD[0].imageHeight')
    return (
      <Card style={cardStyle}>
        {/* 1. Image and options on right */}
        <div
          key="img-and-options"
          style={imageAndOptionsContainer}
        >
          { /** 1.a Render image or icon to replace it */
            <CardMedia>
              { /** IIFE to handle multiple possibilities */
                (() => {
                  if (!hasImage) {
                    return <div><ImageOff style={iconStyle} /></div>
                  } if (hasIssueWithImage) {
                    return <div><ImageBroken style={iconStyle} /></div>
                  }
                  return (
                    <div style={quicklookContainerStyle}>
                      <img
                        src={URLAuthInjector(entity.content.files.QUICKLOOK_SD[0].uri, accessToken, projectName)}
                        alt=""
                        style={imageStyle}
                        onClick={descriptionAvailable ? this.onShowDescription : null}
                      />
                    </div>)
                })()
              }
            </CardMedia>
          }
          { /** 1.b Render options bar on right */ }
          <div style={optionsBarStyles}>
            {/* 1.b.1 Description  */}
            <ShowableAtRender show={descriptionAvailable}>
              <EntityDescriptionComponent
                entity={entity}
                onShowDescription={this.onShowDescription}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />
            </ShowableAtRender>
            {/* 1.b.2 services, when enabled */}
            <ShowableAtRender show={enableServices}>
              <OneElementServicesContainer
                entity={entity}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />
            </ShowableAtRender>
            {/* 1.b.3 add to cart,  when available (ie has callback) - not showable because callback is required by the AddElementToCartContainer */}
            { onAddElementToCart ? (
              <AddElementToCartContainer
                entity={entity}
                onAddElementToCart={onAddElementToCart}
                style={option.buttonStyles}
                iconStyle={option.iconStyles}
              />) : null
            }
            {/* 1.b.4 Download, when available. Like below, due to props, we can't use a showable at render */}
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
        </div>
        {/* 2. Render attributes */}
        <ShowableAtRender
          show={presentationModels.length > 0}
          key="desc"
        >
          <CardText style={attributesContainer}>
            <QuicklookCellAttributesComponent
              presentationModels={presentationModels}
              entity={entity}
            />
          </CardText>
        </ShowableAtRender>
      </Card>
    )
  }
}

export default QuicklookCellComponent
