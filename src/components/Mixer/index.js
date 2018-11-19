/* @flow */
import React, { Component } from 'react';
import cx from 'classnames';
import objectValues from 'utils/objectValues';
import { MixerProvider, withMixer } from 'components/Mixer/MixerContext';
import { withAudioContext } from 'components/Context/AudioContextContext';

type MixerProps = {};

type MixerState = {};

const GAIN_INITIAL_VALUE = 0.5;

class Mixer extends Component<MixerProps, MixerState> {
  state = {
    inputs: {}
  };

  createInput = inputId => {
    // This is made async so that you can map multiple sources to one input in a loop. Otherwise we can't trust
    // trust the resuls of setState given that it is async.
    return new Promise(resolve => {
      const gainNode = this.props.audioContext.createGain();
      gainNode.connect(this.props.audioContext.destination);
      const inputExists = !!this.state.inputs[inputId];

      if (inputExists) {
        gainNode.gain.value = this.state.inputs[inputId].gain;
        const constantNode = this.state.inputs[inputId].constantNode;
        constantNode.connect(gainNode.gain);

        return this.setState(
          {
            inputs: {
              ...this.state.inputs,
              [inputId]: {
                ...this.state.inputs[inputId],
                gainNodes: [...this.state.inputs[inputId].gainNodes, gainNode]
              }
            }
          },
          () => resolve(gainNode)
        );
      } else {
        gainNode.gain.value = GAIN_INITIAL_VALUE;
        const constantNode = this.props.audioContext.createConstantSource();
        constantNode.connect(gainNode.gain);
        constantNode.start();

        return this.setState(
          {
            inputs: {
              ...this.state.inputs,
              [inputId]: {
                id: inputId,
                gain: gainNode.gain.value,
                constantNode,
                gainNodes: [gainNode]
              }
            }
          },
          () => resolve(gainNode)
        );
      }
    });
  };

  updateInputGain = (inputId, gain) => {
    this.state.inputs[inputId].constantNode.offset.value = gain - GAIN_INITIAL_VALUE;

    return this.setState({
      inputs: {
        ...this.state.inputs,
        [inputId]: {
          ...this.state.inputs[inputId],
          gain
        }
      }
    });
  };

  render() {
    return (
      <MixerProvider
        value={{
          inputs: this.state.inputs,
          createInput: this.createInput,
          updateInputGain: this.updateInputGain
        }}>
        <div className="border-gray p1_5 inline-block text-left">
          <Header />
          <Controls />
        </div>
        {this.props.children}
      </MixerProvider>
    );
  }
}

export default withAudioContext(Mixer);

type HeaderProps = {};

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className="flex justify-between mb2">
        <span className="uppercase">Mixer</span>
      </div>
    );
  }
}

type ControlsProps = {};

class ControlsRaw extends Component<ControlsProps> {
  get inputsAsArray() {
    return objectValues(this.props.mixer.inputs);
  }

  render() {
    return (
      <div className="mt2">
        {this.inputsAsArray.map(input => (
          <div key={input.id}>
            <p>{input.id}</p>
            <Slider value={input.gain} updateValue={gain => this.props.mixer.updateInputGain(input.id, gain)} />
          </div>
        ))}
      </div>
    );
  }
}

export const Controls = withMixer(ControlsRaw);

type SliderProps = {};

class Slider extends Component<SliderProps> {
  handleChange = e => {
    this.props.updateValue(e.target.value);
  };

  render() {
    return (
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        value={this.props.value}
        onChange={this.handleChange}
        style={{ width: 500 }}
      />
    );
  }
}
