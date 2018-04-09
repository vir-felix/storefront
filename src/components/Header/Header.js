import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Hidden from "material-ui/Hidden";
import MenuList from "material-ui/Menu/MenuList";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import CartIcon from "mdi-material-ui/Cart";
import MenuIcon from "mdi-material-ui/Menu";
import Popover from "material-ui/Popover";
import { inject, observer } from "mobx-react";
import { action, observable, computed } from "mobx";
import { withStyles } from "material-ui/styles";
import NavigationItem from "../NavigationItem";
import HorizontalNavigationItem from "../NavigationItem/HorizontalNavigationItem";

const styles = () => ({
  cart: {
    width: 320
  },
  menu: {
    flex: 1
  }
});

// TODO: Get tag data from GraphQL, this is just a sample
const tags = [
  { name: "men", title: "Men" },
  { name: "women", title: "Women" },
  {
    name: "kids",
    title: "Kids",
    relatedTags: [
      {
        name: "test1",
        title: "Test 1",
        relatedTags: [
          { name: "men", title: "Men" },
          { name: "women", title: "Women" },
          { name: "men", title: "Men" },
          { name: "women", title: "Women" }
        ]
      },
      {
        name: "test2",
        title: "Test 2",
        relatedTags: [
          { name: "men", title: "Men" },
          { name: "women", title: "Women" },
          { name: "men", title: "Men" },
          { name: "women", title: "Women" }
        ]
      },
      { name: "test3", title: "Test 3" }
    ]
  }
];

@withStyles(styles)
@inject("uiStore")
@observer
class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    uiStore: PropTypes.object
  };

  @observable _popoverAnchor = null;

  @computed
  get popoverAnchor() {
    return this._popoverAnchor;
  }

  @action
  onClick = event => {
    this._popoverAnchor = event.target;
  };

  @action
  onClose = () => {
    this._popoverAnchor = null;
  };

  render() {
    const { classes, uiStore } = this.props;

    return (
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton color="inherit" onClick={uiStore.toggleMenuDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography className={classes.title} color="inherit" variant="title">
            Reaction
          </Typography>

          <nav className={classes.menu}>
            <Hidden smDown>{tags.map((tag, index) => <HorizontalNavigationItem key={index} menuItem={tag} />)}</Hidden>
          </nav>

          <IconButton color="inherit" onClick={uiStore.toggleCartOpen}>
            <CartIcon />
          </IconButton>
        </Toolbar>
        <Drawer open={uiStore.menuDrawerOpen} onClose={uiStore.toggleMenuDrawerOpen}>
          <div className={classes.cart}>
            <MenuList>{tags.map((tag, index) => <NavigationItem key={index} menuItem={tag} />)}</MenuList>
          </div>
        </Drawer>
        <Drawer anchor="right" open={uiStore.cartOpen} onClose={uiStore.toggleCartOpen}>
          <div className={classes.cart}>Cart</div>
        </Drawer>
        <Popover anchorEl={this.popoverAnchor} onClose={this.onClose} open={Boolean(this.popoverAnchor)}>
          <Typography variant="title">Popover!</Typography>
        </Popover>
      </AppBar>
    );
  }
}

export default Header;
