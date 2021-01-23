type AnimationDefinition = {
  from: number;
  to: number;
  duration: number;
  onStep: (val: number) => void;
  animationType?: "forward" | "ping-pong";
};

type TweenState = "unstarted" | "running" | "ended" | "paused";
export class SpeedBasedTween {
  state: TweenState = "unstarted";
  animationDefinition: AnimationDefinition;
  constructor(animationDefinition: AnimationDefinition) {
    this.animationDefinition = animationDefinition;
  }

  startAt = 0;
  tick(currentTime: number) {
    if (!this.startAt) this.startAt = currentTime;

    const { from, to, duration, onStep } = this.animationDefinition;
    const endTime = this.startAt + duration;
    const timeSinceStart = currentTime - this.startAt;
    const scalePassed = timeSinceStart / duration;

    let currentValue: number;
    currentValue = from + scalePassed * (to - from);
    if (from < to) onStep(this.minMax(currentValue, to, from));
    else onStep(this.minMax(currentValue, from, to));

    if (
      currentTime >= endTime &&
      this.animationDefinition.animationType == "ping-pong"
    ) {
      this.animationDefinition.from = to;
      this.animationDefinition.to = from;
      this.startAt = currentTime;
    } else if (currentTime >= endTime) {
      this.state = "ended";
      runningAnimations = runningAnimations.filter((tween) => tween != this);
    }
  }

  pause() {
    this.state = "paused";
    runningAnimations = runningAnimations.filter((tween) => tween != this);
  }

  resume() {
    this.state = "running";
    //TODO: code duplication
    if (runningAnimations.length == 0) requestAnimationFrame(onFrame);
    runningAnimations.push(this);
    this.state = "running";
  }

  minMax(val: number, min: number, max: number) {
    return Math.min(Math.max(val, max), min);
  }
}

let runningAnimations: SpeedBasedTween[] = [];
function onFrame(time: number) {
  console.log('on frame')
  if (runningAnimations.length > 0) {
    runningAnimations.forEach((a) => a.tick(time));
    requestAnimationFrame(onFrame);
  }
}

export const animate = (animationDefinition: AnimationDefinition): SpeedBasedTween => {
  const t: SpeedBasedTween = new SpeedBasedTween(animationDefinition);
  if (runningAnimations.length == 0) requestAnimationFrame(onFrame);
  runningAnimations.push(t);
  t.state = "running";
  return t;
};
