import { TextToSpeech } from '@capacitor-community/text-to-speech';


interface supportedLanguages { 
    languages : Array<string>
}

interface supportedVoices{
    voices: SpeechSynthesisVoice[]
}


export const useTTS : Function = async (text : string, idioma: string = "pt-BR", volume : number = 1.0, rate: number = 1.0, pitch: number = 1.0, voice : number = 1) : Promise<void> => {
    console.log(idioma, volume, rate, pitch);
    try{
        await TextToSpeech.stop();
        await TextToSpeech.speak(
            {
                voice,
                text: text!,
                lang: idioma.toString().trim(),
                rate,
                pitch,
                volume,
                category: 'ambient',
              }
        );
    }catch(e){
        console.log(e)
        await TextToSpeech.stop();
    }
}

export const getSupportedVoices = () : Promise<supportedVoices> => {
    return TextToSpeech.getSupportedVoices();
}

export const getSupportedLanguages = () : Promise<supportedLanguages>  =>{ 
    return TextToSpeech.getSupportedLanguages();
}   

export const pauseSound : Function =  async () : Promise<void> => { 
    await TextToSpeech.stop();
}