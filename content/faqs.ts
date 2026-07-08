export type FaqItem = {
  question: string;
  /** Answer paragraphs — rendered as separate <p> blocks. */
  answer: string[];
};

export type FaqCategory = {
  /** Stable id used for filter state + anchors. */
  id: string;
  label: string;
  /** Icon key resolved in the FAQ explorer component. */
  icon: "eye" | "frame" | "lens" | "fit" | "wrench" | "home" | "handshake";
  items: FaqItem[];
};

/**
 * The complete FAQ content, verbatim from the approved
 * `04_FAQs.md` content document (7 categories, 22 questions).
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "eye-testing",
    label: "Eye Testing",
    icon: "eye",
    items: [
      {
        question: "Do I need an appointment for an eye test?",
        answer: [
          "Appointments are recommended but not always necessary. Walk-in customers are also welcome, subject to availability.",
        ],
      },
      {
        question: "How long does an eye test take?",
        answer: [
          "A computerized eye examination usually takes around 15 to 30 minutes, depending on your requirements.",
        ],
      },
      {
        question: "Is computerized eye testing accurate?",
        answer: [
          "Yes. We use computerized eye testing as part of the examination process, combined with professional assessment and recommendations based on your individual vision needs.",
        ],
      },
      {
        question: "Do you check children's eyesight?",
        answer: [
          "Yes. We provide eye testing for children as well as adults and senior citizens.",
        ],
      },
    ],
  },
  {
    id: "spectacles",
    label: "Spectacles",
    icon: "frame",
    items: [
      {
        question: "How long does it take to make spectacles?",
        answer: [
          "For many common prescriptions, spectacles can be prepared in approximately 30 minutes if the required lenses are available in stock.",
          "Some specialized prescriptions or premium lenses may require additional time.",
        ],
      },
      {
        question: "Do you keep lenses in stock?",
        answer: [
          "Yes.",
          "Maintaining a stock of commonly required lenses allows us to provide faster delivery for many prescriptions.",
        ],
      },
      {
        question: "Do you have frames for every budget?",
        answer: [
          "Yes.",
          "We offer a wide variety of frames ranging from budget-friendly options to premium collections.",
          "Our goal is to recommend the best option based on your needs and budget.",
        ],
      },
      {
        question: "Can you help me choose the right frame?",
        answer: [
          "Absolutely.",
          "Our team personally helps customers choose frames that suit their face shape, comfort, prescription and lifestyle.",
        ],
      },
      {
        question: "Do you sell branded lenses?",
        answer: [
          "Yes.",
          "We offer lenses from leading manufacturers along with other trusted options so that we can recommend the most suitable lens based on your prescription, lifestyle and budget.",
        ],
      },
    ],
  },
  {
    id: "lenses",
    label: "Lenses",
    icon: "lens",
    items: [
      {
        question: "What is the difference between Blue Cut and Anti Glare lenses?",
        answer: [
          "Blue Cut lenses are designed for people who spend long hours using digital screens.",
          "Anti Glare coatings reduce unwanted reflections and improve visual comfort, especially while driving at night or working under bright lighting.",
          "Our team will help you decide which option is most suitable.",
        ],
      },
      {
        question: "Are Progressive lenses better than Bifocal lenses?",
        answer: [
          "It depends on your lifestyle and prescription.",
          "Progressive lenses provide smooth vision at multiple distances without visible lines, while bifocal lenses have separate zones for near and distance vision.",
          "We will explain both options during your consultation.",
        ],
      },
      {
        question: "Which lenses are best for computer work?",
        answer: [
          "For many computer users, Blue Cut lenses combined with appropriate coatings provide greater visual comfort.",
          "The final recommendation depends on your working hours, prescription and daily routine.",
        ],
      },
    ],
  },
  {
    id: "contact-lenses",
    label: "Contact Lenses",
    icon: "fit",
    items: [
      {
        question: "Do you provide contact lenses for beginners?",
        answer: [
          "Yes.",
          "We guide first-time users through lens selection, handling and basic care to ensure safe and comfortable use.",
        ],
      },
      {
        question: "Do you sell contact lens solutions and accessories?",
        answer: [
          "Yes.",
          "We stock contact lens solutions, storage cases and other essential accessories.",
        ],
      },
    ],
  },
  {
    id: "repairs",
    label: "Repairs & Service",
    icon: "wrench",
    items: [
      {
        question: "Can you repair spectacles purchased from another shop?",
        answer: [
          "Yes.",
          "Whenever possible, we repair and adjust spectacles regardless of where they were purchased.",
          "The repair depends on the condition of the frame and the availability of suitable parts.",
        ],
      },
      {
        question: "Can you replace nose pads?",
        answer: [
          "Yes.",
          "We provide nose pad replacement and frame adjustments for improved comfort whenever possible.",
        ],
      },
      {
        question: "Can you adjust loose spectacles?",
        answer: [
          "Yes.",
          "Minor adjustments can often be completed quickly to improve comfort and fit.",
        ],
      },
    ],
  },
  {
    id: "home-checkup",
    label: "Home Eye Checkup",
    icon: "home",
    items: [
      {
        question: "Do you provide home eye checkups?",
        answer: [
          "Yes.",
          "We offer home eye checkups for elderly, bedridden or medically dependent individuals whenever possible.",
          "Please contact us in advance to discuss availability.",
        ],
      },
    ],
  },
  {
    id: "general",
    label: "General",
    icon: "handshake",
    items: [
      {
        question: "Since when has Ami Optics been serving customers?",
        answer: [
          "Ami Optics has proudly served the Virar community since 1996.",
        ],
      },
      {
        question: "Why should I choose Ami Optics?",
        answer: [
          "Customers choose us because of our honest recommendations, personalized service, computerized eye testing, wide range of eyewear, quick delivery for many prescriptions and decades of trust built within the community.",
        ],
      },
      {
        question: "Which languages do you speak?",
        answer: [
          "Our team can assist customers in English, Hindi and Marathi, ensuring a comfortable experience for a wide range of visitors.",
        ],
      },
      {
        question: "Where is Ami Optics located?",
        answer: [
          "Ami Optics is located in Virar East near Sai Baba Mandir, opposite Radha Krishna Restaurant, making it easily accessible for customers across the area.",
        ],
      },
    ],
  },
];
