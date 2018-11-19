/* @flow */
import React, { Component } from 'react';
import { withAudioContext } from 'components/Context/AudioContextContext';
import { withMixer } from 'components/Mixer/MixerContext';
import {
  SynthesizerActionsProvider,
  SynthesizerStateProvider,
  withSynthesizerActions,
  withSynthesizerState
} from 'components/Synthesizer/SynthesizerContext';
import cx from 'classnames';
import objectValues from 'utils/objectValues';
import {
  Octaves,
  KeyCodeMapping,
  DEFAULT_OCTIVE_INDEX,
  SINE,
  SQUARE,
  SAWTOOTH,
  TRIANGLE
} from 'components/Synthesizer/Keyboard';

class Synthesizer extends Component<SynthesizerProps> {
  constructor(props) {
    super(props);
  }

  state = {
    octaveIndex: DEFAULT_OCTIVE_INDEX,
    waveform: SINE,
    keys: {}
  };

  componentDidMount() {
    this.setEnabledKeys();
    this.setOctaveKeys();
    this.bindKeyboardEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.octaveIndex !== this.state.octaveIndex) {
      return this.setOctaveKeys();
    }
  }

  setEnabledKeys() {
    this.enabledKeys = objectValues(KeyCodeMapping);
  }

  get octave() {
    return Octaves[this.state.octaveIndex];
  }

  setOctaveIndex = octaveIndex => {
    this.disconnectAllOctave();
    return this.setState({ octaveIndex });
  }

  setWaveform = waveform => {
    objectValues(this.state.keys).forEach(key => { key.oscillator.type = waveform });
    return this.setState({ waveform });
  }

  async setOctaveKeys() {
    // We create an async reduce here given that this.props.mixer.createInput returns a Promise.
    const keys = await this.octave.reduce(async (keysPromise, key, index) => {

      const updatedKeys = await keysPromise; // Awaits and unpacks the previous promise.

      const oscillator = this.props.audioContext.context.createOscillator();
      oscillator.type = this.state.waveform;
      oscillator.frequency.setValueAtTime(key.frequency, this.props.audioContext.context.currentTime);
      oscillator.start();

      const triggerKeyCode = KeyCodeMapping[key.note];
      const mixerInput = await this.props.mixer.createInput('synthesizer'); // Returns a promise and must be awaited.

      updatedKeys[triggerKeyCode] = {
        index,
        triggerKeyCode,
        oscillator,
        mixerInput,
        isPressed: false,
        sharp: key.sharp,
        frequency: key.frequency,
      };

      return updatedKeys;
    }, Promise.resolve({}));

    return this.setState({ keys });
  }

  bindKeyboardEvents(e) {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  disconnectAllOctave() {
    objectValues(this.state.keys).forEach(key => key.oscillator.disconnect());
  }

  connectOscillator = triggerKeyCode => {
    this.setState(
      {
        keys: {
          ...this.state.keys,
          [triggerKeyCode]: {
            ...this.state.keys[triggerKeyCode],
            isPressed: true
          }
        }
      },
      () => {
        this.state.keys[triggerKeyCode].oscillator.connect(this.state.keys[triggerKeyCode].mixerInput);
      }
    );
  };

  disconnectOscillator = triggerKeyCode => {
    this.setState(
      {
        keys: {
          ...this.state.keys,
          [triggerKeyCode]: {
            ...this.state.keys[triggerKeyCode],
            isPressed: false
          }
        }
      },
      () => {
        this.state.keys[triggerKeyCode].oscillator.disconnect();
      }
    );
  };

  onKeyDown = e => {
    if (!this.enabledKeys.includes(e.keyCode)) return;
    return this.connectOscillator(e.keyCode);
  };

  onKeyUp = e => {
    if (!this.enabledKeys.includes(e.keyCode)) return;
    return this.disconnectOscillator(e.keyCode);
  };

  get keys() {
    return objectValues(this.state.keys).sort((a, b) => { return a.index - b.index });
  }

  render() {
    return (
      <SynthesizerStateProvider value={{ octaveIndex: this.state.octaveIndex, waveform: this.state.waveform }}>
        <SynthesizerActionsProvider value={{
          pressKey: this.connectOscillator,
          releaseKey: this.disconnectOscillator,
          setOctaveIndex: this.setOctaveIndex,
          setWaveform: this.setWaveform
        }}>
          <div className="border-gray p1_5 inline-block">
            <Header />
            <Keyboard keys={this.keys} />
            <Controls />
          </div>
        </SynthesizerActionsProvider>
      </SynthesizerStateProvider>
    );
  }
}

export default withMixer(withAudioContext(Synthesizer));

type HeaderProps = {};

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="flex justify-between mb2">
        <span className="uppercase">Synthesizer</span>
      </div>
    );
  }
}


type ControlsProps = {};

class ControlsRaw extends Component<ControlsProps> {

  render() {
    return (
      <div className='Controls flex justify-between mt2'>
        <div className='mr1_5'>
          <WaveformSelector onChange={this.props.synthesizerActions.setWaveform} value={this.props.synthesizerState.waveform} />
        </div>
        <div>
          <OctaveSelector onChange={this.props.synthesizerActions.setOctaveIndex} value={this.props.synthesizerState.octaveIndex} />
        </div>
      </div>
    );
  }
}

export const Controls = withSynthesizerState(withSynthesizerActions(ControlsRaw));


type OctaveSelectorProps = {};

class OctaveSelector extends Component<OctaveSelectorProps> {
  onChange = e => this.props.onChange(e.target.value);

  render() {
    return (
      <div className='h100 relative'>
        <input
          className='Input Input--small h100 inner-shadow'
          onChange={this.onChange}
          value={this.props.value}
          type="number"
          max={Octaves.length - 1}
          min={0}
        />
        <span className='detail color-gray overlay events-none flex justify-end items-center pr2'>
          OCTAVE
        </span>
      </div>
    )
  }
}



type WaveformSelectorProps = {};

class WaveformSelector extends Component<WaveformSelectorProps> {
  onChange = e => this.props.onChange(e.target.value);

  render() {
    return (
      <div className='h100 relative'>
        <span className='detail color-gray overlay events-none flex justify-end items-center pr1'>
          WAVEFORM
        </span>

        <select className='Select h100 inner-shadow' onChange={this.onChange} value={this.props.value}>
          <option value={SINE}>SINE</option>
          <option value={SQUARE}>SQUARE</option>
          <option value={SAWTOOTH}>SAWTOOTH</option>
          <option value={TRIANGLE}>TRIANGLE</option>
        </select>
      </div>
    )
  }
}


type KeyboardProps = {};

class Keyboard extends Component<KeyboardProps> {
  render() {
    return (
      <div className='Keyboard text-center'>
        <div className='inline-flex relative'>
          {this.props.keys.map((key, index) => {
            const isLastKey = index === this.props.keys.length - 1;
            return <Key keyObj={key} isLastKey={isLastKey} key={key.triggerKeyCode} />;
          })}
        </div>
      </div>
    );
  }
}

type KeyProps = {};

class KeyRaw extends Component<KeyProps> {
  get classes() {
    return cx('Key Key--large bg-color-white border-radius', {
      mr_5: !this.props.isLastKey,
      'drop-shadow': !this.props.keyObj.isPressed,
      'inner-shadow': this.props.keyObj.isPressed,
      'Key--sharp': this.props.keyObj.sharp,
      'Key--regular': !this.props.keyObj.sharp
    });
  }

  pressKey = () => {
    this.props.synthesizerActions.pressKey(this.props.keyObj.triggerKeyCode);
  };

  releaseKey = () => {
    this.props.synthesizerActions.releaseKey(this.props.keyObj.triggerKeyCode);
  };

  render() {

    let leftPosition = 'auto';
    if (this.props.keyObj.sharp) {
      if (this.props.keyObj.index > 4) {
        leftPosition = (this.props.keyObj.index * 24) + 24;
      } else {
        leftPosition = this.props.keyObj.index * 24;
      }
    }

    return (
      <div
        className={this.classes}
        onMouseDown={this.pressKey}
        onMouseUp={this.releaseKey}
        onMouseOut={this.releaseKey}
        style={{ left: leftPosition }}
      />
    );
  }
}

const Key = withSynthesizerActions(KeyRaw);
