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
 */
import { buildSplitResizerStyle } from '@regardsoss/components'

/**
 * Module styles builder
 * @param {*} theme base Material UI theme
 * @return {*} module theme object
 */
const styles = (theme) => ({
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
      leftGroup: { // breadcrumb and options
        display: 'flex',
        flexGrow: 0,
        flexShrink: 1,
        minWidth: theme.module.description.tree.width, // re use tree width: min left size
      },
      rightGroup: { // right options (search)
        display: 'flex',
        justifyContent: 'stretch',
        minWidth: 'fit-content',
        flexShrink: 0,
        flexGrow: 0,
      },
      breadcrumb: {
        root: {
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          flexShrink: 1,
          minWidth: 0,
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
            color: theme.module.description.breadcrumb.link.selected.color,
            style: {
              width: theme.module.description.breadcrumb.link.selected.iconSize,
              height: theme.module.description.breadcrumb.link.selected.iconSize,
              flexShrink: 0,
            },
          },
          text: {
            padding: theme.module.description.breadcrumb.link.textPadding,
            color: theme.module.description.breadcrumb.link.selected.color,
            fontWeight: theme.module.description.breadcrumb.link.selected.fontWeight,
            fontSize: theme.module.description.breadcrumb.link.selected.fontSize,
            flexShrink: 0,
          },
        },
        unselectedLink: {
          root: {
            display: 'flex',
            flexGrow: 0,
            flexShrink: 1,
            minWidth: theme.module.description.breadcrumb.link.unselected.minWidth,
            alignItems: 'center',
            cursor: 'pointer',
          },
          icon: {
            color: theme.module.description.breadcrumb.link.unselected.color,
            style: {
              width: theme.module.description.breadcrumb.link.unselected.iconSize,
              height: theme.module.description.breadcrumb.link.unselected.iconSize,
              flexShrink: 0,
            },
          },
          text: {
            padding: theme.module.description.breadcrumb.link.textPadding,
            color: theme.module.description.breadcrumb.link.unselected.color,
            fontWeight: theme.module.description.breadcrumb.link.unselected.fontWeight,
            fontSize: theme.module.description.breadcrumb.link.unselected.fontSize,
            minWidth: 0,
            flexShrink: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
        separator: {
          ...theme.module.description.breadcrumb.separator,
          flexShrink: 0,
        },
      },
    },
    main: {
      root: {
        flex: '1 1 0%',
        position: 'relative',
      },
      paneStyle: {
        minWidth: theme.module.description.tree.minWidth,
      },
      pane2Style: {
        flex: '1 1 0%',
        alignItems: 'strecth',
        position: 'relative',
        outline: 'none',
        display: 'flex',
        minWidth: theme.module.description.content.minWidth,
      },
      resizer: buildSplitResizerStyle(theme),
      tree: {
        scrollArea: {
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
            padding: theme.module.description.content.padding,
          },
          elementContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.module.description.listPage.element.padding,
            minHeight: theme.module.description.listPage.rightIconButton.size,
          },
          elementIcon: {
            flexGrow: 0,
            flexShrink: 0,
          },
          rightIconButton: {
            flexGrow: 0,
            flexShrink: 0,
            width: theme.module.description.listPage.rightIconButton.size,
            height: theme.module.description.listPage.rightIconButton.size,
            padding: theme.module.description.listPage.rightIconButton.padding,
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
            margin: theme.module.description.listPage.element.margin,
          },
          linkAndIconCell: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            margin: theme.module.description.listPage.element.margin,
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
            padding: theme.module.description.content.padding,
          },
          thumbnail: {
            display: 'block',
            width: theme.module.description.parameters.thumbnail.maxSize,
            height: theme.module.description.parameters.thumbnail.maxSize,
            margin: theme.module.description.parameters.thumbnail.margin,
            objectFit: 'contain',
            alignSelf: 'flex-start',
            cursor: 'zoom-in',
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
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: theme.module.description.parameters.group.attribute.label.maxWidth,
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
        quicklook: {
          groupLists: {
            scrollArea: {
              flexBasis: theme.module.description.quicklook.groupLists.width,
              borderColor: theme.module.description.quicklook.groupLists.borderColor,
              borderWidth: theme.module.description.quicklook.groupLists.borderWidth,
              borderStyle: 'solid',
              flexGrow: 0,
              flexShrink: 0,
            },
            scrollAreaContent: {
              minWidth: '100%',
              maxHeight: '100',
            },
            listContainer: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              padding: theme.module.description.quicklook.groupLists.padding,
            },
            picturesSeparator: {
              marginTop: theme.module.description.quicklook.groupLists.picturesGap,
            },
            pictureContainer: {
              selected: {
                width: theme.module.description.quicklook.groupLists.picture.width,
                height: theme.module.description.quicklook.groupLists.picture.height,
                cursor: 'default',
                borderWidth: theme.module.description.quicklook.groupLists.picture.borderWidth,
                borderColor: theme.module.description.quicklook.groupLists.picture.selectedColor,
                borderStyle: 'solid',
              },
              unselected: {
                width: theme.module.description.quicklook.groupLists.picture.width,
                height: theme.module.description.quicklook.groupLists.picture.height,
                cursor: 'pointer',
                borderWidth: theme.module.description.quicklook.groupLists.picture.borderWidth,
                borderColor: theme.module.description.quicklook.groupLists.picture.unselectedColor,
                borderStyle: 'solid',
              },
            },
            picture: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          },
          view: {
            normal: {
              container: {
                flexGrow: 1,
                flexShrink: 1,
                padding: theme.module.description.quicklook.normalPadding,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'zoom-in',
              },
              img: {
                flexShrink: 1,
                minWidth: 0,
                minHeight: 0,
                maxWidth: '100%',
                maxHeight: '100%',
              },
              caption: {
                color: theme.module.description.quicklook.caption.color,
                padding: theme.module.description.quicklook.caption.padding,
              },
            },
            magnified: {
              container: {
                flexGrow: 1,
                flexShrink: 1,
                overflow: 'auto',
                cursor: 'zoom-out',
                display: 'flex',
                alignItems: 'center',
              },
              img: {
                display: 'block',
                margin: 'auto',
              },
            },
          },
        },
      },
    },
  },
})

export default styles
