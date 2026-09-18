export const subhashitas = [
    {
        day: 1,
        quote: "ಉದ್ಯಮೇನ ಹಿ ಸಿಧ್ಯಂತಿ ಕಾರ್ಯಾಣಿ ನ ಮನೋರಥೈಃ |",
        meaning: "Effort alone brings success, not mere wishes. (ಪ್ರಯತ್ನದಿಂದ ಮಾತ್ರ ಕೆಲಸಗಳು ಯಶಸ್ವಿಯಾಗುತ್ತವೆ.)"
    },
    {
        day: 2,
        quote: "ಶಿಸ್ತು ಎಂದರೆ ಪ್ರತಿದಿನ ದೊಡ್ಡ ಕೆಲಸ ಮಾಡುವುದು ಅಲ್ಲ; ಸಣ್ಣ ಕೆಲಸವನ್ನು ಪ್ರತಿದಿನ ಬಿಡದೆ ಮಾಡುವುದು.",
        meaning: "Discipline is not doing big things daily; it is doing small things without fail."
    },
    {
        day: 3,
        quote: "ಕ್ಷಣಶಃ ಕಣಶಶ್ಚೈವ ವಿದ್ಯಾಮರ್ಥಂ ಚ ಸಾಧಯೇತ್ |",
        meaning: "Knowledge and wealth should be acquired moment by moment, grain by grain."
    },
    {
        day: 4,
        quote: "ನ ಹಿ ಸುಪ್ತಸ್ಯ ಸಿಂಹಸ್ಯ ಪ್ರವಿಶಂತಿ ಮುಖೇ ಮೃಗಾಃ |",
        meaning: "Animals do not enter the mouth of a sleeping lion. Action is required."
    },
    {
        day: 5,
        quote: "ಮಾತೃದೇವೋ ಭವ | ಪಿತೃದೇವೋ ಭವ |",
        meaning: "Revere your mother and father as Gods. (Family is the core discipline)."
    }
    // Expand to 90 to ensure a unique message every day
];

export const habitDefinitions = [
    { id: 'wakeup', title: 'Wake Up', target: '4:00 - 4:30 AM', category: 'core', type: 'boolean' },
    { id: 'pratah', title: 'Pratah Sandhyavandana', target: 'Completion required', category: 'core', type: 'boolean' },
    { id: 'prayoga', title: 'Baudhāyanīya Prayoga', target: '30 mins (15 mins on Busy Day)', category: 'core', type: 'number', minNormal: 30, minBusy: 15 },
    { id: 'nyaya', title: 'Nyaya Shastra', target: 'Minimum 1 page', category: 'core', type: 'number', minNormal: 1, minBusy: 0.5 },
    { id: 'mimamsa', title: 'Mimamsa Shastra', target: 'Minimum 1 page', category: 'core', type: 'number', minNormal: 1, minBusy: 0.5 },
    { id: 'family', title: 'Family Time', target: 'Meaningful presence (~30 mins)', category: 'core', type: 'boolean' },
    { id: 'sayam', title: 'Sayam Sandhyavandana', target: 'Completion required', category: 'core', type: 'boolean' },
    { id: 'learning', title: 'New Learning Journal', target: 'Topic & Reflection', category: 'growth', type: 'text' },
    { id: 'review', title: 'Night Review', target: 'Reflection & Planning', category: 'core', type: 'text' }
];
