import FloatingActionButton from 'material-ui/FloatingActionButton'
import DocumentLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import ImageLibrary from 'material-ui/svg-icons/action/perm-media'
import Map from 'material-ui/svg-icons/social/public'
import DataLibrary from 'material-ui/svg-icons/av/library-books'

class ResultsTypeButtons extends React.Component {
  render() {
    return (
      <div
        style={{
          top: 0,
          position: 'fixed',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <FloatingActionButton style={{ marginBottom: 10 }}>
            <DataLibrary />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginBottom: 10 }}>
            <ImageLibrary />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginBottom: 10 }}>
            <DocumentLibrary />
          </FloatingActionButton>
          <FloatingActionButton>
            <Map />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}
export default ResultsTypeButtons
