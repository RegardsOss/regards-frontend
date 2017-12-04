/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import Folder from 'material-ui/svg-icons/file/folder'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { Field, RenderTextField } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { SelectableList } from '@regardsoss/components'


/**
* Display a form to configure metaFiles of a GenerationChain for dataprovider microservice
* @author Sébastien Binda
*/
class MetaFilesFormComponent extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayedMetaFileIdx: 0,
  }

  displayMetafile = (event, index) => {
    this.setState({
      displayedMetaFileIdx: index,
    })
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        metafiles: {
          layoutStyle, leftColumnStyle, rightColumnStyle, typeListStyle, titleStyle, contentStyle, titleLabelStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} >
              <Toolbar>
                <ToolbarGroup firstChild>
                  <ToolbarTitle text="Configuration des types de fichiers" style={titleLabelStyle} />
                </ToolbarGroup>
              </Toolbar>
            </div>
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={typeListStyle}
                  defaultValue={0}
                  onSelect={this.displayMetafile}
                >
                  {map(this.props.fields, (member, idx) =>
                    <ListItem key={`metafile-${idx}`} value={idx} primaryText={`Type ${idx}`} leftIcon={<Folder />} />)}
                </SelectableList>
                <RaisedButton
                  label="Ajouter"
                  fullWidth
                  primary
                />
              </div>
              <div style={rightColumnStyle}>
                <Field
                  name={`metaProduct.metaFiles[${this.state.displayedMetaFileIdx}].fileNamePattern`}
                  fullWidth
                  component={RenderTextField}
                  type="text"
                  label={formatMessage({ id: 'generation-chain.form.create.metaFile.fileNamePattern' })}
                />
              </div>
            </div>
          </div>
        </CardMedia>
      </Card>
    )
  }
}
export default MetaFilesFormComponent
