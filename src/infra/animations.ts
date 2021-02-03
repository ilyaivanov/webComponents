import { Styles, convertNumericStylesToPixels } from "./style";

//this module allows using numbers for properties for animation
//also in case I will be using unit tests with jest, I can mock animations more easily if it is extracted

export const animate = (
  element: HTMLElement,
  //I'm using my plain styles here, even thought Keyframe has three additional properies
  // like CompositeOperationOrAuto, but sinse I'm not using them and do not forsee usage, I won't add them into types
  // future me - please add type union if you are going to use config for each frame
  frames: Styles[] | Styles,
  options: KeyframeAnimationOptions
) => {
  const convertedStyles = Array.isArray(frames)
    ? frames.map(convertNumericStylesToPixels)
    : convertNumericStylesToPixels(frames);
  return element.animate(convertedStyles as any, options);
};
