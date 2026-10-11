/**
 * ====================================================================
 * ONLY YOU — OUR LITTLE UNIVERSE
 * Interactive Experience Engine & Audio Controller
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if UniverseConfig exists
  const config = window.UniverseConfig || {};

  /* ------------------------------------------------------------------
     1. INITIALIZE DYNAMIC TEXT & METADATA
     ------------------------------------------------------------------ */
  initDynamicContent(config);

  /* ------------------------------------------------------------------
     2. AMBIENT STARFIELD & PARTICLES CANVAS
     ------------------------------------------------------------------ */
  initCosmicCanvas();

  /* ------------------------------------------------------------------
     3. BACKGROUND MUSIC & WEB AUDIO HARMONIC SYNTH FALLBACK
     ------------------------------------------------------------------ */
  const audioManager = initAudioManager(config);

  /* ------------------------------------------------------------------
     4. TIMELINE & REASONS RENDERING
     ------------------------------------------------------------------ */
  renderMemoryLane(config.memories || []);
  renderReasons(config.reasons || []);

  /* ------------------------------------------------------------------
     5. VOICE MESSAGE AUDIO PLAYER (SCREEN 5)
     ------------------------------------------------------------------ */
  initVoicePlayer(config.voiceMessage, audioManager);

  /* ------------------------------------------------------------------
     6. LOVE STORY VIDEO PLAYER (SCREEN 6)
     ------------------------------------------------------------------ */
  initVideoPlayer(config.loveStoryVideo, audioManager);

  /* ------------------------------------------------------------------
     7. INTERACTIVE ENVELOPE & LETTER (SCREEN 7)
     ------------------------------------------------------------------ */
  initEnvelope(config.letter);

  /* ------------------------------------------------------------------
     8. SCROLL OBSERVER & JOURNEY NAVIGATION
     ------------------------------------------------------------------ */
  initScrollAndNav();

  /* ------------------------------------------------------------------
     9. PHOTO LIGHTBOX MODAL
     ------------------------------------------------------------------ */
  initPhotoModal();

  /* ------------------------------------------------------------------
     10. START SURPRISE & REPLAY BUTTONS
     ------------------------------------------------------------------ */
  const startBtn = document.getElementById('start-surprise-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Start background music on first interaction
      audioManager.startMusic();

      // Smooth scroll to Screen 2
      const screen2 = document.getElementById('screen-2');
      if (screen2) {
        screen2.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const replayBtn = document.getElementById('replay-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      // Smooth scroll to top / Screen 1
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset envelope after short delay
      setTimeout(() => {
        const env = document.getElementById('envelope-element');
        if (env) {
          env.classList.remove('opened');
          env.setAttribute('aria-expanded', 'false');
        }
      }, 700);
    });
  }

  /* ------------------------------------------------------------------
     11. CUTE ROMANTIC INTERACTIONS & FLOATING HEARTS
     ------------------------------------------------------------------ */
  initInteractiveRomance();

  /* ------------------------------------------------------------------
     12. 10:30 PM BORN TIME COUNTDOWN & CELEBRATION (BGM 2 SYNC)
     ------------------------------------------------------------------ */
  initBornTimeCelebration(config.bornTime || {}, audioManager);
});

/* ====================================================================
   Dynamic Text Ingestion from memories.js
   ==================================================================== */
function initDynamicContent(config) {
  // Screen 1
  if (config.welcome) {
    const title = document.getElementById('welcome-title');
    const teaser = document.getElementById('welcome-teaser');
    const btn = document.getElementById('start-surprise-btn');
    if (title && config.welcome.nickname) {
      title.innerHTML = `${escapeHtml(config.welcome.nickname)}`;
    }
    if (teaser && config.welcome.teaser) {
      teaser.textContent = config.welcome.teaser;
    }
    if (btn && config.welcome.buttonText) {
      const btnText = btn.querySelector('.btn-text');
      if (btnText) btnText.textContent = config.welcome.buttonText;
    }
  }

  // Screen 2
  if (config.universe) {
    const quoteEl = document.getElementById('universe-quote-text');
    const subtextEl = document.getElementById('universe-subtext');
    if (quoteEl && config.universe.quote) quoteEl.textContent = config.universe.quote;
    if (subtextEl && config.universe.subtext) subtextEl.textContent = config.universe.subtext;
  }

  // Screen 7 Letter
  if (config.letter) {
    const salutationEl = document.getElementById('letter-salutation');
    const contentEl = document.getElementById('letter-content-text');
    const closingSignatureEl = document.getElementById('letter-closing-signature');
    const authorEl = document.getElementById('letter-author-name');
    const closingQuoteEl = document.getElementById('closing-quote-text');

    if (salutationEl) {
      salutationEl.innerHTML = `En Anbu <span class="highlight-ammu" id="highlight-ammu">Ammu</span>-vukku,`;
    }
    if (contentEl && config.letter.content) contentEl.textContent = config.letter.content;
    if (closingSignatureEl && config.letter.signature) closingSignatureEl.textContent = config.letter.signature;
    if (authorEl) {
      authorEl.innerHTML = `Stephen (Un Purushan) <span class="beating-heart" aria-hidden="true">❤️</span>`;
    }
    if (closingQuoteEl && config.letter.closingQuote) closingQuoteEl.textContent = `"${config.letter.closingQuote}"`;
  }

  // Screen 5 Voice Message
  if (config.voiceMessage) {
    const voiceTitleEl = document.getElementById('voice-title');
    const voiceSubtitleEl = document.getElementById('voice-subtitle');
    if (voiceTitleEl && config.voiceMessage.title) voiceTitleEl.textContent = config.voiceMessage.title;
    if (voiceSubtitleEl && config.voiceMessage.subtitle) voiceSubtitleEl.textContent = config.voiceMessage.subtitle;
  }
}

/* ====================================================================
   Screen 3: Render Memory Lane Timeline
   ==================================================================== */
function renderMemoryLane(memories) {
  const container = document.getElementById('memory-timeline');
  if (!container) return;

  container.innerHTML = '';

  memories.forEach((mem, index) => {
    const entry = document.createElement('article');
    entry.className = 'timeline-entry';
    entry.setAttribute('role', 'listitem');
    entry.style.transitionDelay = `${(index % 3) * 0.15}s`;

    entry.innerHTML = `
      <div class="timeline-marker" aria-hidden="true"></div>
      <div class="memory-card glass-panel">
        <div class="memory-img-wrapper" tabindex="0" role="button" aria-label="View photo: ${escapeHtml(mem.title)}" data-index="${index}">
          <img src="${escapeHtml(mem.image)}" 
               alt="${escapeHtml(mem.caption || mem.title)}" 
               class="memory-img" 
               loading="lazy" 
               onerror="handleImageError(this)">
          ${mem.tag ? `<div class="memory-tag-badge">${escapeHtml(mem.tag)}</div>` : ''}
        </div>
        <div class="memory-info">
          <div class="memory-date">
            <span aria-hidden="true">✦</span>
            <span>${escapeHtml(mem.date)}</span>
          </div>
          <h3 class="memory-title">${escapeHtml(mem.title)}</h3>
          <p class="memory-desc">${escapeHtml(mem.description)}</p>
        </div>
      </div>
    `;

    // Click handler for opening photo lightbox
    const imgWrapper = entry.querySelector('.memory-img-wrapper');
    if (imgWrapper) {
      imgWrapper.addEventListener('click', () => openPhotoModal(mem));
      imgWrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPhotoModal(mem);
        }
      });
    }

    container.appendChild(entry);
  });
}

// Global Image Error Fallback Handler
window.handleImageError = function(img) {
  img.onerror = null;
  img.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><rect fill="%2324103c" width="100%" height="100%"/><text fill="%23f472b6" font-size="28" font-family="sans-serif" x="50%" y="48%" text-anchor="middle">💖 Our Precious Memory</text><text fill="%23fde047" font-size="16" font-family="sans-serif" x="50%" y="58%" text-anchor="middle">Add your photo in assets/</text></svg>';
};

/* ====================================================================
   Screen 4: Render Things I Love About You Cards
   ==================================================================== */
function renderReasons(reasons) {
  const container = document.getElementById('reasons-grid');
  if (!container) return;

  container.innerHTML = '';

  reasons.forEach((reason, index) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.setAttribute('role', 'listitem');
    card.style.transitionDelay = `${(index % 4) * 0.12}s`;

    card.innerHTML = `
      <div class="reason-icon-bubble" aria-hidden="true">${reason.icon || '💖'}</div>
      <h3 class="reason-title">${escapeHtml(reason.title)}</h3>
      <p class="reason-desc">${escapeHtml(reason.description)}</p>
    `;

    container.appendChild(card);
  });
}

/* ====================================================================
   Screen 5: Custom Voice Player Logic
   ==================================================================== */
function initVoicePlayer(voiceConfig, audioManager) {
  const audio = document.getElementById('voice-audio-element');
  const playBtn = document.getElementById('voice-play-btn');
  const playIcon = document.getElementById('voice-play-icon');
  const seekBar = document.getElementById('voice-seek-bar');
  const curTimeEl = document.getElementById('voice-current-time');
  const durTimeEl = document.getElementById('voice-duration');
  const statusEl = document.getElementById('voice-status');
  const visualizer = document.getElementById('audio-visualizer');
  const fallbackNotice = document.getElementById('voice-fallback-notice');
  const backwardBtn = document.getElementById('voice-backward-btn');
  const forwardBtn = document.getElementById('voice-forward-btn');

  if (!audio || !playBtn) return;

  const audioSrc = (voiceConfig && voiceConfig.audioPath) ? voiceConfig.audioPath : 'assets/voice-message.mp3';
  audio.src = audioSrc;

  // Format MM:SS
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const vinylDisc = document.getElementById('vinyl-disc');

  // Play / Pause Toggle
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Instantly pause and mute background BGM completely so ONLY Stephen's song is heard!
      if (audioManager) audioManager.fadeMusicOut();

      // Also pause love story video if it was playing
      const videoEl = document.getElementById('love-story-video');
      if (videoEl && !videoEl.paused) videoEl.pause();

      audio.play().then(() => {
        playIcon.textContent = '⏸';
        playBtn.setAttribute('aria-label', 'Pause singing recording');
        visualizer.classList.add('playing');
        if (vinylDisc) vinylDisc.classList.add('spinning');
        statusEl.textContent = 'Playing: Nee anniku sing panna sonnala... 🎤❤️';
      }).catch((err) => {
        console.warn('Voice message audio play issue:', err);
        showFallback();
      });
    } else {
      audio.pause();
      playIcon.textContent = '▶';
      playBtn.setAttribute('aria-label', 'Play singing recording');
      visualizer.classList.remove('playing');
      if (vinylDisc) vinylDisc.classList.remove('spinning');
      statusEl.textContent = 'Paused';
      // Smoothly and slowly fade background BGM back in over 3 seconds
      if (audioManager) audioManager.fadeMusicIn(0.5, 3000);
    }
  });

  // Track Progress
  audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      seekBar.value = progressPercent;
      curTimeEl.textContent = formatTime(audio.currentTime);
      durTimeEl.textContent = formatTime(audio.duration);
    }
  });

  // Audio loaded metadata
  audio.addEventListener('loadedmetadata', () => {
    durTimeEl.textContent = formatTime(audio.duration);
    fallbackNotice.classList.add('hidden');
    statusEl.textContent = 'Ready to play';
  });

  // Audio ended - slowly resume romantic BGM
  audio.addEventListener('ended', () => {
    playIcon.textContent = '▶';
    visualizer.classList.remove('playing');
    if (vinylDisc) vinylDisc.classList.remove('spinning');
    seekBar.value = 0;
    curTimeEl.textContent = '0:00';
    statusEl.textContent = 'Dedicated with all my love ❤️ Tap to replay';
    // Smoothly and slowly fade background BGM back in over 3 seconds as requested
    if (audioManager) audioManager.fadeMusicIn(0.5, 3000);
  });

  // Scrubber / Seek input
  seekBar.addEventListener('input', () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
    }
  });

  // Rewind & Forward 10s
  if (backwardBtn) {
    backwardBtn.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
  }
  if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
      if (!isNaN(audio.duration)) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
      }
    });
  }

  // Graceful Error Handling for Missing Local Audio File
  const showFallback = () => {
    if (fallbackNotice) fallbackNotice.classList.remove('hidden');
    statusEl.textContent = 'Voice file waiting to be added';
    durTimeEl.textContent = '1:20';
  };

  audio.addEventListener('error', showFallback);
}

/* ====================================================================
   Screen 6: Love Story Video Logic
   ==================================================================== */
function initVideoPlayer(videoConfig, audioManager) {
  const video = document.getElementById('love-story-video');
  const fallbackCard = document.getElementById('video-fallback-card');

  if (!video) return;

  video.addEventListener('error', () => {
    if (fallbackCard) {
      fallbackCard.classList.remove('hidden');
      video.style.display = 'none';
    }
  });

  // If video loads successfully
  video.addEventListener('loadeddata', () => {
    if (fallbackCard) fallbackCard.classList.add('hidden');
    video.style.display = 'block';
  });

  // Coordinate background music with video playback:
  // When movie plays: background BGM stops completely!
  // When movie finishes/pauses: background BGM slowly fades back in from where it stopped!
  video.addEventListener('play', () => {
    if (audioManager) audioManager.fadeMusicOut();
  });

  video.addEventListener('pause', () => {
    if (audioManager) audioManager.fadeMusicIn(0.5, 2500);
  });

  video.addEventListener('ended', () => {
    if (audioManager) audioManager.fadeMusicIn(0.5, 2500);
  });
}

/* ====================================================================
   Screen 7: Interactive Envelope & Heart Sparkles
   ==================================================================== */
function initEnvelope() {
  const envelope = document.getElementById('envelope-element');
  const waxSeal = document.getElementById('wax-seal');
  const promptEl = document.getElementById('envelope-prompt');

  if (!envelope) return;

  const openLetter = () => {
    if (!envelope.classList.contains('opened')) {
      envelope.classList.add('opened');
      envelope.setAttribute('aria-expanded', 'true');
      if (promptEl) {
        promptEl.textContent = 'Read with all your heart ❤️';
      }
      triggerRomanticConfetti();
      startLetterAmbience();
    }
  };

  envelope.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLetter();
    }
  });

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetter();
    });
  }
}

// Romantic Rose Petals & Floating Heart Ambiance while reading letter
function startLetterAmbience() {
  const container = document.getElementById('screen-7');
  if (!container) return;
  const symbols = ['🌸', '💖', '✨', '💕', '🌹'];
  let count = 0;
  const maxPetals = 20;
  const interval = setInterval(() => {
    if (count >= maxPetals) {
      clearInterval(interval);
      return;
    }
    count++;
    const petal = document.createElement('span');
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.position = 'absolute';
    petal.style.left = `${15 + Math.random() * 70}%`;
    petal.style.bottom = '40px';
    petal.style.fontSize = `${16 + Math.random() * 14}px`;
    petal.style.pointerEvents = 'none';
    petal.style.opacity = '0';
    petal.style.zIndex = '10';
    petal.style.transition = `transform ${4.5 + Math.random() * 2.5}s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s ease`;
    container.appendChild(petal);

    requestAnimationFrame(() => {
      petal.style.opacity = '0.85';
      const driftX = (Math.random() * 80 - 40);
      petal.style.transform = `translate(${driftX}px, -260px) rotate(${Math.random() * 180 - 90}deg)`;
    });

    setTimeout(() => {
      petal.style.opacity = '0';
      setTimeout(() => {
        if (petal.parentNode) petal.parentNode.removeChild(petal);
      }, 1500);
    }, 4500);
  }, 600);
}

// Gentle Romantic Confetti / Sparkle Burst for Screen 7
function triggerRomanticConfetti() {
  const symbols = ['💖', '✨', '🌸', '⭐', '❤️', '🕊️'];
  const count = 24;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.position = 'fixed';
    el.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    el.style.top = `${60 + (Math.random() * 10 - 5)}%`;
    el.style.fontSize = `${16 + Math.random() * 16}px`;
    el.style.pointerEvents = 'none';
    el.style.zIndex = '999';
    el.style.transition = `all ${1.2 + Math.random() * 1.2}s cubic-bezier(0.16, 1, 0.3, 1)`;
    el.style.opacity = '1';

    document.body.appendChild(el);

    // Random explosion vector
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 180;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 80;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) scale(0.6) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2500);
  }
}

/* ====================================================================
   Background Music Controller & Professional DJ Seamless Crossfader
   ==================================================================== */
function initAudioManager(config) {
  const musicBtn = document.getElementById('music-toggle-btn');
  const bgAudioA = document.getElementById('bg-music-player');
  const bgAudioB = document.getElementById('bg-music-player-2');
  const vaultAudio = document.getElementById('vault-music-player');
  const musicIcon = document.getElementById('music-icon');

  const musicSrc1 = (config.backgroundMusic && config.backgroundMusic.audioPath)
    ? config.backgroundMusic.audioPath
    : 'assets/our-song.mp3';
  const musicSrc2 = (config.backgroundMusic && config.backgroundMusic.audioPath2)
    ? config.backgroundMusic.audioPath2
    : 'assets/bg-music-2.mp3';
  const vaultMusicSrc = (config.bornTime && config.bornTime.vaultSongPath)
    ? config.bornTime.vaultSongPath
    : 'assets/vault-song.mp3';

  if (bgAudioA) {
    bgAudioA.src = musicSrc1;
    bgAudioA.volume = 0.5;
    bgAudioA.preload = 'auto';
  }
  if (bgAudioB) {
    bgAudioB.src = musicSrc2;
    bgAudioB.volume = 0.0;
    bgAudioB.preload = 'auto';
  }
  if (vaultAudio) {
    vaultAudio.src = vaultMusicSrc;
    vaultAudio.volume = 0.0;
    vaultAudio.preload = 'auto';
  }

  let isPlaying = false;
  let activeDeck = 'A'; // 'A' or 'B'
  let djTimer = null;
  let crossfadeInterval = null;
  let synthActive = false;
  let synthInterval = null;
  let audioCtx = null;
  let hasSecondTrack = Boolean(musicSrc2);

  // Check if second BGM track exists & is ready
  const onDeckBReady = () => {
    hasSecondTrack = true;
    if (isPlaying && !djTimer && !crossfadeInterval) {
      startDJRotation();
    }
  };

  if (bgAudioB) {
    bgAudioB.addEventListener('canplay', onDeckBReady);
    bgAudioB.addEventListener('canplaythrough', onDeckBReady);
    bgAudioB.addEventListener('loadeddata', onDeckBReady);
    bgAudioB.addEventListener('loadedmetadata', onDeckBReady);
    bgAudioB.addEventListener('error', () => {
      hasSecondTrack = false;
    });
  }

  // Fallback Ambient Synth Chords (Fmaj7 -> Cmaj7 -> Dm7 -> Am7)
  const chords = [
    [349.23, 440.00, 523.25, 659.25],
    [261.63, 329.63, 392.00, 493.88],
    [293.66, 349.23, 440.00, 523.25],
    [220.00, 261.63, 329.63, 392.00]
  ];
  let currentChordIndex = 0;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playAmbientChime(freq, delay, duration = 3.5) {
    const ctx = getAudioContext();
    if (!ctx) return;
    setTimeout(() => {
      if (!isPlaying || !synthActive) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }, delay * 1000);
  }

  function playNextChord() {
    if (!isPlaying || !synthActive) return;
    const chord = chords[currentChordIndex];
    chord.forEach((noteFreq, i) => playAmbientChime(noteFreq, i * 0.45, 4.0));
    currentChordIndex = (currentChordIndex + 1) % chords.length;
  }

  function startSynthMelody() {
    synthActive = true;
    playNextChord();
    if (synthInterval) clearInterval(synthInterval);
    synthInterval = setInterval(playNextChord, 4500);
  }

  function stopSynthMelody() {
    synthActive = false;
    if (synthInterval) clearInterval(synthInterval);
  }

  // Professional DJ Crossfader between Deck A (our-song) and Deck B (bg-music-2)
  function startDJRotation() {
    if (djTimer) clearTimeout(djTimer);
    if (!hasSecondTrack || !isPlaying) return;

    // Alternate smoothly every 35 seconds so both songs get equal, prompt playback!
    djTimer = setTimeout(() => {
      if (!isPlaying) return;
      crossfadeDecks();
    }, 35000);
  }

  function crossfadeDecks() {
    if (!isPlaying || !hasSecondTrack) return;
    if (crossfadeInterval) clearInterval(crossfadeInterval);

    const fromDeck = activeDeck === 'A' ? bgAudioA : bgAudioB;
    const toDeck = activeDeck === 'A' ? bgAudioB : bgAudioA;
    activeDeck = activeDeck === 'A' ? 'B' : 'A';

    const maxVolume = 0.5;
    toDeck.volume = 0;
    toDeck.play().then(() => {
      const durationMs = 4500; // 4.5 second smooth professional DJ crossfade
      const steps = 45;
      const stepTime = durationMs / steps;
      let currentStep = 0;

      crossfadeInterval = setInterval(() => {
        currentStep++;
        const p = currentStep / steps; // 0 to 1
        // Equal-power crossfade curve: prevents any perceived volume drop!
        const volFrom = maxVolume * Math.cos(p * 0.5 * Math.PI);
        const volTo = maxVolume * Math.sin(p * 0.5 * Math.PI);

        fromDeck.volume = Math.max(0, Math.min(maxVolume, volFrom));
        toDeck.volume = Math.max(0, Math.min(maxVolume, volTo));

        if (currentStep >= steps) {
          clearInterval(crossfadeInterval);
          crossfadeInterval = null;
          fromDeck.pause();
          fromDeck.volume = maxVolume;
          startDJRotation(); // Schedule next transition
        }
      }, stepTime);
    }).catch((err) => {
      console.warn('Crossfade playback blocked:', err);
      activeDeck = activeDeck === 'A' ? 'B' : 'A'; // Revert on autoplay block
      startDJRotation();
    });
  }

  // Auto crossfade 5 seconds before track reaches end
  const checkTrackEnd = (deck) => {
    if (hasSecondTrack && isPlaying && deck.duration && (deck.duration - deck.currentTime <= 5)) {
      if (!crossfadeInterval) {
        crossfadeDecks();
      }
    }
  };
  if (bgAudioA) bgAudioA.addEventListener('timeupdate', () => { if (activeDeck === 'A') checkTrackEnd(bgAudioA); });
  if (bgAudioB) bgAudioB.addEventListener('timeupdate', () => { if (activeDeck === 'B') checkTrackEnd(bgAudioB); });

  function playMusic() {
    isPlaying = true;
    if (musicBtn) {
      musicBtn.classList.add('playing', 'active');
      if (musicIcon) musicIcon.textContent = '💖';
    }

    const currentAudio = activeDeck === 'A' ? bgAudioA : bgAudioB;
    if (currentAudio) {
      currentAudio.play().then(() => {
        stopSynthMelody();
        startDJRotation();
      }).catch(() => {
        startSynthMelody();
      });
    } else {
      startSynthMelody();
    }
  }

  function pauseMusic() {
    isPlaying = false;
    if (djTimer) clearTimeout(djTimer);
    if (crossfadeInterval) clearInterval(crossfadeInterval);
    if (musicBtn) {
      musicBtn.classList.remove('playing', 'active');
      if (musicIcon) musicIcon.textContent = '🎵';
    }
    if (bgAudioA) bgAudioA.pause();
    if (bgAudioB) bgAudioB.pause();
    if (vaultAudio) vaultAudio.pause();
    stopSynthMelody();
  }

  if (bgAudioA) {
    bgAudioA.addEventListener('error', () => {
      if (isPlaying && !hasSecondTrack) startSynthMelody();
    });
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) pauseMusic();
      else playMusic();
    });
  }

  let fadeInterval = null;

  // Smoothly fade volume to zero and pause background music completely
  function fadeMusicOut(callback) {
    if (fadeInterval) clearInterval(fadeInterval);
    if (djTimer) clearTimeout(djTimer);
    if (crossfadeInterval) clearInterval(crossfadeInterval);

    // Immediately mute and pause any playing background music decks AND vault audio
    [bgAudioA, bgAudioB, vaultAudio].forEach((deck) => {
      if (deck && !deck.paused) {
        deck.volume = 0;
        deck.pause();
      }
    });

    stopSynthMelody();
    if (callback) callback();
  }

  // Resume background music from where it stopped and slowly fade in volume (2.5s smooth ramp)
  function fadeMusicIn(targetVol = 0.5, durationMs = 2500) {
    if (fadeInterval) clearInterval(fadeInterval);

    // Make sure vault audio is stopped when returning to main website
    if (vaultAudio && !vaultAudio.paused) {
      vaultAudio.pause();
      vaultAudio.currentTime = 0;
      vaultAudio.volume = 0;
    }

    const currentAudio = activeDeck === 'A' ? bgAudioA : bgAudioB;
    if (currentAudio) {
      currentAudio.volume = 0;
      currentAudio.play().then(() => {
        isPlaying = true;
        if (musicBtn) {
          musicBtn.classList.add('playing', 'active');
          if (musicIcon) musicIcon.textContent = '💖';
        }

        const stepTime = 50;
        const totalSteps = durationMs / stepTime;
        const volStep = targetVol / totalSteps;
        let curVol = 0;

        fadeInterval = setInterval(() => {
          curVol = Math.min(targetVol, curVol + volStep);
          currentAudio.volume = curVol;
          if (curVol >= targetVol) {
            clearInterval(fadeInterval);
            startDJRotation();
          }
        }, stepTime);
      }).catch((err) => {
        console.warn('Audio resume error:', err);
      });
    } else {
      startSynthMelody();
    }
  }

  // Play Dedicated Secret Vault Audio Player (assets/vault-song.mp3)
  function playBornTimeBGM(targetVol = 0.85) {
    if (djTimer) clearTimeout(djTimer);
    if (crossfadeInterval) clearInterval(crossfadeInterval);
    if (fadeInterval) clearInterval(fadeInterval);

    // Pause normal background decks
    if (bgAudioA && !bgAudioA.paused) bgAudioA.pause();
    if (bgAudioB && !bgAudioB.paused) bgAudioB.pause();
    stopSynthMelody();

    if (musicBtn) {
      musicBtn.classList.add('playing', 'active');
      if (musicIcon) musicIcon.textContent = '💖';
    }

    if (vaultAudio) {
      vaultAudio.currentTime = 0;
      vaultAudio.volume = 0;
      vaultAudio.play().then(() => {
        let curVol = 0;
        const ramp = setInterval(() => {
          curVol = Math.min(targetVol, curVol + 0.08);
          vaultAudio.volume = curVol;
          if (curVol >= targetVol) {
            clearInterval(ramp);
          }
        }, 50);
      }).catch((err) => {
        console.warn('Vault audio play error:', err);
      });
    }
  }

  // When closing Secret Vault: Stop Vault BGM completely and return to Normal BGM
  function stopVaultAndResumeNormalBGM(targetVol = 0.5) {
    if (fadeInterval) clearInterval(fadeInterval);
    if (crossfadeInterval) clearInterval(crossfadeInterval);
    if (djTimer) clearTimeout(djTimer);

    // 1. Immediately pause and reset Vault Audio
    if (vaultAudio) {
      vaultAudio.pause();
      vaultAudio.currentTime = 0;
      vaultAudio.volume = 0;
    }

    // 2. Resume normal website BGM (active deck)
    const currentAudio = activeDeck === 'A' ? bgAudioA : bgAudioB;
    if (currentAudio) {
      currentAudio.volume = 0;
      currentAudio.play().then(() => {
        isPlaying = true;
        if (musicBtn) {
          musicBtn.classList.add('playing', 'active');
          if (musicIcon) musicIcon.textContent = '💖';
        }
        let cur = 0;
        fadeInterval = setInterval(() => {
          cur = Math.min(targetVol, cur + 0.05);
          currentAudio.volume = cur;
          if (cur >= targetVol) {
            clearInterval(fadeInterval);
            startDJRotation(); // Resume DJ rotation timer!
          }
        }, 50);
      }).catch((err) => {
        console.warn('Resume normal BGM error:', err);
      });
    }
  }

  // Smoothly return volume to normal background level after celebration
  function restoreNormalBGMVolume(targetVol = 0.5, durationMs = 2500) {
    stopVaultAndResumeNormalBGM(targetVol);
  }

  return {
    startMusic: () => {
      if (!isPlaying) playMusic();
    },
    fadeMusicOut: (callback) => fadeMusicOut(callback),
    fadeMusicIn: (targetVol, durationMs) => fadeMusicIn(targetVol, durationMs),
    duckMusic: (shouldDuck) => {
      if (shouldDuck) fadeMusicOut();
      else fadeMusicIn();
    },
    playBornTimeBGM: (targetVol) => playBornTimeBGM(targetVol),
    restoreNormalBGMVolume: (targetVol, durationMs) => restoreNormalBGMVolume(targetVol, durationMs),
    stopVaultAndResumeNormalBGM: (targetVol) => stopVaultAndResumeNormalBGM(targetVol)
  };
}

/* ====================================================================
   Canvas Ambient Universe (Stars & Floating Twinkles)
   ==================================================================== */
function initCosmicCanvas() {
  const canvas = document.getElementById('universe-canvas');
  if (!canvas) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });

  const isMobile = width < 768;
  const starCount = isMobile ? 32 : 48;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      isGold: Math.random() < 0.15,
      isPink: Math.random() < 0.2
    });
  }

  // Gently falling romantic rose petals (lightweight: 6 on mobile, 10 on desktop)
  const petalCount = isMobile ? 6 : 10;
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 3,
      speedY: Math.random() * 0.5 + 0.3,
      speedX: Math.random() * 0.3 - 0.15,
      alpha: Math.random() * 0.25 + 0.2
    });
  }

  // Occasional shooting star
  let shootingStar = null;
  function spawnShootingStar() {
    if (Math.random() < 0.005 && !shootingStar) {
      shootingStar = {
        x: Math.random() * width,
        y: Math.random() * (height * 0.35),
        len: Math.random() * 60 + 35,
        speed: Math.random() * 7 + 5,
        alpha: 0.9
      };
    }
  }

  let lastFrameTime = 0;
  const fpsLimit = 35; // 35fps is buttery smooth for background canvas while cutting GPU load by 60%
  const frameInterval = 1000 / fpsLimit;

  function renderStars(timestamp) {
    if (document.hidden) {
      requestAnimationFrame(renderStars);
      return;
    }

    const elapsed = timestamp - lastFrameTime;
    if (elapsed < frameInterval) {
      requestAnimationFrame(renderStars);
      return;
    }
    lastFrameTime = timestamp - (elapsed % frameInterval);

    ctx.clearRect(0, 0, width, height);

    // Draw twinkling stars
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.alpha += star.twinkleSpeed;
      if (star.alpha <= 0.15 || star.alpha >= 0.95) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.isGold
        ? `rgba(251, 191, 36, ${star.alpha})`
        : (star.isPink ? `rgba(244, 114, 182, ${star.alpha})` : `rgba(255, 253, 248, ${star.alpha})`);
      ctx.fill();
    }

    // Draw gentle floating petals (lightweight draw without Matrix allocations)
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.015) * 0.5 + p.speedX;
      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
      ctx.fill();
    }

    // Draw shooting star
    spawnShootingStar();
    if (shootingStar) {
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(shootingStar.x - shootingStar.len, shootingStar.y - shootingStar.len * 0.5);
      ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      shootingStar.x += shootingStar.speed;
      shootingStar.y += shootingStar.speed * 0.5;
      shootingStar.alpha -= 0.03;
      if (shootingStar.alpha <= 0) shootingStar = null;
    }

    requestAnimationFrame(renderStars);
  }

  requestAnimationFrame(renderStars);
}

/* ====================================================================
   Scroll Observer & Journey Navigation Dots
   ==================================================================== */
function initScrollAndNav() {
  const screens = document.querySelectorAll('.screen');
  const dotBtns = document.querySelectorAll('.journey-dots .dot-btn');

  // Smooth scroll when tapping dot
  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetScreen = document.getElementById(targetId);
      if (targetScreen) {
        targetScreen.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // IntersectionObserver for tracking current screen
  const screenObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dotBtns.forEach((dot) => {
          if (dot.getAttribute('data-target') === id) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.45 });

  screens.forEach((s) => screenObserver.observe(s));

  // IntersectionObserver for revealing timeline items and cards
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-entry, .reason-card').forEach((el) => {
    revealObserver.observe(el);
  });
}

/* ====================================================================
   Photo Lightbox Modal Logic
   ==================================================================== */
function initPhotoModal() {
  const modal = document.getElementById('photo-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openPhotoModal(mem) {
  const modal = document.getElementById('photo-modal');
  const img = document.getElementById('modal-img');
  const tag = document.getElementById('modal-tag');
  const title = document.getElementById('modal-title');
  const date = document.getElementById('modal-date');
  const desc = document.getElementById('modal-desc');

  if (!modal || !img) return;

  img.src = mem.image;
  img.alt = mem.caption || mem.title;
  tag.textContent = mem.tag || '';
  title.textContent = mem.title;
  date.textContent = mem.date;
  desc.textContent = mem.description;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

/* ====================================================================
   Security: HTML Escaping Helper
   ==================================================================== */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ====================================================================
   ROMANTIC MICRO-ANIMATIONS & INTERACTIVE CUTE EXPERIENCES (SMOOTH & ZERO LAG)
   ==================================================================== */
function initInteractiveRomance() {
  // 1. Universal Tap Anywhere = Floating Love Heart (Throttled for zero scroll lag)
  const heartSymbols = [
    '💖', '💕', '🌸', '✨', '🥰', '❤️', '💫',
    'Unakku Naan Enakku Nee ❤️', 'I Love You Ammu 💖', 'Gundu Magaleyy 🥰', 'Stephen ❤️ Ammu', 'En Anbu Ammu 🌸'
  ];

  let lastTapTime = 0;
  function spawnTapHeart(x, y) {
    const now = Date.now();
    if (now - lastTapTime < 350) return; // Prevent spam lag
    lastTapTime = now;

    // Keep active heart particles capped at 3
    const existing = document.querySelectorAll('.tap-heart-particle');
    if (existing.length >= 3 && existing[0]) {
      existing[0].remove();
    }

    const heart = document.createElement('span');
    heart.className = 'tap-heart-particle';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const dx = (Math.random() * 50 - 25) + 'px';
    heart.style.setProperty('--dx', dx);

    document.body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 1200);
  }

  // Use click event (not pointerdown) so touch-scrolling is buttery smooth without triggering hearts
  document.addEventListener('click', (e) => {
    // Avoid triggering inside sliders, audio players, or close buttons
    if (e.target.closest('input[type="range"]') || e.target.closest('button') || e.target.closest('a') || e.target.closest('.modal-close-btn') || e.target.closest('.vault-close-btn')) return;
    spawnTapHeart(e.clientX, e.clientY);
  });

  // 2. Button Tap Heart Burst Effect (Optimized: 5 lightweight particles)
  const allButtons = document.querySelectorAll('.btn, .ctrl-btn, .scroll-cue-btn, .kiss-btn, .dot-btn, .wax-seal');
  allButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnButtonHeartBurst(cx, cy);
    });
  });

  function spawnButtonHeartBurst(cx, cy) {
    const count = 5;
    const icons = ['💖', '✨', '🌸', '❤️'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'btn-burst-particle';
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;

      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4);
      const dist = 35 + Math.random() * 25;
      const vx = `${Math.cos(angle) * dist}px`;
      const vy = `${Math.sin(angle) * dist}px`;

      p.style.setProperty('--vx', vx);
      p.style.setProperty('--vy', vy);

      document.body.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 850);
    }
  }

  // 3. Compliment Cards Interactive Love Reaction (Exact Sweet Tamil Notes)
  const sweetTamilNotes = [
    "Unakku naan, enakku nee! ❤️",
    "I love you di gundu magaleyy! 💖",
    "Ammu dhaan en whole universe! 🌸",
    "Nee en life-la kedacha periya gift ammu! 💖",
    "Always & forever yours, Stephen! ✨",
    "Un innocent siripu dhaan en weakness ammu! 💫"
  ];

  const reasonCards = document.querySelectorAll('.reason-card');
  reasonCards.forEach((card, index) => {
    let badge = card.querySelector('.card-love-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'card-love-badge';
      badge.textContent = 'Tap to Love 💖';
      card.appendChild(badge);
    }

    let loveCount = 0;
    card.addEventListener('click', () => {
      loveCount++;
      badge.textContent = `${loveCount} ❤️ Love`;

      const rect = card.getBoundingClientRect();
      spawnButtonHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

      const note = sweetTamilNotes[index % sweetTamilNotes.length];
      showRomanticToast(note, '🥰');
    });
  });

  // 4. Flying Kiss Button Action
  const kissBtn = document.getElementById('flying-kiss-btn');
  if (kissBtn) {
    kissBtn.addEventListener('click', () => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const x = Math.random() * window.innerWidth;
          const y = window.innerHeight * 0.75 + Math.random() * (window.innerHeight * 0.15);
          spawnTapHeart(x, y);
        }, i * 90);
      }

      showRomanticToast("Flying kiss sent to Stephen! Stephen: 'I love you di gundu magaleyy!' ❤️", "😘");
    });
  }

  // 5. Interactive Gold Certificate Click & Actions
  const certEl = document.getElementById('gold-certificate');
  if (certEl) {
    certEl.addEventListener('click', () => {
      if (typeof triggerRomanticConfetti === 'function') triggerRomanticConfetti();
      showRomanticToast("Certified & Sealed: Ammu belongs to Stephen for infinity! 💍❤️", "👑");
    });
  }

  // 6. Certificate Download & Print Handlers
  const downloadCertBtn = document.getElementById('download-cert-btn');
  const printCertBtn = document.getElementById('print-cert-btn');

  if (downloadCertBtn) {
    downloadCertBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadCertificate();
    });
  }

  if (printCertBtn) {
    printCertBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showRomanticToast("Opening print dialog... Choose 'Save as PDF'! 📄❤️", "🖨️");
      setTimeout(() => {
        window.print();
      }, 350);
    });
  }
}

// Dedicated Certificate Exporter Engine (Flawless Pixel-Perfect HD Canvas Generator)
function downloadCertificate() {
  showRomanticToast("Preparing Ammu's HD Certificate... 👑💖", "⏳");
  generateHDCanvasCertificate();
}

function triggerFileDownload(dataUrl, fileName) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Standalone High-Definition (1600x1100) Masterpiece Canvas Certificate Generator
async function generateHDCanvasCertificate() {
  // Wait for Google Fonts (Great Vibes, Cormorant Garamond, Plus Jakarta Sans) to be fully ready
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {}
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1100;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = 1600;
  const H = 1100;
  const midX = W / 2; // 800

  // 1. Warm Antique Ivory & Cream Parchment Background
  const bgGrad = ctx.createRadialGradient(midX, H / 2, 80, midX, H / 2, 900);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.55, '#fffef7');
  bgGrad.addColorStop(1, '#fef9eb');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Ornate Double Gold Border
  // Outer Border
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#d97706';
  ctx.strokeRect(36, 36, W - 72, H - 72);

  // Inner Fine Gold Line
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#b45309';
  ctx.strokeRect(50, 50, W - 100, H - 100);

  // Corner Rosette Accents
  ctx.fillStyle = '#d97706';
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const corners = [
    [43, 43], [W - 43, 43], [43, H - 43], [W - 43, H - 43],
    [60, 60], [W - 60, 60], [60, H - 60], [W - 60, H - 60]
  ];
  corners.forEach(([cx, cy]) => ctx.fillText('✦', cx, cy));

  // 3. Royal Crown Emblem
  ctx.font = '64px sans-serif';
  ctx.fillText('👑', midX, 125);

  // 4. Gold Pill Banner
  const bannerW = 540;
  const bannerH = 38;
  const bannerX = midX - bannerW / 2;
  const bannerY = 165;
  ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 19);
  } else {
    ctx.rect(bannerX, bannerY, bannerW, bannerH);
  }
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#d97706';
  ctx.stroke();

  ctx.fillStyle = '#b45309';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✦ OFFICIAL LIFETIME LOVE AGREEMENT ✦', midX, 184);

  // 5. Subtitle
  ctx.fillStyle = '#7e22ce';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Certified by the Universe & Registered in Husband\'s Heart', midX, 225);

  // 6. Awardee Category
  ctx.fillStyle = '#831843';
  ctx.font = 'bold italic 34px "Cormorant Garamond", serif';
  ctx.fillText('World\'s Best Wife & Permanent Soulmate', midX, 275);

  // 7. Salutation Label
  ctx.fillStyle = '#4c1d95';
  ctx.font = '20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Awarded with Infinite Love to:', midX, 325);

  // 8. Wife Name ("Shalini" in Large Gorgeous Calligraphy)
  ctx.fillStyle = '#db2777';
  ctx.font = 'italic bold 96px "Great Vibes", "Cormorant Garamond", cursive, serif';
  ctx.fillText('Shalini', midX, 420);

  // 9. Nickname
  ctx.fillStyle = '#831843';
  ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('(En Anbu Ammu) ❤️', midX, 485);

  // 10. Star Divider
  ctx.fillStyle = '#d97706';
  ctx.font = '26px serif';
  ctx.fillText('✦   ✦   ✦', midX, 535);

  // 11. Agreement Terms Text (Centered & Balanced)
  ctx.fillStyle = '#3b1254';
  ctx.font = 'italic 23px "Cormorant Garamond", serif';
  ctx.fillText('"Certified to be loved to infinity, scolded with pure affection,', midX, 585);
  ctx.fillText('protected through every storm, and cared for like a baby until our hair turns grey."', midX, 622);

  // 12. Validity Box
  const pillW = 820;
  const pillH = 48;
  const pillX = midX - pillW / 2;
  const pillY = 665;
  ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(pillX, pillY, pillW, pillH, 24);
  } else {
    ctx.rect(pillX, pillY, pillW, pillH);
  }
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.fillStyle = '#92400e';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VALIDITY: Indha Jenmam & Innum 7 Jenmangalukkum (Lifetime & Forever) ❤️', midX, 689);

  // 13. Horizontal Divider Line
  ctx.strokeStyle = 'rgba(219, 39, 119, 0.35)';
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(140, 750);
  ctx.lineTo(W - 140, 750);
  ctx.stroke();
  ctx.setLineDash([]);

  // Center diamond accent on divider
  ctx.fillStyle = '#d97706';
  ctx.font = '20px serif';
  ctx.fillText('✦', midX, 750);

  // 14. Footer Elements (Left: Seal, Center: Registry, Right: Signature)
  // Left: Pure Love Gold Seal Graphic (Center: X = 320, Y = 875)
  const sealX = 320;
  const sealY = 875;
  const sealR = 56;
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 8, sealX, sealY, sealR);
  sealGrad.addColorStop(0, '#fef08a');
  sealGrad.addColorStop(0.55, '#f59e0b');
  sealGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#fffbeb';
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '32px sans-serif';
  ctx.fillText('❤️', sealX, sealY - 8);
  ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('PURE LOVE', sealX, sealY + 24);

  // Center: Registry Details
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✦ REGISTRY NO: STEPHEN-SHALINI-2026 ✦', midX, 855);
  ctx.fillStyle = '#64748b';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Recorded in the Universe • Seven Lifetimes Guarantee', midX, 882);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Forever & Always Ammu\'s Devoted Husband ❤️', midX, 905);

  // Right: Signature Block (Center: X = 1280, Y = 875)
  const sigX = 1280;
  ctx.fillStyle = '#475569';
  ctx.font = 'italic 17px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Un Purushan (Signed with Eternal Love):', sigX, 845);

  ctx.fillStyle = '#db2777';
  ctx.font = 'italic bold 64px "Great Vibes", "Cormorant Garamond", cursive, serif';
  ctx.fillText('Stephen ❤️', sigX, 908);

  // 15. Bottom Watermark Note
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('✦ Only You • Ammu\'s Midnight Miracle Chamber • Handcrafted with Infinite Love by Stephen ✦', midX, 1010);

  // Export to PNG & Trigger Download
  try {
    const dataUrl = canvas.toDataURL('image/png');
    triggerFileDownload(dataUrl, 'Shalini_Lifetime_Love_Certificate.png');
    if (typeof triggerRomanticConfetti === 'function') triggerRomanticConfetti();
    showRomanticToast('Certificate downloaded to gallery! Ammu belongs to Stephen! 👑💖', '🎉');
  } catch (err) {
    console.error('Failed to export certificate canvas:', err);
    showRomanticToast('Please use "Print / Save as PDF" button! 📄❤️', '⚠️');
  }
}

// Synthesized Web Audio Sound Effects for Key & Padlock Animation
function createSynthesizedLockAudio() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let ctx = null;

  function getCtx() {
    if (!ctx && AudioCtx) ctx = new AudioCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  return {
    playKeyChime() {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      // Sweet 4-note ascending celestial chime (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        try {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          gain.gain.setValueAtTime(0.001, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.09, now + i * 0.1 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 0.45);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.5);
        } catch (e) {}
      });
    },

    playKeyTurnSound() {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.07);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } catch (e) {}
    },

    playUnlockFanfare() {
      const c = getCtx();
      if (!c) return;
      const now = c.currentTime;
      try {
        // Metallic latch pop
        const latch = c.createOscillator();
        const latchGain = c.createGain();
        latch.type = 'square';
        latch.frequency.setValueAtTime(480, now);
        latch.frequency.exponentialRampToValueAtTime(140, now + 0.08);
        latchGain.gain.setValueAtTime(0.16, now);
        latchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        latch.connect(latchGain);
        latchGain.connect(c.destination);
        latch.start(now);
        latch.stop(now + 0.1);

        // Joyful bell chord arpeggio
        const chord = [392.00, 523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, idx) => {
          const bell = c.createOscillator();
          const bellGain = c.createGain();
          bell.type = 'sine';
          bell.frequency.setValueAtTime(freq, now + 0.05 + idx * 0.07);
          bellGain.gain.setValueAtTime(0.001, now + 0.05 + idx * 0.07);
          bellGain.gain.exponentialRampToValueAtTime(0.09, now + 0.07 + idx * 0.07);
          bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65 + idx * 0.07);
          bell.connect(bellGain);
          bellGain.connect(c.destination);
          bell.start(now + 0.05 + idx * 0.07);
          bell.stop(now + 0.75 + idx * 0.07);
        });
      } catch (e) {}
    }
  };
}

// 5. Romantic Toast Notification Helper
let toastTimer = null;
function showRomanticToast(msg, icon = '💖') {
  const toast = document.getElementById('romantic-toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  const iconEl = toast.querySelector('.toast-icon');
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add('visible');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
}

/* ====================================================================
   10:30 PM BORN TIME, LOVE PASSWORD & KEY UNLOCKING ENGINE
   ==================================================================== */
function initBornTimeCelebration(bornConfig, audioManager) {
  const targetHour = (bornConfig && bornConfig.hour !== undefined) ? bornConfig.hour : 22; // 10 PM
  const targetMinute = (bornConfig && bornConfig.minute !== undefined) ? bornConfig.minute : 30; // 30 Mins
  const EXPECTED_PASSWORD = (bornConfig && bornConfig.secretPassword) ? bornConfig.secretPassword : "Sh@lini@28";

  const tickerEl = document.getElementById('countdown-ticker');
  const triggerBtn = document.getElementById('trigger-1030-btn');
  const triggerBtnIcon = document.getElementById('trigger-btn-icon');
  const triggerBtnText = document.getElementById('trigger-btn-text');
  const finaleSecretBtn = document.getElementById('finale-secret-btn');

  const modal = document.getElementById('celebration-1030-modal');
  const closeBtn = document.getElementById('celebration-close-btn');
  const vaultCloseBtn = document.getElementById('vault-close-btn');
  const backdrop = document.getElementById('celebration-backdrop');
  const canvas = document.getElementById('fireworks-canvas');
  const polaroidGrid = document.getElementById('polaroid-grid');
  const promisesGrid = document.getElementById('promises-grid');

  // Locked Suspense Modal & Love Password Elements
  const lockedModal = document.getElementById('locked-suspense-modal');
  const lockedCloseBtn = document.getElementById('locked-close-btn');
  const lockedBackdrop = document.getElementById('locked-backdrop');
  const padlockAssembly = document.getElementById('padlock-assembly');

  const vaultPasswordForm = document.getElementById('vault-password-form');
  const passwordInput = document.getElementById('secret-password-input');
  const togglePwdBtn = document.getElementById('toggle-pwd-btn');
  const unlockSubmitBtn = document.getElementById('unlock-submit-btn');
  const feedbackMsg = document.getElementById('password-feedback-msg');

  const lockAudio = createSynthesizedLockAudio();

  let hasAutoTriggered = false;
  let fireworksStopFn = null;
  let forceUnlock = false;
  let isUnlockingAnimation = false;

  // Render Fairy-Light Polaroids
  if (polaroidGrid && Array.isArray(bornConfig.polaroids)) {
    polaroidGrid.innerHTML = '';
    bornConfig.polaroids.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'polaroid-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Polaroid: ${p.caption}. Tap to flip.`);

      card.innerHTML = `
        <div class="polaroid-inner">
          <div class="polaroid-front">
            <div class="polaroid-img-box">
              <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.caption)}" class="polaroid-img" loading="lazy" onerror="handleImageError(this)">
            </div>
            <p class="polaroid-caption">${escapeHtml(p.caption)}</p>
            <span class="polaroid-tap-cue">Tap to flip & read secret note 💖</span>
          </div>
          <div class="polaroid-back">
            <span class="polaroid-back-header">💌 Secret Love Note</span>
            <p class="polaroid-back-note">"${escapeHtml(p.note)}"</p>
            <span class="polaroid-back-sign">Un Purushan ❤️</span>
          </div>
        </div>
      `;

      const flipCard = () => {
        card.classList.toggle('flipped');
        if (typeof triggerRomanticConfetti === 'function' && card.classList.contains('flipped')) {
          const rect = card.getBoundingClientRect();
          spawnButtonHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      };

      card.addEventListener('click', flipCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipCard();
        }
      });

      polaroidGrid.appendChild(card);
    });
  }

  // Render Husband's 7 Lifetime Promises
  if (promisesGrid && Array.isArray(bornConfig.promises)) {
    promisesGrid.innerHTML = '';
    bornConfig.promises.forEach((pr) => {
      const pCard = document.createElement('article');
      pCard.className = 'promise-card';
      pCard.setAttribute('role', 'listitem');
      pCard.setAttribute('tabindex', '0');

      pCard.innerHTML = `
        <div class="promise-card-top">
          <span class="promise-badge">Sathiyam ${pr.number}</span>
          <span class="promise-icon">${pr.emoji || '💍'}</span>
        </div>
        <h4 class="promise-title">${escapeHtml(pr.title)}</h4>
        <p class="promise-text">${escapeHtml(pr.text)}</p>
        <button type="button" class="promise-seal-btn" aria-label="Seal Sathiyam ${pr.number}">Tap to Seal with Love ❤️</button>
      `;

      const sealPromise = () => {
        const isAlreadySealed = pCard.classList.contains('sealed');
        pCard.classList.toggle('sealed');
        const btn = pCard.querySelector('.promise-seal-btn');
        if (btn) {
          if (!isAlreadySealed) {
            btn.textContent = '✅ SATHIYAM SEALED 💖';
            const rect = pCard.getBoundingClientRect();
            spawnButtonHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
            showRomanticToast(`Sathiyam ${pr.number} sealed in your heart! ❤️`, '💍');
          } else {
            btn.textContent = 'Tap to Seal with Love ❤️';
          }
        }
      };

      pCard.addEventListener('click', sealPromise);
      pCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sealPromise();
        }
      });

      promisesGrid.appendChild(pCard);
    });
  }

  // Check whether 10:30 PM vault is currently unlocked
  function isUnlocked() {
    if (forceUnlock) return true;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === '1' || urlParams.get('preview') === '1' || urlParams.get('unlock') === '1' || window.location.hash === '#unlock') {
      return true;
    }
    const now = new Date();
    const curH = now.getHours();
    const curM = now.getMinutes();

    // Night 10:30 PM (22:30) or later tonight (until midnight)
    if (curH === targetHour && curM >= targetMinute) return true;
    if (curH > targetHour) return true;

    return false;
  }

  // Open & Close Locked Password Modal
  function openLockedModal() {
    if (!lockedModal) return;
    lockedModal.classList.add('active');
    lockedModal.setAttribute('aria-hidden', 'false');

    // Reset padlock animation classes
    if (padlockAssembly) {
      padlockAssembly.className = 'padlock-assembly';
    }
    if (feedbackMsg) {
      feedbackMsg.className = 'password-feedback-msg';
      feedbackMsg.textContent = '';
    }
    if (unlockSubmitBtn) {
      unlockSubmitBtn.disabled = false;
      const btnText = unlockSubmitBtn.querySelector('.btn-text');
      if (btnText) btnText.textContent = 'Unlock My Secret Surprise';
    }
    if (passwordInput) {
      passwordInput.disabled = false;
      passwordInput.value = '';
      setTimeout(() => passwordInput.focus(), 300);
    }
    isUnlockingAnimation = false;
  }

  function closeLockedModal() {
    if (!lockedModal) return;
    lockedModal.classList.remove('active');
    lockedModal.setAttribute('aria-hidden', 'true');
    isUnlockingAnimation = false;
  }

  // Password Input & Eye Toggle Handler
  if (togglePwdBtn && passwordInput) {
    togglePwdBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPwd = passwordInput.type === 'password';
      passwordInput.type = isPwd ? 'text' : 'password';
      const eyeIcon = document.getElementById('pwd-eye-icon');
      if (eyeIcon) eyeIcon.textContent = isPwd ? '🙈' : '👁️';
    });
  }

  // Password Verification & Golden Key Locker Animation Engine
  function handlePasswordSubmit(e) {
    if (e) e.preventDefault();
    if (isUnlockingAnimation) return;
    if (!passwordInput) return;

    const val = passwordInput.value.trim();

    // Verification check: exact "Sh@lini@28" or case-tolerant "sh@lini@28"
    if (val === EXPECTED_PASSWORD || val.toLowerCase() === EXPECTED_PASSWORD.toLowerCase()) {
      // SUCCESS!
      isUnlockingAnimation = true;
      if (feedbackMsg) {
        feedbackMsg.className = 'password-feedback-msg success';
        feedbackMsg.textContent = "✨ Password Correct! Golden Key Unlocking Ammu's Heart... 🗝️💖";
      }
      passwordInput.disabled = true;
      if (unlockSubmitBtn) {
        unlockSubmitBtn.disabled = true;
        const btnText = unlockSubmitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = "Unlocking Ammu's Vault...";
      }

      // Visual Animation Steps: Key Glides -> Key Inserts -> Key Turns 90deg -> Shackle Pops Open
      if (padlockAssembly) {
        // Step 1: Key glides in towards keyhole
        padlockAssembly.className = 'padlock-assembly key-gliding';
        lockAudio.playKeyChime();

        // Step 2: Key inserts into keyhole
        setTimeout(() => {
          padlockAssembly.className = 'padlock-assembly key-inserted';
          lockAudio.playKeyTurnSound();
        }, 550);

        // Step 3: Key turns 90 degrees with golden radiance
        setTimeout(() => {
          padlockAssembly.className = 'padlock-assembly key-turned';
          lockAudio.playKeyTurnSound();
        }, 950);

        // Step 4: Shackle pops open and swings!
        setTimeout(() => {
          padlockAssembly.className = 'padlock-assembly unlocked';
          lockAudio.playUnlockFanfare();
          if (typeof triggerRomanticConfetti === 'function') triggerRomanticConfetti();
          if (feedbackMsg) {
            feedbackMsg.textContent = "🔓 UNLOCKED! Welcome to Ammu's Secret Vault! 💖✨";
          }
        }, 1300);

        // Step 5: Transition into the Secret Surprise Vault
        setTimeout(() => {
          forceUnlock = true;
          closeLockedModal();
          launchCelebration();
          showRomanticToast("Welcome Ammu! Stephen's Secret Vault Unlocked! 💖✨", "🔓");
        }, 2400);
      } else {
        forceUnlock = true;
        closeLockedModal();
        launchCelebration();
      }
    } else {
      // INCORRECT PASSWORD: Shake animation and sweet husband prompt
      if (padlockAssembly) {
        padlockAssembly.classList.remove('shake');
        void padlockAssembly.offsetWidth; // Force CSS reflow to re-trigger shake
        padlockAssembly.classList.add('shake');
        setTimeout(() => {
          if (padlockAssembly) padlockAssembly.classList.remove('shake');
        }, 650);
      }
      if (feedbackMsg) {
        feedbackMsg.className = 'password-feedback-msg error';
        feedbackMsg.textContent = '🥺 Ayyoo thappana password ammu! Unga purushan Stephen kitta password kelunga ❤️';
      }
      showRomanticToast("Password wrong ammu! Stephen kitta kelunga ❤️", "🔒");
    }
  }

  if (vaultPasswordForm) {
    vaultPasswordForm.addEventListener('submit', handlePasswordSubmit);
  }

  // Countdown Calculation Engine (Displays Status)
  function updateCountdown() {
    // Check if vault is unlocked
    if (isUnlocked()) {
      if (!hasAutoTriggered) {
        hasAutoTriggered = true;
      }
      if (tickerEl) {
        tickerEl.innerHTML = '✨ Ammu\'s Vault Unlocked! 💖';
      }
      if (triggerBtnIcon) triggerBtnIcon.textContent = '🔓';
      if (triggerBtnText) triggerBtnText.textContent = 'Open Secret Surprise';
      return;
    }

    if (tickerEl) tickerEl.textContent = 'Stephen-oda Secret Lock 🔐';
    if (triggerBtnIcon) triggerBtnIcon.textContent = '🔐';
    if (triggerBtnText) triggerBtnText.textContent = 'Unlock Secret Surprise';
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Launch the 10:30 PM Secret Love Vault
  function launchCelebration() {
    closeLockedModal();
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    // 1. Instantly switch to Deck B (bg-music-2.mp3) with rich, loud volume (0.88)!
    if (audioManager && audioManager.playBornTimeBGM) {
      audioManager.playBornTimeBGM(0.88);
    }

    // 2. Start Fireworks Canvas Animation
    if (canvas) {
      fireworksStopFn = startRomanticFireworks(canvas);
    }

    // 3. Romantic Confetti Burst
    if (typeof triggerRomanticConfetti === 'function') {
      triggerRomanticConfetti();
      setTimeout(triggerRomanticConfetti, 1200);
      setTimeout(triggerRomanticConfetti, 2500);
    }
  }

  function closeCelebration() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    if (fireworksStopFn) {
      fireworksStopFn();
      fireworksStopFn = null;
    }

    // Stop Secret Vault music completely & immediately resume normal website BGM (our-song.mp3)
    if (audioManager && audioManager.stopVaultAndResumeNormalBGM) {
      audioManager.stopVaultAndResumeNormalBGM(0.5);
    }
  }

  // Handle Opening the Secret Vault from Screen 1 or Screen 7
  const handleOpenSecretVault = (e) => {
    if (e) e.preventDefault();
    if (forceUnlock) {
      launchCelebration();
    } else {
      openLockedModal();
    }
  };

  if (triggerBtn) {
    triggerBtn.addEventListener('click', handleOpenSecretVault);
  }

  if (finaleSecretBtn) {
    finaleSecretBtn.addEventListener('click', handleOpenSecretVault);
  }

  // Modal Close Handlers
  if (lockedCloseBtn) lockedCloseBtn.addEventListener('click', closeLockedModal);
  if (lockedBackdrop) lockedBackdrop.addEventListener('click', closeLockedModal);

  // Celebration Vault Close Handlers
  if (closeBtn) closeBtn.addEventListener('click', closeCelebration);
  if (vaultCloseBtn) vaultCloseBtn.addEventListener('click', closeCelebration);
  if (backdrop) backdrop.addEventListener('click', closeCelebration);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) closeCelebration();
      if (lockedModal && lockedModal.classList.contains('active')) closeLockedModal();
    }
  });
}

// Romantic Golden & Rose Fireworks Canvas Engine
function startRomanticFireworks(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const resizeHandler = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resizeHandler);

  let animationFrameId = null;
  let isRunning = true;
  const particles = [];
  const colors = [
    '#fde047', '#fbbf24', '#f59e0b', // Gold
    '#f472b6', '#ec4899', '#db2777', // Pink & Rose
    '#a78bfa', '#c084fc', // Lavender
    '#ffffff' // Sparkle white
  ];

  function spawnRocket() {
    if (!isRunning) return;
    const startX = width * (0.2 + Math.random() * 0.6);
    const startY = height * (0.15 + Math.random() * 0.45);
    const count = 45 + Math.floor(Math.random() * 30);
    const baseColor = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2);
      const speed = 2 + Math.random() * 5.5;
      particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        color: Math.random() < 0.4 ? '#fbbf24' : baseColor,
        radius: 1.5 + Math.random() * 2,
        gravity: 0.06
      });
    }
  }

  let rocketInterval = setInterval(spawnRocket, 650);
  spawnRocket();
  spawnRocket();

  function loop() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();

  return function stop() {
    isRunning = false;
    if (rocketInterval) clearInterval(rocketInterval);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resizeHandler);
    ctx.clearRect(0, 0, width, height);
  };
}
