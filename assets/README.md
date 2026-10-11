# Assets Guide — ONLY YOU: OUR LITTLE UNIVERSE

This folder holds the photos, voice recording, background music, and video for the surprise website.

## Required & Optional Files

| File Name | Purpose | Recommended Format / Size | Status If Missing |
| :--- | :--- | :--- | :--- |
| `voice-message.mp3` | **Screen 5**: Voice recording for your wife | MP3 or M4A (1–3 minutes) | Shows an elegant, friendly placeholder card |
| `love-story.mp4` | **Screen 6**: Romantic video or photo montage | MP4 (H.264 video, AAC audio, 720p/1080p mobile-friendly) | Shows an elegant romantic cinema placeholder |
| `bg-music.mp3` | **Background Music**: Plays softly after she taps "Open Your Surprise" | Romantic instrumental MP3 (soft romantic acoustic/piano) | Gracefully falls back to peaceful ambient web chimes |
| `memory-1.svg` to `5.svg` | **Screen 3**: Memory Lane Timeline Photos | JPG / PNG / WebP (600x450 or 4:3 ratio) | Uses included vector illustrations |

---

## How to Replace with Your Real Photos

1. Copy your photos into this `assets/` folder (e.g., `assets/photo-1.jpg`, `assets/photo-2.jpg`, etc.).
2. Open `memories.js` in any text editor.
3. In the `memories` array, update the `image:` property for each item:
   ```javascript
   {
     id: 1,
     tag: "The Beginning",
     title: "Our First Meeting",
     date: "October 14, 2021",
     image: "assets/photo-1.jpg", // <-- Put your photo filename here!
     caption: "The day we first met at Marina beach...",
     description: "..."
   }
   ```
4. Save `memories.js`. Refresh your browser and your real photos will appear immediately!

---

## How to Add Your Voice Recording (`voice-message.mp3`)

1. Record a voice note on your phone (e.g. using iPhone Voice Memos or Android Sound Recorder).
2. Save or convert the audio to MP3 format.
3. Rename the file to:
   ```
   voice-message.mp3
   ```
4. Place it directly inside this `assets/` folder.
5. The audio player on **Screen 5** will automatically detect and play your real voice recording!

---

## How to Add Your Video (`love-story.mp4`)

1. Export your favorite video clip or slideshow as an MP4 file.
2. Rename the file to:
   ```
   love-story.mp4
   ```
3. Place it directly inside this `assets/` folder.
4. The video cinema on **Screen 6** will automatically load and play the video with mobile-friendly controls!

---

## How to Add Background Music (`bg-music.mp3`)

1. Choose a soft romantic instrumental or your favorite couple song.
2. Save it as `bg-music.mp3` inside this `assets/` folder.
3. When your wife taps **"Open Your Surprise ✨"**, the music starts softly, and she can pause/mute it anytime using the floating heart music toggle button.

---

## Privacy & Deployment Reminder

When deploying to **Cloudflare Pages**:
- If you want to keep personal photos and voice notes private, do not publish them in a public GitHub repository. You can either deploy directly via Cloudflare Pages direct upload (Wrangler or zip upload) or keep your GitHub repository set to **Private**.
