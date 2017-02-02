/**
 * LICENSE_PLACEHOLDER
 **/
import Infinite from 'react-infinite'
import { Table, FixedTable } from '@regardsoss/components'
import { LoadingComponent } from '@regardsoss/display-control'
import { CatalogEntity } from '@regardsoss/model'
import ResultsTypeButtons from './ResultsTypeButtons'

class ResultComponent extends React.Component {

  static propTypes = {
    entities: React.PropTypes.arrayOf(CatalogEntity),
    getNextPage: React.PropTypes.func,
    resultsFetching: React.PropTypes.bool,
    infinite: React.PropTypes.bool,
  }

  handleInfiniteLoad = () => {
    console.log('Infinite load !!!!')
    this.props.getNextPage()
  }

  xrender() {
    const columns = [
      {
        label: 'Label',
        attributes: ['label'],
        hidden: false,
      },
      {
        label: 'Langue',
        attributes: ['language'],
        hidden: false,
      },
      {
        label: 'Format',
        attributes: ['format'],
        hidden: false,
      },
    ]

    const height = 65 * this.props.entities.length
    const offset = this.props.infinite ? 50 : undefined
    console.log('Entities', this.props.entities)
    return (
      <div>
        <ResultsTypeButtons />
        <div
          style={{
            marginLeft: 60,
          }}
        >
          <Infinite
            containerHeight={document.body.offsetHeight}
            infiniteLoadBeginEdgeOffset={offset}
            elementHeight={height}
            useWindowAsScrollContainer
            onInfiniteLoad={this.handleInfiniteLoad}
            loadingSpinnerDelegate={LoadingComponent}
            isInfiniteLoading={this.props.resultsFetching}
          >
            <Table
              headerColumns={columns}
              entities={this.props.entities}
            />
          </Infinite>
        </div>
      </div>
    )
  }

  render() {
    return (
      <FixedTable
        entities={this.props.entities}
      />
    )
  }
}
export default ResultComponent
