/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Form entity description
 * @author Sébastien binda
 */
const FormShape = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  applicationId: React.PropTypes.string.isRequired,
  conf: React.PropTypes.object,
  container: React.PropTypes.string,
  description: React.PropTypes.string,
  defaultDynamicModule: React.PropTypes.bool,
  name: React.PropTypes.string,
})

export default FormShape
