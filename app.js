const normalAffirmations = shuffleArray([
  "prefers the window seat on airplanes but aisle seats at the movies.",
  "reads before bed every night.",
  "knows how to change a tire.",
  "enjoys walking in light rain.",
  "keeps a spare key with a neighbor.",
  "writes thank-you notes by hand.",
  "has a favorite local bakery.",
  "prefers paper books to e-readers.",
  "knows the names of coworkers' pets.",
  "enjoys cooking for friends.",
  "has a consistent morning routine.",
  "enjoys crossword puzzles in the evenings.",
  "knows how to parallel park perfectly.",
  "enjoys the smell of old books.",
  "has a go-to karaoke song.",
  "prefers tea over coffee in the afternoon.",
  "keeps a journal, sporadically.",
  "enjoys watching birds from the window.",
  "knows the lyrics to too many songs.",
  "can do hard things.",
  "deserves to take up space.",
  "has a favorite mug for each beverage.",
  "always RSVPs on time.",
  "knows which way is north.",
  "organizes spices alphabetically.",
  "cuts off the crusts and eats them first.",
  "always returns seat backs and tray tables to the upright and locked position.",
  "does not need to have the last word.",
  "remembers the first frost date.",
  "notices when the days get longer.",
  "makes the bed every morning.",
  "separates waste into recycling, salvage, compost, textiles, hazardous materials, and trash.",
  "knows they are loved."
]);
const absurdAffirmations = shuffleArray([
  "can divide by zero.",
  "has over two hundred words for snow.",
  "can skeletonize a cow in under three minutes.",
  "enjoys prodigious gluteals and is unable to prevaricate.",
  "better have my money.",
  "speaks fluent backwards English.",
  "has tasted the color of Wednesday.",
  "once won a staring contest with a security camera.",
  "dreams in perfectly formatted spreadsheets.",
  "has a favorite prime number and it's classified.",
  "can fold a fitted sheet into a Klein bottle.",
  "knows the true name of every elevator.",
  "has never made a typo. Not once.",
  "can hear the hum of the server room from home.",
  "once high-fived their own reflection and it high-fived back.",
  "knows exactly how many ceiling tiles are in this room.",
  "has a retirement plan written in a language that doesn't exist yet.",
  "can untie any knot by looking at it sternly.",
  "memorized the last digit of pi.",
  "sneezes in Morse code.",
  "can parallel park a submarine.",
  "speaks fluent dolphin with a French accent.",
  "can solve a Rubik's cube while juggling.",
  "once convinced a vending machine to give them two sodas.",
  "knows the WiFi password for every coffee shop on Earth.",
  "knows how to change a flux capacitor.",
  "enjoys walking over molten lava.",
  "has a favorite venereal disease.",
  "appreciates the smell of despair.",
  "butters toast on both sides.",
  "keeps a spare heart in the enchanted forest guarded by a wise crow.",
  "has been trying to reach you regarding your car's extended warranty.",
  "is not responsible for theft, loss, or damage to property.",
  "should be discarded immediately after use.",
  "is a beautiful and unique fragment of the divine, wrapped in what is basically several layers of ham.",
  "understands that correlation does not imply causation.",
  "has plants. Lots and lots of plants."
]);
let affirmations = [
  ...normalAffirmations.slice(0, 3),
  absurdAffirmations[0],
  ...shuffleArray([
    ...normalAffirmations.slice(3),
    ...absurdAffirmations.slice(1)
  ])
]

const palettes = [
  { bg: '#ffffff', fg: '#111111' },
  { bg: '#880000', fg: '#ffffff' },
  { bg: '#224499', fg: '#ffffff' },
  { bg: '#334433', fg: '#ffffee' }
];

const phraseEl = document.querySelector('.phrase');
const labelEl = phraseEl.querySelector('.label');
const restEl = phraseEl.querySelector('.rest');
const lineEl = document.querySelector('.line');

// Pre-create 6 clipping blocks (max per blink)
const clippingBlocks = [];
for (let i = 0; i < 6; i++) {
  const block = document.createElement('div');
  block.style.cssText = `
    position: absolute;
    left: 0; right: 0;
    pointer-events: none;
    z-index: 10;
    display: none;
  `;
  phraseEl.parentElement.appendChild(block);
  clippingBlocks.push(block);
}

const startTime = Date.now();

let paletteIndex = 0;
let affirmationIndex = 0;
let isAnimating = false;
let isPaused = false;
let nextGlitchAt = getFutureTime(20, 60);
let nextTimeCheckAt = getFutureTime(1*60*60, 1.5*60*60); // 1-1.5 hours

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

function getFutureTime(minSeconds, maxSeconds) {
  return Date.now() + getRandomInt(minSeconds*1000, maxSeconds*1000);
}

// standard Fisher-Yates array shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getNextAffirmation() {
  if (Date.now() >= nextTimeCheckAt) {
    nextTimeCheckAt = getNextTimeCheckAt();
    let hours = Math.floor((Date.now() - startTime) / (60*60*1000));
    if (hours == 1) {
      return 'has not refreshed this page in over an hour.';
    } else if (hours == 2) {
      return 'has not refreshed this page in over two hours.';
    } else if (hours == 3) {
      return 'has not refreshed this page in over three hours.';
    } else if (hours == 4) {
      return 'has not refreshed this page in over four hours.';
    } else if (hours == 5) {
      return 'has not refreshed this page in over five hours.';
    } else {
      return 'really should go outside and touch grass.';
    }
  }

  if (affirmationIndex >= affirmations.length) {
    affirmations = shuffleArray(affirmations);
    affirmationIndex = 0;
  }
  return affirmations[affirmationIndex++];
}

function getNextPalette() {
  const palette = palettes[paletteIndex];
  paletteIndex = (paletteIndex + 1) % palettes.length;
  return palette;
}

function setPalette(palette) {
  document.documentElement.style.setProperty('--bg', palette.bg);
  document.documentElement.style.setProperty('--fg', palette.fg);
  document.documentElement.style.setProperty('--line', palette.fg);
}

function crossFadeBackground(fromPalette, toPalette) {
  document.body.style.backgroundColor = fromPalette.bg;
  document.body.style.transition = 'background-color 2s ease';
  document.body.offsetHeight;
  document.body.style.backgroundColor = toPalette.bg;
  setTimeout(() => {
    document.body.style.transition = '';
    document.body.style.backgroundColor = '';
    setPalette(toPalette);
  }, 2000);
}

async function runGlitchOut() {
  const blinkCount = getRandomInt(3, 6); // 3-6 blinks
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  
  // Measure layout once
  const phraseRect = phraseEl.getBoundingClientRect();
  const containerRect = phraseEl.parentElement.getBoundingClientRect();
  const top = phraseRect.top - containerRect.top;
  const height = phraseRect.height;
  
  for (let i = 0; i < blinkCount; i++) {
    // Random shift
    const shiftX = (Math.random() - 0.5) * 24;
    const shiftY = (Math.random() - 0.5) * 24;
    phraseEl.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    lineEl.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
    
    // Reposition and show blocks for this blink
    for (const block of clippingBlocks) {
      const blockTop = top + Math.random() * height * 0.8;
      const blockHeight = Math.max(2, Math.random() * 8);
      block.style.top = `${blockTop}px`;
      block.style.height = `${blockHeight}px`;
      block.style.background = bgColor;
      block.style.display = 'block';
    }
    
    // Brief blink
    await sleep(getRandomInt(15, 55));
    
    // Remove effects
    phraseEl.style.transform = '';
    lineEl.style.transform = '';
    for (const block of clippingBlocks) {
      block.style.display = 'none';
    }
    
    // Random interval between blinks
    if (i < blinkCount - 1) {
      let duration = getRandomInt(400, 500);
      if (duration % 2 === 0) { duration /= 5; }
      await sleep(duration);
    }
  }
  
  // After last blink, disappear instantly
  lineEl.style.transition = 'none';
  phraseEl.style.opacity = '0';
  lineEl.style.opacity = '0';
  lineEl.style.width = '0';

  await sleep(2000);
}

async function runCycle() {
  if (isAnimating || isPaused) return;
  isAnimating = true;

  const currentPalette = palettes[paletteIndex];
  const nextPalette = getNextPalette();
  const affirmation = getNextAffirmation();

  restEl.textContent = ' ' + affirmation;

  phraseEl.classList.remove('fade-out');
  phraseEl.style.opacity = '';
  labelEl.style.opacity = '';
  restEl.style.opacity = '';
  lineEl.classList.remove('fade-out');
  lineEl.style.width = '';
  lineEl.style.opacity = '';
  lineEl.offsetHeight;
  lineEl.classList.add('active');
  phraseEl.classList.add('fade-in');

  await sleep(7000);

  phraseEl.classList.remove('fade-in');
  labelEl.style.opacity = '1';
  restEl.style.opacity = '1';
  
  if (Date.now() > nextGlitchAt) {
    await runGlitchOut();
    nextGlitchAt = getFutureTime(20, 60);
    // Color scheme does NOT change after glitch
  } else {
    phraseEl.classList.add('fade-out');
    lineEl.classList.add('fade-out');

    await sleep(2000);

    crossFadeBackground(currentPalette, nextPalette);

    await sleep(2000);
  }

  lineEl.style.transition = 'none';
  lineEl.classList.remove('active');
  lineEl.classList.remove('fade-out');
  lineEl.style.width = '';
  lineEl.style.opacity = '';
  lineEl.style.transform = '';
  lineEl.offsetHeight;
  lineEl.style.transition = '';
  phraseEl.classList.remove('fade-out');
  phraseEl.style.opacity = '';
  phraseEl.style.transform = '';
  labelEl.style.opacity = '';
  restEl.style.opacity = '';

  isAnimating = false;
  runCycle();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pause() {
  isPaused = true;
}

function resume() {
  if (isPaused) {
    isPaused = false;
    runCycle();
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pause();
  } else {
    resume();
  }
});

document.fonts.ready.then(() => {
  setPalette(palettes[0]);
  runCycle();
});