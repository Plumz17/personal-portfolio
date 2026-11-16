// The long tail: everything that does not get its own page. Add a line here
// and it appears in the archive table and in terminal search.

import type { Discipline } from '../lib/site';

export interface ArchiveItem {
  title: string;
  year: string;
  kind: string;
  disciplines: Discipline[];
  note: string;
  href?: string;
}

const gh = (repo: string) => `https://github.com/Plumz17/${repo}`;

export const archive: ArchiveItem[] = [
  {
    title: 'Observability with OpenTelemetry',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['software'],
    note: 'Two Flask services talking over RabbitMQ, traced end to end with OpenTelemetry and Jaeger, run with Docker Compose.',
    href: gh('scalable-tracability-assignment'),
  },
  {
    title: 'Monolithic stateful app',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['software'],
    note: 'A deliberately stateful Node.js and MySQL application, the baseline for a scalable software course.',
    href: gh('scalable-assignment-01-monolithic-stateful-app'),
  },
  {
    title: 'Test design on termdown',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['software'],
    note: 'Decision coverage, equivalence partitioning and boundary value analysis written against an open-source terminal timer.',
    href: gh('termdown-fork'),
  },
  {
    title: 'Full-stack web course projects',
    year: '2026',
    kind: 'Self-study',
    disciplines: ['software'],
    note: 'Exercises and projects from a complete web development course: HTML to Node.js, Express and EJS.',
    href: gh('UdemyFullStack'),
  },
  {
    title: 'Deep Learning: learning strategies',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Replicating a baseline network, then comparing training strategies against it.',
    href: gh('DL_Assignment02'),
  },
  {
    title: 'Deep Learning: single-layer perceptron',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Building, training and evaluating a single-layer perceptron.',
    href: gh('DL_Assignment01'),
  },
  {
    title: 'Computer Vision: object behaviour analysis',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Object behaviour analysis on video frames, checked against ground truth.',
    href: gh('CVL_Assignment04'),
  },
  {
    title: 'Computer Vision: sliding-window detection',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Object detection the classical way, with a sliding window.',
    href: gh('CVL_Assignment02'),
  },
  {
    title: 'Computer Vision: assignment 1',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'First assignment of the Computer Vision and Image Analysis course.',
    href: gh('CVL_Assignment01'),
  },
  {
    title: 'Pattern Recognition: assignments 1 and 2',
    year: '2026',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Individual assignments leading up to the two course projects.',
    href: gh('PP_Assignment02'),
  },
  {
    title: 'Digital Image Processing: assignments 1 to 3',
    year: '2025',
    kind: 'Coursework',
    disciplines: ['ai'],
    note: 'Individual assignments for the Digital Image Processing course.',
    href: gh('PCD_Assignment03'),
  },
  {
    title: 'Godot 2D course games',
    year: '2026',
    kind: 'Self-study',
    disciplines: ['games'],
    note: 'My implementations of the games from a Godot 2D course, from a dice catcher to a platformer with a boss fight.',
    href: gh('UdemyGodot2D'),
  },
  {
    title: 'The Ride of a Lifetime',
    year: '2025',
    kind: 'Unfinished game',
    disciplines: ['games'],
    note: 'A Unity visual novel using Ink for scripting, with character and portrait managers. Work in progress.',
    href: gh('The-Ride-of-a-Lifetime'),
  },
  {
    title: 'Unity platformer prototype',
    year: '2025',
    kind: 'Prototype',
    disciplines: ['games'],
    note: 'An early Unity player controller with JSON save data.',
    href: gh('platforming'),
  },
  {
    title: 'Wobble shader',
    year: '2026',
    kind: 'Experiment',
    disciplines: ['games'],
    note: 'A small Godot shader project used to practise team version control.',
    href: gh('mrpl_kelompok6'),
  },
  {
    title: 'High school informatics final',
    year: '2024',
    kind: 'Coursework',
    disciplines: ['software'],
    note: 'A multi-page registration site in plain HTML. My earliest public repository.',
    href: gh('Tugas-Akhir-Informatika'),
  },
];
