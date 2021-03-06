import React from "react";
import classes from "./Layout.css";
import Aux from "../Aux/Aux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  sideDrawerClosed = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggle={this.toggleSideDrawer} />
        <SideDrawer
          closed={this.sideDrawerClosed}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
