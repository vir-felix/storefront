import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiSelect from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  popOver: {
    border: theme.palette.borders.default,
    boxShadow: "none"
  },
  menuItem: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  selectMenu: {
    border: theme.palette.borders.default,
    paddingLeft: theme.spacing.unit,
    borderRadius: theme.borderRadii.default
  },
  selected: {
    backgroundColor: theme.palette.action.hover
  }
});

@withStyles(styles)
class Select extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    inputProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.number
  }

  renderOptions() {
    const { classes, options } = this.props;

    return (
      options.map((option) => (
        <MenuItem
          classes={{
            selected: classes.selected
          }}
          className={classes.menuItem}
          key={option.value}
          value={option.value}
        >
          {option.name}
        </MenuItem>
      ))
    );
  }

  handleChange = (event) => {
    this.props.onChange(event);
  }

  render() {
    const { classes, inputProps, value } = this.props;

    return (
      <MuiSelect
        classes={{
          selectMenu: classes.selectMenu
        }}
        input={<Input disableUnderline />}
        inputProps={{
          ...inputProps
        }}
        MenuProps={{
          PopoverClasses: {
            paper: classes.popOver
          }
        }}
        onChange={this.handleChange}
        value={value}
      >
        {this.renderOptions()}
      </MuiSelect>
    );
  }
}

export default Select;
