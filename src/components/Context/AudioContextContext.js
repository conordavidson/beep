import React, { Component, createContext } from 'react';

export const AudioContextContext = createContext({});
export const AudioContextConsumer = AudioContextContext.Consumer;
export const AudioContextProvider = AudioContextContext.Provider;
export const withAudioContext = WrappedComponent => {
  class WithAudioContextComponent extends Component {
    render() {
      return (
        <AudioContextConsumer>
          {audioContext => <WrappedComponent {...this.props} audioContext={audioContext} />}
        </AudioContextConsumer>
      );
    }
  }

  return WithAudioContextComponent;
};
