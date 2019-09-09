/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
// TODO delete that!
const fixedFlexElement = { flexShrink: '0', flexGrow: '0' }
const growingFlexElement = { flexShrink: '1', flexGrow: '1', minHeight: '0' }
const verticalLayout = { display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
const growingVerticalLayout = { ...growingFlexElement, ...verticalLayout }

/**
 * Module styles builder
 * @param {*} theme base Material UI theme
 * @return {*} module theme object
 */
const styles = theme => ({
  admin: {
    topSeparator: {
      marginTop: 40,
    },
    group: {
      attributes: {
        marginTop: 25,
      },
      options: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
  },
  user: {
    header: {
      flatIconButtonStyle: {
        minWidth: theme.button.iconButtonSize,
      },
      breadcrumb: {
        root: {
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          flexShrink: 1,
        },
        selectedLink: {
          root: {
            display: 'flex',
            flexGrow: 0,
            flexShrink: 0,
            alignItems: 'center',
            cursor: 'pointer',
          },
          icon: {
            color: theme.module.description.breadcrumb.link.selectedColor,
            style: {
              width: theme.module.description.breadcrumb.link.iconSize,
              height: theme.module.description.breadcrumb.link.iconSize,
            },
          },
          text: {
            padding: theme.module.description.breadcrumb.link.textPadding,
            color: theme.module.description.breadcrumb.link.selectedColor,
            fontWeight: theme.module.description.breadcrumb.link.fontWeight,
            fontSize: theme.module.description.breadcrumb.link.fontSize,
          },
        },
        unselectedLink: {
          root: {
            display: 'flex',
            flexGrow: 0,
            flexShrink: 1,
            alignItems: 'center',
            cursor: 'pointer',
          },
          icon: {
            color: theme.module.description.breadcrumb.link.unselectedColor,
            style: {
              width: theme.module.description.breadcrumb.link.iconSize,
              height: theme.module.description.breadcrumb.link.iconSize,
            },
          },
          text: {
            padding: theme.module.description.breadcrumb.link.textPadding,
            color: theme.module.description.breadcrumb.link.unselectedColor,
            fontWeight: theme.module.description.breadcrumb.link.fontWeight,
            fontSize: theme.module.description.breadcrumb.link.fontSize,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },

        },
      },
    },
    main: {
      root: {
        display: 'flex',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        minHeight: 0,
      },
      tree: {
        scrollArea: { // TODO use me!
          flexBasis: theme.module.description.tree.width,
          borderColor: theme.module.description.tree.borderColor,
          borderWidth: theme.module.description.tree.borderWidth,
          borderStyle: 'solid',
          flexGrow: 0,
          flexShrink: 0,
        },
        scrollAreaContent: {
          minWidth: '100%',
          maxHeight: '100',
        },
        cell: {
          optionCell: {
            padding: 0,
            width: theme.button.iconButtonSize,
          },
          iconButton: {
            style: {
              width: theme.button.iconButtonSize,
              height: theme.button.iconButtonSize,
              padding: theme.module.description.tree.iconButtonPadding,
            },
            iconStyle: {
              width: theme.module.description.tree.iconSize,
              height: theme.module.description.tree.iconSize,
            },
          },
          text: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'default',
          },
          link: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          },
          icon: {
            width: theme.module.description.tree.iconSize,
            height: theme.module.description.tree.iconSize,
            flexGrow: 0,
            flexShrink: 0,
          },
          ...[ // build ready to use styles for selected and unselected states (both are very similar)
            { key: 'selected', stateColor: theme.module.description.tree.selectedColor },
            { key: 'unselected', stateColor: theme.module.description.tree.unselectedColor }]
            .reduce((acc, { key, stateColor }) => {
              const textCommon = {
                flexGrow: 1,
                flexShrink: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
              return {
                ...acc,
                [key]: {
                  iconColor: stateColor,
                  sectionText: {
                    color: stateColor,
                    fontWeight: theme.module.description.tree.section.fontWeight,
                    fontSize: theme.module.description.tree.section.fontSize,
                    textDecoration: theme.module.description.tree.section.textTextDecoration,
                    ...textCommon,
                  },
                  sectionLink: {
                    color: stateColor,
                    fontWeight: theme.module.description.tree.section.fontWeight,
                    fontSize: theme.module.description.tree.section.fontSize,
                    textDecoration: theme.module.description.tree.section.linkTextDecoration,
                    ...textCommon,
                  },
                  elementText: {
                    color: stateColor,
                    marginLeft: theme.module.description.tree.iconToTextGap,
                    fontSize: theme.module.description.tree.element.fontSize,
                    textDecoration: theme.module.description.tree.element.textTextDecoration,
                    ...textCommon,
                  },
                  elementLink: {
                    color: stateColor,
                    marginLeft: theme.module.description.tree.iconToTextGap,
                    fontSize: theme.module.description.tree.element.fontSize,
                    textDecoration: theme.module.description.tree.element.linkTextDecoration,
                    ...textCommon,
                  },
                },
              }
            }, {}),
        },
      },
      content: {
        scrolling: {
          scrollArea: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
          },
          scrollAreaContent: {
            minHeight: '100%',
            maxWidth: '100%',
          },
        },
        listPage: {
          contentRoot: {
            display: 'flex',
          },
          listContainer: {
            // Nota: layouting as column is impossible here,
            // see https://stackoverflow.com/questions/39095473/flexbox-wrong-width-calculation-when-flex-direction-column-flex-wrap-wrap
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme.module.description.contentPadding,
          },
          elementContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.module.description.listPage.element.padding,
          },
          elementIcon: {
            flexGrow: 0,
            flexShrink: 0,
          },
          rigthIconButton: {
            flexGrow: 0,
            flexShrink: 0,
            width: theme.module.description.listPage.rightIconButton.size,
            height: theme.module.description.listPage.rightIconButton.size,
            padding: theme.module.description.listPage.rightIconButton.padding,
            margin: theme.module.description.listPage.rightIconButton.margin,
          },
          textCell: {
            flexGrow: 1,
            flexShrink: 1,
            fontSize: theme.module.description.listPage.element.fontSize,
            fontWeight: theme.module.description.listPage.element.fontWeight,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'default',
          },
          linkAndIconCell: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          },
          linkText: {
            flexGrow: 1,
            flexShrink: 1,
            marginLeft: theme.module.description.listPage.element.iconToTextGap,
            fontSize: theme.module.description.listPage.element.fontSize,
            fontWeight: theme.module.description.listPage.element.fontWeight,
            textDecoration: theme.module.description.listPage.element.linkTextDecoration,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
        parameters: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme.module.description.contentPadding,
          },
          thumbnail: {
            display: 'block',
            maxWidth: theme.module.description.parameters.thumbnail.maxSize,
            maxHeight: theme.module.description.parameters.thumbnail.maxSize,
            margin: theme.module.description.parameters.thumbnail.margin,
            flexGrow: 0,
            flexShrink: 0,
          },
          attributesGroupsContainer: {
            root: {
              display: 'grid',
              flexGrow: 1,
              flexShrink: 0,
              gridTemplateColumns: 'min-content auto',
            },
            groupTitlePlaceholdStyle: {
              padding: theme.module.description.parameters.group.titlePlaceholder.padding,
              gridColumnEnd: 'span 2',
            },
            groupTitleStyle: {
              color: theme.module.description.parameters.group.title.color,
              padding: theme.module.description.parameters.group.title.padding,
              fontSize: theme.module.description.parameters.group.title.fontSize,
              justifySelf: 'left',
              gridColumnEnd: 'span 2',
              lineHeight: 1,
            },
            labelStyle: {
              padding: theme.module.description.parameters.group.attribute.label.padding,
              textDecoration: theme.module.description.parameters.group.attribute.label.textDecoration,
              justifySelf: 'left',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            },
            valueStyle: {
              justifySelf: 'stretch',
              display: 'block',
              padding: theme.module.description.parameters.group.attribute.value.padding,
              textDecoration: theme.module.description.parameters.group.attribute.value.textDecoration,
              minWidth: 0,
              lineHeight: 1,
            },
            valuesSeparator: {
              height: theme.module.description.parameters.group.attribute.multipleValuesSpacing,
            },
          },
        },
      },
    },
    // TODO: that whole object should be deleted at end
    card: {
      style: {
        ...growingFlexElement,
        ...verticalLayout,
      },
      containerStyle: {
        ...growingFlexElement,
        ...verticalLayout,
      },
      titleStyle: fixedFlexElement,
      media: {
        rootStyle: growingVerticalLayout,
        mediaStyle: growingVerticalLayout,
        tabs: {
          rootStyle: growingVerticalLayout,
          tabItemContainerStyle: fixedFlexElement,
          contentContainerStyle: growingVerticalLayout,
          tabTemplateStyle: growingVerticalLayout,
          tab: {
            quicklook: {
              imageContainerZoomOut: {
                display: 'flex',
                justifyContent: 'center',
                maxHeight: '100%',
                cursor: 'zoom-in',
              },
              imageContainerZoomIn: {
                cursor: 'zoom-out',
                overflow: 'auto',
              },
              imageZoomOut: {
                maxHeight: '100%',
                objectFit: 'contain',
              },
              imageZoomIn: {
                display: 'block',
                margin: 'auto',
              },
            },
            filesTab: {
              rootStyle: {
                position: 'relative',
                width: '100%',
                height: '100%',
                flexGrow: 1,
                flexShrink: 1,
              },
              fileOptions: {
                position: 'absolute',
                top: theme.module.description.filesOptions.top,
                right: theme.module.description.filesOptions.right,
                background: theme.module.description.filesOptions.background,
                padding: theme.module.description.filesOptions.padding,
                display: 'flex',
                alignItems: 'center',
                zIndex: 1,
              },
              fileContent: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
              },
              fileMeaureDiv: {
                width: '100%',
                height: '100%',
              },
              centeredFileContent: {
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              contentBackground: {
                height: '100%',
                width: '100%',
                background: theme.module.description.fileContentBackground,
              },
            },
          },
        },
      },
    },
  },
})

export default styles
