import {
  ThemeColors,
  TechnologyColors,
} from "./colors";

export type ThemeName =
  | "technology"
  | "finance"
  | "gaming"
  | "music"
  | "business"
  | "nature"
  | "space"
  | "education"
  | "sports"
  | "luxury";

export type Theme = {
  id: ThemeName;
  displayName: string;
  colors: ThemeColors;
};

export const Themes: Record<ThemeName, Theme> = {
  technology: {
    id: "technology",
    displayName: "Technology",
    colors: TechnologyColors,
  },

  finance: {
    id: "finance",
    displayName: "Finance",
    colors: TechnologyColors,
  },

  gaming: {
    id: "gaming",
    displayName: "Gaming",
    colors: TechnologyColors,
  },

  music: {
    id: "music",
    displayName: "Music",
    colors: TechnologyColors,
  },

  business: {
    id: "business",
    displayName: "Business",
    colors: TechnologyColors,
  },

  nature: {
    id: "nature",
    displayName: "Nature",
    colors: TechnologyColors,
  },

  space: {
    id: "space",
    displayName: "Space",
    colors: TechnologyColors,
  },

  education: {
    id: "education",
    displayName: "Education",
    colors: TechnologyColors,
  },

  sports: {
    id: "sports",
    displayName: "Sports",
    colors: TechnologyColors,
  },

  luxury: {
    id: "luxury",
    displayName: "Luxury",
    colors: TechnologyColors,
  },
};

export const DefaultTheme =
  Themes.technology;