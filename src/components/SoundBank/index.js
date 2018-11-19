/* @flow */
import React, { Component } from 'react';
import { withMixer } from 'components/Mixer/MixerContext';
import { withAudioContext } from 'components/Context/AudioContextContext';
import { SoundBankProvider } from 'components/SoundBank/SoundBankContext';

const MIXER_INPUT_ID = 'Drum Machine';

type Props = {};
type State = {
  soundsLoaded: boolean
};

class SoundBank extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.loadSounds(this.soundFiles);
  }

  state = { soundsLoaded: false };
  soundFiles: Array<SoundFile> = [
    {
      id: 'hat',
      name: 'Hi—Hat',
      path: 'sounds/hat.wav'
    },
    {
      id: 'kick',
      name: 'Kick',
      path: 'sounds/kick.wav'
    },
    {
      id: 'snare',
      name: 'Snare',
      path: 'sounds/snare.wav'
    }
  ];
  mixerInputs = {};
  soundBank: SoundBank = {};

  loadSounds = (soundFiles: Array<SoundFile>) => {
    return Promise.all(soundFiles.map(soundFile => this.loadSound(soundFile))).then(() =>
      this.setState({ soundsLoaded: true })
    );
  };

  loadSound = (soundFile: SoundFile) => {
    return fetch(soundFile.path)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => this.props.audioContext.decodeAudioData(arrayBuffer))
      .then(buffer => {
        this.addSoundToSoundBank({ id: soundFile.id, name: soundFile.name, buffer: buffer });
        this.createMixerInput(soundFile.id);
      });
  };

  addSoundToSoundBank = (sound: Sound) => {
    this.soundBank[sound.id] = { id: sound.id, name: sound.name, buffer: sound.buffer };
  };

  createMixerInput = async (soundId: string) => {
    const input = await this.props.mixer.createInput(MIXER_INPUT_ID);
    this.mixerInputs[soundId] = input;
  };

  playSound = (soundId: string) => {
    const buffer = this.soundBank[soundId].buffer;
    const mixerInput = this.mixerInputs[soundId];
    const source = this.props.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(mixerInput);
    source.start(0);
  };

  render() {
    if (!this.state.soundsLoaded) return null;
    return (
      <SoundBankProvider
        value={{
          sounds: this.soundBank,
          playSound: this.playSound
        }}>
        {this.props.children}
      </SoundBankProvider>
    );
  }
}

export default withMixer(withAudioContext(SoundBank));
