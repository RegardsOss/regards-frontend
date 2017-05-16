/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Column configuration entity
 * @author Sébastien Binda
 */
const ColumnConfigurationModel = PropTypes.shape({
  // Label of the column
  label: PropTypes.string.isRequired,
  // Entity attributes to display as cell in the column
  attributes: PropTypes.arrayOf(PropTypes.string),
  // Custom react component to display attributes
  customCell: PropTypes.shape({
    component: PropTypes.func,
    props: PropTypes.object,
  }),
  // Number to fixe column width.
  fixed: PropTypes.number,
  // True to hide the column label in the header line of the table
  hideLabel: PropTypes.bool,
  // Does the column is sortable
  sortable: PropTypes.bool,
})

export default ColumnConfigurationModel
