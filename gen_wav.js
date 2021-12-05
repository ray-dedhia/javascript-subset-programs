var fs = require('fs');
var wav = require('node-wav');

function spn_to_midi(spn) {
    /****************************************************
    * Convert string in scientific pitch notation (spn) 
    * to MIDI pitch (integer).
    ****************************************************/

    // midi pitches of zero spns (C0, etc.)
    // X0 maps to a rest note (silence)
    var lowest, note, octave;
    lowest = {"X": 0, "C": 12, "C#": 13, "Db": 13, "D": 14, "D#": 15, "Eb": 15, "E": 16, "F": 17, "F#": 18, "Gb": 18, "G": 19, "G#": 20, "Ab": 20, "A": 21, "A#": 22, "Bb": 22, "B": 23}

    // split spn into note and octave
    note = spn.substring(0, spn.length-1);
    octave = spn.substring(spn.length-1);

    // get midi pitch
    var midi;
    midi = lowest[note] + (octave * 12);
    return midi;
}

function midi_to_freq(midi) {
    /****************************************************
    * Convert MIDI pitch to frequency.
    ****************************************************/
    return 440 * (2 ** ((midi - 69)/12))
}

function gen_wav(notes, filename) {
    /****************************************************
    * Convert list of lists in the format 
    * [[spn, length in seconds], ...] to a WAV file,
    * and save as filename.
    ****************************************************/

    // sine wave parameters
    var amp, sample_rate, length, freq, num_samples;
    amp = 10;
    sample_rate = 44100;

    // generate sine wave for each note
    var data, i, spn, freq, length, num_samples; 
    data = [];
    for (i = 0; i < notes.length; i++) {
        // get note's frequency and length
        spn = notes[i][0];
        freq = midi_to_freq(spn_to_midi(spn));
        length = notes[i][1];
        num_samples = sample_rate * length;

        // create sine wave
        var s, t, x;
        for (s = 0; s < num_samples; s++) {
            t = (s * length) / (num_samples - 1);
            x = Math.sin(freq * 2 * Math.PI * t);
            data.push(x);
        }
    }

    // convert to three-channel
    var audio;
    audio = [data, data, data];

    // convert sine wave to wav file
    buffer = wav.encode(audio, { sampleRate: sample_rate, float: true, bitDepth: 32 });

    // save wav file
    fs.writeFile(filename, buffer, (err) => {
      if (err) {
          return console.log(err);
      }
      console.log("Audio written to " + filename);
    });
}

function test() {
    var notes;
    notes = [["A4", 0.25], ["B4", 0.25], ["C5", 0.25], ["C5", 0.25], ["D5", 0.25], ["B4", 0.375], ["A4", 0.125], ["G4", 1], ["X0", .75], ["A4", 0.25], ["A4", 0.25], ["B4", 0.25], ["C5", 0.25], ["A4", 0.25], ["X0", 0.25], ["G4", 0.25], ["G5", 0.5], ["G5", 0.25], ["D5", 1]];
    gen_wav(notes, "test.wav");
}

test();
