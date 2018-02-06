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
import NoContentComponent from './content/NoContentComponent'

import ConfirmDialogComponent, { ConfirmDialogComponentTypes } from './dialogs/ConfirmDialogComponent'
import PositionedDialog from './dialogs/PositionedDialog'
import FitContentDialog from './dialogs/FitContentDialog'
import LoadableContentDialogContainer from './dialogs/LoadableContentDialogContainer'
import SingleContentURLDialogContainer from './dialogs/SingleContentURLDialogContainer'
import withConfirmDialog from './dialogs/withConfirmDialog'

import ErrorCardComponent from './error/ErrorCardComponent'
import PageNotFoundComponent from './error/PageNotFoundProvider'
import FormErrorMessage from './error/FormErrorMessage'

import FeedbackDisplayer from './feedback/FeedbackDisplayer'

import HelpMessageComponent from './help/HelpMessageComponent'

import Breadcrumb from './links/Breadcrumb'
import PictureLinkComponent from './links/PictureLinkComponent'
import LinkComponent from './links/LinkComponent'
import AnchorComponent from './links/AnchorComponent'

import AutoCompleteTextField from './list/AutoCompleteTextField'
import ChipList from './list/ChipList'
import ListContainer from './list/ListContainer'
import PageableListContainer from './list/PageableListContainer'
import SelectableList from './list/SelectableList'

import LoadingPaneComponent from './loading/LoadingPaneComponent'

import DynamicModule from './module/DynamicModule'
import HorizontalAreasSeparator from './module/HorizontalAreasSeparator'
import ModuleIcon from './module/ModuleIcon'
import ModuleTitle from './module/ModuleTitle'

import SVGURLIcon from './picture/SVGURLIcon'
import PluginConfigurationPickerComponent from './plugin/PluginConfigurationPickerComponent'

import ActionsMenuCell from './table/content/cells/ActionsMenuCell'
import CheckBoxCell from './table/content/cells/CheckBoxCell'
import InfiniteTableContainer from './table/InfiniteTableContainer'
import getTableReducer from './table/model/TableReducer'
import getTableSelectors from './table/model/TableSelectors'
import PageableInfiniteTableContainer from './table/PageableInfiniteTableContainer'
import RefreshPageableTableOption from './table/options/RefreshPageableTableOption'
import TableActions from './table/model/TableActions'
import TableColumnBuilder from './table/content/columns/TableColumnBuilder'
import TableColumnConfiguration from './table/content/columns/model/TableColumnConfiguration'
import TableColumnConfigurationController from './table/content/columns/model/ColumnConfigurationController'
import TableColumnsVisibilityOption from './table/options/TableColumnsVisibilityOption'
import TableHeaderAutoCompleteFilter from './table/header/TableHeaderAutoCompleteFilter'
import TableHeaderContentBox from './table/header/TableHeaderContentBox'
import TableHeaderLine from './table/header/TableHeaderLine'
import TableHeaderLineLoadingAndResults from './table/header/TableHeaderLineLoadingAndResults'
import TableHeaderLoadingComponent from './table/header/TableHeaderLoadingComponent'
import TableHeaderOptionsArea from './table/header/TableHeaderOptionsArea'
import TableHeaderOptionGroup from './table/header/TableHeaderOptionGroup'
import TableHeaderOptionsSeparator from './table/header/TableHeaderOptionsSeparator'
import TableHeaderText from './table/header/TableHeaderText'
import TableLayout from './table/TableLayout'
import TableDeleteOption from './table/content/cells/options/TableDeleteOption'
import TableSimpleActionOption from './table/content/cells/options/TableSimpleActionOption'
import TableSelectAllOption from './table/options/TableSelectAllOption'
import TableSelectionModes from './table/model/TableSelectionModes'
import { TableSortOrders } from './table/model/TableSortOrders'
import TableStyles from './table/styles/styles'

import Title from './titles/Title'

import TreeTableComponent from './tree-table/TreeTableComponent'
import TreeTableRow from './tree-table/TreeTableRow'

import BooleanValueRender from './values/BooleanValueRender'
import DateArrayValueRender from './values/DateArrayValueRender'
import DateRangeValueRender from './values/DateRangeValueRender'
import DateValueRender from './values/DateValueRender'
import NumberValueRender from './values/NumberValueRender'
import RangeValueRender from './values/RangeValueRender'
import StorageCapacityRender from './values/StorageCapacityRender'
import StringArrayValueRender from './values/StringArrayValueRender'
import StringValueRender from './values/StringValueRender'
import URLValueRender from './values/URLValueRender'
import withValueRenderContext from './values/withValueRenderContext'

import InfiniteGalleryContainer from './gallery/InfiniteGalleryContainer'


export {
  ActionButtonComponent,
  ActionIconWithNotifications,
  ApplicationErrorComponent,
  AutoCompleteTextField,
  BaseBoardComponent,
  BaseBoardItemComponent,
  BoardComponent,
  BoardItemComponent,
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
  FeedbackDisplayer,
  FormErrorMessage,
  FileContentDisplayer,
  HorizontalAreasSeparator,
  IFrameURLContentDisplayer,
  ListContainer,
  LoadingPaneComponent,
  LoadableContentDialogContainer,
  ModuleIcon,
  ModuleTitle,
  PageNotFoundComponent,
  PositionedDialog,
  FitContentDialog,
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
  LinkComponent,
  AnchorComponent,
  HelpMessageComponent,
  NoContentComponent,
  SelectableList,
  SVGURLIcon,

  // Table
  ActionsMenuCell,
  CheckBoxCell,
  InfiniteTableContainer,
  getTableReducer,
  getTableSelectors,
  RefreshPageableTableOption,
  PageableInfiniteTableContainer,
  TableActions,
  TableColumnBuilder,
  TableColumnConfiguration,
  TableColumnConfigurationController,
  TableColumnsVisibilityOption,
  TableHeaderAutoCompleteFilter,
  TableHeaderContentBox,
  TableHeaderLine,
  TableHeaderLineLoadingAndResults,
  TableHeaderLoadingComponent,
  TableHeaderOptionsArea,
  TableHeaderOptionGroup,
  TableHeaderOptionsSeparator,
  TableHeaderText,
  TableLayout,
  TableDeleteOption,
  TableSimpleActionOption,
  TableSelectAllOption,
  TableSelectionModes,
  TableSortOrders,
  TableStyles,

  Title,

  TreeTableComponent,
  TreeTableRow,

  withConfirmDialog,

  // values render
  BooleanValueRender,
  DateArrayValueRender,
  DateRangeValueRender,
  DateValueRender,
  NumberValueRender,
  RangeValueRender,
  StorageCapacityRender,
  StringArrayValueRender,
  StringValueRender,
  URLValueRender,
  withValueRenderContext, // use it in values render parent to connect with their context (stacking)

  InfiniteGalleryContainer,
}
