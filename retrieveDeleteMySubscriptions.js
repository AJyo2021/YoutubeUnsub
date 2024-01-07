/**
 * This function retrieves the user's subscriptions, lists the channel IDs and titles, and then removes the subscriptions.
 * Projects that enable the YouTube Data API have a default quota allocation of 10,000 units per day ~ 200 subscriptions removed per day.
 **/
 
function retrieveDeleteMySubscriptions() {
  try {
    // Fetch the user's subscriptions
    let nextPageToken = null;
    do {
      const subscriptionsResponse = YouTube.Subscriptions.list('snippet', {
        mine: true,
        maxResults: 500,
        pageToken: nextPageToken,
      });

      if (!subscriptionsResponse || subscriptionsResponse.items.length === 0) {
        console.log('No subscriptions found.');
        break;
      }

      // Iterate through the subscriptions
      for (let i = 0; i < subscriptionsResponse.items.length; i++) {
        const subscription = subscriptionsResponse.items[i];
        const channelId = subscription.snippet.resourceId.channelId;
        const channelTitle = subscription.snippet.title;

        console.log('[%s] Title: %s', channelId, channelTitle);

        // Remove the subscription
        YouTube.Subscriptions.remove(subscription.id);
      }

      nextPageToken = subscriptionsResponse.nextPageToken;
    } while (nextPageToken);
  } catch (err) {
    console.log('Failed with err %s', err.message);
  }
}