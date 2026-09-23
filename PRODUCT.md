# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user is a job-seeking software engineer who will not self-host. They need a job, they will not create Jina / OpenRouter / Typesafe accounts, and they bounce when asked to clone a repo. The Operator (Alex) runs a private instance for them and sits through a Setup session.

## Product Purpose

Job Fiend is the public face of a Hosted instance of Job Finder. The site exists so a stranger can understand the offer and book a Setup session. Success is a booked call with someone who is actually looking, then daily Reviews on their private queue.

## Positioning

The Operator runs a private job search on the Owner's criteria, pays the vendors, and sits through the first jobs with them. The software is MIT and public. The marketed start is not self-serve BYOK. Neighboring job boards and AI wrappers cannot truthfully say they will stand up a private instance and teach it from the Owner's Reviews.

## Operating Context

Owners arrive from the page, Cal.com, or a direct ping. They book https://cal.com/alexlazar/30-min-meeting. The Operator clones a Job Finder stack, holds provider keys, and works the Teaching loop (Review in the browser, Curation and Release targets over MCP). After the call, discovery runs daily. Five days with no pursue/reject Idle-pauses discovery. Queue data is visible to the Operator; application forms and recruiter talk are not in the product.

## Capabilities and Constraints

- This repository is the marketing site only (`jobfiend.io`). The search product lives in `mauricedesaxe/job-finder`.
- Phase 1 is free. The Operator pays Jina, OpenRouter, and Typesafe. No public price. No employer-side product on this page.
- Copy on the landing page is locked in job-finder#175. Do not invent testimonials, customers, or pricing.
- GitHub Actions deploy needs Cloudflare credentials on the repo. Wrangler Worker name is `jobfiend`. Custom domain is `jobfiend.io`.
- Cross-instance Operator console is out of scope until 5+ Owners.
- Undecided: whether the generated concept portrait stays the wordmark forever.

## Brand Commitments

- Name: Job Fiend. Domain: jobfiend.io.
- Voice: first person, the Operator speaking. Not a company. Not a SaaS pitch.
- Binding visual reference: `public/images/job-fiend-concept.jpg` (dark maroon field, cream serif, one face looking back). Generated, not final art, but it is the current brand start.
- CTA label: "Book a setup". Secondary: "Github Repo" → https://github.com/mauricedesaxe/job-finder.
- Demo: YouTube `bO7vzA0xbWg`, embedded.

## Evidence on Hand

- Locked page copy: https://github.com/mauricedesaxe/job-finder/issues/175
- Demo video: https://youtu.be/bO7vzA0xbWg
- Concept image: `public/images/job-fiend-concept.jpg`
- Search product source: https://github.com/mauricedesaxe/job-finder
- No customer quotes, logos, or case studies. Do not fabricate them.

## Product Principles

- The page books a Setup session. It does not teach self-host.
- Speak as one person. Do not sound like a company that does not exist yet.
- The Operator's access to the queue is the exchange. Do not hide it in product work even if a given page omits it.
- Do not sell to employers on this surface.
- Preserve locked copy unless the Operator rewrites it.

## Accessibility & Inclusion

No product-specific standard was set beyond ordinary web readability and keyboard focus on the booking control.
