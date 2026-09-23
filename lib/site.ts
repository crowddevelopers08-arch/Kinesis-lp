export type Phone = { label: string; href: string };
export type Hours = { day: string; time: string };

export const site = {
  name: "Kinesis Pain Speciality Centre",
  city: "Chennai",
  phones: [
    { label: "+91 7896 974306", href: "tel:+917896974306" },
    { label: "+91 44 3142 3695", href: "tel:+914431423695" },
  ] as Phone[],
  address:
    "37/1, Near College Road, Opp. DPI Campus, Near The Marina Hotel, Nungambakkam, Chennai, Tamil Nadu 600006.",
  hours: [
    { day: "Monday–Saturday", time: "9 AM–6 PM" },
    { day: "Sunday", time: "By appointment" },
  ] as Hours[],
  mapEmbed:
    "https://www.google.com/maps?q=Kinesis+Pain+Speciality+Centre,+37/1+College+Road,+Nungambakkam,+Chennai+600006&output=embed",
  // Google Business Profile "write a review" link (Nungambakkam listing)
  googleReviewUrl: "https://g.page/r/CaqZ2qZOLu2IEBM/review",
  socials: [
    { name: "YouTube", href: "https://www.youtube.com/@KinesisPainSpecialityCentre" },
    { name: "Instagram", href: "https://www.instagram.com/kinesispainfree/" },
    { name: "Facebook", href: "https://www.facebook.com/kinesispainfree" },
  ] as { name: "YouTube" | "Instagram" | "Facebook"; href: string }[],
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Kinesis+Pain+Speciality+Centre+Nungambakkam+Chennai",
};

export const concerns = ["Knee Pain", "Back Pain", "Shoulder Pain", "Other"] as const;
export type Concern = (typeof concerns)[number];
