
import React from "react";
import { HashRouter } from "react-router-dom";
import {inject, observer } from "mobx-react";
import Routes from "./routes/routes";

@inject("userStore", "commonStore")
// @withRouter
@observer
export default class App extends React.Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
        <HashRouter>
          <Routes />
        </HashRouter>
        </div>
      );
    }
    return <HashRouter/>;
  }
}
