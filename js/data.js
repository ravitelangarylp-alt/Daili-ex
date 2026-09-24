export const habitDefinitions = [
    { id: 'pratah', title: 'Pratah Sandhyavandana', target: 'Completion required', category: 'core', type: 'boolean', essential: true },
    { id: 'sayam', title: 'Sayam Sandhyavandana', target: 'Completion required', category: 'core', type: 'boolean', essential: false },
    { id: 'japa', title: 'Japa / Meditation (Optional)', target: 'Any duration', category: 'growth', type: 'boolean', essential: false },
    
    { id: 'prayoga', title: 'Baudhāyanīya Prayoga', target: '30 mins', category: 'study', type: 'number', minNormal: 30, minBusy: 15, essential: true },
    { id: 'nyaya', title: 'Nyaya Shastra', target: 'Minimum 1 page', category: 'study', type: 'number', minNormal: 1, minBusy: 0.5, essential: true },
    { id: 'mimamsa', title: 'Mimamsa Shastra', target: 'Minimum 1 page', category: 'study', type: 'number', minNormal: 1, minBusy: 0.5, essential: true },
    
    { id: 'learning', title: 'New Learning', target: '15-30 mins (Log in Journal)', category: 'growth', type: 'boolean', essential: false },
    { id: 'exercise', title: 'Exercise', target: 'Completion', category: 'growth', type: 'boolean', essential: false },
    
    { id: 'mit', title: "Today's Most Important Task", target: 'Define & Complete', category: 'core', type: 'text', essential: false },
    { id: 'teaching', title: 'Teaching Preparation', target: 'Completion', category: 'core', type: 'boolean', essential: false },
    
    { id: 'family', title: 'Family Time', target: 'Meaningful presence (~30 mins)', category: 'core', type: 'boolean', essential: true },
    
    { id: 'digital', title: 'Digital Discipline', target: 'Avoided unnecessary scrolling', category: 'lifestyle', type: 'boolean', essential: false },
    { id: 'review', title: 'Night Review', target: 'Reflection (Log in Reviews)', category: 'core', type: 'boolean', essential: true },
    { id: 'sleep', title: 'Adequate Sleep', target: '~7 hours', category: 'lifestyle', type: 'boolean', essential: true }
];

const coreWisdom = [
    { s: "ಉದ್ಯಮೇನ ಹಿ ಸಿಧ್ಯಂತಿ ಕಾರ್ಯಾಣಿ ನ ಮನೋರಥೈಃ |", e: "Effort alone brings success, not mere wishes. (ಪ್ರಯತ್ನದಿಂದ ಮಾತ್ರ ಯಶಸ್ಸು)" },
    { s: "ಕ್ಷಣಶಃ ಕಣಶಶ್ಚೈವ ವಿದ್ಯಾಮರ್ಥಂ ಚ ಸಾಧಯೇತ್ |", e: "Knowledge is acquired moment by moment. (ಕ್ಷಣಕ್ಷಣವೂ ವಿದ್ಯೆ ಗಳಿಸಬೇಕು)" },
    { s: "ನ ಹಿ ಸುಪ್ತಸ್ಯ ಸಿಂಹಸ್ಯ ಪ್ರವಿಶಂತಿ ಮುಖೇ ಮೃಗಾಃ |", e: "Action is required; prey does not enter a sleeping lion's mouth." },
    { s: "ಮಾತೃದೇವೋ ಭವ | ಪಿತೃದೇವೋ ಭವ |", e: "Revere your parents. Family is the core discipline." },
    { s: "ಕಾಲಾಯ ತಸ್ಮೈ ನಮಃ |", e: "Salutations to Time. Use it wisely today." },
    { s: "ವಿದ್ಯಾ ದದಾತಿ ವಿನಯಂ |", e: "True knowledge brings humility and discipline." },
    { s: "ಅಲಸಸ್ಯ ಕುತೋ ವಿದ್ಯಾ |", e: "Where is knowledge for the lazy?" },
    { s: "ಶ್ರದ್ಧಾವಾನ್ ಲಭತೇ ಜ್ಞಾನಮ್ |", e: "The one with absolute focus and faith attains knowledge." },
    { s: "ಯೋಗಃ ಕರ್ಮಸು ಕೌಶಲಮ್ |", e: "Yoga is excellence in action. Do today's work perfectly." },
    { s: "ಆಲಸ್ಯಂ ಹಿ ಮನುಷ್ಯಾಣಾಂ ಶರೀರಸ್ಥೋ ಮಹಾನ್ ರಿಪುಃ |", e: "Laziness is the greatest enemy residing in the body." },
    { s: "ಧರ್ಮೇ ಜಾಗೃತ ಜಾಗೃತ |", e: "Awake and be vigilant in your duties." },
    { s: "ಸತ್ಯಂ ವದ | ಧರ್ಮಂ ಚರ |", e: "Speak truth. Walk the path of duty." },
    { s: "ಉತ್ತಿಷ್ಠತ ಜಾಗ್ರತ ಪ್ರಾಪ್ಯ ವರಾನ್ನಿಬೋಧತ |", e: "Arise, awake, and stop not till the goal is reached." },
    { s: "ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ |", e: "You have a right to perform your duty, but not to the fruits." },
    { s: "ಸ್ವಲ್ಪಮಪ್ಯಸ್ಯ ಧರ್ಮಸ್ಯ ತ್ರಾಯತೇ ಮಹತೋ ಭಯಾತ್ |", e: "Even a little of this discipline protects one from great fear." },
    // Blend with original discipline maxims
    { s: "Discipline is keeping a promise to yourself.", e: "ಶಿಸ್ತು ಎಂದರೆ ತನಗೆ ತಾನು ನೀಡಿದ ಭರವಸೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳುವುದು." },
    { s: "Never miss twice.", e: "ಒಂದು ದಿನ ತಪ್ಪಿದರೂ, ಮರುದಿನ ಖಂಡಿತ ಮರಳಬೇಕು." },
    { s: "Protect the habit, reduce the size.", e: "ಕಷ್ಟದ ದಿನಗಳಲ್ಲಿ ಅಭ್ಯಾಸದ ಪ್ರಮಾಣವನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಆದರೆ ಬಿಡಬೇಡಿ." },
    { s: "Consistency beats intensity.", e: "ಒಂದೇ ದಿನ ಅತಿ ಹೆಚ್ಚು ಮಾಡುವುದಕ್ಕಿಂತ ಪ್ರತಿದಿನ ಸ್ವಲ್ಪ ಮಾಡುವುದು ಶ್ರೇಷ್ಠ." },
    { s: "Sleep is the foundation of discipline.", e: "ಸಾಕಷ್ಟು ನಿದ್ರೆಯಿಲ್ಲದೆ ಶಿಸ್ತು ಸಾಧ್ಯವಿಲ್ಲ." }
];

export const subhashitas = [];
for (let i = 0; i < 90; i++) {
    const base = coreWisdom[i % 20];
    let phase = i < 30 ? "Establish" : i < 60 ? "Consistency" : "Self-Mastery";
    subhashitas.push({
        day: i + 1,
        quote: base.s,
        meaning: `${base.e} — Phase: ${phase}`
    });
}
