import React from 'react'
import ReactTabs from 'react-tabs'
import _ from 'underscore'
import permissionFilter from 'jsx/shared/helpers/permissionFilter'
import CoursesStore from './CoursesStore'
import TermsStore from './TermsStore'
import AccountsTreeStore from './AccountsTreeStore'
import UsersStore from './UsersStore'

  const { Tab, Tabs, TabList, TabPanel } = ReactTabs;
  const { string, bool, shape } = React.PropTypes;

  const stores = [CoursesStore, TermsStore, AccountsTreeStore, UsersStore];

  const AccountCourseUserSearch = React.createClass({
    propTypes: {
      accountId: string.isRequired,
      permissions: shape({
        theme_editor: bool.isRequired,
        analytics: bool.isRequired
      }).isRequired
    },

    componentWillMount() {
      stores.forEach((s) => {
        s.reset({ accountId: this.props.accountId });
      });
    },

    render() {
      const { timezones, permissions, accountId, store } = this.props;

      const tabList = store.getState().tabList;
      const tabs = permissionFilter(tabList.tabs, permissions);

      const headers = tabs.map((tab, index) => {
        return (
          <Tab key={index}>
            <a href={tabList.basePath + tab.path} title={tab.title}>{tab.title}</a>
          </Tab>
        );
      });

      const panels = tabs.map((tab, index) => {
        const Pane = tab.pane;
        return (
          <TabPanel key={index}>
            <Pane {...this.props} />
          </TabPanel>
        );
      });

      return (
        <Tabs selectedIndex={tabList.selected}>
          <TabList>
            {headers}
          </TabList>
          {panels}
        </Tabs>
      );
    }
  });

export default AccountCourseUserSearch
