/* @flow */
import React, { Component } from 'react';
import { AudioContextProvider } from 'components/Context/AudioContextContext';
import SoundBank from 'components/SoundBank';
import DrumMachine from 'components/DrumMachine';
import Synthesizer from 'components/Synthesizer';
import Mixer from 'components/Mixer';

type Props = {};
type State = {
  soundsLoaded: boolean
};

class Context extends Component<Props, State> {
  audioContext: AudioContext = new (AudioContext || window.webkitAudioContext)();

  render() {
    return (
      <AudioContextProvider value={this.audioContext}>
        <div className='text-center mt4'>
          <Mixer>
            <div className='flex justify-center mt2'>
              <div className='mr2'>
                <Synthesizer />
              </div>
              <div>
                <SoundBank>
                  <DrumMachine />
                </SoundBank>
              </div>
            </div>
          </Mixer>
        </div>
      </AudioContextProvider>
    );
  }
}

export default Context;
