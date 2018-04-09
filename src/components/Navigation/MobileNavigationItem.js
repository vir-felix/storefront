import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Divider from "material-ui/Divider";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import Collapse from "material-ui/transitions/Collapse";
import MenuList from "material-ui/Menu/MenuList";
import MenuItem from "material-ui/Menu/MenuItem";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";

import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { withStyles } from "material-ui/styles";

const styles = (theme) => ({
  subNav: {
    marginBottom: theme.spacing.unit * 2
  },
  listItemTextInset: {
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 3
    }
  }
});

@withStyles(styles)
@observer
class MobileNavigationItem extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItem: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItem: {}
  };

  get hasSubNavItems() {
    const { navItem: { relatedTags } } = this.props;
    return Array.isArray(relatedTags) && relatedTags.length > 0;
  }

  @observable _isSubNavOpen = false;

  @computed
  get isSubNavOpen() {
    return this._isSubNavOpen;
  }

  set isSubNavOpen(value) {
    this._isSubNavOpen = value;
  }

  @action
  onClick = () => {
    const { navItem } = this.props;

    if (this.hasSubNavItems) {
      this.isSubNavOpen = !this.isSubNavOpen;
    } else {
      Router.push(`/tag/${navItem.name}`);
    }
  };

  renderSubNav(navItemGroup) {
    const { classes } = this.props;
    return (
      <div className={classes.subNav}>
        <Divider />
        {navItemGroup.relatedTags.map((navItemGroupItem, index) => (
          <MenuItem className={classes.nested} dense inset key={index}>
            <ListItemText classes={{ inset: classes.listItemTextInset }} inset primary={navItemGroupItem.title} />
          </MenuItem>
        ))}
      </div>
    );
  }

  renderCollapse() {
    const { classes, navItem: { relatedTags } } = this.props;
    return (
      <Collapse in={this.isSubNavOpen} timeout="auto" unmountOnExit>
        <MenuList component="div" disablePadding>
          {relatedTags.map((navItemGroup, index) => (
            <MenuList disablePadding key={index}>
              <MenuItem inset className={classes.nested}>
                <ListItemText classes={{ inset: classes.listItemTextInset }} inset primary={navItemGroup.title} />
              </MenuItem>
              {Array.isArray(navItemGroup.relatedTags) && this.renderSubNav(navItemGroup)}
            </MenuList>
          ))}
        </MenuList>
      </Collapse>
    );
  }

  render() {
    const { classes, navItem } = this.props;
    return (
      <Fragment>
        <MenuItem color="inherit" onClick={this.onClick}>
          <ListItemText classes={{ primary: classes.primary }} primary={navItem.name} />
          {this.hasSubNavItems && (
            <ListItemIcon className={classes.icon}>
              {this.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ListItemIcon>
          )}
        </MenuItem>
        {this.hasSubNavItems && this.renderCollapse()}
      </Fragment>
    );
  }
}

export default MobileNavigationItem;
