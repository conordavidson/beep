/* @flow */
import React, { Component } from 'react';
import objectValues from 'utils/objectValues';

type Props = {
  playSound: Function,
  soundBank: SoundBank
};

type State = {
  stopped: boolean,
  bpm: number,
  tracks: RhythmTracks
};

export default class DrumMachine extends Component<Props, State> {
  SEQUENCE_LENGTH = 16;

  deriveTracksFromSoundBank = (): RhythmTracks => {
    const soundBank: SoundBank = this.props.soundBank;
    return objectValues(soundBank).reduce((tracks: RhythmTracks, sound: Sound) => {
      tracks[sound.id] = {
        soundId: sound.id,
        sequence: new Array(this.SEQUENCE_LENGTH).fill(0)
      };
      return tracks;
    }, {});
  };

  state = {
    stopped: false,
    bpm: 120,
    tracks: this.deriveTracksFromSoundBank()
  };

  tracksAsArray = (): Array<RhythmTrack> => objectValues(this.state.tracks);

  render() {
    return <Tracks tracks={this.tracksAsArray()} soundBank={this.props.soundBank} />;
  }
}

type TracksProps = {
  tracks: Array<RhythmTrack>,
  soundBank: SoundBank
};

class Tracks extends Component<TracksProps> {
  render() {
    return this.props.tracks.map(track => <Track track={track} soundBank={this.props.soundBank} key={track.soundId} />);
  }
}

type TrackProps = {
  track: RhythmTrack,
  soundBank: SoundBank
};

class Track extends Component<TrackProps> {
  get soundName() {
    return this.props.soundBank[this.props.track.soundId].name;
  }

  render() {
    return (
      <div>
        <div>{this.soundName}</div>
        <TrackSequence sequence={this.props.track.sequence} />
      </div>
    );
  }
}

type TrackSequenceProps = {
  sequence: Sequence
};

class TrackSequence extends Component<TrackSequenceProps> {
  render() {
    return (
      <div className='flex'>
        {this.props.sequence.map((sequenceKey, index) => (
          <SequenceKey sequenceKey={sequenceKey} index={index} key={index} />
        ))}
      </div>
    )
  }
}

type SequenceKeyProps = {
  sequenceKey: number
};

class SequenceKey extends Component<SequenceKeyProps> {
  render() {
    return <div>{this.props.sequenceKey}</div>;
  }
}
