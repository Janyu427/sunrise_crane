importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js');

// Set workbox config
workbox.setConfig({debug: false});

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim();

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting();

// Find and remove any of the older precaches that might have been used by previous versions of Workbox.
workbox.precaching.cleanupOutdatedCaches()

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main-cba38dd3a6.css",
    "revision": "cba38dd3a645fde400a6f5762415ccce"
  },
  {
    "url": "js/main-ad3a14917e.js",
    "revision": "ad3a14917ef7881a04d63c2bbe8ea7eb"
  },
  {
    "url": "image/1_1-6e7996df9b.jpg",
    "revision": "6e7996df9bc77efac539ad67e0e7a882"
  },
  {
    "url": "image/1_2-c78e63caaa.jpg",
    "revision": "c78e63caaa99e1f7f6d94e14fe1711ad"
  },
  {
    "url": "image/1_3-edb6ddbfef.jpg",
    "revision": "edb6ddbfefea475a4ba18b10818c4b3c"
  },
  {
    "url": "image/2_1-953ecdd3fb.jpg",
    "revision": "953ecdd3fb415a5e1c551d275aac574f"
  },
  {
    "url": "image/2_2-1cd01fba43.jpg",
    "revision": "1cd01fba43116dd1f90e2226776c9a2f"
  },
  {
    "url": "image/2_3-496e974108.jpg",
    "revision": "496e974108f99750345d7561de6ee16a"
  },
  {
    "url": "image/3_1-3e59eddaa1.jpg",
    "revision": "3e59eddaa1ee66a9bf850cc0fd66e57b"
  },
  {
    "url": "image/3_2-32ec8c6543.jpg",
    "revision": "32ec8c6543cdffc03874339b0e4c69c5"
  },
  {
    "url": "image/3_3-3c3db106d9.jpg",
    "revision": "3c3db106d9596e14730e76dbcd009f1f"
  },
  {
    "url": "image/auo_logo-9182c7f119.png",
    "revision": "9182c7f1198546c37a9662dd32e1b848"
  },
  {
    "url": "image/background-0b49f4a979.jpg",
    "revision": "0b49f4a979f38ebca34fafb6434b4bc7"
  },
  {
    "url": "image/disco_01-edc72012f2.jpg",
    "revision": "edc72012f2da02c8666d7899a22bf61c"
  },
  {
    "url": "image/disco_02-e2f96085de.jpg",
    "revision": "e2f96085de4f91de918549d4dd7ba4ec"
  },
  {
    "url": "image/disco_logo-7caf8a6278.png",
    "revision": "7caf8a62786c2585a1e47423a35d04f1"
  },
  {
    "url": "image/gundai_01-aa984100af.jpg",
    "revision": "aa984100af9c883c4b7582bf1fbf41e1"
  },
  {
    "url": "image/high_01-4ab519b967.jpg",
    "revision": "4ab519b967b41fdcfd5ff22f3cfef2ec"
  },
  {
    "url": "image/hyundai_02-03763934f4.jpg",
    "revision": "03763934f4a5502afbe783474bf6b611"
  },
  {
    "url": "image/hyundai_logo-bb0db5e0fb.png",
    "revision": "bb0db5e0fbc4d18a4c15075739db81ba"
  },
  {
    "url": "image/ICHIRAN_Logo-bc9ce28ed6.png",
    "revision": "bc9ce28ed6e269ecdeadb911d9ce3812"
  },
  {
    "url": "image/icon_120-2f384997e0.png",
    "revision": "2f384997e07f4088b471a7a6749c73f0"
  },
  {
    "url": "image/icon_152-32e721be07.png",
    "revision": "32e721be07a1329b14291ccbb9543c02"
  },
  {
    "url": "image/icon_180-5d5a86344b.png",
    "revision": "5d5a86344b7707fd69fb79dd9fb90e03"
  },
  {
    "url": "image/icon_192-1c56addf33.png",
    "revision": "1c56addf33f5c45be14d7deaa18636e4"
  },
  {
    "url": "image/icon_512-02fa2851e2.png",
    "revision": "02fa2851e2438f0208c8037fcf9d143e"
  },
  {
    "url": "image/icon_76-b35a47cf3a.png",
    "revision": "b35a47cf3a1316c128d2f18afa76374c"
  },
  {
    "url": "image/leopard_logo-6a4bef51e7.png",
    "revision": "6a4bef51e7986cc8075b6c504f885d88"
  },
  {
    "url": "image/micron_logo-b483b504a2.png",
    "revision": "b483b504a2dbb272f5035c3d84916e7e"
  },
  {
    "url": "image/mirdc_01-970a2cc5da.jpg",
    "revision": "970a2cc5dad92cb0e55c3fedb88f63b0"
  },
  {
    "url": "image/mirdc_logo-b83f38b1f3.png",
    "revision": "b83f38b1f3b5e7baae6dc052d0acc2c6"
  },
  {
    "url": "image/nanya_logo-38be61c18c.png",
    "revision": "38be61c18cd87f137f40936a524fadee"
  },
  {
    "url": "image/nippon_express_01-54c195835c.jpg",
    "revision": "54c195835c1e642acf19f3e830873e04"
  },
  {
    "url": "image/nippon_express_logo-93b1d0cbbe.png",
    "revision": "93b1d0cbbef18936afbe81cad48428b6"
  },
  {
    "url": "image/NPM_logo-07053665a4.png",
    "revision": "07053665a4861fbe8b7f48b45e824818"
  },
  {
    "url": "image/ritdisplay_01-b74ecfe762.jpg",
    "revision": "b74ecfe7624f62bfe64aa32262aaf132"
  },
  {
    "url": "image/ritdisplay_logo-b9335ad0a4.png",
    "revision": "b9335ad0a401d565d85fc1d27da096f5"
  },
  {
    "url": "image/samsung_logo-40486e2e0e.png",
    "revision": "40486e2e0ed80f729de0cfad3667dd1c"
  },
  {
    "url": "image/ser_01-595987a838.png",
    "revision": "595987a8383abbce3c7eed21abee48bf"
  },
  {
    "url": "image/ser_02-c9273d77fd.png",
    "revision": "c9273d77fdb4ca16f16be2fdacd5779b"
  },
  {
    "url": "image/ser_03-06577bcba8.png",
    "revision": "06577bcba814c040bb0ccd59ed98d60f"
  },
  {
    "url": "image/ser_04-bddd2b3683.png",
    "revision": "bddd2b3683548f85a7cc31a52548a53a"
  },
  {
    "url": "image/ser_05-4547aa1b93.png",
    "revision": "4547aa1b9390f79ad54ba65d8b4efb62"
  },
  {
    "url": "image/ser_06-4396886bcd.png",
    "revision": "4396886bcd84ef6851283373f605bbca"
  },
  {
    "url": "image/sunrise_logo@1x-b1dfaee777.png",
    "revision": "b1dfaee777001d498d118082ad95581f"
  },
  {
    "url": "image/sunrise_logo@2x-5d5fa960cc.png",
    "revision": "5d5fa960cc8dc722e027e2f0a8560485"
  },
  {
    "url": "image/taipei_gov_01-a6d06ac954.jpg",
    "revision": "a6d06ac9546721e7ddd85c49ff2ca5c5"
  },
  {
    "url": "image/taipei_gov_logo-b6fdd9ebee.png",
    "revision": "b6fdd9ebee932d68b6c79ac553532fa7"
  },
  {
    "url": "image/taipower_logo-7cc3f6f5c9.png",
    "revision": "7cc3f6f5c9d94cda822bcf9f79840a22"
  },
  {
    "url": "image/taiwan_highspeed_02-d2bf30def3.jpg",
    "revision": "d2bf30def3b90ba2a94c485fde84b639"
  },
  {
    "url": "image/taiwan_highspeed_logo-5735cad013.png",
    "revision": "5735cad01320929c717a1010ff57fece"
  },
  {
    "url": "image/tipc_logo-ff843650e9.png",
    "revision": "ff843650e957f9964a087d445360b675"
  },
  {
    "url": "image/tkt_02-ddeee2724e.jpg",
    "revision": "ddeee2724e94a8315aeda80f9bd5b5f5"
  },
  {
    "url": "image/tkt_logo-e1f724e0e1.png",
    "revision": "e1f724e0e1b1e3ac32d739c6160edc48"
  },
  {
    "url": "image/warlian_01-a5e4f1d44b.jpg",
    "revision": "a5e4f1d44b2ac02ebcee8acb3567f974"
  },
  {
    "url": "image/YKK_01-211c538cf7.jpg",
    "revision": "211c538cf7d3c528dc08ed4dd9ce74cf"
  },
  {
    "url": "image/YKK_logo-3a5bb94865.png",
    "revision": "3a5bb948650f925b7f745306282dc160"
  },
  {
    "url": "index.html",
    "revision": "5ed1dda7541d7458c04918ddc9128ea3"
  },
  {
    "url": "manifest.json",
    "revision": "eabfa3170de8dfecd60fd42848bf8d3e"
  }
]);
