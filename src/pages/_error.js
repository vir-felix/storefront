import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "components/Link";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "4rem"
  },
  errorMessage: {
    color: theme.palette.reaction.black65
  },
  errorLink: {
    color: theme.palette.reaction.coolGrey400
  }
});

@withStyles(styles)
export default class Error extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.object,
    statusCode: PropTypes.object,
    subtitle: PropTypes.string
  }

  static getInitialProps({ res, err }) {
    // eslint-disable-next-line
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  static defaultProps = {
    subtitle: "Error"
  }

  render() {
    const { classes, shop, subtitle } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title> {shop && shop.name} | {subtitle}</title>
        </Helmet>
        {this.props.statusCode ? (
          <Typography> `An error ${this.props.statusCode} occurred on server`</Typography>
        ) : (
          <Fragment>
            <Typography className={classes.errorMessage} paragraph>Sorry! We couldn't find what you're looking for.</Typography>
            <Typography className={classes.errorLink}>
              <Link route="/">Home</Link>
            </Typography>
          </Fragment>
        )}
      </div>
    );
  }
}
