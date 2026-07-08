import type { SiteConfig } from "@/types/content";

const splitShift = [
  { opens: "09:00", closes: "14:00" },
  { opens: "16:00", closes: "21:00" },
];

export const siteConfig: SiteConfig = {
  name: "Ami Optics",
  legalName: "Ami Optics",
  establishedYear: 1996,
  description:
    "Ami Optics, eyewear specialists in Virar offering eye testing and spectacle frames since 1996.",
  phone: {
    primary: "+91 9321033221",
    secondary: "+91 7666722551",
  },
  whatsapp: "+91 7666722551",
  address: {
    street: "Shop No. 1, Mohan Apt., V. S. Marg",
    landmark: "Near Sai Baba Mandir, Opp. Radha Krishna Restaurant",
    locality: "Virar (E)",
    city: "Palghar",
    state: "Maharashtra",
    postalCode: "401305",
    country: "India",
  },
  hours: [
    { day: "Mon", windows: splitShift },
    { day: "Tue", windows: splitShift },
    { day: "Wed", windows: splitShift },
    { day: "Thu", windows: splitShift },
    { day: "Fri", windows: [] },
    { day: "Sat", windows: splitShift },
    { day: "Sun", windows: splitShift },
  ],
  social: {
    instagram: "https://www.instagram.com/amioptics96",
    facebook: "https://www.facebook.com/amioptics96",
  },
  googleMapsUrl: "https://maps.app.goo.gl/XXgmTza75hPfrwoT7",
};
