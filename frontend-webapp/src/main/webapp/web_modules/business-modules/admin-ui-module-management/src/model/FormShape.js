/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Form entity description
 * @author Sébastien binda
 */
const FormShape = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  applicationId: PropTypes.string,
  conf: PropTypes.object,
  container: PropTypes.string,
  description: PropTypes.string,
  defaultDynamicModule: PropTypes.bool,
  name: PropTypes.string,
})

export default FormShape
