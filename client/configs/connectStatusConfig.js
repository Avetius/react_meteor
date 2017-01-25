/**
 * Based on / inspired by meteor-smart-disconnect package -- https://github.com/mixmaxhq/meteor-smart-disconnect
 *
 */
export default ({Meteor}) => {
  let disconnectTimer = null;

  // 60 seconds by default
  const disconnectTime = (Meteor.settings && Meteor.settings.public && Meteor.settings.public.disconnectTimeSec || 60) * 1000;

  Meteor.startup(disconnectIfHidden);

  document.addEventListener('visibilitychange', disconnectIfHidden);

  function disconnectIfHidden() {
    removeDisconnectTimeout();

    if (document.hidden) {
      createDisconnectTimeout();
    } else {
      Meteor.reconnect();
    }
  }

  function createDisconnectTimeout() {
    removeDisconnectTimeout();

    disconnectTimer = setTimeout(function () {
      Meteor.disconnect();
    }, disconnectTime);
  }

  function removeDisconnectTimeout() {
    if (disconnectTimer) {
      clearTimeout(disconnectTimer);
    }
  }
}
