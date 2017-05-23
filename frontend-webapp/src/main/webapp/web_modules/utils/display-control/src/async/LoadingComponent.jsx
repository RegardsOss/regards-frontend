import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = { position: 'relative' }
const Loading = () => (
  <RefreshIndicator
    left={0}
    top={0}
    status="loading"
    style={style}
  />
)

export default Loading
