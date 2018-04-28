import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Chip from "material-ui/Chip";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Link from "components/Link";

const styles = (theme) => ({
  title: {
    marginBottom: theme.spacing.unit
  },
  chip: {
    cursor: "pointer"
  }
});

/**
 * Tag grid - displays a grid of tags
 */
@withStyles(styles, { withTheme: true })
export default class TagGrid extends Component {
  static propTypes = {
    /**
     * CSS class names
     */
    classes: PropTypes.object,

    /**
     * Array of tag nodes [{ node: Object }]
     */
    tags: PropTypes.array,

    /**
     * Theme
     */
    theme: PropTypes.object
  }

  render() {
    const {
      classes,
      tags,
      theme
    } = this.props;


    if (!Array.isArray(tags)) return null;

    return (
      <section>
        <Typography className={classes.title} variant="title">{"Tags"}</Typography>
        <Grid container spacing={theme.spacing.unit}>
          {tags.map(({ node: tag }, index) => (
            <Grid item>
              <Link route={`/tag/${tag.slug}`}>
                <Chip className={classes.chip} key={index} label={tag.name} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
    );
  }
}
