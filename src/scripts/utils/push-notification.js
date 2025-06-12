const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const subscribePushNotification = async (serviceWorkerRegistration, VAPID_PUBLIC_KEY) => {
  if (!('PushManager' in window)) {
    console.warn('Push Notification not supported in this browser.');
    return;
  }

  const applicationServerKey = urlB64ToUint8Array(VAPID_PUBLIC_KEY);
  const options = {
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  };

  try {
    const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe(options);
    console.log('Push subscription:', pushSubscription.toJSON());
  
  } catch (error) {
    console.error('Failed to subscribe to push notification:', error);
    throw error;
  }
};

export { subscribePushNotification };