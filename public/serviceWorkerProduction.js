const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/static/js/bundle.js',
  '/offline.css',
  '/static/media/temp_category_thumbnail_wide.88eb5031799cdabdf2a7.webp',
  '/static/media/bg_footer.652ee958b66e2fbedd0e.webp',
  '/static/media/save_water_energy_300x190.d7c5000b9c1f5a54e081.webp',
  '/static/media/wózki_i_regały.eb41274c63e5c649e0bf.webp',
  '/static/media/bg_contact1.0105e6d39e273017e4b8.webp',
  '/static/media/Żłobki_i_przedszkola_300x190.aea76bc9993c695a9560.webp',
  '/static/media/hygienic_barrier_300x190.73bf6a2b3d9554c8c7ce.webp',
  '/static/media/asideLink_vendLaundry.0e774c44b19f77c25abd.webp',
  '/static/media/MOP_300x190.ef835b48a4fd66c9f310.webp',
  '/static/media/Straż_pożarna_300x190.0fda502f1b8e304cd109.webp',
  '/static/media/softwash.ea575e5110234bcfa13f.webp',
  '/static/media/sterowniki.8bd6e5aa8c6b6905e11f.webp',
  '/static/media/logo.66409a57060e95431c64.webp',
  '/static/media/bg_urzadzenia_pralnicze_coin_7.40e3d7f8671b3b85cdf0.webp',
  '/static/media/bg_save_water_energy.d7c5000b9c1f5a54e081.webp',
  '/static/media/bg_mop.0e900398ae975636480d.webp',
  '/static/media/bg_nursery.294e07c51a45fee64784.webp',
  '/static/media/bg_vendLaundry.989300e9f4419b9e1c6f.webp',
  '/static/media/bg_civilservices.5d6ebf83c8b8bd8a8f31.webp',
  '/static/media/bg_softwash.cebb0cbb4db4cedcd517.webp',
  '/static/media/bg_additionalEquipment.8ae049ea23cf815ac0d4.webp',
  '/static/media/bg_hygieneBarrier.7fb3c279a103534133cc.webp',
  '/static/media/pralnia_3-20.02.2023.webp',
  '/static/media/pralnia_15-21.02.2023.webp',
  '/static/media/pralnai_17-20.02.2023.webp',
  '/static/media/pralnia_temp_1-20.02.2023.webp',
  '/static/media/pralnia_21-20.02.2023.webp',
  '/static/media/pralnia_4-20.02.2023.webp',
  '/static/media/pralnia_20-20.02.2023.webp',
  '/static/media/example-20.02.2023.webp',
  '/static/media/pralnia_13-20.02.2023.webp',
  '/static/media/pralnia_12-20.02.2023.webp',
  '/static/media/pralnia_7-20.02.2023.webp',
  '/static/media/pralnia_9-20.02.2023.webp',
  '/static/media/pralnia_6-20.02.2023.webp',
  '/static/media/pralnia_16-20.02.2023.webp',
  '/static/media/pralnia_10-20.02.2023.webp',
  '/static/media/pralnia_8-20.02.2023.webp',
  '/static/media/pralnia_14-20.02.2023.webp',
  '/static/media/pralnia_18-20.02.2023.webp',
  '/static/media/pralnia_11-20.02.2023.webp',
  '/static/media/pralnia_19-20.02.2023.webp',
  '/post/posts/count',
  '/laundryPhoto/?page=2&onpage=12',
  'https://res.cloudinary.com/doydwvtkw/image/upload/v1647541658/uploads/posts/xcontrol_flex_connected_laundries_cuqeww.webp',
  'https://res.cloudinary.com/doydwvtkw/image/upload/v1647610829/uploads/posts/xcontrol_flex_post_c6garx.png',
  'https://res.cloudinary.com/doydwvtkw/image/upload/v1647541654/uploads/posts/hygienic-barrier-with-touch-control_adocvu.webp',
  'https://res.cloudinary.com/doydwvtkw/image/upload/v1647541653/uploads/posts/3-lata-gwarancji_zcezwo.webp',
  'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  '/category',
  '/laundryPhoto/?page=1&onpage=12',
  '/post/posts/markdown',
];

const addResourcestoCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

this.addEventListener('install', function (event) {
  event.waitUntil(addResourcestoCache(URLS_TO_CACHE));
});

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async (request, fallbackURL) => {
  const response = await caches.match(request);
  if (response) return response;

  try {
    console.log('Not in cache. Get from network and put in cache');
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    console.log('OFFLINE');
    const fallbackResponse = await caches.match(fallbackURL);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response('Network fails', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

this.addEventListener('fetch', function (event) {
  event.respondWith(cacheFirst(event.request, '/offline.html'));
});

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [CACHE_NAME];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

this.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});
