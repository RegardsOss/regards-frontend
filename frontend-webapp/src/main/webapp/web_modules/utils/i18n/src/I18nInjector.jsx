/** @module common */

import { intlShape } from 'react-intl'

/**
 * Retrieves intl fom the context
 * and injects it as a prop to its child
 */
class I18nInjector extends React.Component {

  static contextTypes= {
    intl: intlShape,
  }

  mapContextToChildProps = () => ({
    intl: this.context.intl,
  })

  render() {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
  }
}

I18nInjector.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default I18nInjector
