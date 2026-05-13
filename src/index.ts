import './localization';
import options from './options';
import { registerServiceWorker } from './registerServiceWorker';
import { Roulette } from './roulette';

registerServiceWorker();

const roulette = new Roulette();

(window as any).roulette = roulette;
(window as any).options = options;

function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;

  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }

  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

const seed = new URLSearchParams(location.search).get("seed");

if (seed) {
  Math.random = seededRandom(seed);
  console.warn(`[SECURITY TEST] seeded random enabled: ${seed}`);
}
