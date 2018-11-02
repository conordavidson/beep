/* @flow */
import React, { Component } from 'react';

type Props = {
  playSound: Function,
  soundBank: SoundBank
};

type State = {
  stopped: boolean,
  bpm: number,
  tracks: Tracks
}

class DrumMachine extends Component<Props, State> {
  SEQUENCE_LENGTH = 16;

  deriveTracksFromSoundBank = () => {
    const soundBank: SoundBank = this.props.soundBank;
    return Object.keys(soundBank).reduce((tracks: Tracks, soundId: string) => {
      const sound: Sound = soundBank[soundId];
      tracks[sound.id] = {
        id: sound.id,
        name: sound.name,
        sequence: new Array(this.SEQUENCE_LENGTH).fill(false)
      }
      return tracks;
    }, {});
  }

  state = {
    stopped: false,
    bpm: 120,
    tracks: this.deriveTracksFromSoundBank()
  }

  tracksAsArray = (): Array<Track> => Object.keys(this.state.tracks).map(trackId => this.state.tracks[trackId])

  render() {
    return (
      <div>
        {this.tracksAsArray().map(track => track.name)}
      </div>
    );
  }
}

export default DrumMachine;
