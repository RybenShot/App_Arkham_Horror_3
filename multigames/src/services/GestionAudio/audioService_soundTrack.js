import { Howl } from 'howler';

const soundtrack = new Howl({
  src: require('@/assets/sound/soundTrack/laMelodiaCosmica.mp3'),
  loop: true,
  volume: 0.5  // volumen inicial
});
const soundtrackInPlay = new Howl({
  src: require('@/assets/sound/soundTrack/MelodiaInPlay.mp3'),
  loop: true,
  volume: 0.5  // volumen inicial
});

let AudioSoundtrackON = true;
let AudioInPlayON = true;

export const audioService_soundTrack = {
  play(){ 
    if ( !soundtrack.playing() && AudioSoundtrackON ){
      soundtrack.play()
    }
  },
  stop()       { soundtrack.stop(); },
  pause()      { soundtrack.pause(); },

  // baja el volumen gradualmente y luego lo apaga
  endSoundTrack(){ 
    soundtrack.fade(soundtrack.volume(), 0, 2000);
    stop()
  },
  
  // Baja el volumen cuando empiece una locución (fade suave de 1s)
  lowerVolume() { soundtrack.fade(soundtrack.volume(), 0.1, 1000); },
  
  // Sube el volumen cuando termine la locución (fade suave de 1s)
  raiseVolume() { soundtrack.fade(soundtrack.volume(), 0.5, 1000); },

  setVolume(v) { soundtrack.volume(v); }
};

export const audioService_audioInPlay = {
  play(){ 
    if ( !soundtrackInPlay.playing() && AudioInPlayON ){
      soundtrackInPlay.volume(0);     // empieza en silencio
      soundtrackInPlay.play();        // arranca
      this.raiseVolume();             // fade up
    }
  },

  stop()  { soundtrackInPlay.stop(); },
  pause() { soundtrackInPlay.pause(); },

  // baja el volumen gradualmente y luego pausa (para poder reanudar)
  endSoundInPlay(){ 
    soundtrackInPlay.fade(soundtrackInPlay.volume(), 0, 2000);
    setTimeout(() => this.pause(), 2000); // ✅ espera al fade antes de pausar
  },
  
  lowerVolume() { soundtrackInPlay.fade(soundtrackInPlay.volume(), 0.1, 1000); },
  raiseVolume() { soundtrackInPlay.fade(soundtrackInPlay.volume(), 0.5, 1000); },
  setVolume(v)  { soundtrackInPlay.volume(v); }
};