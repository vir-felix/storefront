# MOBX

`reaction-next-starterkit` uses [mobx](https://github.com/mobxjs/mobx) as our state management datastore.

## Data stores

### AuthStore
`AuthStore` data store provides data related to authorization of users. The values are set inside of `src/pages/_document.js`.

- `token` - `String`: The login token of the current user

### RoutingStore
The mobx `RoutingStore` data store provides data related to the current route. The values are set inside of the `withData` HOC, as this is where `nextjs` provides routing context.

- `pathname` - `String`: The pathname of the current page (i.e. `/tags/shop`)
- `query` - `String`: The query string of the current page (i.e. `shop`)


### UIStore
`UIStore` data store provides data related to various UI elements of the app. The values are set at various places throughout the app.

- `appConfig` - `Object`: App config data
- `cartOpen` - `Boolean`: Is the cart drawer open or closed
- `menuDrawerOpen` - `Boolean`: Is the menu drawer open or closed
