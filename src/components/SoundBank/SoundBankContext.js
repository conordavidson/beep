import React, { Component, createContext } from 'react';

export const SoundBankContext = createContext({});
export const SoundBankProvider = SoundBankContext.Provider;
export const SoundBankConsumer = SoundBankContext.Consumer;
export const withSoundBank = WrappedComponent => {
  return class WithSoundBankComponent extends Component {
    render() {
      return (
        <SoundBankConsumer>{soundBank => <WrappedComponent {...this.props} soundBank={soundBank} />}</SoundBankConsumer>
      );
    }
  };
};
