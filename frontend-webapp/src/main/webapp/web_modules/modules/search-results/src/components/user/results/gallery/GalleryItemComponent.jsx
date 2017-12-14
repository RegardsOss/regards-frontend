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
    entity: AccessShapes.EntityWithServices.isRequired, // Entity to display
    attributePresentationModels: AccessShapes.AttributePresentationModelArray.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getColumnSpanFromProps = (props, getState) => 1
  static getHeightFromProps = (getState, props, columnSpan, columnGutter, gridWidth, itemProps) => {
    const height = props.content.files.QUICKLOOK_SD[0].image_height
    const width = props.content.files.QUICKLOOK_SD[0].image_width
    // when there is no attributes, we do not display footer
    let footerHeight = 0
    if (itemProps.attributePresentationModels.length > 0) {
      footerHeight = (itemProps.attributePresentationModels.length * 19) + 23
    }
    return ((gridWidth / width) * height) + footerHeight
  }


  constructor(props) {
    super(props)
    this.state = {
      //entity: { content: props.content },
      showModalQuicklook: false,
      cardStyle: {
        position: 'absolute',
        left: `${props.left}px`,
        top: `${props.top}px`,
        width: `${props.width}px`,
        padding: 0,
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

  render() {
    const { cardStyle } = this.state
    const { entity, attributePresentationModels } = this.props
    const modalAction = [
      <FlatButton
        label="Close"
        primary
        onClick={this.handleClosePreview}
      />,
    ]

    const { descriptionContainer } = this.context.moduleTheme.user.galleryViewStyles

    return (

      <Card
        style={cardStyle}
      >
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
        <CardMedia
          overlay={
            <ListViewEntityCellComponent
              // Entity to display
              entity={entity}
              enableDownload={false}
              gridAttributesRenderData={[]}
              selectionEnabled={false}
              servicesEnabled={false}
              entitySelected={false}
              // Callback
              onSelectEntity={() => { }}
              onSearchEntity={null}
              onAddToCart={() => { }}
            />
          }

        >
          <img
            src={entity.content.files.QUICKLOOK_SD[0].uri}
            onClick={this.handleClickPreview}
            alt=""
          />
        </CardMedia>
        <ShowableAtRender show={attributePresentationModels.length > 0}>
          <CardText style={descriptionContainer}>
            <GalleryParametersComponent
              attributePresentationModels={attributePresentationModels}
              entity={entity}
            />
          </CardText>
        </ShowableAtRender>
      </Card>
    )
  }
}

export default GalleryItemComponent
