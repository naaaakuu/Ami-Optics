export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  image?: ImageAsset;
  details?: string[];
};

export type CollectionGroup =
  | "Eyewear Frames"
  | "Sun & Light Protection"
  | "Everyday & Specialty"
  | "Lenses";

export type Collection = {
  slug: string;
  name: string;
  group: CollectionGroup;
  summary: string;
  image?: ImageAsset;
  featured?: boolean;
};

export type HeritageMilestone = {
  /** a year ("1996") or a phase label ("Today") */
  year: string;
  title: string;
  description: string;
  image?: ImageAsset;
};

export type Founder = {
  name: string;
  role: string;
  focus: string;
  image?: ImageAsset;
};

export type ValuePillar = {
  title: string;
  description: string;
};

export type DayHours = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  /** Empty array means closed that day. Multiple windows represent split shifts. */
  windows: { opens: string; closes: string }[];
};

export type SiteConfig = {
  name: string;
  legalName: string;
  establishedYear: number;
  description: string;
  phone: {
    primary: string;
    secondary: string;
  };
  whatsapp: string;
  email?: string;
  address: {
    street: string;
    landmark: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  hours: DayHours[];
  social: {
    instagram?: string;
    facebook?: string;
  };
  googleMapsUrl: string;
};
