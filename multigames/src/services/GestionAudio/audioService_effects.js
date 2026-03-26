import { Howl } from 'howler';

const sounds = {
    0: new Howl({ src: require('@/assets/sound/efectos_Sonido/navegacion/SonidoTecla.mp3') })
};

export const audioService_effects = {
    
    playTecla() {
        sounds[0].play()
    }
}