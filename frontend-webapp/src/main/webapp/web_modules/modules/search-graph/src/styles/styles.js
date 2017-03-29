/**
 * LICENSE_PLACEHOLDER
 */

/**
 * Styles for menu module
 * @author Sébastien binda
 */
const menuStyles = theme => (
  {
    admin: {
      form: {
        graphLevelsRender: {
          classes: 'row',
          selectedLevelsTable: {
            classes: 'col-xs-65 col-lg-60',
            styles: {
              padding: '0 0 1em 0',
            },
            hintMessage: {
              styles: {
                color: theme.textField.hintColor,
              },
            },
            columnLevel: {
              styles: {
                width: '70px',
              },
            },
            columnName: {
              styles: {
                width: '25%',
              },
            },
            columnActions: {
              styles: {
                width: '70px',
              },
            },
          },
          addButton: {
            classes: 'col-xs-35 col-lg-40',
            styles: {
              padding: '1em 0 0 1em',
            },
            labelPosition: 'before',
          },
          errorMessage: {
            classes: 'col-xs-100',
            styles: {
              padding: '1em 0 0 0',
              color: theme.textField.errorColor,
            },
          },
        },
      },
    },
  })

export default menuStyles
