# Tracking Events

`reaction-next-starterkit` uses [Segment](https://segment.com/) and [NYTimes React Tracking][https://github.com/NYTimes/react-tracking] to track analytics events throughout the app.

You can see the source under `/lib/tracking`

## Set up Segment

By default, this Reaction Starter Kit uses Segment analytics tracking.

### Step 1. Obtain your API key from the Segment dashboard

### Step 2. Add your API key to the `.env` config
In the `.env` file, at the root of the project, add or update the `SEGMENT_ANALYTICS_WRITE_KEY` variable with your API key

```
SEGMENT_ANALYTICS_WRITE_KEY=ENTER_YOUR_SEGMENT_API_KEY
```

### Step 3. Test

With the app running, navigate to different pages to trigger tracking events. Visit the Segment dashboard and verify that events are coming through successfully.

## Add a custom tracking service

### Step 1: Add a custom tracker

In the `config/analytics` directory you'll see a file `provider.example.js`. Copy and rename that file to `provider.js`, where provider can be any name you'd like.

In the `index.js` file in that same directory, import `provider.js` and add it to the array.

```js
import * as segment from "./segment";
import * as provider from "./provider";

export default [
  Segment,
  provider
];
```

### Step 2: Customize provider.js

The `provider.js` file contains two functions you need to customize: `dispatch` and `renderScript`.

The `dispatch` function gets called with all accumulated analytics data for an event. You must call the provider's API to track the event here.

```js
/**
 * Dispatch method
 * @name dispatchSegmentAnalytics
 * @ignore
 * @param {Object} data Arguments supplied by tracking library
 * @returns {undefined} No Return
 */
export function dispatch(data) {
  // Example that works with google tag manager
  window && window.dataLayer.push(data);
}
```

The `renderStript` function renders a string of javascript code for your tracking service. For example in `Segment.js` we render the Segment snippet and return a string. This string will be included in the document head.

```js
/**
 * Render string script
 * @returns {String} String JS script to be applied to head
 */
export function renderScript() {
  const { publicRuntimeConfig } = getConfig();

  // Key API key
  // add your api key to `publicRuntimeConfig` section of the next.config.js
  const { apiKey } = publicRuntimeConfig;

  // Return a javascript string that will be included in the HEAD of the rendered HTML document
  return "STRING_SCRIPT";
}
```

### Step 4: Testing

You should now be able to send tracking data to the provider of your choice.


## Add a page view event

```js
import React, { Component } from "react";
import track from "react-tracking";
import withTrackingDispatch from "lib/tracking/withTrackingDispatch";
import withTracking from "lib/tracking/withTracking";

@withTracking
@track(() => ({
  action: "Page Viewed"
}), {
  dispatchOnMount: true
})
class Page extends Component {
  render() {
    return <div>{"Page"}</div>;
  }
}

```

## Add events inside a component

```js
import React, { Component } from "react";
import track from "react-tracking";
import TrackingPropType from "lib/tracking/TrackingPropType";
import withTracking from "lib/tracking/withTracking";

@withTracking
class Page extends Component {
  static propTypes = {
    tracking: TrackingPropType
  }

  @track({ action: "On Click with Decorator" })
  handleClick = () => {
    // Perform some action
  }

  handleOtherClick = () => {
    this.props.tracking.trackEvent({ action: "On Click with trackEvent()" });
    // Perform some action
  }

  render() {
    return (
      <button onClick={this.handleClick}>{"Track Event 1"}</button>
      <button onClick={this.handleOtherClick}>{"Track Event 2"}</button>
    );
  }
}

```

## Add events on page load and inside a component

```js
import React, { Component } from "react";
import track from "react-tracking";
import TrackingPropType from "lib/tracking/TrackingPropType";
import withTracking from "lib/tracking/withTracking";

@withTracking
@track(() => ({
  action: "Page Viewed"
}), {
  dispatchOnMount: true
})
class Page extends Component {
  static propTypes = {
    tracking: TrackingPropType
  }

  @track({ action: "On Click with Decorator" })
  handleClick = () => {
    // Perform some action
  }

  handleOtherClick = () => {
    this.props.tracking.trackEvent({ action: "On Click with trackEvent()" });
    // Perform some action
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{"Track Event 1"}</button>
        <button onClick={this.handleOtherClick}>{"Track Event 2"}</button>
      </div>
    );
  }
}

```

## Add a Product List Viewed event

Tracking the `Product List Viewed` Segment event using the provided HOC `trackProductListViewed`.

```js
import React, { Component } from "react";
import withCatalogItems from "containers/catalog/withCatalogItems";
import track from "lib/tracking/track";
import withTracking from "lib/tracking/withTracking";
import trackProductListViewed from "lib/tracking/trackProductListViewed";

@withData // Apollo initialization
@withRoot // General app initialization
@withShop // Get current shop data
@withCatalogItems // Get catalog items for the current page
@withTracking // Root level tracking dispatch
@trackProductListViewed({
  // Dispatch event Page component mount
  dispatchOnMount: true
})
class Page extends Component {
  render() {
    const { catalogItems } = this.props.catalogItems;

    return (
      <div>
        {catalogItems && catalogItems.map((catalogItem) => {
          <div>{catalogItem.node.title}</div>
        })}
      </div>
    );
  }
}

```

## Add a Product Viewed event

Tracking the `Product Viewed` Segment event provided HOC `trackProductViewed`.

```js
import React, { Component } from "react";
import withCatalogItemProduct from "containers/catalog/withCatalogItemProduct";
import track from "lib/tracking/track";
import withTracking from "lib/tracking/withTracking";
import trackProductListViewed from "lib/tracking/trackProductViewed";

@withData // Apollo initialization
@withRoot // General app initialization
@withShop // Get current shop data
@withCatalogItemProduct // Product for page with route of `/product/:slugOrId/:variantId?`
@withTracking // Root level tracking dispatch
@trackProductViewed({
  // Dispatch event Page component mount
  dispatchOnMount: true
})
class Page extends Component {
  render() {
    return (
      <div>
        {this.props.product.title}
      </div>
    );
  }
}
```

# Segment events and data mappings

## Product viewed event

Data for the Segment e-commerce event [Product Viewed](https://segment.com/docs/spec/ecommerce/v2/#product-viewed), will require values from a `CatalogItemProduct` and `CatalogItemVariant`.

```js
{
  // ID of top-level product
  product_id: product._id,

  // SKU
  sku: product.sku,

  // First tag
  category: product.tags.edges[0].nodes.name,

  // Title of top level product
  name: product.title,

  // Vendor field from the top-level product
  brand: product.vendor,

  // Varaint Id
  variant: variant.variantId,

  // Price from variant
  price: variant.price,

  // Quantity not available via GraphQL API
  // Set to 1 as a default
  quantity: 1

  // Coupons not available via GraphQL API
  coupon: null,

  // Products only have currency based on shop
  currency: shop.currency,

  // Position based off of variant index
  position: variant.index,

  // Value based off of variant price multiplied by quantity (variant.price * quantity)
  // In this case, use `variant.price` as there is only 1 for the quantity
  value: variant.price,

  // Use router to get current url
  url: router.pathname,

  // Primary image from product
  image_url: product.primaryImage.URLs.original
}
```