import RefreshIndicator from 'material-ui/RefreshIndicator'

const Loading = () => (
  <RefreshIndicator
    left={0}
    top={0}
    status="loading"
    style={{ position: 'relative' }}
  />
)

export default Loading
