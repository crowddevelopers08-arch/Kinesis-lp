// Treatment content. Images are from Wikimedia Commons under Creative Commons licences;
// `credit` records the author/licence/source for each (not currently shown on the site).

export type Treatment = {
  title: string;
  text: string;
  img: string;
  alt: string;
  credit: { author: string; license: string; source: string };
};

export const treatments: Treatment[] = [
  {
    title: "Stem Cell Therapy",
    text: "Harnessing the power of stem cells to repair damaged tissues and accelerate recovery.",
    img: "/images/treatments/stem-cell-therapy-4x3.jpg",
    alt: "Doctor preparing a stem cell therapy sample",
    credit: { author: "Alice Pien, MD", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Doctor-preparing-to-perform-stem-cell-therapy.jpg" },
  },
  {
    title: "Prolotherapy",
    text: "An injection-based therapy that stimulates the body's healing response to strengthen weakened joints and ligaments.",
    img: "/images/treatments/prolotherapy-4x3.jpg",
    alt: "Injection into the knee joint",
    credit: { author: "PainDoctorUSA", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Pain-Doctor-Knee-Injection-Procedure-3.jpg" },
  },
  {
    title: "Nerve Blocks",
    text: "Used to relieve pain by blocking nerve signals from specific areas of the body.",
    img: "/images/treatments/nerve-blocks-4x3-v2.jpg",
    alt: "Ultrasound image showing a needle guided to a nerve",
    credit: { author: "Elsawy AGS et al.", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Piriformis_ultrasound_injection.png" },
  },
  {
    title: "Epidural Injections",
    text: "Delivering steroids or anaesthetics to the epidural space to reduce inflammation and pain.",
    img: "/images/treatments/epidural-injections-4x3.jpg",
    alt: "Illustration of an epidural steroid injection into the spine",
    credit: { author: "Blausen.com staff", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Blausen_0354_EpiduralSteroidInjection.png" },
  },
  {
    title: "Radiofrequency Ablation",
    text: "A technique that uses heat to disrupt pain signals from specific nerves.",
    img: "/images/treatments/radiofrequency-ablation-4x3.jpg",
    alt: "Radiofrequency probes placed along the spine during ablation",
    credit: { author: "PainDoctorUSA", license: "CC BY-SA 4.0", source: "https://commons.wikimedia.org/wiki/File:Pain-Doctor-Radiofrequency-Ablation-Procedure-7_copy.jpg" },
  },
  {
    title: "Spinal Cord Stimulation",
    text: "Implanting a device that sends electrical signals to the spinal cord to manage chronic pain.",
    img: "/images/treatments/spinal-cord-stimulation-4x3.jpg",
    alt: "X-ray showing spinal cord stimulator leads along the spine",
    credit: { author: "Mconnell", license: "CC BY 3.0", source: "https://commons.wikimedia.org/wiki/File:Anterior_thoracic_SCS.jpg" },
  },
];

