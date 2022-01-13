const OPEN_GRAPH = [
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Galaxy Generator 🌌 🪐 - Alvaro Dev Labs',
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content:
      'Galaxy Generator is a tool to generate an awesome random galaxy using ThreeJS and WebGL + ViteJS.',
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Galaxy Generator 🌌 🪐- Alvaro Dev Labs',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://threejs-galaxy-generator-tau.vercel.app/',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content:
      'https://res.cloudinary.com/alvarosaburido/image/upload/v1642055935/galaxy-generator_erfcjy.png',
  },
  { property: 'og:updated_time', content: new Date().toISOString() },
]

const TWITTER = [
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@alvarosaburido1' },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: 'Galaxy Generator 🌌 🪐 - Alvaro Dev Labs',
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content:
      'Galaxy Generator is a tool to generate an awesome random galaxy using ThreeJS and WebGL + ViteJS.',
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content:
      'https://res.cloudinary.com/alvarosaburido/image/upload/v1642055935/galaxy-generator_erfcjy.png',
  },
  {
    hid: 'twitter:image:alt',
    name: 'twitter:image:alt',
    content: 'Galaxy Generator 🌌 🪐 - Alvaro Dev Labs',
  },
]

export default {
  title: 'Galaxy Generator 🌌 🪐 - Alvaro Dev Labs',
  meta: [
    { charset: 'utf-8' },
    { property: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content:
        'Galaxy Generator is a tool to generate an awesome random galaxy using ThreeJS and WebGL + ViteJS.',
    },
    { hid: 'author', name: 'author', content: 'Alvaro Saburido' },

    ...OPEN_GRAPH,
    ...TWITTER,
    {
      hid: 'keywords',
      property: 'keywords',
      keywords: 'galaxy, threejs, vitejs, vue, generator',
    },
  ],
  /*  link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', href: '/logo.svg' },
    ], */
}
