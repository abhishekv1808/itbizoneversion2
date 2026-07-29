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
      'Custom website development in Bengaluru — bespoke sites, CMS builds, e-commerce and web applications. Fixed written quotations, 50/50 terms, 30-day correction window.',

    stats: [
      { value: '4–6', label: 'Weeks, typical site' },
      { value: '30', label: 'Day correction window' },
      { value: '50/50', label: 'Payment split' },
    ],

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
    'Graphic design in Bengaluru — logo and brand identity, print collateral, packaging, social creatives and illustration. Unlimited revisions, source files included, full ownership on completion.',

  stats: [
    { value: '1–2', label: 'Weeks for a logo' },
    { value: '3–4', label: 'Weeks, full identity' },
    { value: '∞', label: 'Revisions included' },
  ],

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

  // The WebGL poster wall stands in for a project list here — one client
  // tagged 'Brand' would be thin proof for a design service.
  showcase: 'design-gallery',

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
    'Social media management in Bengaluru — strategy, content calendars, reels, community management, paid campaigns and monthly reporting across Instagram, Facebook, LinkedIn and YouTube.',

  stats: [
    { value: '15', label: 'Services in scope' },
    { value: 'Monthly', label: 'Performance reporting' },
    { value: '50/50', label: 'Payment split' },
  ],

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

  // The poster wall carries a full Social category — carousels, story sets,
  // reel covers — so it doubles as proof here.
  showcase: 'design-gallery',

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
