type SoundFile = {
  id: string,
  name: string,
  path: string
};

type Sound = {
  id: string,
  name: string,
  buffer: AudioBuffer
};

type SoundBank = {
  [soundId: string]: Sound
};

type Sequence = Array<number>;

type RhythmTrack = {
  soundId: string,
  sequence: Sequence
};

type RhythmTracks = {
  [soundId: string]: RhythmTrack
};
