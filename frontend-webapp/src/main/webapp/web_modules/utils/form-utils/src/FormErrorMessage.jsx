import { ErrorDecoratorComponent, ShowableAtRender } from '@regardsoss/components'

const FormErrorMessage = ({ children }) => {
  const active = typeof children === 'string' && children.length !== 0
  return (
    <ShowableAtRender show={active}>
      <ErrorDecoratorComponent>
        {children}
      </ErrorDecoratorComponent>
    </ShowableAtRender>
  )
}
FormErrorMessage.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
}
export default FormErrorMessage
