/** Motion is decorative: never run offscreen, in a hidden tab, or against user preference.
 * @param {{ ready: boolean, paused: boolean, inView: boolean, reducedMotion: boolean, tabVisible: boolean }} state
 */
export function shouldAnimateCoder({ ready, paused, inView, reducedMotion, tabVisible }) {
  return ready && inView && tabVisible && !paused && !reducedMotion;
}
