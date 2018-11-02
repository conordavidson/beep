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

type Track = {
  id: string,
  name: string,
  sequence: Array<boolean>
};

type Tracks = {
  [soundId: string]: Track
};
