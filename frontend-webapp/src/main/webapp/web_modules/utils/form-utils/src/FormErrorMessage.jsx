/**
 * LICENSE_PLACEHOLDER
 **/
import isString from 'lodash/isString'
import { ErrorDecoratorComponent, ShowableAtRender } from '@regardsoss/components'

const FormErrorMessage = ({ children }) => {
  const active = isString(children) && children.length !== 0
  return (
    <ShowableAtRender show={active}>
      <ErrorDecoratorComponent>
        { active ? children : ''}
      </ErrorDecoratorComponent>
    </ShowableAtRender>
  )
}
FormErrorMessage.propTypes = {
  // only string expected here, but resolves false values too
  // eslint-disable-next-line
  children: PropTypes.any,
}
export default FormErrorMessage
