/* @flow */
import React, { Component } from 'react';
import { withAudioContext } from 'components/Context/AudioContextContext';
import {
  SynthesizerActionsProvider,
  SynthesizerStateProvider,
  withSynthesizerActions,
  withSynthesizerState
} from 'components/Synthesizer/SynthesizerContext';
import cx from 'classnames';
import objectValues from 'utils/objectValues';
import { Octaves, KeyCodeMapping, DEFAULT_OCTIVE_INDEX } from 'components/Synthesizer/Keyboard';

class Synthesizer extends Component<SynthesizerProps> {
  constructor(props) {
    super(props);
  }

  state = {
    octaveIndex: DEFAULT_OCTIVE_INDEX,
    waveform: 'sine',
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

  setOctaveKeys() {
    return this.setState({
      keys: this.octave.reduce((keys, key, index) => {
        const oscillator = this.props.audioContext.context.createOscillator();
        oscillator.type = this.state.waveform;
        console.log(key, key.frequency)
        oscillator.frequency.setValueAtTime(key.frequency, this.props.audioContext.context.currentTime);
        oscillator.start();

        const triggerKeyCode = KeyCodeMapping[key.note];

        keys[triggerKeyCode] = {
          index,
          triggerKeyCode,
          oscillator,
          isPressed: false,
          sharp: key.sharp,
          frequency: key.frequency,
        };

        return keys;
      }, {})
    });
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
        this.state.keys[triggerKeyCode].oscillator.connect(this.props.audioContext.context.destination);
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
      <SynthesizerStateProvider value={{ octaveIndex: this.state.octaveIndex }}>
        <SynthesizerActionsProvider value={{ pressKey: this.connectOscillator, releaseKey: this.disconnectOscillator, setOctaveIndex: this.setOctaveIndex }}>
          <div className="border-gray p1_5 inline-block">
            <Header />
            <Keys keys={this.keys} />
            <Controls />
          </div>
        </SynthesizerActionsProvider>
      </SynthesizerStateProvider>
    );
  }
}

export default withAudioContext(Synthesizer);

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
        <OctaveSelector onChange={this.props.synthesizerActions.setOctaveIndex} value={this.props.synthesizerState.octaveIndex} />
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
          className='Input h100 inner-shadow'
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


type KeysProps = {};

class Keys extends Component<KeysProps> {
  render() {
    return (
      <div className="flex">
        {this.props.keys.map((key, index) => {
          const isLastKey = index === this.props.keys.length - 1;
          return <Key keyObj={key} isLastKey={isLastKey} key={key.triggerKeyCode} />;
        })}
      </div>
    );
  }
}

type KeyProps = {};

class KeyRaw extends Component<KeyProps> {
  get classes() {
    return cx('SequenceKey bg-color-white border-radius', {
      mr_5: !this.props.isLastKey,
      'drop-shadow': !this.props.keyObj.isPressed,
      'inner-shadow': this.props.keyObj.isPressed
    });
  }

  pressKey = () => {
    this.props.synthesizerActions.pressKey(this.props.keyObj.triggerKeyCode);
  };

  releaseKey = () => {
    this.props.synthesizerActions.releaseKey(this.props.keyObj.triggerKeyCode);
  };

  render() {
    return (
      <div
        className={this.classes}
        onMouseDown={this.pressKey}
        onMouseUp={this.releaseKey}
        onMouseOut={this.releaseKey}
      />
    );
  }
}

const Key = withSynthesizerActions(KeyRaw);
