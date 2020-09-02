import gql from "graphql-tag";
import ws from "ws";
import {SubscriptionClient} from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from "apollo-cache-inmemory";
import moment from "moment";

const GRAPHQL_ENDPOINT = 'http://localhost:8080/v1/graphql';

const subscriptionClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
    reconnect: true,
}, ws);

const client = new ApolloClient({
    link: new WebSocketLink(subscriptionClient),
    cache: new InMemoryCache(),
});

// Listen to new blocks
client.subscribe({
    query: gql(`
    subscription Blocks {
      block(order_by: {height: asc}) {
        height
        timestamp
      }
    }`)
}).subscribe({
    next(data) {
        // Get all the timestamps
        const blocks = data.data.block;
        const timestamps = blocks.map(block => block.timestamp);

        // Compute the average time block
        let sum = 0;
        let prevdate = null;

        timestamps.forEach((timestamp) => {
            const curDate = moment(timestamp, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            if(prevdate) {
                const diff = curDate.diff(prevdate);
                sum += diff;
            }
            prevdate = curDate;
        });

        const avg = (sum / (timestamps.length - 1));
        console.log(avg / 1000);
    }
})


