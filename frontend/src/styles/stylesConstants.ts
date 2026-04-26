export const COLOR_PRIMARY = "#000000";

// export const COLOR_NEUTRAL = "#A7DAFF"

export const COLOR_NEUTRAL = "#d3ecff";

export const COLOR_NEUTRAL_50 = "#d3ecff";

export const COLOR_SURFACE_LIGHT = "#FFFFFF";

export const COLOR_TEXT_DARK = "#000000";

export const COLOR_TEXT_LIGHT = "#FFFFFF";

export const COLOR_ERROR = "#cd2f3b";

export const NORMAL_BUTTON_VARIANTS = {
  initial: {
    backgroundColor: COLOR_PRIMARY,
    color: COLOR_TEXT_LIGHT,
  },
  hovered: {
    backgroundColor: COLOR_NEUTRAL_50,
    color: COLOR_TEXT_DARK,
  },
  clicked: {
    backgroundColor: COLOR_NEUTRAL,
    color: COLOR_TEXT_DARK,
  },
};

export const LIGHT_BUTTON_VARIANTS = {
  initial: {
    backgroundColor: COLOR_SURFACE_LIGHT,
    color: COLOR_TEXT_DARK,
  },
  hovered: {
    backgroundColor: COLOR_NEUTRAL_50,
    color: COLOR_TEXT_DARK,
  },
  clicked: {
    backgroundColor: COLOR_NEUTRAL,
    color: COLOR_TEXT_DARK,
    scale: 0.95,
  },
};

export const DANGER_BUTTON_VARIANTS = {
  initial: {
    backgroundColor: COLOR_PRIMARY,
    color: COLOR_TEXT_LIGHT,
  },
  hovered: {
    backgroundColor: COLOR_ERROR,
    color: COLOR_TEXT_LIGHT,
  },
  clicked: {
    backgroundColor: COLOR_PRIMARY,
    color: COLOR_TEXT_LIGHT,
  },
};

export const LIGHT_DANGER_BUTTON_VARIANTS = {
  initial: {
    backgroundColor: COLOR_SURFACE_LIGHT,
    color: COLOR_TEXT_DARK,
  },
  hovered: {
    borderColor: "rgba(255,255,255,0)",
    backgroundColor: COLOR_ERROR,
    color: COLOR_TEXT_LIGHT,
  },
  clicked: {
    backgroundColor: COLOR_PRIMARY,
    color: COLOR_TEXT_LIGHT,
  },
};
