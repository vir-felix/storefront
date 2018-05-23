import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import { CartToggle } from "components/Cart";
import AccountDropdown from "components/AccountDropdown";
import Link from "components/Link";

const styles = (theme) => ({
  controls: {
    alignItems: "inherit",
    display: "inherit",
    flex: 1
  },
  title: {
    marginRight: theme.spacing.unit
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between"
  }
});

@withStyles(styles)
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    uiStore: {}
  };

  render() {
    const { classes: { controls, toolbar, title } } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar className={toolbar}>
          <Hidden mdUp>
            <NavigationToggleMobile />
          </Hidden>

          <div className={controls}>
            <Typography className={title} color="inherit" variant="title">
              <Link route="/">Reaction</Link>
            </Typography>

            <Hidden smDown initialWidth={"md"}>
              <NavigationDesktop />
            </Hidden>
          </div>

          <AccountDropdown />
          <CartToggle />
        </Toolbar>

        <NavigationMobile />
      </AppBar>
    );
  }
}

export default Header;
