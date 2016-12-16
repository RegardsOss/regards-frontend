/**
 * LICENSE_PLACEHOLDER
 */
const projectsStyles = theme => (
  {
    titleListProjects: {
      lineHeight: '60px',
      fontSize: '37px',
      textAlign: 'center',
      textTransform: 'uppercase',
      color: theme.palette.backgroundTextColor,
      fontWeight: 300,
      letterSpacing: '6.3px',
      fontFamily: theme.fontFamily,
      textDecoration: 'underline',
      marginTop: '40px',
      marginBottom: '30px',
    },
    text: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      maxHeight: '4.8em',
      lineHeight: '1.6em',
      textAlign: 'justify',
    },
    title: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    rootTitle: {
      paddingBottom: '0',
    },
    icon: {
      height: '100px',
      width: '100px',
    },
    iconDisabled: {
      height: '100px',
      width: '100px',
      filter: 'grayscale(100%)',
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    descriptionContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    lock: {
      position: 'absolute',
      bottom: '45%',
      right: '45%',
    },
    iconLock: {
      height: 60,
      width: 60,
    },
    cardWhenDisabled: {
      backgroundColor: theme.palette.disablePanelColor,
    },
    betweenProjects: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  })

export default projectsStyles
