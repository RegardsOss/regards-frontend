/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * A React component to display a div element centered in height and width in his parent element
 */
class CenteredDiv extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
  }

  render() {
    const styles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    )
  }
}

export default CenteredDiv
