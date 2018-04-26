import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function getTwitterMeta(props) {
  const title = props.title;
  const preferredUrl = props.url;
  const url = encodeURIComponent(preferredUrl);
  const { username, description } = props.settings;

  const meta = [
    { property: "twitter:card", content: "summary" },
    { property: "twitter:creator", content: username },
    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description }
  ];

  if (props.media) {
    let media;

    if (!/^http(s?):\/\/+/.test(props.media)) {
      media = location.origin + props.media;
    }

    meta.push({
      property: "twitter:image",
      content: media
    });
  }

  return meta;
}

class TwitterSocial extends Component {
  render() {
    return (
      <Helmet
        meta={getTwitterMeta(this.props)}
      />
    );
  }
}

TwitterSocial.propTypes = {
  settings: PropTypes.object
};

export default TwitterSocial;
