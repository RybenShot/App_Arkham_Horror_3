import { Howl } from 'howler';

const soundtrack = new Howl({
  src: require('@/assets/sound/soundTrack/laMelodiaCosmica.mp3'),
  loop: true,
  volume: 0.5  // volumen inicial
});

export const audioService_soundTrack = {
  play()       { if (!soundtrack.playing()) soundtrack.play(); },
  stop()       { soundtrack.stop(); },
  pause()      { soundtrack.pause(); },
  
  // Baja el volumen cuando empiece una locución (fade suave de 1s)
  lowerVolume() { soundtrack.fade(soundtrack.volume(), 0.1, 1000); },
  
  // Sube el volumen cuando termine la locución (fade suave de 1s)
  raiseVolume() { soundtrack.fade(soundtrack.volume(), 0.5, 1000); },

  setVolume(v) { soundtrack.volume(v); }
};