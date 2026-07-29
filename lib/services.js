/**
 * Service page content, keyed by URL slug.
 *
 * Everything here is sourced from the v1 site: the deliverable list and its
 * prices come from the quotation engine in `controllers/userController.js`,
 * the process steps and FAQ answers from `views/user/web-development.ejs`.
 *
 * ⚠ PRICES were published on itbizone.com but may have moved since. Confirm
 * them before launch, or drop `price` from an entry to hide the "from" line.
 */

export const SERVICES = {
  'website-development': {
    slug: 'website-development',
    name: 'Website Development',
    eyebrow: 'Website Development',
    title: ['Websites that earn', 'their keep', '.'],
    lede: 'Custom sites and web applications built to load fast, read well to search engines, and be maintainable by whoever comes after us.',
    metaDescription:
      'Custom website development in Bengaluru — bespoke sites, CMS builds, e-commerce and web apps. Fixed written quotations, 30-day correction window.',

    stats: [
      { value: '4–6', label: 'Weeks, typical site' },
      { value: '30', label: 'Day correction window' },
      { value: '50/50', label: 'Payment split' },
    ],

    pillarsTitle: ['Four ways a site ', 'earns', ' its keep.'],


    pillars: [
      {
        title: 'Custom Web Development',
        copy: 'Designed and coded around your business, not dropped into a theme. Every layout decision traces back to something you need it to do.',
      },
      {
        title: 'CMS-Based Websites',
        copy: 'WordPress or a headless CMS, set up so your team can publish without calling us. Training and handover included.',
      },
      {
        title: 'E-commerce Development',
        copy: 'Catalogue, cart, payment gateway and inventory — wired together and tested against a real festive-season load before launch.',
      },
      {
        title: 'SEO-Optimised Websites',
        copy: 'Semantic structure, clean metadata, fast Core Web Vitals. The technical groundwork that makes later marketing work cheaper.',
      },
    ],

    groups: [
      {
        title: 'Build',
        items: [
          { name: 'Custom Website Design & Development', price: 20000 },
          { name: 'Landing Page Design & Development', price: 8000 },
          { name: 'Web Application Development', price: 40000 },
          { name: 'E-commerce Development', price: 30000 },
          { name: 'CMS Development', price: 18000 },
        ],
      },
      {
        title: 'Improve',
        items: [
          { name: 'Website Redesign & Modernization', price: 22000 },
          { name: 'Responsive Design & Mobile Optimization', price: 15000 },
          { name: 'Performance Optimization', price: 12000 },
          { name: 'Website Security Implementation', price: 10000 },
          { name: 'SEO-Friendly Web Structure', price: 10000 },
        ],
      },
      {
        title: 'Integrate & run',
        items: [
          { name: 'UI/UX Design', price: 16000 },
          { name: 'API Integration', price: 12000 },
          { name: 'Payment Gateway Integration', price: 10000 },
          { name: 'Domain & Hosting Setup', price: 4000 },
          { name: 'Website Maintenance & Support', price: 6000 },
        ],
      },
    ],

    process: [
      {
        title: 'Discovery & Planning',
        copy: 'We map what the site has to achieve, agree the scope in writing, and send an itemised quotation valid for 30 days.',
      },
      {
        title: 'Design & Prototyping',
        copy: 'Wireframes then full design, reviewed at each milestone. Nothing gets built until you have signed off on how it looks.',
      },
      {
        title: 'Development & Testing',
        copy: 'Built responsive-first and tested across devices and browsers. Scope changes get priced in writing before we start them.',
      },
      {
        title: 'Launch & Support',
        copy: 'Deployment, handover and full ownership of the deliverables. Anything defective is corrected free for 30 days.',
      },
    ],

    duration: 'Typically 4–12 weeks end to end',
    stackLabel: 'Built on',
    stack: [
      'Next.js',
      'React',
      'Node.js',
      'WordPress',
      'Shopify',
      'MongoDB',
      'Supabase',
      'Tailwind CSS',
      'AWS',
      'Razorpay',
    ],

    // Matched against `disciplines` in lib/projects.js.
    projectFilter: ['Website', 'Web App', 'Rebuild', '3D', 'AI'],

    // Capability-led: what we can build, then what it looks like, then proof.
    layout: ['pillars', 'showcase', 'deliverables', 'process', 'work', 'faq'],

    faqs: [
      {
        q: 'How long does it take to build a website?',
        a: 'It depends on scope. A straightforward site is typically 4–6 weeks; e-commerce or custom features push it to 8–12. You get a specific timeline with your quotation, not a range.',
      },
      {
        q: 'Will my website be mobile-friendly?',
        a: 'Yes — every site is built mobile-first and responsive, then tested on real phones, tablets and desktops before it goes live.',
      },
      {
        q: 'Can you redesign my existing website?',
        a: 'Yes. We modernise the design, improve the UX and performance, and add what is missing, while keeping the brand identity your customers already recognise.',
      },
      {
        q: 'Do you use templates or custom design?',
        a: 'Custom. We use established frameworks and tooling for speed, but the design itself is made for your business rather than adapted from a theme.',
      },
      {
        q: 'What platforms do you build on?',
        a: 'Mainly Next.js, React, Node.js and WordPress, plus headless CMS setups. We recommend the platform against your budget, your team, and how far you expect to scale.',
      },
      {
        q: 'Who owns the website when it is finished?',
        a: 'You do. On final payment, every design, line of code and asset created for your project transfers to you outright.',
      },
    ],
  },
}

SERVICES['graphic-design'] = {
  slug: 'graphic-design',
  name: 'Graphic Design',
  eyebrow: 'Graphic Design',
  title: ['Design that survives', 'contact', ' with the real world.'],
  lede: 'Logos, brand systems, print and packaging — made to hold together across every place your business shows up, not just in the presentation.',
  metaDescription:
    'Graphic design in Bengaluru — logo and brand identity, print, packaging, social creatives and illustration. Unlimited revisions, source files included.',

  stats: [
    { value: '1–2', label: 'Weeks for a logo' },
    { value: '3–4', label: 'Weeks, full identity' },
    { value: '∞', label: 'Revisions included' },
  ],

  pillarsTitle: ['Everywhere the brand ', 'shows up', '.'],


  pillars: [
    {
      title: 'Brand Identity',
      copy: 'Logo, colour palette, typography and a written guidelines document — so the brand still looks like itself when someone else picks it up.',
    },
    {
      title: 'Marketing Collateral',
      copy: 'Brochures, flyers, posters, catalogues and stationery. Print-ready files with bleed and colour handled properly, not exported hopefully.',
    },
    {
      title: 'Digital Assets',
      copy: 'Social posts, ad creatives, email templates and web graphics, built as reusable sets your team can keep publishing from.',
    },
    {
      title: 'Illustration & Art',
      copy: 'Custom vector illustration, infographics and 3D or motion elements when stock photography would make you look like everyone else.',
    },
  ],

  groups: [
    {
      title: 'Identity',
      items: [
        { name: 'Logo & Brand Identity Design', price: 25000 },
        { name: 'Rebranding & Visual Refresh', price: 28000 },
        { name: 'Business Card & Stationery Design', price: 8000 },
        { name: 'Packaging Design', price: 20000 },
        { name: 'Illustrations & Vector Art', price: 18000 },
      ],
    },
    {
      title: 'Print',
      items: [
        { name: 'Brochure, Flyer & Poster Design', price: 12000 },
        { name: 'Product Catalogue Design', price: 20000 },
        { name: 'Print Media Design', price: 15000 },
        { name: 'Infographics & Presentation Design', price: 15000 },
        { name: '3D & Motion Graphic Elements', price: 35000 },
      ],
    },
    {
      title: 'Digital',
      items: [
        { name: 'Social Media Post Design', price: 10000 },
        { name: 'Banner & Ad Creative Design', price: 12000 },
        { name: 'Website & App Graphic Assets', price: 25000 },
        { name: 'UI/UX Design Mockups', price: 22000 },
        { name: 'Email Newsletter Design', price: 12000 },
      ],
    },
  ],

  process: [
    {
      title: 'Discovery',
      copy: 'We look at your market, your competitors and what you already have, then agree the deliverable list in writing.',
    },
    {
      title: 'Concepts',
      copy: 'Distinct directions to react to — not one safe option and two obviously worse ones put beside it.',
    },
    {
      title: 'Refinement',
      copy: 'We take the chosen direction through unlimited revisions until it is right, then test it small, large and in one colour.',
    },
    {
      title: 'Handover',
      copy: 'Every format you need — PNG, JPG, SVG, PDF and editable source files — plus guidelines so it stays consistent.',
    },
  ],

  duration: 'Typically 1–8 weeks end to end',
  stackLabel: 'Tools we work in',
  stack: [
    'Illustrator',
    'Photoshop',
    'InDesign',
    'Figma',
    'After Effects',
    'Blender',
    'Affinity',
    'Canva templates',
  ],

  // A visual service should open with something to look at. `morph` is the
  // scroll-driven poster gallery — it replaces the WebGL wall here rather
  // than sitting beside it, because two full-bleed galleries on one page
  // compete instead of compounding. The wall still runs on the home page.
  layout: ['showcase', 'pillars', 'morph', 'deliverables', 'process', 'faq'],
  pillarsVariant: 'rows',

  faqs: [
    {
      q: "What's included in a brand identity package?",
      a: 'Logo design, colour palette, typography guidelines, a written brand guidelines document, and a starter set of social media templates. Anything else you need can be added to the quotation.',
    },
    {
      q: 'How long does a design project typically take?',
      a: 'A logo is usually 1–2 weeks, a full brand identity 3–4 weeks, and a larger design system 6–8. You get a specific timeline at the discovery stage.',
    },
    {
      q: 'Do you provide unlimited revisions?',
      a: 'Yes. Revisions are unlimited through the design process — we keep going until you are satisfied rather than counting rounds against you.',
    },
    {
      q: 'In what formats do you deliver the final designs?',
      a: 'PNG, JPG, SVG and PDF, plus the editable source files (AI, PSD and so on) so you are never locked out of your own artwork.',
    },
    {
      q: 'Can you help with both print and digital design?',
      a: 'Both. Print work goes out press-ready, digital work goes out as reusable sets, and we keep the two visually consistent.',
    },
    {
      q: 'Do you retain ownership of the designs, or do I?',
      a: 'You do. On completion and full payment, every design transfers to you outright — use, modify and distribute it however you like.',
    },
  ],
}

SERVICES['social-media-management'] = {
  slug: 'social-media-management',
  name: 'Social Media Management',
  eyebrow: 'Social Media Management',
  // v1 framed this service as "Build, engage, and grow your online community."
  title: ['An audience, not a', 'follower count', '.'],
  lede: 'Strategy, content, community and campaigns run as one calendar — and reported monthly against numbers that mean something to the business.',
  metaDescription:
    'Social media management in Bengaluru — strategy, content calendars, reels, community management and paid campaigns, reported monthly.',

  stats: [
    { value: '15', label: 'Services in scope' },
    { value: 'Monthly', label: 'Performance reporting' },
    { value: '50/50', label: 'Payment split' },
  ],

  pillarsTitle: ['What the retainer ', 'covers', '.'],


  pillars: [
    {
      title: 'Strategy & Setup',
      copy: 'Audit of what you have, a look at who you are competing with, then profiles rebuilt around a clear position and tone.',
    },
    {
      title: 'Content & Creative',
      copy: 'Posts, stories and short video produced to a calendar you approve in advance — so nothing gets made the morning it is due.',
    },
    {
      title: 'Community & Growth',
      copy: 'Replies, DMs and comments handled daily, influencer collaborations arranged, and a plan for when something goes wrong publicly.',
    },
    {
      title: 'Campaigns & Reporting',
      copy: 'Paid campaigns and contests run against a budget, with a monthly report showing what moved and what we are changing.',
    },
  ],

  groups: [
    {
      title: 'Strategy',
      items: [
        { name: 'Social Media Strategy Development', price: 15000 },
        { name: 'Account Setup & Optimization', price: 10000 },
        { name: 'Social Media Branding', price: 15000 },
        { name: 'Social Listening & Competitor Analysis', price: 12000 },
        { name: 'Hashtag Research & Trend Analysis', price: 10000 },
      ],
    },
    {
      title: 'Content',
      items: [
        { name: 'Content Creation & Scheduling', price: 18000 },
        { name: 'Creative Design for Posts & Stories', price: 15000 },
        { name: 'Reel & Short Video Content Strategy', price: 18000 },
        { name: 'Contest & Campaign Execution', price: 16000 },
        { name: 'Influencer Collaboration Management', price: 22000 },
      ],
    },
    {
      title: 'Grow & report',
      items: [
        { name: 'Community Management', price: 15000 },
        { name: 'Ad Campaign Management', price: 18000 },
        { name: 'Profile Growth & Engagement Boost', price: 15000 },
        { name: 'Crisis & Reputation Handling', price: 18000 },
        { name: 'Analytics & Monthly Reporting', price: 12000 },
      ],
    },
  ],

  process: [
    {
      title: 'Audit',
      copy: 'We go through your existing accounts and your competitors, and establish what the numbers look like before we touch anything.',
    },
    {
      title: 'Strategy',
      copy: 'Content pillars, tone of voice, posting cadence and the platforms worth being on — agreed in writing before anything is produced.',
    },
    {
      title: 'Produce & publish',
      copy: 'A calendar you approve ahead of time, then design, scheduling and daily community management against it.',
    },
    {
      title: 'Report & adjust',
      copy: 'A monthly report on reach, engagement and leads, with the specific changes we are making next month and why.',
    },
  ],

  duration: 'Ongoing, reviewed monthly',
  stackLabel: 'Platforms we manage',
  stack: [
    'Instagram',
    'Facebook',
    'LinkedIn',
    'X',
    'YouTube',
    'WhatsApp Business',
    'Meta Ads Manager',
    'Google Analytics',
  ],

  // An ongoing retainer is bought on method, so process sits high. The poster
  // wall's Social category — carousels, story sets, reel covers — is the proof.
  layout: ['pillars', 'showcase', 'process', 'gallery', 'deliverables', 'faq'],

  faqs: [
    {
      q: 'Which platforms do you manage?',
      a: 'Instagram, Facebook, LinkedIn, X and YouTube, plus WhatsApp Business where it makes sense. We would rather run two platforms properly than five badly, so the audit usually narrows the list.',
    },
    {
      q: 'Do you create the content, or do we supply it?',
      a: 'We create it — copy, design and short video. If you have product photography or footage, we will use it; if not, that gets built into the plan.',
    },
    {
      q: 'How often will you post?',
      a: 'Cadence is set in your strategy and written into the scope, so you know the number before you sign. It is driven by what the platform and your category actually reward, not by a fixed package.',
    },
    {
      q: 'Do we own the content you produce?',
      a: 'Yes. On full payment, every asset created for your account transfers to you outright, including editable source files.',
    },
    {
      q: 'Do you handle paid ads as well as organic?',
      a: 'Both. Campaign management is a line item on the quotation, and your ad spend is paid to the platform directly by you — we never mark it up.',
    },
    {
      q: 'How do we know it is working?',
      a: 'A monthly report covering reach, engagement, follower growth and any leads attributable to social — with what changed and what we are doing differently next month.',
    },
  ],
}

/* ─────────────────────────────────────────────────────────────────────────
 * ⚠ THE THREE ENTRIES BELOW ARE NOT SOURCED FROM v1.
 *
 * itbizone.com was unreachable when these were written, so unlike the three
 * services above — whose copy and prices came from the v1 quotation engine —
 * this content was drafted from the service descriptions on the home page.
 *
 * Line items marked "carried" reuse a price already published elsewhere in
 * this file, so the same deliverable cannot show two different figures in the
 * estimator. Every other price is a DRAFT and needs your sign-off before
 * launch. Drop `price` from any entry to hide its "from" line.
 * ───────────────────────────────────────────────────────────────────────── */

SERVICES['ui-ux-design'] = {
  slug: 'ui-ux-design',
  name: 'UI/UX Design',
  eyebrow: 'UI/UX Design',
  title: ['Interfaces people understand', 'immediately', '.'],
  lede: 'Research, flows and interface design that settle what the product does before anyone starts arguing about what it looks like.',
  metaDescription:
    'UI/UX design in Bengaluru — user research, wireframing, prototyping, interface design, design systems and usability testing for web and mobile products.',

  stats: [
    { value: '2–3', label: 'Weeks to first prototype' },
    { value: '30', label: 'Day correction window' },
    { value: '50/50', label: 'Payment split' },
  ],

  pillarsTitle: ['How the interface gets ', 'decided', '.'],


  pillars: [
    {
      title: 'Research & Discovery',
      copy: 'Interviews, competitor teardowns and a look at your existing analytics — so the redesign fixes what is actually losing people.',
    },
    {
      title: 'Wireframes & Prototypes',
      copy: 'Structure agreed in greyscale first, then a clickable prototype you can put in front of real users before anything is built.',
    },
    {
      title: 'Interface Design',
      copy: 'Full visual design across every state — loading, empty, error and edge case — not just the three screens that demo well.',
    },
    {
      title: 'Design Systems',
      copy: 'Components, tokens and documentation your developers can build straight from, so the tenth screen still matches the first.',
    },
  ],

  groups: [
    {
      title: 'Research',
      items: [
        { name: 'User Research & Personas', price: 14000 },
        { name: 'Competitor & Heuristic Audit', price: 12000 },
        { name: 'Information Architecture', price: 12000 },
        { name: 'User Journey Mapping', price: 10000 },
        { name: 'Usability Testing', price: 15000 },
      ],
    },
    {
      title: 'Design',
      items: [
        { name: 'UI/UX Design', price: 16000 }, // carried — website-development
        { name: 'Wireframing & Prototyping', price: 14000 },
        { name: 'UI/UX Design Mockups', price: 22000 }, // carried — graphic-design
        { name: 'Mobile App UI Design', price: 25000 },
        { name: 'Responsive Design & Mobile Optimization', price: 15000 }, // carried
      ],
    },
    {
      title: 'Systems & handover',
      items: [
        { name: 'Design System & Component Library', price: 30000 },
        { name: 'Accessibility Audit (WCAG)', price: 15000 },
        { name: 'Developer Handoff & Specifications', price: 10000 },
        { name: 'Design QA & Build Review', price: 10000 },
        { name: 'Ongoing Design Support', price: 6000 },
      ],
    },
  ],

  process: [
    {
      title: 'Discover',
      copy: 'We talk to your users and your team, audit what exists, and write down what the interface has to achieve before we design anything.',
    },
    {
      title: 'Structure',
      copy: 'Information architecture and greyscale wireframes, so layout and priority get settled while they are still cheap to change.',
    },
    {
      title: 'Design & test',
      copy: 'Full interface design and a clickable prototype, put in front of real users and revised against what they actually do.',
    },
    {
      title: 'Hand over',
      copy: 'Components, tokens and specifications your developers build from — plus a review once it is built, to catch the drift.',
    },
  ],

  duration: 'Typically 3–8 weeks end to end',
  stackLabel: 'Tools we work in',
  stack: [
    'Figma',
    'FigJam',
    'Framer',
    'Maze',
    'Hotjar',
    'Storybook',
    'Notion',
    'After Effects',
  ],

  projectFilter: ['UI/UX', 'Web App', 'Website'],

  // Craft sold on process: show the work, then how it is arrived at, and
  // only then the line items.
  layout: ['showcase', 'pillars', 'process', 'deliverables', 'work', 'faq'],
  pillarsVariant: 'rows',

  faqs: [
    {
      q: 'What is the difference between UI and UX design?',
      a: 'UX is how it works — the flows, structure and decisions about what belongs on each screen. UI is how it looks and feels. We do both, and we do the UX first, because a beautiful screen that solves the wrong problem is still the wrong screen.',
    },
    {
      q: 'Do you design for mobile apps as well as websites?',
      a: 'Both. Web apps, marketing sites, iOS and Android — and we design to each platform’s conventions rather than shrinking one layout to fit the other.',
    },
    {
      q: 'Will I get a clickable prototype?',
      a: 'Yes. Every project includes an interactive prototype you can click through and share, so stakeholders can react to the real thing rather than to a static image.',
    },
    {
      q: 'Can you work with our existing developers?',
      a: 'Regularly. We hand over components, tokens and written specifications in Figma, and stay available through the build to answer questions and review what ships.',
    },
    {
      q: 'Do you redesign existing products?',
      a: 'Yes, and it is most of what we do. We start with an audit of the current experience and your analytics so the redesign targets the screens actually losing people, rather than restyling everything at once.',
    },
    {
      q: 'Who owns the design files?',
      a: 'You do. On final payment the Figma files, components and every asset created for your project transfer to you outright.',
    },
  ],
}

SERVICES['digital-marketing'] = {
  slug: 'digital-marketing',
  name: 'Digital Marketing',
  eyebrow: 'Digital Marketing',
  title: ['Marketing measured in', 'leads', ', not impressions.'],
  lede: 'SEO, Google Ads and paid social run against tracked numbers — with a monthly report that shows what it cost to acquire a customer.',
  metaDescription:
    'Digital marketing in Bengaluru — SEO, Google Ads, Meta Ads, local SEO and email. Tracked conversions, monthly reporting, ad spend never marked up.',

  stats: [
    { value: 'Monthly', label: 'Performance reporting' },
    { value: '0%', label: 'Markup on ad spend' },
    { value: '50/50', label: 'Payment split' },
  ],

  pillarsTitle: ['Four levers on ', 'demand', '.'],


  pillars: [
    {
      title: 'Search & SEO',
      copy: 'Technical fixes, on-page work and local search, aimed at the queries that bring buyers rather than the ones that bring traffic.',
    },
    {
      title: 'Paid Campaigns',
      copy: 'Google and Meta campaigns built around conversion tracking that works, so spend can be judged on cost per lead.',
    },
    {
      title: 'Content & Email',
      copy: 'Blog, email and WhatsApp sequences that keep working after the ad budget stops — the part most agencies skip.',
    },
    {
      title: 'Tracking & Reporting',
      copy: 'Analytics and conversion tracking set up properly first. A monthly report on what moved, what it cost, and what changes next.',
    },
  ],

  groups: [
    {
      title: 'Search',
      items: [
        { name: 'SEO Audit & Strategy', price: 15000 },
        { name: 'On-Page SEO', price: 12000 },
        { name: 'Technical SEO', price: 15000 },
        { name: 'Local SEO & Google Business Profile', price: 12000 },
        { name: 'SEO-Friendly Web Structure', price: 10000 }, // carried — website-development
      ],
    },
    {
      title: 'Paid',
      items: [
        { name: 'Google Ads Campaign Management', price: 18000 },
        { name: 'Meta Ads Campaign Management', price: 18000 },
        { name: 'Remarketing & Display Campaigns', price: 15000 },
        { name: 'Landing Page Design & Development', price: 8000 }, // carried
        { name: 'Conversion Rate Optimization', price: 18000 },
      ],
    },
    {
      title: 'Retain & report',
      items: [
        { name: 'Email Marketing & Automation', price: 15000 },
        { name: 'WhatsApp & SMS Marketing', price: 12000 },
        { name: 'Content Marketing & Blogging', price: 18000 },
        { name: 'Marketing Automation Setup', price: 20000 },
        { name: 'Analytics & Monthly Reporting', price: 12000 }, // carried — social
      ],
    },
  ],

  process: [
    {
      title: 'Audit & baseline',
      copy: 'We check what is tracked today, fix the measurement first, and write down the numbers before we change anything.',
    },
    {
      title: 'Strategy',
      copy: 'Channels, keywords, budget split and the target cost per lead — agreed in writing so success is defined before we spend.',
    },
    {
      title: 'Launch & optimise',
      copy: 'Campaigns and SEO work go live in stages, then get adjusted weekly against conversion data rather than vanity metrics.',
    },
    {
      title: 'Report & scale',
      copy: 'A monthly report on leads, cost per acquisition and what changed — plus where we would put the next rupee, and why.',
    },
  ],

  duration: 'Ongoing, reviewed monthly',
  stackLabel: 'Platforms we run',
  stack: [
    'Google Ads',
    'Meta Ads',
    'Google Analytics',
    'Search Console',
    'Google Tag Manager',
    'Ahrefs',
    'Mailchimp',
    'WhatsApp Business',
  ],

  // No projectFilter: lib/projects.js has no marketing case studies yet, and
  // ServiceWork renders nothing rather than an empty proof section.

  // Bought on method and measurement, so process comes before the picture.
  layout: ['pillars', 'process', 'showcase', 'deliverables', 'faq'],
  pillarsVariant: 'rows',

  faqs: [
    {
      q: 'How long before we see results?',
      a: 'Paid campaigns produce data within days and can be judged inside a month. SEO is slower — meaningful movement usually takes three to six months, and anyone promising faster is either buying links or counting the wrong things.',
    },
    {
      q: 'Do you mark up our advertising spend?',
      a: 'No. You pay Google and Meta directly from your own account, so you can see every rupee. We charge for management only.',
    },
    {
      q: 'Do we keep access to the ad accounts?',
      a: 'Always. Accounts are created under your ownership with us added as a manager. If we part ways, you keep the account, the history and the data.',
    },
    {
      q: 'What is a realistic monthly budget?',
      a: 'It depends entirely on your category and how competitive the keywords are. We size the budget during the audit and tell you if the number you have in mind is too small to be worth spending at all.',
    },
    {
      q: 'Can you work with our existing website?',
      a: 'Yes. If something on the site is actively blocking conversions we will say so and quote the fix separately, rather than spending your ad budget driving traffic to a page that cannot convert it.',
    },
    {
      q: 'What do the monthly reports actually cover?',
      a: 'Leads, cost per acquisition, conversion rate by channel and organic ranking movement — with what we changed last month and what we are changing next. Not a screenshot of impressions.',
    },
  ],
}

SERVICES['ecommerce-development'] = {
  slug: 'ecommerce-development',
  name: 'E-commerce Development',
  eyebrow: 'E-commerce Development',
  title: ['Storefronts built to', 'sell', ', not just to launch.'],
  lede: 'Catalogue, checkout, payments and inventory wired together and load-tested — so the festive rush is a good day rather than an outage.',
  metaDescription:
    'E-commerce development in Bengaluru — Shopify, WooCommerce and headless storefronts with payment gateways, inventory, GST invoicing and shipping integrations.',

  stats: [
    { value: '6–10', label: 'Weeks, typical store' },
    { value: '30', label: 'Day correction window' },
    { value: '50/50', label: 'Payment split' },
  ],

  pillarsTitle: ['What a storefront ', 'needs', '.'],


  pillars: [
    {
      title: 'Storefront Build',
      copy: 'Shopify, WooCommerce or a headless build on Next.js — chosen against your catalogue size, your team and your margins.',
    },
    {
      title: 'Payments & Checkout',
      copy: 'Razorpay, UPI, cards and cash on delivery, with a checkout stripped of the steps that lose people between cart and confirmation.',
    },
    {
      title: 'Operations',
      copy: 'Inventory, orders, GST invoicing and shipping integrations connected, so the back office is not run out of a spreadsheet.',
    },
    {
      title: 'Growth',
      copy: 'Product SEO, abandoned cart recovery and analytics — the work that decides whether the store earns back what it cost.',
    },
  ],

  groups: [
    {
      title: 'Storefront',
      items: [
        { name: 'E-commerce Development', price: 30000 }, // carried — website-development
        { name: 'Shopify Store Setup & Theme', price: 25000 },
        { name: 'WooCommerce Store Development', price: 22000 },
        { name: 'Headless Commerce Build', price: 45000 },
        { name: 'Marketplace Integration', price: 18000 },
      ],
    },
    {
      title: 'Checkout & operations',
      items: [
        { name: 'Payment Gateway Integration', price: 10000 }, // carried
        { name: 'Inventory & Order Management', price: 15000 },
        { name: 'Shipping & Logistics Integration', price: 12000 },
        { name: 'GST Invoicing & Tax Setup', price: 10000 },
        { name: 'Multi-currency & Multi-language', price: 15000 },
      ],
    },
    {
      title: 'Grow & run',
      items: [
        { name: 'Product Catalogue Setup', price: 18000 },
        { name: 'Abandoned Cart Recovery', price: 10000 },
        { name: 'E-commerce SEO', price: 15000 },
        { name: 'Performance Optimization', price: 12000 }, // carried
        { name: 'Store Maintenance & Support', price: 6000 },
      ],
    },
  ],

  process: [
    {
      title: 'Scope & platform',
      copy: 'Catalogue size, margins and who will run the store day to day decide the platform. We recommend against your case, then quote it.',
    },
    {
      title: 'Build & integrate',
      copy: 'Storefront, payment gateway, inventory and shipping built and connected, with the tax and invoicing rules set up correctly.',
    },
    {
      title: 'Load & checkout testing',
      copy: 'Tested against a realistic festive-season load and a real payment run, because checkout is the one page that cannot fail.',
    },
    {
      title: 'Launch & support',
      copy: 'Handover with training for whoever manages orders, full ownership of the build, and defects corrected free for 30 days.',
    },
  ],

  duration: 'Typically 6–14 weeks end to end',
  stackLabel: 'Built on',
  stack: [
    'Shopify',
    'WooCommerce',
    'Next.js',
    'React',
    'Node.js',
    'Razorpay',
    'MongoDB',
    'AWS',
  ],

  projectFilter: ['Website', 'Web App', 'Rebuild'],

  // Commerce buyers price-check early, so scope sits directly under the image.
  layout: ['showcase', 'deliverables', 'pillars', 'process', 'work', 'faq'],

  faqs: [
    {
      q: 'Shopify or a custom build — which do we need?',
      a: 'Shopify if you want to be selling quickly and can live inside its rules; WooCommerce if you are already on WordPress; a headless build if your catalogue or your logic is unusual enough that platforms fight you. We recommend against your case rather than defaulting to one.',
    },
    {
      q: 'Which payment methods can you support?',
      a: 'UPI, cards, net banking, wallets, EMI and cash on delivery, usually through Razorpay. The gateway is chosen on your transaction fees and settlement cycle, not on which one we prefer.',
    },
    {
      q: 'Do you handle GST invoicing?',
      a: 'Yes. Tax rules, HSN codes and GST-compliant invoices are configured as part of the build, and tested against real orders before launch.',
    },
    {
      q: 'Can you migrate our existing store?',
      a: 'Yes — products, customers, orders and URLs. Redirects are mapped carefully so the search rankings you have already paid for survive the move.',
    },
    {
      q: 'Will the store handle a festive-season spike?',
      a: 'It is tested for it before launch rather than discovered during it. Hosting is sized against your expected peak, and we tell you what that costs up front.',
    },
    {
      q: 'Can our team add products without calling you?',
      a: 'Yes. Handover includes training for whoever manages the catalogue and orders, plus documentation. Ongoing support is a line item only if you want it.',
    },
  ],
}

export const SERVICE_SLUGS = Object.keys(SERVICES)

export function getService(slug) {
  return SERVICES[slug] ?? null
}

/** Indian formatting — ₹20,000 renders as 20,000 not 20.000. */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
