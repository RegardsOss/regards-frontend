/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Column configuration entity
 * @author Sébastien Binda
 */
const ColumnConfiguration = React.PropTypes.shape({
  // Label of the column
  label: React.PropTypes.string.isRequired,
  // Entity attributes to display as cell in the column
  attributes: React.PropTypes.arrayOf(React.PropTypes.string),
  // Custom react component to display attributes
  customCell: React.PropTypes.shape({
    component: React.PropTypes.func,
    props: React.PropTypes.object,
  }),
  // Number to fixe column width.
  fixed: React.PropTypes.number,
  // True to hide the column label in the header line of the table
  hideLabel: React.PropTypes.bool,
})

export default ColumnConfiguration
