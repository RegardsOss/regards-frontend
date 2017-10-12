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

import { ShowableAtRender } from '@regardsoss/display-control'

import ApplicationErrorComponent from './ApplicationErrorComponent'
import CenteredDiv from './CenteredDiv'
import ErrorDecoratorComponent from './ErrorDecoratorComponent'
import NewsItemComponent from './NewsItemComponent'

import ActionIconWithNotifications from './board/ActionIconWithNotifications'
import BoardComponent from './board/BoardComponent'
import BaseBoardComponent from './board/BaseBoardComponent'
import BoardItemComponent from './board/BoardItemComponent'
import BaseBoardItemComponent from './board/BaseBoardItemComponent'

import buttonsMessages from './buttons/i18n'
import ClearFieldButton from './buttons/ClearFieldButton'
import DownloadButton from './buttons/DownloadButton'
import DropDownButton from './buttons/DropDownButton'
import OnHoverSwitchFlatButton from './buttons/OnHoverSwitchFlatButton'
import OnHoverSwitchIconButton from './buttons/OnHoverSwitchIconButton'
import OnHoverSwitchRaisedButton from './buttons/OnHoverSwitchRaisedButton'

import ActionButtonComponent from './cards/ActionButtonComponent'
import CardActionsComponent from './cards/CardActionsComponent'
import CardActionsView from './cards/CardActionsView'
import MainActionButtonComponent from './cards/MainActionButtonComponent'
import NoContentMessageInfo from './cards/NoContentMessageInfo'
import SecondaryActionButtonComponent from './cards/SecondaryActionButtonComponent'

import FileContentDisplayer from './content/FileContentDisplayer'
import CodeFileDisplayer from './content/CodeFileDisplayer'
import IFrameURLContentDisplayer from './content/IFrameURLContentDisplayer'
import MarkdownFileContentDisplayer from './content/MarkdownFileContentDisplayer'

import ConfirmDialogComponent, { ConfirmDialogComponentTypes } from './dialogs/ConfirmDialogComponent'
import PositionedDialog from './dialogs/PositionedDialog'
import LoadableContentDialogContainer from './dialogs/LoadableContentDialogContainer'
import SingleContentURLDialogContainer from './dialogs/SingleContentURLDialogContainer'
import withConfirmDialog from './dialogs/withConfirmDialog'

import ErrorCardComponent from './error/ErrorCardComponent'
import PageNotFoundComponent from './error/PageNotFoundProvider'
import FormErrorMessage from './error/FormErrorMessage'

import Breadcrumb from './links/Breadcrumb'
import PictureLinkComponent from './links/PictureLinkComponent'

import PageableListContainer from './list/PageableListContainer'
import ListContainer from './list/ListContainer'
import ChipList from './list/ChipList'

import LoadingPaneComponent from './loading/LoadingPaneComponent'

import DynamicModule from './module/DynamicModule'
import HorizontalAreasSeparator from './module/HorizontalAreasSeparator'
import ModuleTitle from './module/ModuleTitle'

import PluginConfigurationPickerComponent from './plugin/PluginConfigurationPickerComponent'

import TableContainer from './table/TableContainer'
import TablePaneHeader from './table/header/TablePaneHeader'
import TableOptionsSeparator from './table/header/TableOptionsSeparator'
import ResultsCountComponent from './table/header/ResultsCountComponent'
import TableSelectionModes from './table/model/TableSelectionModes'
import TableActions from './table/model/TableActions'
import getTableReducer from './table/model/TableReducer'
import getTableSelectors from './table/model/TableSelectors'
import { TableSortOrders } from './table/model/TableSortOrders'
import TableStyles from './table/styles/styles'
import ActionsMenuCell from './table/content/cells/ActionsMenuCell'

import SVGIconFromString from './icon/SVGIconFromString'

import LinkComponent from './links/LinkComponent'
import TableColumnConfiguration from './table/content/columns/model/ColumnConfiguration'
import TableColumnConfigurationController from './table/content/columns/model/ColumnConfigurationController'

import HelpMessageComponent from './help/HelpMessageComponent'

import Title from './titles/Title'
import NoContentComponent from './content/NoContentComponent'

export {
  ActionButtonComponent,
  ActionIconWithNotifications,
  ActionsMenuCell,
  ApplicationErrorComponent,
  BaseBoardItemComponent,
  BaseBoardComponent,
  BoardComponent,
  BoardItemComponent,
  BaseBoardItemComponent,
  buttonsMessages, // XXX remove me in V2
  CardActionsComponent,
  CardActionsView,
  CenteredDiv,
  ChipList,
  ClearFieldButton,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  DownloadButton,
  DropDownButton,
  DynamicModule,
  ErrorCardComponent,
  ErrorDecoratorComponent,
  FormErrorMessage,
  PageNotFoundComponent,
  FileContentDisplayer,
  getTableReducer,
  getTableSelectors,
  HorizontalAreasSeparator,
  IFrameURLContentDisplayer,
  ModuleTitle,
  PageNotFoundComponent,
  TableContainer,
  TablePaneHeader,
  TableSelectionModes,
  TableActions,
  Title,
  TableSortOrders,
  TableColumnConfiguration,
  TableColumnConfigurationController,
  TableOptionsSeparator,
  TableStyles,
  ListContainer,
  LoadingPaneComponent,
  LoadableContentDialogContainer,
  PositionedDialog,
  SingleContentURLDialogContainer,
  MainActionButtonComponent,
  MarkdownFileContentDisplayer,
  CodeFileDisplayer,
  NewsItemComponent,
  NoContentMessageInfo,
  OnHoverSwitchFlatButton,
  OnHoverSwitchIconButton,
  OnHoverSwitchRaisedButton,
  PageableListContainer,
  Breadcrumb,
  PictureLinkComponent,
  SecondaryActionButtonComponent,
  ShowableAtRender,
  PluginConfigurationPickerComponent,
  SVGIconFromString,
  LinkComponent,
  HelpMessageComponent,
  NoContentComponent,
  withConfirmDialog,
  ResultsCountComponent,
}
