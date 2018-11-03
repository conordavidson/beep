/* @flow */
import React, { Component } from 'react';
import { AudioContextProvider } from 'components/Context/AudioContextContext';
import { SoundBankProvider } from 'components/SoundBank/SoundBankContext';
import DrumMachine from 'components/DrumMachine';

type Props = {};
type State = {
  soundsLoaded: boolean
};

class Context extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.loadSounds(this.soundFiles);
  }

  state = { soundsLoaded: false };
  audioContext: AudioContext = new (AudioContext || window.webkitAudioContext)();
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
  soundBank: SoundBank = {};

  loadSounds = (soundFiles: Array<SoundFile>) => {
    return Promise.all(soundFiles.map(soundFile => this.loadSound(soundFile)))
      .then(() => this.setState({ soundsLoaded: true }));
  }

  loadSound = (soundFile: SoundFile) => {
    return fetch(soundFile.path)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
      .then(buffer => this.addSoundToSoundBank({ id: soundFile.id, name: soundFile.name, buffer: buffer }))
  }

  addSoundToSoundBank = (sound: Sound) => {
    this.soundBank[sound.id] = { id: sound.id, name: sound.name, buffer: sound.buffer };
  }

  playSound = (soundId: string) => {
    return this.playBuffer(this.soundBank[soundId].buffer);
    // return source[source.start ? 'start' : 'noteOn'](time);
  }

  playBuffer = (buffer: AudioBuffer) => {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
    // return source[source.start ? 'start' : 'noteOn'](time);
  }

  render() {
    if (!this.state.soundsLoaded) return null;
    return (
      <AudioContextProvider value={{ playSound: this.playSound }}>
        <SoundBankProvider value={this.soundBank}>
          <DrumMachine />
        </SoundBankProvider>
      </AudioContextProvider>
    );
  }
}

export default Context;
