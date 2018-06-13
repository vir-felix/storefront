import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = ({ palette, transitions, zIndex }) => ({
  imgWrapper: {
    backgroundColor: palette.common.white, // palette.grey["100"],
    display: "block",
    height: 0,
    overflow: "hidden",
    paddingTop: "100%",
    position: "relative",
    width: "100%"
  },
  imgHeroWrapper: {
    paddingTop: "30%"
  },
  img: {
    height: "auto",
    left: "50%",
    opacity: 1,
    position: "absolute",
    transition: `opacity ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%"
  },
  imgLoaded: {
    zIndex: zIndex.mobileStepper
  },
  imgLoading: {
    filter: "blur(8px)",
    zIndex: zIndex.appBar
  },
  imgHidden: {
    opacity: 0
  }
});

@withStyles(styles, { withTheme: true })
class Img extends Component {
  static propTypes = {
    /**
     * Image text alternative - [alt text]{@link https://www.w3.org/TR/WCAG20-TECHS/H37.html}
     */
    altText: PropTypes.string,
    /**
     * CSS class names
     */
    classes: PropTypes.object,
    /**
     * True if `Img` component is being used for a page hero image
     */
    isHero: PropTypes.bool,
    /**
     * Pre load image source: Provide a tiny version of the image to create a medium like progressive loading effect
     */
    presrc: PropTypes.string,
    /**
     * Image source
     */
    src: PropTypes.string,
    /**
     * Image sources for use with a picture element
     */
    srcs: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      original: PropTypes.string,
      small: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    /**
     * MUI theme provider
     */
    theme: PropTypes.object
  };

  static defaultProps = {
    altText: "",
    isHero: false
  };

  state = { ready: false };

  componentWillMount() {
    this._mounted = true;
    this.loadImage();
  }

  componentWillUpdate() {
    this.loadImage();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  /**
   * private check for component mount, used in image buffer
   */
  _mounted = false;

  /**
   *
   * @method loadImage
   * @summary If the process is `browser` then we create a new `Image` buffer and set the `src` to be
   * ether the `props.src` or `props.srcs.small` if a responsive picture.
   * Once the buffer loads set the `ready` state to `true`
   * @return {void}
   */
  loadImage() {
    const { src, srcs } = this.props;
    if (process.browser) {
      const buffer = new Image();
      buffer.onload = () => this._mounted && this.setState({ ready: true });
      buffer.src = src || (srcs && srcs.small);
    }
  }

  /**
   *
   * @method renderPicture
   * @summary Renders a `picture` element with the provided theme breakpoints and `props.srcs`
   * @return {Element} - `picture`
   */
  renderPicture() {
    const { altText, classes, srcs, theme: { breakpoints: { values } } } = this.props;
    return (
      <picture>
        <source media={`(min-width: ${values.md}px)`} srcSet={srcs && srcs.large} />
        <source media={`(min-width: ${values.sm}px)`} srcSet={srcs && srcs.medium} />
        <img src={srcs && srcs.small} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />
      </picture>
    );
  }

  /**
   *
   * @method renderImg
   * @summary Renders a `img` element with the provided `props.src`
   * @return {Element} - `img`
   */
  renderImg() {
    const { altText, classes, src } = this.props;
    return <img src={src} className={`${classes.img} ${classes.imgLoaded}`} alt={altText} />;
  }

  /**
   *
   * @method renderImage
   * @summary If a `props.src` is provided call `renderImg` else call `renderPicture`
   * @return {Element} - `picture` or `img`
   */
  renderImage() {
    const { src } = this.props;
    return src ? this.renderImg() : this.renderPicture();
  }

  /**
   *
   * @method renderLoadingImage
   * @summary Renders a `img` element with the provided `props.presrc`
   * once the full res image has loaded this `img` will fade out
   * @return {Element} - `img`
   */
  renderLoadingImage() {
    const { classes, presrc } = this.props;
    const { ready } = this.state;
    return (
      <img src={presrc} className={`${classes.img} ${classes.imgLoading} ${ready ? classes.imgHidden : ""}`} alt="" />
    );
  }

  render() {
    const { classes, isHero } = this.props;
    const { ready } = this.state;
    return (
      <div className={`${classes.imgWrapper} ${isHero ? classes.imgHeroWrapper : ""}`}>
        {ready ? this.renderImage() : null}
        {this.renderLoadingImage()}
      </div>
    );
  }
}

export default Img;
