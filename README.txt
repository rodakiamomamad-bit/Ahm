A LITTLE WORLD OF YOU
Created by Mehrzad

RUN
1. Extract this folder.
2. Copy your existing Vazirmatn-VF.ttf into assets/fonts/
   (or keep the provided font if it is already there).
3. Open index.html in a modern browser.
   If ES modules are blocked by the browser's file:// security, run:
   py -m http.server 8000
   then open http://localhost:8000

FEATURES
- 75 modular questions across 9 categories; optional answers, skip and prefer-not-to-answer.
- Back/next navigation, progress, answer editing and local autosave.
- Deterministic personalization configuration from actual answers.
- Six explorable world areas with interactive garden, companion and hidden treasures.
- Optional manually enabled Web Audio ambient tones; no autoplay.
- Explicit JSON export; nothing is sent automatically.
- Local privacy explanation and delete-all control.
- Responsive RTL design, keyboard focus, reduced-motion support.

PRIVACY
Answers stay in this browser's LocalStorage. Export is a local download initiated only by the visitor.
No backend, analytics, account, tracking, or external API.

NOTES
This is a static website. Opening index.html works in browsers that allow JavaScript modules from local files.
If not, use the included local Python server command above.
