/* @flow */
import React, { Component } from 'react';
import { withSoundBank } from 'components/SoundBank/SoundBankContext';
import {
  DrumMachineActionsProvider,
  DrumMachineStateProvider,
  withDrumMachineActions,
  withDrumMachineState
} from 'components/DrumMachine/DrumMachineContext';
import objectValues from 'utils/objectValues';
import cx from 'classnames';


type Props = {
  audioContext: Object,
  soundBank: SoundBank
};

type State = {
  playing: boolean,
  bpm: number,
  tracks: RhythmTracks
};


class DrumMachine extends Component<Props, State> {
  SEQUENCE_LENGTH = 16;

  deriveTracksFromSoundBank = (): RhythmTracks => {
    const soundBank: SoundBank = this.props.soundBank.sounds;
    return objectValues(soundBank).reduce((tracks: RhythmTracks, sound: Sound) => {
      tracks[sound.id] = {
        soundId: sound.id,
        sequence: new Array(this.SEQUENCE_LENGTH).fill(0)
      };
      return tracks;
    }, {});
  };

  state = {
    playing: false,
    bpm: 120,
    tracks: this.deriveTracksFromSoundBank(),
    noteIndex: 0
  };

  get tracksAsArray(): Array<RhythmTrack> {
    return objectValues(this.state.tracks);
  }

  setSequenceNote = (soundId: string, noteIndex: number, value: number) => {
    const updatedSequence: Sequence = [...this.state.tracks[soundId].sequence];
    updatedSequence[noteIndex] = value;

    return this.setState({
      tracks: {
        ...this.state.tracks,
        [soundId]: {
          ...this.state.tracks[soundId],
          sequence: updatedSequence
        }
      }
    });
  };

  get beatsPerMillisecond() {
    return 60000 / this.state.bpm;
  }

  play = () => {
    if (this.state.playing) return;
    this.setState(
      {
        playing: true
      },
      () => this.playNoteAt(0)
    );
  };

  stop = () => {
    if (!this.state.playing) return;
    this.setState({
      playing: false
    });
  };

  playNoteAt(noteIndex) {
    if (!this.state.playing) return;

    this.tracksAsArray.forEach(track => {
      if (track.sequence[noteIndex]) {
        this.props.soundBank.playSound(track.soundId);
      }
    });

    this.setState({ noteIndex });

    return setTimeout(() => {
      return noteIndex === this.SEQUENCE_LENGTH - 1 ? this.playNoteAt(0) : this.playNoteAt(noteIndex + 1);
    }, this.beatsPerMillisecond);
  }

  setBpm = bpm => {
    return this.setState({ bpm });
  };

  render() {
    return (
      <div className='border-gray p1_5 inline-block'>
        <DrumMachineStateProvider
          value={{
            playing: this.state.playing,
            bpm: this.state.bpm,
            noteIndex: this.state.noteIndex,
          }}>
          <DrumMachineActionsProvider
            value={{
              setSequenceNote: this.setSequenceNote,
              play: this.play,
              stop: this.stop,
              setBpm: this.setBpm
            }}>
            <Header />
            <Tracks tracks={this.tracksAsArray} />
            <Controls />
          </DrumMachineActionsProvider>
        </DrumMachineStateProvider>
      </div>
    );
  }
}

export default withSoundBank(DrumMachine);


type HeaderProps = {};

class Header extends Component<HeaderProps> {
  render() {
    return (
      <div className='flex justify-between mb2'>
        <span className='uppercase'>Drum Machine</span>
        <StatusIndicator />
      </div>
    );
  }
}




type StatusIndicatorProps = {};

class StatusIndicatorRaw extends Component<StatusIndicatorProps> {
  render() {
    const classes = cx('StatusIndicator', {
      'StatusIndicator--active': this.props.drumMachineState.playing
    });

    // const animationDuration = `${1 / (this.props.drumMachineState.bpm / 60)}s`;

    return (
      <div className='StatusIndicator__Container'>
        <div className={classes}>
        </div>
      </div>
    )
  }
}

const StatusIndicator = withDrumMachineState(StatusIndicatorRaw);


type ControlsProps = {};

class ControlsRaw extends Component<ControlsProps> {

  renderPlayButton() {
    const classes = cx('Button h100 mr_5', {
     'drop-shadow': !this.props.drumMachineState.playing,
     'inner-shadow': this.props.drumMachineState.playing
    });
    return (
      <button className={classes} onClick={this.props.drumMachineActions.play}>play</button>
    );
  }

  renderStopButton() {
    const classes = cx('Button h100', {
     'drop-shadow': this.props.drumMachineState.playing,
     'inner-shadow': !this.props.drumMachineState.playing
    });
    return (
      <button className={classes} onClick={this.props.drumMachineActions.stop}>stop</button>
    );
  }

  render() {
    return (
      <div className='Controls flex justify-between mt2'>
        <div className='mr2'>
          {this.renderPlayButton()}
          {this.renderStopButton()}
        </div>
        <div>
          <BpmSelector onChange={this.props.drumMachineActions.setBpm} value={this.props.drumMachineState.bpm} />
        </div>
      </div>
    );
  }
}

const Controls = withDrumMachineState(withDrumMachineActions(ControlsRaw));




type BpmSelectorProps = {};

class BpmSelector extends Component<BpmSelectorProps> {
  onChange = e => this.props.onChange(e.target.value);

  render() {
    return (
      <div className='h100 relative'>
        <input className='Input h100 inner-shadow' onChange={this.onChange} value={this.props.value} type='number' min='1' max='999' />
        <span className='detail color-gray overlay events-none flex justify-end items-center pr2'>
          BPM
        </span>
      </div>
    )
  }
}




type TracksProps = {
  tracks: Array<RhythmTrack>
};

class Tracks extends Component<TracksProps> {
  render() {
    return this.props.tracks.map(track => (
      <Track track={track} key={track.soundId} />
    ));
  }
}



type TrackProps = {
  track: RhythmTrack,
  soundBank: SoundBank,
  drumMachineActions: {
    setSequenceNote: Function
  }
};

class TrackRaw extends Component<TrackProps> {
  get soundName() {
    return this.props.soundBank.sounds[this.props.track.soundId].name;
  }

  onSequenceKeyClick = () => (noteIndex: number, value: number) => {
    return this.props.drumMachineActions.setSequenceNote(this.props.track.soundId, noteIndex, value);
  };

  render() {
    return (
      <div className='mb1_5 text-left'>
        <div className='mb_5'>{this.soundName}</div>
        <TrackSequence sequence={this.props.track.sequence} onClickKey={this.onSequenceKeyClick()} />
      </div>
    );
  }
}

const Track = withSoundBank(withDrumMachineActions(TrackRaw))





type TrackSequenceProps = {
  sequence: Sequence,
  onClickKey: Function
};

class TrackSequence extends Component<TrackSequenceProps> {
  render() {
    return (
      <div className="flex">
        {this.props.sequence.map((note, index) => (
          <SequenceKey note={note} index={index} key={index} onClick={this.props.onClickKey} />
        ))}
      </div>
    );
  }
}




type SequenceKeyProps = {
  note: number,
  onClick: Function
};

class SequenceKeyRaw extends Component<SequenceKeyProps> {
  onClick = () => {
    const newNoteValue = this.props.note === 0 ? 1 : 0;
    return this.props.onClick(this.props.index, newNoteValue);
  }

  get on() {
    return this.props.note === 1 ? true : false;
  }

  get active() {
    if (!this.props.drumMachineState.playing) return false;
    return this.props.drumMachineState.noteIndex === this.props.index;
  }

  get classes() {
    return cx('Key mr_375 border-radius', {
      'drop-shadow': !this.on,
      'inner-shadow': this.on,
      'bg-color-white': !this.active,
      'bg-color-light-gray': this.active
    });
  }

  render() {
    return (
      <div
        className={this.classes}
        onClick={this.onClick}
      >
      </div>
    )
  }
}

const SequenceKey = withDrumMachineState(SequenceKeyRaw);
