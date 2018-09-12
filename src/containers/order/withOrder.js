import React from "react";
import PropTypes from "prop-types";
import { Query, withApollo } from "react-apollo";
import { inject, observer } from "mobx-react";
import { orderById } from "./queries.gql";

/**
 * withOrder higher order query component for fetching an order
 * @name WithOrder
 * @param {React.Component} Component to decorate
 * @returns {React.Component} - Component with `cart` props and callbacks
 */
export default (Component) => (
  @withApollo
  @inject("cartStore", "routingStore")
  @observer
  class WithOrder extends React.Component {
    static propTypes = {
      authStore: PropTypes.shape({
        accountId: PropTypes.string,
        token: PropTypes.string,
        isAuthenticated: PropTypes.bool
      }),
      cartStore: PropTypes.shape({
        anonymousCartId: PropTypes.string,
        anonymousCartToken: PropTypes.string,
        setAnonymousCartCredentialsFromLocalStorage: PropTypes.func
      }),
      client: PropTypes.shape({
        mutate: PropTypes.func.isRequired
      }),
      primaryShopId: PropTypes.string.isRequired,
      routingStore: PropTypes.shape({
        query: PropTypes.shape({
          orderId: PropTypes.string.isRequired,
          token: PropTypes.string
        })
      })
    }

    render() {
      const { primaryShopId, routingStore } = this.props;

      const variables = {
        id: routingStore.query.orderId,
        shopId: primaryShopId,
        token: routingStore.query.token || null
      };

      return (
        <Query query={orderById} variables={variables}>
          {({ loading: isLoading, data: orderData }) => {
            const { order } = orderData || {};

            return (
              <Component
                {...this.props}
                isLoading={isLoading}
                order={order}
              />
            );
          }}
        </Query>
      );
    }
  }
);
