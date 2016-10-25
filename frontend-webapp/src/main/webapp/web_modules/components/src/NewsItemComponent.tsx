import * as React from "react"
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card"
import { CardActionsComponent } from "@regardsoss/components"
import * as moment from "moment"

interface NewsProps {
  news: any
}

/**
 * Show the list of users for the current project
 */
class NewsItemComponent extends React.Component<NewsProps, any> {


  render (): JSX.Element {
    const styleText = {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxHeight: "5.2em",
      lineHeight: "1.3em",
      textAlign: "justify"
    }
    const styleTitle = {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",

    }
    const {news} = this.props
    const pubDate = moment(news.pubDate).fromNow()
    return (
      <Card>
        <CardTitle
          title={ news.title }
          titleStyle={styleTitle}
          subtitle={pubDate}
        />
        <CardText>
          <div style={styleText}>
            { news.description }
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel="See more"
            mainButtonUrl={news.link}
          />
        </CardActions>
      </Card>
    )
  }
}

export default NewsItemComponent

