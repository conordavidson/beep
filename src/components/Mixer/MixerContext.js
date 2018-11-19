import React, { Component, createContext } from 'react';

export const MixerContext = createContext({});
export const MixerProvider = MixerContext.Provider;
export const MixerConsumer = MixerContext.Consumer;
export const withMixer = WrappedComponent => {
  return class WithMixerContextComponent extends Component {
    render() {
      return (
        <MixerConsumer>
          {mixer => <WrappedComponent {...this.props} mixer={mixer} />}
        </MixerConsumer>
      );
    }
  };
};
