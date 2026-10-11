# ONLY YOU — OUR LITTLE UNIVERSE ✨

A mobile-first romantic surprise website created with deep love for my wife. Built with pure HTML5, CSS3, and vanilla JavaScript without any external paid APIs, backends, databases, or cookies. Ready for instant deployment on **Cloudflare Pages**.

---

## 🌟 Features & Journey

1. **Screen 1 — A Secret for You**:
   - Welcome greeting: *"Dei, Gundu paiyaa! ❤️"*
   - Teaser: *"Unakkaga naan create panna oru chinna surprise. Ready-ah?"*
   - Interactive button: *"Open Your Surprise ✨"*.
   - Starts soothing background music automatically upon interaction with a floating music toggle button.

2. **Screen 2 — Our Little Universe**:
   - Romantic animated quote: *"In this big world, meeting you made my little world special."*
   - Twinkling stardust canvas with gentle shooting stars and orbiting cosmos.

3. **Screen 3 — Our Memory Lane**:
   - Interactive timeline of our 5 key moments:
     - *Our first meeting*
     - *Our first special memory*
     - *A funny moment*
     - *A moment when you made me happy*
     - *My favourite memory with you*
   - Interactive photo tap with a modal lightbox preview.
   - Fully editable via `memories.js`.

4. **Screen 4 — Little Things I Love About You**:
   - Beautiful cards highlighting compliments and little things that make her one of a kind.
   - Smooth scroll reveal animations.

5. **Screen 5 — A Message in My Voice**:
   - Custom styled mobile audio player for `assets/voice-message.mp3`.
   - Audio waveform equalizer animation, scrub/seek slider, rewind/forward 10s.
   - Automatically ducks/pauses background music while playing the voice message.
   - Friendly placeholder notice if the audio file hasn't been added yet.

6. **Screen 6 — Our Love Story Movie**:
   - Responsive video cinema for `assets/love-story.mp4`.
   - Displays a warm romantic cinema standby card if the video file is missing.

7. **Screen 7 — Open Your Little Gift**:
   - 3D animated romantic envelope with a golden wax seal.
   - Tapping the wax seal triggers an opening animation with floating heart confetti.
   - Reveals the personal letter in Tamil:
     > *"Nee en life-la enakku kedacha special gift ammu. Unna happy-ah paathukanum, unna marriage pannitu un kooda neraya years vaazhanum... unaku vayasaana aprm unaku ellamey naaney pannanum...Indha website unakkaga naan create panna oru chinna gift.idhu Unnoda sacrifice ku podhumaanadhu ella dha but naa unna nalla pathupen.I love you di gundu magaleyy ❤️"*
   - Grand finale statement:
     > *"This is not just a website. It's a little world I made just for you."*
   - **Experience Again ↺** button to replay the surprise anytime.

---

## 📁 Project Structure

```text
├── index.html          # Main HTML structure with 7 screens and modals
├── styles.css          # Romantic mobile-first CSS (blush pink, cream, lavender, gold)
├── script.js           # Interactive engine, audio controller & ambient canvas
├── memories.js         # Single central configuration file for all text, dates & photos
├── assets/             # Media assets directory
│   ├── memory-1.svg    # Vector illustration: First meeting
│   ├── memory-2.svg    # Vector illustration: First special memory
│   ├── memory-3.svg    # Vector illustration: Funny moment
│   ├── memory-4.svg    # Vector illustration: Safe haven / happiness
│   ├── memory-5.svg    # Vector illustration: Stargazing together
│   ├── voice-message.mp3 # (Optional) Local voice note from husband
│   ├── love-story.mp4    # (Optional) Local video clip / montage
│   ├── bg-music.mp3      # (Optional) Couple's favorite romantic background song
│   └── README.md       # Media asset replacement instructions
└── README.md           # This documentation
```

---

## 🛠️ How to Customize (Easy 3 Steps)

### Step 1: Personalize Memories & Dates in `memories.js`
Open `memories.js` in any code or text editor (Notepad, VS Code, etc.). All memories are kept in clean JavaScript objects:

```javascript
{
  id: 1,
  tag: "The Beginning",
  title: "Our First Meeting",
  date: "October 14, 2021",          // <-- Put your real date here
  image: "assets/photo-1.jpg",         // <-- Put your real photo filename
  caption: "The moment our eyes met...",
  description: "..."
}
```

### Step 2: Add Real Photos & Audio in `assets/`
1. **Photos**: Save your photos as `photo-1.jpg`, `photo-2.jpg`, etc., in the `assets/` directory and update the `image` path in `memories.js`.
2. **Voice Note**: Record a voice note on your phone, export as MP3, name it `voice-message.mp3`, and place it in `assets/`.
3. **Video**: Place your video clip as `love-story.mp4` in `assets/`.
4. **Background Music**: Place your song as `bg-music.mp3` in `assets/`. *(Note: If omitted, the website automatically plays a soothing ambient chime chord progression built into the Web Audio API!)*

### Step 3: Edit the Heartfelt Letter
In `memories.js`, find the `letter:` section to customize or update the letter text anytime:

```javascript
letter: {
  envelopePrompt: "Tap the wax seal to open your special letter",
  title: "En Anbu Ammu-vukku,",
  content: `Nee en life-la enakku kedacha special gift ammu...`,
  closingQuote: "This is not just a website. It's a little world I made just for you.",
  signature: "Always & Forever Yours,",
  authorName: "Un Purushan ❤️"
}
```

---

## 🚀 How to Run Locally

Because this is a pure static website:
1. Double-click `index.html` to open it directly in your web browser (Chrome, Edge, Safari, Firefox).
2. Or use any local static server:
   ```bash
   npx serve .
   ```
   or with Python:
   ```bash
   python -m http.server 8000
   ```

---

## ☁️ How to Deploy on Cloudflare Pages (Free & Fast)

Cloudflare Pages hosts static sites for free with global edge CDN and SSL certificates.

### Method 1: Direct Upload (Easiest & Most Private)
*Recommended for keeping personal family photos and voice recordings out of public Git repositories.*

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Compute (Workers) > Pages**.
3. Click **Create application** > **Pages** > **Direct Upload**.
4. Give your project a name (e.g., `our-little-universe`).
5. Drag and drop the entire project folder containing `index.html`, `styles.css`, `script.js`, `memories.js`, and `assets/`.
6. Click **Deploy Site**.
7. In seconds, Cloudflare will generate a live URL (e.g., `https://our-little-universe.pages.dev`).
8. Send this secret link to your wife! ❤️

### Method 2: Git Integration (Private GitHub Repository)
1. Initialize a git repository and push your project to a **Private** GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Our Little Universe surprise gift"
   git remote add origin https://github.com/your-username/our-little-universe.git
   git push -u origin main
   ```
2. In Cloudflare Pages, choose **Connect to Git**.
3. Select your private repository.
4. Set build settings:
   - **Framework preset**: None
   - **Build command**: (Leave empty)
   - **Build output directory**: `/` (or leave empty)
5. Click **Save and Deploy**. Any future updates pushed to Git will automatically deploy.

---

## 🔒 Privacy & Security

- **No Cookies or Trackers**: Zero third-party analytics, beacons, or scripts.
- **No Remote Backend**: Everything runs client-side inside the user's browser.
- **Personal Data Safety**: Cloudflare Pages Direct Upload allows deploying without exposing personal memories or voice files to public version control.

---

*Made with love by her husband. "This is not just a website. It's a little world I made just for you."*
