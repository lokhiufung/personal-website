/**
 * Chopin Etude Interactive Logic
 * Uses VexFlow for rendering and Tone.js for audio
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize VexFlow
    const VF = Vex.Flow;

    // --- Excerpt 1: The Opening Run (Simplified) ---
    const div1 = document.getElementById("vexflow-1");
    const renderer1 = new VF.Renderer(div1, VF.Renderer.Backends.SVG);
    renderer1.resize(600, 200);
    const context1 = renderer1.getContext();

    // Create Staves
    const staveTreble1 = new VF.Stave(10, 40, 550);
    staveTreble1.addClef("treble").addKeySignature("Cm").addTimeSignature("4/4");
    staveTreble1.setContext(context1).draw();

    const staveBass1 = new VF.Stave(10, 100, 550);
    staveBass1.addClef("bass").addKeySignature("Cm").addTimeSignature("4/4");
    staveBass1.setContext(context1).draw();

    // Connect staves
    new VF.StaveConnector(staveTreble1, staveBass1).setType(VF.StaveConnector.type.BRACE).setContext(context1).draw();
    new VF.StaveConnector(staveTreble1, staveBass1).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(context1).draw();
    new VF.StaveConnector(staveTreble1, staveBass1).setType(VF.StaveConnector.type.SINGLE_RIGHT).setContext(context1).draw();

    // Notes for Excerpt 1 (Opening Chord + Run)
    // Right Hand: G7 Chord (V7 of Cm)
    const notesTreble1 = [
        new VF.StaveNote({ clef: "treble", keys: ["g/4", "d/5", "f/5", "g/5"], duration: "w" })
            .addModifier(new VF.Accidental("n"), 0) // G natural
            .addModifier(new VF.Accidental("n"), 2) // F natural
    ];

    // Left Hand: The Run (C minor scale descent)
    // C4 Bb3 Ab3 G3 | F3 Eb3 D3 C3 | B2 ...
    const notesBass1 = [
        new VF.StaveNote({ clef: "bass", keys: ["c/4"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["bb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["ab/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),

        new VF.StaveNote({ clef: "bass", keys: ["f/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["d/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),

        new VF.StaveNote({ clef: "bass", keys: ["b/2"], duration: "16" }).addModifier(new VF.Accidental("n"), 0),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["d/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),

        new VF.StaveNote({ clef: "bass", keys: ["f/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["ab/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["b/3"], duration: "16" }).addModifier(new VF.Accidental("n"), 0)
    ];

    // Beaming
    const beamsBass1 = VF.Beam.generateBeams(notesBass1);

    // Draw notes
    VF.Formatter.FormatAndDraw(context1, staveTreble1, notesTreble1);
    VF.Formatter.FormatAndDraw(context1, staveBass1, notesBass1);
    beamsBass1.forEach(b => b.setContext(context1).draw());


    // --- Excerpt 2: The Main Theme ---
    const div2 = document.getElementById("vexflow-2");
    const renderer2 = new VF.Renderer(div2, VF.Renderer.Backends.SVG);
    renderer2.resize(600, 200);
    const context2 = renderer2.getContext();

    const staveTreble2 = new VF.Stave(10, 40, 550);
    staveTreble2.addClef("treble").addKeySignature("Cm").addTimeSignature("4/4");
    staveTreble2.setContext(context2).draw();

    const staveBass2 = new VF.Stave(10, 100, 550);
    staveBass2.addClef("bass").addKeySignature("Cm").addTimeSignature("4/4");
    staveBass2.setContext(context2).draw();

    new VF.StaveConnector(staveTreble2, staveBass2).setType(VF.StaveConnector.type.BRACE).setContext(context2).draw();

    // Right Hand: Dotted Rhythm Theme (C - D - Eb - F - G)
    // C (dotted 8th) + D (16th) | Eb (dotted 8th) + F (16th) | G (quarter) ...
    const notesTreble2 = [
        new VF.StaveNote({ clef: "treble", keys: ["c/5"], duration: "8d" }),
        new VF.StaveNote({ clef: "treble", keys: ["d/5"], duration: "16" }),
        new VF.StaveNote({ clef: "treble", keys: ["eb/5"], duration: "8d" }),
        new VF.StaveNote({ clef: "treble", keys: ["f/5"], duration: "16" }),
        new VF.StaveNote({ clef: "treble", keys: ["g/5", "eb/5", "c/5"], duration: "q" }),
        new VF.StaveNote({ clef: "treble", keys: ["g/5", "eb/5", "c/5"], duration: "q" })
    ];

    // Left Hand: Arpeggios (C minor)
    // C2 G2 C3 Eb3 ...
    const notesBass2 = [
        new VF.StaveNote({ clef: "bass", keys: ["c/2"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/2"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),
        // Repeat pattern for simplicity of visual
        new VF.StaveNote({ clef: "bass", keys: ["c/4"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["eb/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["c/3"], duration: "16" }),
        new VF.StaveNote({ clef: "bass", keys: ["g/2"], duration: "16" })
    ];

    const beamsTreble2 = VF.Beam.generateBeams(notesTreble2);
    const beamsBass2 = VF.Beam.generateBeams(notesBass2);

    VF.Formatter.FormatAndDraw(context2, staveTreble2, notesTreble2);
    VF.Formatter.FormatAndDraw(context2, staveBass2, notesBass2);
    beamsTreble2.forEach(b => b.setContext(context2).draw());
    beamsBass2.forEach(b => b.setContext(context2).draw());


    // --- Audio Logic with Tone.js ---
    let sampler = null;
    let isLoaded = false;

    async function initAudio() {
        if (sampler) return;

        document.getElementById('loading-1').style.display = 'flex';
        document.getElementById('loading-2').style.display = 'flex';

        await Tone.start();

        sampler = new Tone.Sampler({
            urls: {
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/"
        }).toDestination();

        await Tone.loaded();
        isLoaded = true;
        document.getElementById('loading-1').style.display = 'none';
        document.getElementById('loading-2').style.display = 'none';
    }

    // Play Excerpt 1
    document.getElementById('play-btn-1').addEventListener('click', async () => {
        await initAudio();
        if (!isLoaded) return;

        const now = Tone.now();
        // Right Hand Chord (G7)
        sampler.triggerAttackRelease(["G4", "D5", "F5", "G5"], "2n", now);

        // Left Hand Run (Fast)
        const speed = 0.12; // seconds per 16th note
        const notes = [
            "C4", "Bb3", "Ab3", "G3",
            "F3", "Eb3", "D3", "C3",
            "B2", "C3", "D3", "Eb3",
            "F3", "G3", "Ab3", "B3"
        ];

        notes.forEach((note, i) => {
            sampler.triggerAttackRelease(note, "8n", now + (i * speed));
        });
    });

    // Slow Motion Excerpt 1
    document.getElementById('slow-btn-1').addEventListener('click', async () => {
        await initAudio();
        if (!isLoaded) return;

        const now = Tone.now();
        sampler.triggerAttackRelease(["G4", "D5", "F5", "G5"], "1n", now);

        const speed = 0.3; // Slower
        const notes = [
            "C4", "Bb3", "Ab3", "G3",
            "F3", "Eb3", "D3", "C3",
            "B2", "C3", "D3", "Eb3",
            "F3", "G3", "Ab3", "B3"
        ];

        notes.forEach((note, i) => {
            sampler.triggerAttackRelease(note, "8n", now + (i * speed));
        });
    });

    // Play Excerpt 2
    document.getElementById('play-btn-2').addEventListener('click', async () => {
        await initAudio();
        if (!isLoaded) return;

        const now = Tone.now();

        // Right Hand Melody
        // C (dotted 8th) + D (16th) | Eb (dotted 8th) + F (16th) | G (quarter)
        sampler.triggerAttackRelease("C5", "8n.", now);
        sampler.triggerAttackRelease("D5", "16n", now + 0.3);
        sampler.triggerAttackRelease("Eb5", "8n.", now + 0.4);
        sampler.triggerAttackRelease("F5", "16n", now + 0.7);
        sampler.triggerAttackRelease(["C5", "Eb5", "G5"], "4n", now + 0.8);
        sampler.triggerAttackRelease(["C5", "Eb5", "G5"], "4n", now + 1.2);

        // Left Hand Arpeggios
        const speed = 0.1;
        const bassNotes = [
            "C2", "G2", "C3", "Eb3", "G3", "C3", "Eb3", "G3",
            "C4", "G3", "Eb3", "C3", "G3", "Eb3", "C3", "G2"
        ];

        bassNotes.forEach((note, i) => {
            sampler.triggerAttackRelease(note, "16n", now + (i * speed));
        });
    });
});
