/* @flow */
import React, { Component } from 'react';
import { withAudioContext } from 'components/Context/AudioContextContext';
import { SynthesizerActionsProvider, withSynthesizerActions } from 'components/Synthesizer/SynthesizerContext';
import cx from 'classnames';
import objectValues from 'utils/objectValues';

class Synthesizer extends Component<SynthesizerProps> {
  constructor(props) {
    super(props);
  }

  state = {
    waveform: 'sine',
    keys: {}
  };

  componentDidMount() {
    this.createKeyMap();
    this.setKeys();
    this.bindKeyboardEvents();
  }

  createKeyMap() {
    this.keyMap = this.KEYS.map(key => key.trigger);
  }

  setKeys() {
    return this.setState({
      keys: this.KEYS.reduce((keys, key) => {
        const oscillator = this.props.audioContext.context.createOscillator();
        oscillator.type = this.state.waveform;
        oscillator.frequency.setValueAtTime(key.frequency, this.props.audioContext.context.currentTime);
        oscillator.start();

        keys[key.trigger] = {
          oscillator,
          isPressed: false,
          trigger: key.trigger
        };

        return keys;
      }, {})
    });
  }
  bindKeyboardEvents(e) {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  connectOscillator = trigger => {
    this.setState(
      {
        keys: {
          ...this.state.keys,
          [trigger]: {
            ...this.state.keys[trigger],
            isPressed: true
          }
        }
      },
      () => {
        this.state.keys[trigger].oscillator.connect(this.props.audioContext.context.destination);
      }
    );
  };

  disconnectOscillator = trigger => {
    this.setState(
      {
        keys: {
          ...this.state.keys,
          [trigger]: {
            ...this.state.keys[trigger],
            isPressed: false
          }
        }
      },
      () => {
        this.state.keys[trigger].oscillator.disconnect();
      }
    );
  };

  onKeyDown = e => {
    if (!this.keyMap.includes(e.key)) return;
    return this.connectOscillator(e.key);
  };

  onKeyUp = e => {
    if (!this.keyMap.includes(e.key)) return;
    return this.disconnectOscillator(e.key);
  };

  KEYS = [
    {
      trigger: 'a',
      frequency: 440
    },
    {
      trigger: 's',
      frequency: 466.1638
    },
    {
      trigger: 'd',
      frequency: 493.8833
    },
    {
      trigger: 'f',
      frequency: 523.2511
    },
    {
      trigger: 'g',
      frequency: 554.3653
    },
    {
      trigger: 'h',
      frequency: 587.3295
    },
    {
      trigger: 'j',
      frequency: 622.254
    },
    {
      trigger: 'k',
      frequency: 659.2551
    },
    {
      trigger: 'l',
      frequency: 698.4565
    },
    {
      trigger: ';',
      frequency: 739.9888
    },
    {
      trigger: "'",
      frequency: 783.9909
    },
    {
      trigger: ']',
      frequency: 830.6094
    }
  ];

  get keys() {
    return objectValues(this.state.keys);
  }

  render() {
    return (
      <SynthesizerActionsProvider value={{ pressKey: this.connectOscillator, releaseKey: this.disconnectOscillator }}>
        <div className="border-gray p1_5 inline-block">
          <Header />
          <Keys keys={this.keys} />
        </div>
      </SynthesizerActionsProvider>
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

type KeysProps = {};

class Keys extends Component<KeysProps> {
  render() {
    return (
      <div className="flex">
        {this.props.keys.map((key, index) => {
          const isLastKey = index === this.props.keys.length - 1;
          return <Key keyObj={key} isLastKey={isLastKey} />;
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
    this.props.synthesizerActions.pressKey(this.props.keyObj.trigger);
  };

  releaseKey = () => {
    this.props.synthesizerActions.releaseKey(this.props.keyObj.trigger);
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
