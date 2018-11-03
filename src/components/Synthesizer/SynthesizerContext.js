import React, { Component, createContext } from 'react';

export const SynthesizerActionsContext = createContext({});
export const SynthesizerActionsProvider = SynthesizerActionsContext.Provider;
export const SynthesizerActionsConsumer = SynthesizerActionsContext.Consumer;
export const withSynthesizerActions = WrappedComponent => {
  return class WithSynthesizerActionsComponent extends Component {
    render() {
      return (
        <SynthesizerActionsConsumer>
          {synthesizerActions => <WrappedComponent {...this.props} synthesizerActions={synthesizerActions} />}
        </SynthesizerActionsConsumer>
      );
    }
  };
};
