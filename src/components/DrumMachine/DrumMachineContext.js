import React, { Component, createContext } from 'react';

export const DrumMachineActionsContext = createContext({});
export const DrumMachineActionsProvider = DrumMachineActionsContext.Provider;
export const DrumMachineActionsConsumer = DrumMachineActionsContext.Consumer;
export const withDrumMachineActions = WrappedComponent => {
  return class WithDrumMachineActionsComponent extends Component {
    render() {
      return (
        <DrumMachineActionsConsumer>
          {drumMachineActions => <WrappedComponent {...this.props} drumMachineActions={drumMachineActions} />}
        </DrumMachineActionsConsumer>
      );
    }
  };
};

export const DrumMachineStateContext = createContext({});
export const DrumMachineStateProvider = DrumMachineStateContext.Provider;
export const DrumMachineStateConsumer = DrumMachineStateContext.Consumer;
export const withDrumMachineState = WrappedComponent => {
  return class WithDrumMachineStateComponent extends Component {
    render() {
      return (
        <DrumMachineStateConsumer>
          {drumMachineState => <WrappedComponent {...this.props} drumMachineState={drumMachineState} />}
        </DrumMachineStateConsumer>
      );
    }
  };
};
