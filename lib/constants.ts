export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/services", label: "Services" },
  { href: "/collections", label: "Collections" },
  { href: "/faq", label: "FAQ" },
  { href: "/visit-us", label: "Visit Us" },
] as const;

export const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=Ami+Optics,+Shop+No.+1,+Mohan+Apt.,+Veer+Savarkar+Marg,+near+Sai+Baba+Mandir,+Vasai-Virar,+Maharashtra+401305&ftid=0x3be7a98fa3cff437:0x734b47ba9581f0e4&output=embed";

// Every "Book an Eye Test" button (navbar, hero, lens lab, CTA band) opens
// WhatsApp with a pre-filled message, so the primary CTA is consistent site-wide.
const WHATSAPP_BOOKING_NUMBER = "917666722551";
export const BOOK_EYE_TEST_HREF = `https://wa.me/${WHATSAPP_BOOKING_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20book%20an%20eye%20test%20at%20Ami%20Optics`;
