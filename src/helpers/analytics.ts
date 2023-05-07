declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export function pushEvent(payload: object) {
  if (typeof window.dataLayer === 'object') {
    console.log('push to GTM', payload);
    window.dataLayer.push(payload);
  } else {
    console.log('window.dataLayer not defined', payload);
  }
}
