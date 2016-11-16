import ComposedInjector from '@regardsoss/injector'
import { I18nProvider } from '@regardsoss/i18n'
import DatamanagementComponent from '../components/DatamanagementComponent'
/*
interface DatamanagementProps {
  // From Router
  params: any
}*/
/**
 */
const DatamanagementContainer = function ({ params }) {
  (
    <I18nProvider messageDir="modules/admin-data-management/src/i18n">
      <ComposedInjector >
        <DatamanagementComponent theme={null} intl={null} params={params} />
      </ComposedInjector>
    </I18nProvider>
    )
}
DatamanagementContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string),
}

export default DatamanagementContainer
