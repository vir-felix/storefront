import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import MenuList from "material-ui/Menu/MenuList";
import { NavigationItemMobile } from "components/NavigationMobile";
import withNavigationTags from "../../containers/tags/withNavigationTags";

const styles = () => ({
  nav: {
    width: 320
  }
});

@withStyles(styles)
@withNavigationTags
@inject("uiStore")
@observer
class NavigationMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object,
    uiStore: PropTypes.object.isRequired
  };

  static defaultProps = {
    classes: {},
    navItems: []
  };

  renderNavItem(navItem, index) {
    return <NavigationItemMobile key={index} navItem={navItem.node} />;
  }

  handleClose = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    const { classes, navItems, uiStore } = this.props;

    return (
      <Drawer open={uiStore.isMenuDrawerOpen} onClose={this.handleClose}>
        <nav className={classes.nav}>
          <MenuList>{navItems.edges && navItems.edges.map(this.renderNavItem)}</MenuList>
        </nav>
      </Drawer>
    );
  }
}

export default NavigationMobile;
