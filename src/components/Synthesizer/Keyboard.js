const A = 'A';
const ASHARP = 'ASHARP';
const B = 'B';
const C = 'C';
const C2 = 'C2';
const CSHARP = 'CSHARP';
const D = 'D';
const DSHARP = 'DSHARP';
const E = 'E';
const F = 'F';
const FSHARP = 'FHSARP';
const G = 'G';
const GSHARP = 'GSHARP';

export const DEFAULT_OCTIVE_INDEX = 3;

export const KeyCodeMapping = {
  [C]: 65,
  [CSHARP]: 87,
  [D]: 83,
  [DSHARP]: 69,
  [E]: 68,
  [F]: 70,
  [FSHARP]: 84,
  [G]: 71,
  [GSHARP]: 89,
  [A]: 72,
  [ASHARP]: 85,
  [B]: 74,
  [C2]: 75
};

export const Frequencies = {
  C1: 32.7032,
  CSHARP1: 34.64783,
  D1: 36.7081,
  DSHARP1: 38.89087,
  E1: 41.20344,
  F1: 43.65353,
  FSHARP1: 46.2493,
  G1: 48.99943,
  GSHARP1: 51.91309,
  A1: 55,
  ASHARP1: 58.27047,
  B1: 61.73541,
  C2: 65.40639,
  CSHARP2: 69.29566,
  D2: 73.41619,
  DSHARP2: 77.78175,
  E2: 82.40689,
  F2: 87.30706,
  FSHARP2: 92.49861,
  G2: 97.99886,
  GSHARP2: 103.8262,
  A2: 110,
  ASHARP2: 116.5409,
  B2: 123.4708,
  C3: 130.8128,
  CSHARP3: 138.5913,
  D3: 146.8324,
  DSHARP3: 155.5635,
  E3: 164.8138,
  F3: 174.6141,
  FSHARP3: 184.9972,
  G3: 195.9977,
  GSHARP3: 207.6523,
  A3: 220,
  ASHARP3: 233.0819,
  B3: 246.9417,
  C4: 261.6256,
  CSHARP4: 277.1826,
  D4: 293.6648,
  DSHARP4: 311.127,
  E4: 329.6276,
  F4: 349.2282,
  FSHARP4: 369.9944,
  G4: 391.9954,
  GSHARP4: 415.3047,
  A4: 440,
  ASHARP4: 466.1638,
  B4: 493.8833,
  C5: 523.2511,
  CSHARP5: 554.3653,
  D5: 587.3295,
  DSHARP5: 622.254,
  E5: 659.2551,
  F5: 698.4565,
  FSHARP5: 739.9888,
  G5: 783.9909,
  GSHARP5: 830.6094,
  A5: 880,
  ASHARP5: 932.3275,
  B5: 987.7666,
  C6: 1046.502,
  CSHARP6: 1108.731,
  D6: 1174.659,
  DSHARP6: 1244.508,
  E6: 1318.51,
  F6: 1396.913,
  FSHARP6: 1479.978,
  G6: 1567.982,
  GSHARP6: 1661.219,
  A6: 1760,
  ASHARP6: 1864.655,
  B6: 1975.533,
  C7: 2093.005,
  CSHARP7: 2217.461,
  D7: 2349.318,
  DSHARP7: 2489.016,
  E7: 2637.02,
  F7: 2793.826,
  FSHARP7: 2959.955,
  G7: 3135.963,
  GSHARP7: 3322.438,
  A7: 3520,
  ASHARP7: 3729.31,
  B7: 3951.066,
  C8: 4186.009,
  CSHARP8: 4434.922,
  D8: 4698.636,
  DSHARP8: 4978.032,
  E8: 5274.041,
  F8: 5587.652,
  FSHARP8: 5919.911,
  G8: 6271.927,
  GSHARP8: 6644.875,
  A8: 7040,
  ASHARP8: 7458.62,
  B8: 7902.133,
  C9: 8372.019
};

export const Octaves = [
  [
    {
      note: C,
      frequency: Frequencies.C1,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP1,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D1,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP1,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E1,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F1,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP1,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G1,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP1,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A1,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP1,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B1,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C2,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C2,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP2,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D2,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP2,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E2,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F2,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP2,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G2,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP2,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A2,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP2,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B2,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C3,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C3,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP3,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D3,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP3,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E3,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F3,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP3,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G3,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP3,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A3,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP3,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B3,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C4,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C4,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP4,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D4,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP4,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E4,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F4,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP4,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G4,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP4,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A4,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP4,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B4,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C5,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C5,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP5,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D5,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP5,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E5,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F5,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP5,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G5,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP5,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A5,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP5,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B5,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C6,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C6,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP6,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D6,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP6,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E6,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F6,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP6,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G6,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP6,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A6,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP6,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B6,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C7,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C7,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP7,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D7,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP7,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E7,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F7,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP7,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G7,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP7,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A7,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP7,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B7,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C8,
      sharp: false
    }
  ],
  [
    {
      note: C,
      frequency: Frequencies.C8,
      sharp: false
    },
    {
      note: CSHARP,
      frequency: Frequencies.CSHARP8,
      sharp: true
    },
    {
      note: D,
      frequency: Frequencies.D8,
      sharp: false
    },
    {
      note: DSHARP,
      frequency: Frequencies.DSHARP8,
      sharp: true
    },
    {
      note: E,
      frequency: Frequencies.E8,
      sharp: false
    },
    {
      note: F,
      frequency: Frequencies.F8,
      sharp: false
    },
    {
      note: FSHARP,
      frequency: Frequencies.FSHARP8,
      sharp: true
    },
    {
      note: G,
      frequency: Frequencies.G8,
      sharp: false
    },
    {
      note: GSHARP,
      frequency: Frequencies.GSHARP8,
      sharp: true
    },
    {
      note: A,
      frequency: Frequencies.A8,
      sharp: false
    },
    {
      note: ASHARP,
      frequency: Frequencies.ASHARP8,
      sharp: true
    },
    {
      note: B,
      frequency: Frequencies.B8,
      sharp: false
    },
    {
      note: C2,
      frequency: Frequencies.C9,
      sharp: false
    }
  ]
];
