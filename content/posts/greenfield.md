---
title: "Tech-Stack Heirarchy: A Greenfield Story"
date: 2024-10-24
summary: When I use what where & why.
---

{{<notice title="A Living Document">}}

This is an early entry of what I hope to continually revisit & update my thoughts, views, and preferences for what guides my application decision making. It's still early but hope it proves to be a good practice for logging and tracking changes over time.

{{</notice>}}

## Core Values

At the core, we need to understand that HTML bloat is better than CSS bloat is better than JS bloat. Similarly, generate static before server side rendering before the client. This doesn't mean avoid the latter of either, but to know when to use what solution.

And unlearn...

```html
<body>
  <div id="app"></div>
  <script src="./literally-everything.js"></script>
</body>
```

### Know the HTML

HTML should be semantic & native as much as possible. The wheel doesn't need to be reinvented ([unless you're learning](https://philipwalton.com/articles/how-to-become-a-great-front-end-engineer/#reinvent-the-wheel)) and there's a lot of power in native elements. Such as how certain attributes inform interactions with others and how accessibility tools handle certain elements.

Knowing html and how the browser works helps instruct developing reusable custom web components to promote composing html over recreating pages of javascript over and over.

### Utilize CSS

As outlined in the [utility first](/posts/utility-first-css/) post, CSS should be as small as possible with reusable classes via [Tailwind CSS](https://tailwindcss.com/). Classes that describe the style it's providing and not the element it's styling.

### JavaScript Enhancement 

The initial load should be as JavaScript free as possible, allowing the initial render to complete before executing anything. Then using web components where applicable to *enhance* the functionality (via [Lit](https://lit.dev/)), along with third-party resources and other scripts to enhance functionality.

Joining the likes of [Microsoft Edge](https://blogs.windows.com/msedgedev/2024/05/28/an-even-faster-microsoft-edge), [Adobe Photoshop](https://web.dev/articles/ps-on-the-web#web_components_and_lit), and [Google Maps](https://mapsplatform.google.com/resources/blog/build-maps-faster-web-components/) in making performant applications with web components.

One of the major hurdles of Shadow-DOM web components is React/Vue-like expectations when it's meant to be treated like raw, single purpose html elements that are composed together to contstruct applications. You *can* create fully complex single page applications with only web components all inside of a root `<my-app>` component, but that's more of a pendulum swing past the core mindset and best practices of web components.

Using [Vue](https://vuejs.org/) if I did find a need to maniuplate the Light DOM without web components, or possibly exploring [Svelte](https://svelte.dev/).

### Promote Static

There are many different types of caches, and lots of them are used to cover up bad habits, but static html is the best type of cache. You can't beat static HTML (*[sort of](https://purplesyringa.moe/blog/webp-the-webpage-compression-format/)*), it's cached by the browser and viewable offline without a service worker, doesn't require a database at all times for unchanging content, and doesn't need a caching service for fast delivery.

### Minimize Dependencies

Security is an important part of web development & applications, and the more dependencies an application has the more likely it is to get vulnerabilities, and increases the difficulty to resolve when it's a deeply nested package vulnerability. Sometimes this is linters or build tools, other times it's the primary application's framework (such as Storybook or Angular). [Dependabot](https://github.com/features/security) helps catch things early (if you're lucky enough to use GitHub), but it's frustrating when you've done as many `"overrides"` as possible and you're mercy of the package maintainers to unblock your application.

---

{{<notice title="Additional Resources" type="info">}}

- [The Web's Grain](https://frankchimero.com/blog/2015/the-webs-grain/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

{{</notice>}}

---

## Architecture

### Minimal, Static Site

For a purely static website (such as this one) that I have complete control over I'd opt for [Hugo](https://gohugo.io/), a static site generator built on golang with over a decade of maturity. One of the primary features I love, and one I haven't found eslewhere, is using the [`hugo_stats`](https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss) file to inform Tailwind what classes *are* used, as opposed to scanning source files for what *could* be used.

Even for a singular page that could get by with just the HTML, CSS, & JS files, I'd favor Hugo. Being able to separate the building blocks and utilize markdown, along with the reliability & stability of the Hugo generator, I can simply edit a file and trust it to compile without any issues/blockers.

{{<notice title="Proof in the Pudding" type="tip">}}

I've had instances where I've found a typo while away from my computer and opened up GitHub on my phone, edited the markdown file, committed the change, and the fix was published in seconds.

{{</notice>}}

### "Single Page" Applications

I mean *"single page"* in the most isolated sense of the term, an application that is on a page. Abandon this horrible habit of a singular `index.html` where all pages and endpoints of the application are contained in javascript files as we recreate browser navigation.

In most cases Hugo *should* be able to satisfy this (and the categories that follow), but when a team is involved where a javascript ecosystem is more appropriate I'd suggest [Vite](https://vite.dev/). You could get by with just [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) or [esbuild](https://esbuild.github.io/) on their own, but Vite provides a lot of quality of life without increasing the dependency tree a terrible amount.

### Multi-Page Application

[Astro](https://astro.build/) has been very satisyfing to work with for multi-page applications. It's built on top of Vite, supports markdown & MDX, and a modular authoring experience very similar to Vue and Svelte's single file components. The only reason I wouldn't suggest it for single page applications is to minimize the dependenc tree, but feels like a natural part of Vite as a simple addition.

Incorporating [view transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) has its place for handling all routing within the application, but for the most part let the browser navigate to a new page. Browsers are really powerful and can handle new page loads rather seamlessly, let it refresh and utilize the browser/memory cache.

[Observable's Framework](https://observablehq.com/framework/) has peaked my interest for authoring a page in markdown by converting the code blocks to the actual resource (js, css, html-fragments, etc). It's a rather fascinating and the method may potentially be easily converted to MDX. 

### Content Management

When it's necessary to integrate a content management system (CMS), for a blog or marketing site, there's a balance between the content authoring experience and ongoing maintenance/upkeep.

I've never been one for pagebuilder solutions such as SquareSpace, Wix, Webflow, or the like, as this locks the page into a template or theme and provides bloat all around. The content should be separate from the theme, allowing a design to be easily interchangeable as long as it adheres to a well thought and documented api for its collection of building blocks.

Pagebuilder solutions have their place, and you should definitely be able to *preview* your content as your writing, but it's similar to Microsoft Word & PowerPoint and rich text editors that feel like the wild west of "*anything goes, good luck*". When a site grows and you need to understand the output for consistency, transferability, and performance, a hands-on CMS begins to more fitting.

Some high level expectations:

- **Distraction Free Editor**: I want to enjoy writing an article without the noise
- **Content Blocks**: I should be able to compose a page of various components
- **Asset/Image Management**: I want to upload & insert images easily, even if it goes to a CDN in the background
- **Low Maintenance**: Minimize developer intervention

Favorable Solutions:

- [Statamic](https://statamic.com/): I haven't even used Statamic and yet I'm already an advocate for it. Full service solution, great UX, one-time fee, and {{<mark type="super">}}*no database*{{</mark>}} via flat-file documents means a secure static site that removes paying for a constantly active though *unused* database and nothing to hack.
- [WordPress](https://wordpress.org/): Obviously very popular (though a bit controversial of late). Sites such as A List Apart have proven it's possible to have a very performant WordPress site with the aid of some extra services.
  - Avoid the temptation to have a separate system that generates a static site from the content. It might be neat but it adds more complexity than it's worth both for the author and the maintainers. You could setup content authoring on [WordPress.com](https://wordpress.com/) with a plugin that sends a webhook to GitHub to compile on a new publish to generate and deploy to something like Netlify, but that's a lot of wires.
  - It'd make sense to me to generate static files on the same server any time a page is posted, even if it's a separate directory such as `/site` and `/admin`, but I've not found this kinda solution anywhere.
- [Tina CMS](https://tina.io/): Sits on top of Hugo or Astro, integrates with GitHub for authors and content versioning, and supports custom content blocks. It's a little strange, but the concept makes sense and is used by [Smashing Magazine](https://www.smashingmagazine.com/2023/09/smashing-magazine-tinacms-manage-editorial-workflow/) to boot.

Noteworthy Mentions:

- [Ghost](https://ghost.org/): I've always admired the user interface and experience of Ghost, but from my understanding it's primarily used for a newsletter/subscription based service and less of a custom site CMS.

### E-Commerce

Honestly...[Shopify](https://www.shopify.com/). Unless you're a large organization that can afford its own web development department, Shopify is just the gold standard for online stores as even Ring (an Amazon company) uses Shopify. You can integrate Shopify into your own website, but that's more complexity than necessary for small companies over a site managed on Shopify.

### Starter Kits (WIP)

Eventually I hope to have some boilerplate starter kits that are simple, one-click GitHub templates to utilize.