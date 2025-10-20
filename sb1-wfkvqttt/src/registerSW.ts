import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Yeni bir sürüm mevcut. Şimdi güncellemek ister misiniz?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('Uygulama çevrimdışı kullanıma hazır');
  },
});
