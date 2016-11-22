
import { Link } from 'react-router'

function Linkcomponent({ to, children }) {
    // to props is passed throught the react component creation
    // children props is the children of te curent component. This props is autmatically set
    // by react when creatin the component.
  const style = { fontSize: '20px', lineHeight: '50px', margin: '0px 20px', textDecoration: 'none' }
  const activeStyle = { borderBottom: '2px solid Red' }
  return (
    <Link
      to={to}
      activeStyle={activeStyle}
      style={style}
    >
      {children}
    </Link>
  )
}
Linkcomponent.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,
}
export default Linkcomponent
