import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  helpme,
  interviewscheduler,
  barchart,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Web Developer',
    icon: web,
  },
  {
    title: 'React Developer',
    icon: mobile,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'Full Stack Developer',
    icon: creator,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Full Stack Developer (Contract)',
    company_name: 'Relish Studios',
    iconBg: '#383E56',
    date: 'February 2022 - December 2022',
    points: [
      'Worked on company website as well as client projects with different web technologies.',
      'Worked on building React Components and developing SPA using React, Redux, Typescript, REST API backed by ExpressJS.',
      'Created an API app that used Firebase Services - Cloud Firestore, Cloud Functions, Authentication, Hosting and designed using Tailwind CSS.',
      'Worked on building some features of a VueJS Dashboard application that used PRIMEVUE for Components design, Pinia for managing global state, Typescript and firebase services.',
      'Built Craft CMS responsive website from scratch from given PSD design mockups, using the web technologies - HTML, CSS, Javascript, jQuery, SASS, Foundation framework, Webpack, Gulp, Twig Teamplating.',
      'Maintained company website by implementing Wordpress plugins like Wordpress Migrate, Advanced Custom Fields architecture, Twig templates.',
      "Implemented Responsive website design and Accessibility from Figma mockups using HTML, CSS, Javascript and it's frameworks.",
    ],
  },
  {
    title: 'Web Developer',
    company_name: 'Barry Commercial',
    iconBg: '#E6DEDD',
    date: 'November 2014 - August 2016',
    points: [
      'Developed, maintained real estate properties management system written in PHP.',
      'Designed and implemented the user interface using HTML5, CSS3, Bootstrap, JavaScript.',
      'Used AJAX and JSON to make asynchronous REST API calls to the server to fetch data on the fly.',
      'Used Google Maps API to display dynamic property Icons in google maps for the propertysearch feature.',
      'Used FPDF and other PHP libraries to dynamically generate custom forms and propertybrochures.',
      'Used Chart.js library to generate property analytics for sold properties.',
    ],
  },
];

const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

const projects = [
  {
    name: 'helpME',
    description:
      'HelpME is an interactive social help network. Where you can contact volunteers from our community and quickly connect through chat anytime and get help or discuss any topic you want.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: helpme,
    source_code_link: 'https://github.com/patumang/helpME',
  },
  {
    name: 'Interview Scheduler',
    description:
      'Interview Scheduler is a single-page application where students can book, update or cancel appointments with an interviewer.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: interviewscheduler,
    source_code_link: 'https://github.com/patumang/scheduler',
  },
  {
    name: 'Bar Chart Library',
    description:
      'A Bar Chart Library can be integrated by developers in their app to render charts using dynamic datasets.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: barchart,
    source_code_link: 'https://github.com/patumang/bar-chart-project',
  },
];

export { services, technologies, experiences, testimonials, projects };
