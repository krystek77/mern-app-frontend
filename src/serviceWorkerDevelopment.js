export async function registerServiceWorkerProduction() {
  const URL_SW = `${process.env.PUBLIC_URL}/serviceWorkerProduction.js`;
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(URL_SW);
      console.log(
        `Service worker registered successfully for the scope ${registration.scope}`
      );
      if (registration.installing) console.log('Service Worker installing');
      else if (registration.waiting) console.log('Service Worker installed');
      else if (registration.active)
        console.log(
          `Server Worker active with state: ${registration.active.state}`
        );
    } catch (error) {
      console.log(`Service worker failure: ${error.message}`);
    }
  }
}
