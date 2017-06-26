import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = { position: 'relative' }
const Loading = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <RefreshIndicator
      left={0}
      top={0}
      status="loading"
      style={style}
    />
  </div>
)

export default Loading
