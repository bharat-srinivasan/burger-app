import React from "react";
import styles from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle click={props.toggle}>MENU</DrawerToggle>
      <div className={[styles.Logo, styles.DesktopOnly].join(" ")}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
