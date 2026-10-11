/**
 * ====================================================================
 * ONLY YOU — OUR LITTLE UNIVERSE
 * Configuration & Memories Data Store
 * ====================================================================
 * Husband's Gift Customization File:
 * Edit the text, dates, memories, compliments, and heartfelt letter
 * in this single file to personalize the entire website!
 */

const UniverseConfig = {
  // Screen 1: Welcome Screen
  welcome: {
    nickname: "Dei, Gundu paiyaa! ❤️",
    teaser: "Unakkaga naan create panna oru chinna surprise. Ready-ah?",
    buttonText: "Open Your Surprise ✨",
  },

  // Screen 2: Our Little Universe
  universe: {
    quote: "In this big world, meeting you made my little world special.",
    subtext: "Before you, life was just ordinary days. With you, every single second became a constellation in our quiet little universe.",
  },

  // Screen 3: Our Memory Lane (Interactive Timeline)
  memories: [
    {
      id: 1,
      tag: "The Beginning",
      title: "Our Sweet Burfi Beginning",
      date: "The Sweetest Beginning",
      image: "assets/photo-1.jpg",
      caption: "Nee enakku kudutha andha burfi ❤️",
      description: "Nee enaku kudutha andha burfi la dhan ellamey start aachu ammu,..naa thappa oru ponna select panni ava enna vittu pona aprm naa romba sad ah irundha apo dhan nee burfi oda en life la vandha yarumey elladha mari irundhu naa iruken nu en life la vandha,...vandha apo friend ah vandha aana enaku apo therila nee dhan en life oda main role hyy nu seriyyaana twist aaiduchu,...ava mattum en life ah vittu polana nee enaku ellama poirupa naa romba blessed dhan nee kedaika,...hy aprm naan img nambalodadhu dhan kuduthen but ai dhan unga akka mari generate paniduchu sorry idhu nee dhan"
    },
    {
      id: 2,
      tag: "Unforgettable Ride",
      title: "Our First Special Memory",
      date: "Namma Long Ride",
      image: "assets/photo-2.jpg",
      caption: "Duke-la unna pinnadi vachu ride ponadhu 🏍️💨",
      description: "Namma bike ride, un kooda kaathula parandhadhu, pinnaadi ukkandhu nee sirichum pesinadhu... Endha road-ah irundhaalum, un kooda pora ovvoru second-um oru azhagana kanavu maadhiri irundhudhu."
    },
    {
      id: 3,
      tag: "Pure Comedy & Joy",
      title: "A Funny Moment",
      date: "Un Kutti Vaaluthalam 😜",
      image: "assets/photo-3.jpg",
      caption: "En bag-ah pidichu izhuthu kalaaichadhu!",
      description: "College vazhila en bag-ah pinnadi irundhu pidichu izhuthu nee panna naughty attagasam! Naan thirumbi paathu morachaalum, un indha killi siripu dhaan en weakness."
    },
    {
      id: 4,
      tag: "Heartwarming Haven",
      title: "A Moment When You Made Me Happy",
      date: "Endless Conversations",
      image: "assets/photo-4.jpg",
      caption: "Manasu vittu pesina namma bench moments ❤️",
      description: "Manasula evalo tension irundhaalum... un pakkathula ukkandhu nee solradha kettutu un kooda siricha podhum, ulagamey marandhu poidum. You are my true happy place."
    },
    {
      id: 5,
      tag: "My Eternal Favorite",
      title: "My Favourite Memory With You",
      date: "En Thol Mela Un Thalai",
      image: "assets/photo-5.jpg",
      caption: "Nee en thol mela saanja andha amaidhiyana second 🕊️",
      description: "Ulagathula engayum kedaikaadha oru amaidhiyum nimmadhiyum un kooda dhaan kedaikkum. En thol mela nee thalai vachu saanjadhu... indha jenmam full-ah unna ippadiye paathukanum nu nenachen."
    }
  ],

  // Screen 4: Little Things I Love About You
  reasons: [
    {
      icon: "✨",
      title: "Your Innocent Smile",
      description: "The way your eyes crinkle when you're truly happy. It instantly wipes away my darkest days."
    },
    {
      icon: "💖",
      title: "How Deeply You Care",
      description: "Your tender heart that always thinks about everyone else's comfort before your own."
    },
    {
      icon: "🌸",
      title: "Your Cute Angry Pout",
      description: "Even when you scold me or act mad, you look so irresistibly adorable that I can't stop smiling."
    },
    {
      icon: "🌟",
      title: "Your Unwavering Strength",
      description: "The quiet courage and sacrifices you make every single day. I see them, and I cherish them."
    },
    {
      icon: "🕊️",
      title: "Being My Peace",
      description: "In this loud, chaotic world, resting my head near you is the only place where my mind is truly calm."
    },
    {
      icon: "💫",
      title: "The Little Habits Only I Know",
      description: "The funny ways you get excited over small things, your quirks, and the real you that only I get to love."
    }
  ],

  // Screen 5: A Song Sung Just For You (Husband's Personal Singing)
  voiceMessage: {
    audioPath: "assets/voice-message.mp3",
    title: "Nee anniku sing panna sonnala... 🎤❤️",
    subtitle: "Un kooda irundha andha naal-la nee en kitta kekka aasapata paattu ammu... Indha paattu unakkaga mattum dhaan!",
    durationPlaceholder: "Special Song • Dedicated to Ammu",
    missingFallbackText: "En Anbu Paattu Loading... Unga song audio file-ah <strong>assets/voice-message.mp3</strong> nu paste pannidunga, inga instant-ah play aagum! 🎤❤️"
  },

  // Screen 6: Our Love Story Movie
  loveStoryVideo: {
    videoPath: "assets/love-story.mp4",
    title: "Our Love Story Movie",
    subtitle: "A little cinema of our journey, captured together.",
    missingFallbackText: "Our special video memory is ready to be added! Save your video as <strong>assets/love-story.mp4</strong> to watch it here."
  },

  // Screen 7: Open Your Little Gift (Heartfelt Letter)
  letter: {
    envelopePrompt: "Tap the wax seal to open your special letter",
    title: "En Anbu Ammu-vukku,",
    content: "Nee en life-la enakku kedacha special gift ammu. Unna happy-ah paathukanum, unna marriage pannitu un kooda neraya years vaazhanum... unaku vayasaana aprm unaku ellamey naaney pannanum...Indha website unakkaga naan create panna oru chinna gift.idhu Unnoda sacrifice ku podhumaanadhu ella dha but naa unna nalla pathupen.I love you di gundu magaleyy ❤️",
    closingQuote: "This is not just a website. It's a little world I made just for you.",
    signature: "Always & Forever Yours,",
    authorName: "Stephen (Un Purushan)"
  },

  // Background Audio Configuration (Main Website: Seamless DJ Crossfade between Our Song & Kadhalar Dhinam Romantic Theme)
  backgroundMusic: {
    audioPath: "assets/our-song.mp3",
    audioPath2: "assets/bg-music-2.mp3",
    title: "Our Romantic Medley (Our Song & Kadhalar Dhinam Love Theme) ❤️"
  },

  // 10:30 PM Secret Love Vault & Born Time Celebration
  bornTime: {
    hour: 22, // 10 PM
    minute: 30, // 30 mins
    vaultSongPath: "assets/vault-song.mp3",
    label: "Ammu Pirandha Ponneram: 10:30 PM",
    vaultTitle: "10:30 PM Secret Love Vault 💖",
    vaultSubtitle: "Ammu pirandha andha ponnerathula, Stephen unakkaga thirandhu vecha ragasiya ulagam ✨",
    secretPassword: "Sh@lini@28",
    suspense: {
      badge: "NIGHT 10:30 PM SPECIAL TIME-LOCK",
      title: "Shh... Idhu Stephen-oda Secret Lock! 🔒✨",
      message: "Ammu... Idhu unga birth time-la (Night 10:30 PM) mattum dhaan open aagum nu unga husband Stephen andha maadhiri lock panni vechirukaaru! ❤️",
      subMessage: "Idhu ipo open aagadhu ammu... Neenga unga birth time varaikum porumaiyaa wait pannunga! Ungalukaga ulla oru romba romba periya thani secret surprise kaathurukku! ✨",
      apology: "Actually indha surprise-ah Stephen unga birthday-kkey panni irukkanum, aana konjam late aagiduchu... konjam adjust pannikonga ammu! 🥺❤️",
      btnText: "Sari Stephen, Naan 10:30 PM Varakum Wait Pandren! 💖"
    },
    polaroids: [
      {
        image: "assets/photo-1.jpg",
        caption: "Namma Sweet Burfi Beginning ❤️",
        note: "Nee enaku kudutha andha burfi la dhan ellamey start aachu ammu,..naa thappa oru ponna select panni ava enna vittu pona aprm naa romba sad ah irundha apo dhan nee burfi oda en life la vandha yarumey elladha mari irundhu naa iruken nu en life la vandha,...vandha apo friend ah vandha aana enaku apo therila nee dhan en life oda main role hyy nu seriyyaana twist aaiduchu,...ava mattum en life ah vittu polana nee enaku ellama poirupa naa romba blessed dhan nee kedaika,...hy aprm naan img nambalodadhu dhan kuduthen but ai dhan unga akka mari generate paniduchu sorry idhu nee dhan"
      },
      {
        image: "assets/photo-2.jpg",
        caption: "Namma Long Ride",
        note: "Bike ride-la un kooda kaathula parandhadhu, pinnaadi ukkandhu nee pesinadhu... Endha road-ah irundhaalum un kooda pora ovvoru second-um oru azhagana kanavu maadhiri 🏍️💨"
      },
      {
        image: "assets/photo-3.jpg",
        caption: "Un Kutti Vaaluthalam 😜",
        note: "En bag-ah pinnadi irundhu pidichu izhuthu nee panna naughty siripu! Naan morachaalum un indha siripu dhaan ammu en weakness!"
      },
      {
        image: "assets/photo-4.jpg",
        caption: "Endless Conversations",
        note: "Manasula evalo tension irundhaalum... un pakkathula ukkandhu nee pesuradha ketta podhum, ulagamey marandhu poidum. You are my true happy place 🕊️"
      },
      {
        image: "assets/photo-5.jpg",
        caption: "En Thol Mela Un Thalai",
        note: "En thol mela nee thalai saanjadhu... indha ulagathula engayum kedaikaadha amaidhi un kooda dhaan kedaikkum. Indha jenmam full-ah unna ippadiye paathukanum ❤️"
      },
      {
        image: "assets/photo-extra.jpg",
        caption: "En Devathai Ammu",
        note: "Un innocent mugam, un kannula iruka anbu... idhellam paatha enakku oru second kooda unna vitu poga thonadhu. En uyire neethan ammu 🌸"
      }
    ],
    promises: [
      {
        number: 1,
        title: "Kalyanam Promise 💍",
        text: "Unna oru kaalathulayum yemaatha maaten ammu, kandippa unna dhaan kalyanam pannippen! ❤️",
        emoji: "💍"
      },
      {
        number: 2,
        title: "No Hurt Promise 🕊️",
        text: "Endha oru situation-layum unna hurt pannama, en kannu maadhiri uyiraa paathupen ammu.",
        emoji: "🕊️"
      },
      {
        number: 3,
        title: "Free Fire Promise 🎮",
        text: "Free Fire inimey velada maaten... andha time full-aa un kooda dhaan anbaa spend pannuven!",
        emoji: "🙅‍♂️"
      },
      {
        number: 4,
        title: "No Cards / Seettu Promise 🃏",
        text: "Cards / seettu inimey velada maaten... un mela dhaan en full focus eppavum irukum.",
        emoji: "♠️"
      },
      {
        number: 5,
        title: "Sweet Words Promise 🌸",
        text: "Ketta vaarthai inimey pesa maaten... un munnadi eppovum oru nalla, unmaiyana paiyana irupen.",
        emoji: "🤐"
      },
      {
        number: 6,
        title: "Future Queen Promise 👑",
        text: "Olunga padichu, nalla velaikku poi, unna future-la oru chinna kashtam kooda illama rani maadhiri paathupen ammu 💼👑",
        emoji: "💼"
      },
      {
        number: 7,
        title: "The Master Promise 💖",
        text: "Indha promises edhuvume poi promise illa nu promise pandren... and un mela inimey poi promise panna maaten, adhuvum unmaiyana promise! 💍✨",
        emoji: "💖"
      }
    ],
    certificate: {
      title: "OFFICIAL LIFETIME LOVE AGREEMENT",
      subtitle: "Certified by the Universe & Registered in Husband's Heart",
      awardee: "Shalini (En Anbu Ammu)",
      awardedFor: "World's Best Wife & Permanent Soulmate",
      validity: "Indha Jenmam & Innum 7 Jenmangalukkum (Lifetime & Forever)",
      terms: "Always stay happy, scold me with love, hold my hand forever, and let me care for you till old age ❤️",
      signedBy: "Stephen ❤️"
    }
  }
};

// Export to window for global access
if (typeof window !== "undefined") {
  window.UniverseConfig = UniverseConfig;
}
