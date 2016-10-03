import { storiesOf } from "@kadira/storybook";
import { NewsItemComponent } from "@regardsoss/components"
import { StoreDecorator, getThemeByName, themeList, defaultTheme } from "../../utils/decorators";
import { withKnobs, select, object } from "@kadira/storybook-addon-knobs";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

storiesOf('Generic components - News', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('', () => {
    const theme = getThemeByName(select("Theme", themeList, defaultTheme))
    // Example: https://cnes.fr/fr/feed
    const news = object("News list", {
      pubDate: "Thu, 22 Sep 2016 13:59:00 GMT",
      title: "Vidéo du vendredi : Le mystère des rayons cosmiques",
      description: "Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.",
      link: "http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016"
    })
    return (
      <MuiThemeProvider muiTheme={theme}>
        <NewsItemComponent
          news={news}
        />
      </MuiThemeProvider>
    )
  })
