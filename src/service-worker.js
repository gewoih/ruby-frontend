const getFromApp = async (action) => {
  const allClients = await self.clients.matchAll();
  const client = allClients.filter((client) => client.type === 'window')[0];

  if (!client) {
    return null;
  }

  const channel = new MessageChannel();

  client.postMessage(
    {
      action,
    },
    [channel.port1],
  );

  return new Promise((resolve, reject) => {
    channel.port2.onmessage = (event) => {
      if (event.data.error) {
        console.error('Port error', event.error);
        reject(event.data.error);
      }
      resolve(event.data.response);
    };
  });
};

const handleRequest = async (request) => {
  const headers = {};
  for (let entry of request.headers) {
    headers[entry[0]] = headers[entry[1]];
  }

  const token = await getFromApp('getAuthTokenHeader');
  headers['Authorization'] = token;

  headers['access-control-allow-origin'] = '*';

  let newRequest = null;

  if (['HEAD', 'GET'].includes(request.method)) {
    newRequest = new Request(request.url, {
      method: request.method,
      headers,
      cache: request.cache,
      mode: 'cors', // we cannot use mode 'navigate', but can fall back to cors, which is good enough
      credentials: 'same-origin',
      redirect: 'manual', // browser will handle redirect on its own
    });
  }
  return fetch(request.url, newRequest);
};
self.addEventListener('fetch', (fetchEvent) => {
  const request = fetchEvent.request;

  if (request.url.indexOf('/avatar') === -1) {
    return;
  }

  fetchEvent.respondWith(handleRequest(fetchEvent.request));
});

self.onmessage = (event) => {
  if (event.data === 'claimMe') {
    self.clients.claim();
  }
};

try {
  importScripts('./ngsw-worker.js');
} catch {}
