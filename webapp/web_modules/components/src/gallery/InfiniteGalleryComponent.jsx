/**
 * Masonry Component for React
 * @author Cole Turner <turner.cole@gmail.com | www.cole.codes>
 * @link https://github.com/colepatrickturner/react-components
 * If you use this, please retain the author name.
 * Please PR any new features you add so that others can enjoy
 * the blood sweat and tears of open source.
 *
 * Features:
 *  - Masonry Layout
 *    A) Items must have fixed column width
 *    B) Items can span multiple columns
 *    C) Layout will be precalculated but only if the number of items has changed
 *        - This engine was designed for a static order placement
 *          and was not designed for reordering
 *    D) New items will layout if the previous layout parameters still apply
 *  - Infinite Scroll
 *
 */
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import { ScrollArea } from '@regardsoss/adapters'
import { ShowableAtRender, LoadableContentDisplayDecorator } from '@regardsoss/display-control'

const noPage = { stop: 0 }
const sortAscending = (a, b) => a - b
const sortTopByAscending = (a, b) => a.top - b.top
const classNamePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.array,
]).isRequired

/**
 * Modified from @link https://github.com/colepatrickturner/react-components:
 * - The component expects a width and a height to fit (instead of using window viewport)
 * - threshold is a ratio (]0-1[) expressed on full component scrollable height: when user scroll to scrollable height ratio,
 * the component starts fetching.
 * @author Leo Mieulet
 */
export default class InfiniteGalleryComponent extends React.PureComponent {
  static propTypes = {
    alignCenter: PropTypes.bool,
    columnGutter: PropTypes.number.isRequired,
    columnWidth: PropTypes.number.isRequired,
    containerClassName: classNamePropType,
    layoutClassName: classNamePropType,
    pageClassName: classNamePropType,
    isEmpty: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemProps: PropTypes.object,
    emptyComponent: PropTypes.element,
    loadingComponent: PropTypes.element,
    onInfiniteLoad: PropTypes.func.isRequired,
    // current content height ratio: when over, the component triggers next page download (ranges in ]0; 1[])
    threshold: PropTypes.number,

    // component current dimensions
    componentSize: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }), // not required as it exists in HOC

    itemOfInterestPicked: PropTypes.number,
    isItemOfInterest: PropTypes.func,
  }

  static defaultProps = {
    alignCenter: true,
    containerClassName: 'masonry collection-group',
    layoutClassName: 'masonry-view',
    pageClassName: 'masonry-page',
    threshold: 0.75,
  }

  /**
   * A scrollbar width can be between 12 and 17 px
   * We removed that value if there is no scrollbar (few ms after we will get a scrollbar anyway)
   */
  static LARGE_SCROLLBAR_WIDTH = 17

  /**
   * Is page visible?
   * @param {*} start page start (pixels)
   * @param {*} stop page stop (pixels)
   * @param {*} top current scrollBottom
   * @param {*} viewableHeight current view height
   * @param {boolean} true if page is visible
   */
  static isPageVisible(start, stop, top, viewableHeight) {
    const extraThreshold = viewableHeight
    // trigger area = viewable area with buffer areas
    if (
      (start >= top - extraThreshold && stop <= top + viewableHeight + extraThreshold) // If page starts and stops within the trigger area
      || (start <= top + extraThreshold && stop >= top - extraThreshold) // If page starts before and runs within trigger area
      || (start >= top - extraThreshold && start <= top + viewableHeight + extraThreshold) // If page starts within the trigger area
      || (stop > top - extraThreshold && stop <= top + viewableHeight + extraThreshold) // If the page stops within the trigger area
    ) {
      return true
    }

    return false
  }

  /** Scroll area reference  */
  scrollArea = React.createRef()

  /**
   * Stores content node reference
   */
  node = React.createRef()

  state = { averageHeight: 400, pages: [] }

  /** Component will mount: used here to initialize inner layout variables */
  UNSAFE_componentWillMount() {
    this.scrollBottom = 0
  }

  /**
   * Lifecycle method component did mount. Used here to layout the component initially
   */
  componentDidMount() {
    this.layout(this.props)
    this.onScroll()
  }

  /**
   * Lifecycle method component will receive props. Used here to layout the component when its size changes
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)
      || !isEqual(nextProps.componentSize, this.props.componentSize)) {
      this.layout(nextProps)
    }
    if (!isEqual(nextProps.itemOfInterestPicked, this.props.itemOfInterestPicked)) {
      const itemFound = reduce(this.state.pages, (res, page) => (
        res || find(page.items, this.props.isItemOfInterest)
      ), undefined)

      if (itemFound && this.scrollArea.current) {
        this.scrollArea.current.scrollYTo(itemFound.top)
      }
    }
  }

  /** On user scroll detected (or initialization)
   * @param scrollEvent scroll event
   */
  onScroll = (scrollEvent) => {
    if (!this.node.current || !scrollEvent || isNil(scrollEvent.topPosition)) {
      return
    }
    this.scrollBottom = scrollEvent.topPosition + get(scrollEvent, 'containerHeight', 0)
    this.onScrollUpdate()
  }

  /**
   * On scroll update: performs bounds visibility check and starts loading data if required
   */
  onScrollUpdate = () => {
    if (!this.node.current) {
      return
    }
    const bounds = this.node.current.getBoundingClientRect()
    this.checkVisibility()
    this.checkInfiniteLoad(bounds)
  }

  /**
   * @param {*} column  column index
   * @param {*} viewableStart viewable start X
   * @return left position for column
   */
  getLeftPositionForColumn(column, viewableStart) {
    return viewableStart + (column * (this.props.columnWidth + this.props.columnGutter))
  }

  findPositionForItem = (previousItems, columnSpan, maxColumns, columnHeights, itemHeight, viewableStart) => {
    // If it spans one column, return the shortest column
    if (columnSpan === 1) {
      const smallestHeight = columnHeights.slice(0).sort(sortAscending)[0]
      const column = columnHeights.indexOf(smallestHeight)
      const left = Math.round(this.getLeftPositionForColumn(column, viewableStart))
      const top = Math.round(columnHeights[column])

      return {
        column,
        left,
        top,
      }
    }

    // Find columns to span that will create the shortest gap
    const columnGaps = columnHeights
      .slice(0, maxColumns - columnSpan + 1) // only measure columns it can span
      .map((thisColumnHeight, column) => {
        if (thisColumnHeight < columnHeights[column + 1]) {
          // If this item clips the next column, overextend
          return columnHeights[column + 1]
        }
        // Determine how much of a gap will be created if we start in this column
        const columnsToMeasure = columnHeights
          .slice(column, column + columnSpan)
        return Math.max(...columnsToMeasure) - Math.min(...columnsToMeasure)
      })

    const column = columnGaps.indexOf(columnGaps.slice(0).sort(sortAscending)[0])
    const maxSpannedHeight = Math.max(...columnHeights.slice(column, column + columnSpan))
    const top = Math.round(maxSpannedHeight)
    const left = Math.round(this.getLeftPositionForColumn(column, viewableStart))

    return {
      column,
      left,
      top,
    }
  }

  findPositionInGaps = (gapColumns, maxColumns, columnSpan, height, viewableStart) => {
    if (columnSpan === 1) {
      // Easy, find the first gap

      for (let column = 0; column < gapColumns.length; column += 1) {
        const testColumn = gapColumns[column]
        const gap = testColumn.find((g) => g[1] >= height)

        if (gap) {
          const left = Math.round(this.getLeftPositionForColumn(column, viewableStart))
          return {
            left,
            top: gap[0],
            column,
          }
        }
      }
    }

    if (!gapColumns.some((column) => column.length > 0)) {
      return null
    }

    // Much more difficult
    // only measure columns it can span
    const fillableColumnGaps = gapColumns
      .slice(0, maxColumns - columnSpan + 1)
      .map((workingColumns, thisColumnGaps, columnIndex) => {
        // eslint-disable-next-line no-param-reassign
        workingColumns[columnIndex] = thisColumnGaps.filter((g) => g[1] >= height)
        return workingColumns
      }, new Array(gapColumns.length).fill([]))

    // Sorry this is going to get verbose
    const spannableColumnGaps = fillableColumnGaps.reduce((acc, thisColumn, index) => {
      // Filter out columns
      acc[index] = thisColumn.filter((thisColumnGap) => {
        const [thisColumnGapTop, thisColumnGapHeight] = thisColumnGap

        // Where the item can't span next columns
        const nextColumns = fillableColumnGaps.slice(index + 1)
        return nextColumns.every((nextSpannableColumn) => nextSpannableColumn.find((nextSpannableColumnGap) => {
          const [nextSpannableColumnGapTop, nextSpannableColumnGapHeight] = nextSpannableColumnGap

          // only if it can slide right in there ;)
          return (
            nextSpannableColumnGapTop <= thisColumnGapTop
            && nextSpannableColumnGapTop + nextSpannableColumnGapHeight >= thisColumnGapTop + thisColumnGapHeight
          )
        }))
      })

      return acc
    }, new Array(fillableColumnGaps.length).fill([]))

    // Now interate through the message
    for (let column = 0; column < spannableColumnGaps.length; column += 1) {
      if (spannableColumnGaps[column].length) {
        const gap = spannableColumnGaps[column][0]
        const left = Math.round(this.getLeftPositionForColumn(column, viewableStart))
        return {
          left,
          top: gap[0],
          column,
        }
      }
    }

    // I have failed you
    return null
  }

  /**
   * Layout item pages
   * @param {*} props properties to consider
   * @param {boolean} rearrange should force re-layouting
   */
  layout(props, rearrange = false) {
    if (!this.node.current) {
      return
    }
    const {
      columnWidth,
      columnGutter,
      items,
      itemComponent,
      componentSize,
    } = props

    const heightSelector = itemComponent.getHeightFromProps
    const columnSpanSelector = itemComponent.getColumnSpanFromProps

    // Decide a starter position for centering
    // Use the node width if there is a scrollbar, otherwise subtract LARGE_SCROLLBAR_WIDTH
    const viewableWidth = componentSize.width
    const viewableHeight = componentSize.height

    // Use maxColumns=1 on falsy values
    // To avoid rendering all entities
    const maxColumns = Math.floor(viewableWidth / (columnWidth + columnGutter)) || 1
    const spannableWidth = (maxColumns * columnWidth) + (columnGutter * (maxColumns - 1))
    const viewableStart = props.alignCenter ? (viewableWidth - spannableWidth) / 2 : 0

    // Setup bounds and limiters for deciding how to stage items in a page
    const itemsPerPage = maxColumns * Math.ceil(viewableHeight / this.state.averageHeight)

    // Here we decide if we layout the entire grid or just new items
    const shouldRearrange = (
      rearrange
      || !this.state.lastWorkingPage
      || this.state.lastWorkingIndex === null
      || maxColumns !== this.state.maxColumns
    )

    // Setup our boundaries for layout
    const columnHeights = shouldRearrange ? new Array(maxColumns).fill(0) : this.state.columnHeights
    const columnGaps = shouldRearrange ? new Array(maxColumns).fill([]) : this.state.columnGaps

    const initialWorkingPages = shouldRearrange ? [] : this.state.pages
    const itemsToLayout = shouldRearrange ? items : items.slice(this.state.lastWorkingIndex + 1)

    let column = 0
    let lastWorkingIndex = null

    const stagedItems = []
    const pages = itemsToLayout.reduce((workingPages, pageItem) => {
      // Decide which page we are on
      let workingPage = null

      if (workingPages.length) {
        workingPage = workingPages[workingPages.length - 1]
      }

      if (!workingPage || workingPage.items.length >= itemsPerPage) {
        workingPage = { index: workingPages.length, items: [] }
        workingPages.push(workingPage)
      }

      // Ok now we have an item, let's decide how many columns it spans
      const columnSpan = Math.min(maxColumns, columnSpanSelector(pageItem))

      // Check if the column will exceed maxColumns
      if (column + columnSpan > maxColumns) {
        column = 0
      }

      // Determine the height of this item to stage
      const height = heightSelector(pageItem, columnSpan, columnGutter, columnWidth, this.props.itemProps)

      if (isNaN(height)) {
        console.warn(`Skipping feed item with props ${JSON.stringify(pageItem)} because "${height}" is not a number.`)
        return workingPages
      }

      const item = {
        props: pageItem,
        column,
        columnSpan,
        height,
        width: (columnSpan * columnWidth) + ((columnSpan - 1) * columnGutter),
      }

      // Here is where the magic happens
      // First we take a slice of the items above
      const previousSlicedItems = stagedItems.slice(-1 * itemsPerPage)

      // Let's fill any gaps if possible.
      const positionWithinGap = this.findPositionInGaps(
        Object.values(columnGaps),
        maxColumns,
        columnSpan,
        height,
        viewableStart,
      )

      if (positionWithinGap) {
        Object.assign(item, positionWithinGap)
      } else {
        // And then for good measure, transverse up a little more to catch any items staged below
        stagedItems.slice(stagedItems.length - 1 - itemsPerPage, -1 * itemsPerPage).forEach((previousItem) => {
          if (previousSlicedItems.some((previousSlicedItem) => previousSlicedItem.top < previousItem.top)) {
            previousSlicedItems.push(previousItem)
          }
        })
        previousSlicedItems.sort(sortTopByAscending)

        // Then find the smallest column
        const position = this.findPositionForItem(previousSlicedItems, columnSpan, maxColumns, columnHeights, height, viewableStart)
        Object.assign(item, position)
      }

      const minPreviousSlicedItemTop = Math.min(...previousSlicedItems.map((i) => i.top))

      columnHeights
        .slice(item.column, item.column + columnSpan)
        .forEach((thisColumn, index) => {
          // Remove any gaps we're overlaying
          columnGaps[item.column + index] = columnGaps[item.column + index].filter((gap) => {
            const [gapTop, gapHeight] = gap
            if (
              // If we filled the gap
              (item.top <= gapTop && item.top + item.height >= gapTop)
              || (item.top >= gapTop && item.top <= gapTop + gapHeight)
              // or if the gap is above our fill zone
              || gapTop < minPreviousSlicedItemTop
            ) {
              return false
            }

            return true
          })

          // Add a gap if we've created one
          if (item.top > thisColumn) {
            columnGaps[item.column + index].push([
              thisColumn,
              item.top - thisColumn - this.props.columnGutter,
            ])
          }

          columnHeights[item.column + index] = Math.max(thisColumn, item.top + item.height + columnGutter)
        })

      column += columnSpan

      workingPage.items.push(item)
      stagedItems.push(item)
      lastWorkingIndex = items.indexOf(pageItem) // not `item`!!

      return workingPages
    }, initialWorkingPages).map((page) => {
      // Calculate when a page starts and stops
      // To determine which pages are visible
      const itemsTop = page.items.map((item) => item.top)
      const start = (!itemsTop.length ? 0 : Math.min(...itemsTop))
      const stop = (Math.max(0, ...page.items.map((item) => item.top + item.height)))
      return {
        ...page,
        start,
        stop,
        visible: InfiniteGalleryComponent.isPageVisible(start, stop, this.scrollBottom, viewableHeight),
      }
    })

    // Facilitate the average height for next layout's itemsPerPage
    const computedAverageHeight = stagedItems.map((item) => item.height).reduce((prev, val) => prev + val, 0) / stagedItems.length
    // Use previous averageHeight, as the stagedItems can be empty
    const averageHeight = Math.round(computedAverageHeight || this.state.averageHeight)

    // Precompute the layout style

    const layoutHeight = (pages[pages.length - 1] || noPage).stop
    const layoutStyle = { height: `${layoutHeight}px`, position: 'relative' }

    const scrollbarStyle = {
      height: componentSize.height,
      width: '100%',
    }
    this.setState({
      pages,
      lastWorkingIndex,
      averageHeight,
      columnHeights,
      columnGaps,
      maxColumns,
      layoutStyle,
      scrollbarStyle,
    })
  }

  /**
   * Checks The visible pages list
   * @param {*} bounds component bounds
   */
  checkVisibility() {
    let isChanged = false
    const pages = this.state.pages.map((page) => {
      const visible = InfiniteGalleryComponent.isPageVisible(
        page.start, page.stop, this.scrollBottom, this.props.componentSize.height)

      isChanged = isChanged || page.visible !== visible

      return {
        ...page,
        visible,
      }
    })

    if (isChanged) {
      this.setState({ pages })
    }
  }

  /**
   * Checks if the infinite loading should be started
   * @param {*} bounds component bounds
   */
  checkInfiniteLoad(bounds) {
    const { items, threshold, onInfiniteLoad } = this.props
    if (!items || !items.length) {
      // Initialization case, just ignore bounds check
      return
    }
    const contentHeight = this.node.current.getBoundingClientRect().height
    // Update when content height > 0 (initialization of graphics constraints not respected)
    if (!!contentHeight && this.scrollBottom >= contentHeight * threshold) {
      onInfiniteLoad()
    }
  }

  renderPage = (page, index) => {
    const {
      pageClassName,
      itemComponent: Item,
      columnGutter,
      columnWidth,
    } = this.props
    if (!page.visible) {
      return null
    }
    return (
      <div
        className={pageClassName}
        key={`page-${index}`}
      >
        {page.items.map(({
          props, left, top, width, columnSpan,
        }, itemIndex) => (<Item
          // eslint-disable-next-line react/no-array-index-key
          key={`page-${index}-item-${itemIndex}`}
          columnSpan={columnSpan}
          left={left}
          top={top}
          width={width}
          entity={props}
          columnGutter={columnGutter}
          gridWidth={columnWidth}
          {...this.props.itemProps}
        />
        ))}
      </div>
    )
  }

  render() {
    const {
      containerClassName,
      layoutClassName,
      loadingComponent,
      emptyComponent,
      isLoading,
      isEmpty,
    } = this.props

    const {
      pages,
      layoutStyle,
      scrollbarStyle,
    } = this.state

    return (
      <LoadableContentDisplayDecorator
        isEmpty={isEmpty && !isLoading}
        emptyComponent={emptyComponent}
      >
        <ScrollArea
          ref={this.scrollArea}
          onScroll={this.onScroll}
          style={scrollbarStyle}
          vertical
        >
          <div
            ref={this.node}
            className={containerClassName}
          >
            <div
              className={layoutClassName}
              style={layoutStyle}
            >
              {pages.map(this.renderPage)}
            </div>
            <ShowableAtRender show={isLoading && !!loadingComponent}>
              {loadingComponent}
            </ShowableAtRender>
          </div>
        </ScrollArea>
      </LoadableContentDisplayDecorator>
    )
  }
}
