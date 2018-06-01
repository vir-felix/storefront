/* Anchor gets its content from the `children` prop */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import PropTypes from "prop-types";
import track from "lib/tracking/track";

@track((ownProps) => ({
  component: "Anchor",
  url: ownProps.href
}))
export default class Anchor extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    onClick: () => {}
  }

  @track(() => ({
    action: "Link Clicked"
  }))
  handleClick = (event) => {
    event.preventDefault();
    this.props.onClick(event);
  }

  @track(() => ({
    action: "Link Enter Key Down"
  }))
  handleKeyDown = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      this.props.onClick(event);
    }
  }

  render() {
    return (
      <a
        {...this.props}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role="link"
        tabIndex={0}
      />
    );
  }
}
