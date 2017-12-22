/**
* LICENSE_PLACEHOLDER
**/

const fixedFlexElement = { flexShrink: '0', flexGrow: '0' }
const growingFlexElement = { flexShrink: '1', flexGrow: '1', minHeight: '0' }
const verticalLayout = { display: 'flex', flexDirection: 'column', alignItems: 'stretch' }
const growingVerticalLayout = { ...growingFlexElement, ...verticalLayout }

/**
 * Builds module style on theme
 */
export default theme => ({
  fullHeight: { height: '100%' },
  descriptionDialog: {
    widthPercent: 88,
    heightPercent: 68,
    body: { padding: '0', overflowY: 'none' },
    card: {
      style: {
        height: '100%',
        boxShadow: 'none',
        borderWidth: '0 0 1px 0',
        borderColor: theme.toolbar.separatorColor,
        borderStyle: 'solid',
      },
      containerStyle: { height: '100%', ...verticalLayout },
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
            loading: {
              rootStyle: {
                padding: '24px', display: 'flex', flexDirection: 'row', alignItems: 'center',
              },
              circleSize: 32,
              circleThickness: 1.5,
              messageStyle: { fontWeight: '0.8em', padding: '16px 0 0 16px', color: theme.subheader.color },
            },
            descriptionTab: {
              rootStyle: growingFlexElement,
            },
            propertiesTab: {
              rootStyle: {
                display: 'flex', flexDirection: 'row', alignItems: 'stretch', ...growingFlexElement,
              },
              loadingContainerStyle: { display: 'flex', alignItems: 'flex-start' },
              messageContainerStyle: { display: 'flex', alignItems: 'flex-start', paddingLeft: '24px' },
              attributes: {
                scrollArea: { ...growingFlexElement },
                rootStyle: { ...growingFlexElement, ...verticalLayout },
                attributesContainer: {
                  rootStyle: { display: 'table', padding: '0 15px 0 20px' },
                  rowStyle: { display: 'table-row' },
                  labelStyle: {
                    display: 'table-cell',
                    padding: '0 20px 0.4em 0',
                    textDecoration: 'underline',
                  },
                  valueStyle: { display: 'table-cell', padding: '0 20px 0.4em 0' },
                },
              },
              tags: {
                rootStyle: {
                  display: 'flex',
                  flexDirection: 'column',
                },
                tagsRootStyle: {
                  flexGrow: 1,
                  height: '100%',
                },
                documentsRootStyle: {
                  flexGrow: 1,
                  height: '100%',
                },
                scrollArea: {
                  ...fixedFlexElement,
                },
                scrollAreaContent: {
                  borderWidth: '0 0 0 1px',
                  borderColor: theme.toolbar.separatorColor,
                  borderStyle: 'solid',
                  minHeight: '100%',
                },
                sectionStyle: {
                  ...verticalLayout,
                  padding: '0 12px 0 12px',
                },
                tagsContainer: {
                  rootStyle: { display: 'table', paddingLeft: '24px' },
                  rowStyle: { display: 'table-row' },
                  iconCellStyle: { display: 'table-cell', padding: '0 0 0.4em 0' },
                  searchIconStyle: { height: '24px', width: '24px' },
                  infoIconStyle: {
                    height: '24px', width: '24px', color: theme.palette.accent2Color, opacity: 0.7,
                  },
                  buttonStyle: { height: '24px', width: '24px', padding: 0 },
                  labelStyle: {
                    display: 'table-cell',
                    padding: '0 20px 0.4em 10px',
                    maxWidth: '350px',
                    overflowWrap: 'break-word',
                  },
                  actionStyle: { display: 'table-cell', padding: '0 20px 0.4em 0' },
                },
              },
            },
          },
        },
      },
    },
  },
  pluginServiceDialog: {
    widthPercent: 70,
    heightPercent: 68,
    commonBodyStyles: {
      borderWidth: '1px 0 1px 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '16px',
    },
    resultsBodyStyle: { // different style to enhance the available view area size
      borderWidth: '1px 0 1px 0',
      borderColor: theme.toolbar.separatorColor,
      borderStyle: 'solid',
      padding: '0',
    },
    contentStyles: {
      width: '100%',
      height: '100%',
    },
  },
})
