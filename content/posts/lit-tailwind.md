---
title: Lit + Tailwind CSS
date: 2023-04-07
---

My goal for writing applications is to use static html when possible and [Lit](https://lit.dev) web components when necessary, with a consistent styling experience via [Tailwind CSS](https://tailwindcss.com) no matter if you're in the Light or Shadow DOM. Thanks to [Vite](https://vitejs.dev) we're able to accomplish this with fairly little effort.

## Light DOM

Starting off with the Light DOM everything's about as you'd expect following [Tailwind's setup guidelines](https://tailwindcss.com/docs/content-configuration), just add content paths to where any Light DOM files might be located.

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */

module.exports = {
  // Light-DOM files
  content: [
    './*.html',
    './public/**/*.html',
    './src/**/*.astro',
  ],
};
```

This includes html markup as expected:

```html
<body>
  <header>...</header>
  <the-app class="md:flex flex-col min-h-screen"></the-app>
  <footer>...</footer>
</body>
```

## Shadow DOM

Following Lit's guide on [sharing styles](https://lit.dev/docs/components/styles/#sharing-styles), we want to abide by the spec and provide global styles via a shared module. This allows us to scope our reusable classes to our component library, application, micro-frontend, etc.

### Lit Tailwind Utility

Create a separate [config](https://tailwindcss.com/docs/functions-and-directives#config) adjusted specifically for the Shadow DOM.

```js
// tailwind.shadow.config.js

/** @type {import('tailwindcss').Config} */

export default {
  // shadow dom components
  content: [
    "./src/components/**/*.ts",
  ],
}
```

Provide any styles here to be used globally throughout Shadow DOM components. Specifying the Shadow DOM specific config.

```css
/* src/utils/tailwind/style.css */

@config "../../tailwind.shadow.config.js";

/* Tailwind Base only for :root & Light DOM elements */

/* Components & utilities usable in light or shadow DOM */
@tailwind components;
@tailwind utilities;
```

{{<notice>}}
The CSS is still a work in progress and requires a bit of experimentation. We provide our own reset and [opt out of Tailwind's preflight](https://tailwindcss.com/docs/preflight#disabling-preflight). Additionally, providing typography and reusable component styles through [Tailwind's components](https://tailwindcss.com/docs/plugins#adding-components), with `@tailwind base;` directive included in the Light DOM for the custom property definitions.

Though host styles and resets can be a bit tricky at times, with or without Tailwind.
{{</notice>}}

Import into our shared module to be processed through PostCSS via [Vite](https://vitejs.dev/guide/features#disabling-css-injection-into-the-page).

```ts
// src/utils/tailwind/index.ts
import { unsafeCSS } from 'lit'
import style from './style.css?inline'

// Provide Tailwind as global utilities to be used within Shadow-DOM components
export const _tailwind = unsafeCSS(style);
```

### Component Composition

Import the utility into your component to use utility classes in the markup:
```ts
// src/components/my-element.ts
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { _tailwind } from '../../utils';

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
      <h3 class="text-red-500">Hullo</h3>
      <slot name="name">
        <p>I'm conditional</p>
      </slot>
    `;
  }
  
  static styles = _tailwind;
}
```

We can use Tailwind's [functions-and-directives](https://tailwindcss.com/docs/functions-and-directives#apply) for [host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host_function) & [slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted) styles by providing an adjacent CSS file that's automatically processed through PostCSS via Vite.

```css
:host {
  @apply border border-slate-200 rounded;
  display: block;
  padding: 1rem;
}
```

Then import directly by declaring them [inline](https://vitejs.dev/guide/features.html#disabling-css-injection-into-the-page) and inserted via [unsafeCSS](https://lit.dev/docs/api/styles/#unsafeCSS):

```ts
import { LitElement, html, unsafeCSS } from 'lit';
...
import style from './style.css?inline';

@customElement('my-element')
export class MyElement extends LitElement {
  ...

  static styles = [
    _tailwind,
    unsafeCSS(style)
  ];
}
```

{{<notice type="tip" title="Before You Ask">}}

An attempt was made to create a [Lit mixin](https://lit.dev/docs/composition/mixins/) to automatically assign and merge custom styles for Tailwind elements, but it didn't work as desired and actually made it more complicated than simplifying.

{{</notice >}}

{{<notice type="warning" title="Dynamic Classes">}}

Lit's [classMap directive](https://lit.dev/docs/components/styles/#dynamic-classes-and-styles) is helpful but it doesn't do well with multiple classes (ref [lit-html#3095](https://github.com/lit/lit/issues/3095)). This should only be used is when the condition is only applied on mount.

When it's a reactive property such as `active` or `has-focus`, it's best to conditionally push to an array of classes that are joined in the template.

{{</notice >}}

## You're Set!

And that's it, now we have the same developer experience & strategy in our Shadow DOM as we do in the Light DOM.
