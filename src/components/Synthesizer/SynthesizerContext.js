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

export const SynthesizerStateContext = createContext({});
export const SynthesizerStateProvider = SynthesizerStateContext.Provider;
export const SynthesizerStateConsumer = SynthesizerStateContext.Consumer;
export const withSynthesizerState = WrappedComponent => {
  return class WithSynthesizerStateComponent extends Component {
    render() {
      return (
        <SynthesizerStateConsumer>
          {synthesizerState => <WrappedComponent {...this.props} synthesizerState={synthesizerState} />}
        </SynthesizerStateConsumer>
      );
    }
  };
};
