// script.js

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  
  let deferredPrompt;
  
  // Listen for the `beforeinstallprompt` event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default prompt
    deferredPrompt = e; // Save the event for later
    const installButton = document.querySelector('#installButton');
    if (installButton) {
      installButton.style.display = 'block'; // Show the install button
      console.log('Install button displayed');
    }
  });
  
  // When the install button is clicked
  const installButton = document.querySelector('#installButton');
  if (installButton) {
    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null; // Reset the deferredPrompt
      }
    });
  }
  
  // Optional: Listen for the app being installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
  });
  
  // Placeholder functions for searchTyrePressure and calculatePressure
  function searchTyrePressure() {
    // Your existing implementation
  }
  
  function calculatePressure() {
    // Your existing implementation
  }
  
