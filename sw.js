const CACHE="card-pwa-v14";
const ASSETS=["./index.html","./manifest.json","./icon.svg"];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const isPage=e.request.mode==="navigate" || new URL(e.request.url).pathname.endsWith("/index.html");
  if(isPage){
    e.respondWith(
      fetch(e.request).then(r=>{
        if(r.ok){
          const copy=r.clone();
          caches.open(CACHE).then(c=>c.put("./index.html",copy));
        }
        return r;
      }).catch(()=>caches.match("./index.html"))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(r=>{
        if(r.ok && new URL(e.request.url).origin===location.origin){
          const copy=r.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return r;
      }).catch(()=>caches.match("./index.html"));
    })
  );
});