// Everything about the person, in one place. Edit here; pages read from it.

export const profile = {
  name: 'Anders Emmanuel Tan',
  shortName: 'Anders Tan',
  role: 'Game programmer and software engineer',
  location: 'Yogyakarta, Indonesia',
  email: 'andersemtan@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/Plumz17', handle: 'Plumz17' },
    { label: 'itch.io', href: 'https://plumz17.itch.io/', handle: 'plumz17' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anderstan/', handle: 'anderstan' },
  ],
  education: [
    {
      place: 'Universitas Gadjah Mada',
      detail: 'BSc Computer Science, semester 5',
      extra: 'GPA 3.97 / 4.00',
      years: '2024 to 2028',
    },
    {
      place: 'Budi Utama High School',
      detail: 'Science programme',
      extra: 'Average 90.51',
      years: '2021 to 2024',
    },
  ],
  languages: 'English (IELTS 7.5), Indonesian (native)',
};

export interface Role {
  org: string;
  title: string;
  years: string;
  points: string[];
}

export const leadership: Role[] = [
  {
    org: 'KOMATIK UGM',
    title: 'Head of Game Development Division',
    years: '2025 to 2026',
    points: [
      'Lead the division: plan the programme, run learning sessions and oversee several game projects at once.',
      'Coached members through Liga KOMATIK and GEMASTIK. Two of the division’s teams reached the GEMASTIK finals.',
      'Started an internal game jam, run jointly with OmahTI, so members ship something small before competing.',
      'Wrote the division’s Godot lesson material.',
    ],
  },
  {
    org: 'OmahTI UGM',
    title: 'Senior Staff, Game Development Division',
    years: '2025 to 2026',
    points: [
      'Mentor junior members in game programming fundamentals and team workflow.',
      'Help organise workshops and internal learning sessions.',
    ],
  },
  {
    org: 'KOMATIK UGM and OmahTI UGM',
    title: 'Member',
    years: '2024 to 2025',
    points: ['Built 31 Days for GEMASTIK XVIII and joined my first game jam.'],
  },
];

export interface Award {
  title: string;
  detail: string;
  year: string;
  href?: string;
}

export const awards: Award[] = [
  {
    title: 'Jury’s choice, best game',
    detail: 'Global Game Jam Solo 2026, Surakarta. Phase Reveal, Team ScuTI.',
    year: '2026',
    href: 'work/phase-reveal',
  },
  {
    title: 'AWS Certified AI Practitioner',
    detail: 'Score 883 of 1,000. Pass mark 700.',
    year: '2026',
  },
  {
    title: 'Liga KOMATIK selection',
    detail: 'Truths Astray passed UGM’s internal round for GEMASTIK 2026.',
    year: '2026',
    href: 'work/truths-astray',
  },
  {
    title: 'GEMASTIK XVIII participant',
    detail: 'Game Development division, with 31 Days.',
    year: '2025',
    href: 'work/31-days',
  },
  {
    title: 'Finalist, Innovative Informatics Contest',
    detail: 'National level.',
    year: '2023',
  },
  {
    title: '2nd place, Bebras Computational Thinking Challenge',
    detail: '',
    year: '2023',
  },
  {
    title: 'Top 50, National Literacy and Numeracy Competition',
    detail: '',
    year: '2023',
  },
  {
    title: 'Finalist, Eduversal Mathematics Competition',
    detail: '',
    year: '2022',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C#', 'GDScript', 'Python', 'JavaScript'] },
  { group: 'Game', items: ['Godot 4', 'Unity', 'State machines', 'Dialogue systems', 'Game UI', 'Pixel art'] },
  { group: 'Software', items: ['FastAPI', 'React', 'Docker', 'REST APIs', 'Git', 'GitHub Actions', 'Testing'] },
  { group: 'AI / ML', items: ['scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV', 'Transformers', 'librosa'] },
];
