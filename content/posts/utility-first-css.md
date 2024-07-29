---
title: "In Consideration: Utility-First CSS"
date: 2019-08-21
---

{{< notice type="info" title="It's been a while">}}

  This was originally written in late 2019 as a report & proposal for our organization's design system and component library to improve our CSS methodology. We were using SASS extensively at the time and the systems put into place by the engineers before us created an exponential problem. Tailwind has gained popularity since then but still benefitial to share my experience and reasoning.

{{< /notice >}}

Utility-First CSS is an approach to provide simple, reusable classes that provide styles without adding another 1, 2, 3+ properties to another overly-specific selector. Removing the need to create a class for an element just to add a margin or change the color.

The articles below provide a more thorough explanation of our scenario. I've collected some comments worth highlighting but I encourage reading the entire articles.

{{< notice type="tip" title="Keep an Open Mind">}}

  Try not to shrug off the utility-first mindset as many of these articles have received much backlash, almost entirely from people that aren't willing to give it a chance. A lot of it resonated with me, and not as *the cool new thing* as Bootstrap has had utility classes since at least v2 in 2012.

{{< /notice >}}

## The Issue & Primary Concern

Our design system is shipping over 1mb for CSS due to our SASS system. Gzipping helps the compression but they're both still monolithic compared to what's considered ideal.

Using [CSS Dig](https://www.cssdig.com/) on our storybook documentation I retrieved a list of all the properties declared in our component library's CSS. Below are properties with over 100 declarations.

<div class="text-sm">

| Occurances | Property |
| -------- | -------- |
| 2245 | color | 
| 1266 | border-bottom-style | 
| 804 | width | 
| 610 | box-shadow | 
| 606 | display | 
| 427 | position | 
| 383 | height | 
| 382 | transform | 
| 378 | opacity | 
| 352 | padding-right | 
| 341 | background-color | 
| 296 | font-size | 
| 249 | transition | 
| 235 | margin-bottom | 
| 229 | line-height | 
| 227 | background-image | 
| 217 | padding | 
| 212 | margin-top | 
| 186 | background-size | 
| 182 | font-family | 
| 160 | margin-left | 
| 150 | background | 
| 141 | top | 
| 134 | z-index |
| 126 | border | 
| 123 | padding-left | 
| 122 | border-bottom | 
| 118 | overflow | 
| 117 | margin | 
| 110 | vertical-align | 
| 109 | text-decoration | 
| 106 | margin-right | 
| 106 | flex | 
| 104 | max-width |

</div>

This shows the danger of sass mixins as we have more complex & elaborate mixins to generate everything, along with `@extend` (which is generally advised to avoid for a number of reasons). A large portion of this came from our out-of-control mixins that loop through a variety of arrays and mixins that generate duplicates of loops of clones. (It was...*bad*). While utility classes would help with this, it's not necessarily the silver bullet due to variants & themeing.

## CSS Utility Classes & "Separation of Concerns"

[Full Article Link](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

Adam Wathan lays out a detailed thought process on how he and others arrived at utility-first css, from semantic css to reusable standards. I strongly urge reading this article as a lot of the difficulties he brings up are exactly the problems we're dealing with.

<!-- Phase 2: Decoupling Styles from Structure -->

> **There are two ways you can write HTML & CSS:**
>
> 1. **CSS that depends on HTML** (Separation)
>       * Naming your classes based on your content (like `.author-bio`) treats your HTML as a dependency of your CSS.
>       * The HTML is independent; it doesn't care how you make it look, it just exposes hooks like `.author-bio` that the HTML controls.
>       * Your CSS on the other hand is not independent; it needs to know what classes your HTML has decided to expose, and it needs to target those classes to style the HTML.
>       * In this model, your HTML is restyleable, but {{<mark type="bad">}}**your CSS is not reusable**{{</mark>}}.
> 
> 2. **HTML that depends on CSS** (Mixing)
>       * Naming your classes in a content-agnostic way after the repeating patterns in your UI (like `.media-card`) treats your CSS as a dependency of your HTML.
>       * The CSS is independent; it doesn't care what content it's being applied to, it just exposes a set of building blocks that you can apply to your markup.
>       * Your HTML is not independent; it's **making use of classes that have been provided by the CSS**, and it needs to know what classes exist so that it combine them however it needs to to achieve the desired design.
>       * In this model, {{<mark type="good">}}**your CSS is reusable**{{</mark>}}, but your HTML is not restyleable.

It took me a bit to understand this point, because "separation" sounded more desirable over "mixing" but ultimately the goal is for more reusable CSS. The first point is stating the HTML is exposing hooks for the CSS to style the block/element/modifier. This is better suited for component libraries or third-party scripts to allow consumers to target element to customize, while the end goal of the core, first-party application is to minimize their CSS via reusable styles.

Essentially, is your CSS targeting your HTML or is your HTML pulling from your CSS?

<!-- Phase 3: Content-agnostic CSS components -->

> The more a component does, or the more specific a component is, the harder it is to reuse. ... If we already have a .card class, why don't we compose this new UI using our existing card and stacked form? ... We're getting more reuse out of our components, and **we didn't have to write any new CSS**.

The less a component (CSS selector or JS framework) does the more reusable it is via combination and composition.

<!-- Phase 5: Utility-first CSS -->

> The amazing thing about this is that before you know it, you can **build entirely new UI components {{<mark type="super">}}without writing any new CSS{{</mark>}}**.

This is *absolutely* true and is *so* rewarding to create a new web component or HTML template partial without writing a line of CSS (aka not *adding* a single byte to our stylesheet).

> We don't want to use content-specific names because then our component could only be used in one context. Maybe something like this?
> 
> ```scss
> .image-card-with-a-full-width-section-and-a-split-section { ... }
> ```
> 
> Of course not, that's ridiculous. Instead we'd probably want to compose it out of smaller components.

This *content-specific* naming strategy was ***100%*** of our component library's CSS, along with additional classes attached for *even more* specificity.

> **Enforced consistency**
> 
> One of the biggest benefits of using small, composable utilities is that every developer on your team is always choosing values from a fixed set of options. If the solution to styling something is to apply existing classes, all of a sudden that *blank canvas of possibilities* problem goes away. **When everyone on a project is choosing their styles from a curated set of limited options, your CSS stops growing linearly with your project size, and {{<mark type="good">}}you get consistency for free{{</mark>}}.**

I believe Tailwind as we know it today was developed a ways after this article was published, as it's not quite as "small" as it used to be in earlier versions as the help of purging (and later JIT compiling) enables that list of possibilities to be greatly reduced. The core of the argument remains as developers are choosing from a particular framework for consistency & reusability.

> **{{<mark>}}You should still create components{{</mark>}}**
> 
> One of the areas where my opinion differs a bit from some of the really die-hard functional CSS advocates is that I don't think you should build things out of utilities *only*. The reason I call the approach I take to "CSS utility-**first**" is because I try to build everything I can out of utilities, and **only extract repeating patterns as they emerge**.

I'm curious where Mr. Wathan is with this point these days but I'd wager it's probably pretty similar. He and the Tailwind team have built a tool that *can* do nearly everything via classes, but doesn't necessarily mean you *should*. This is also a point that a lot of critics complain about, that your html look monolithic when you're adding all these classes when sometimes you need to create a `.btn` class or extract the reused section as an html template partial.

> Taking a component-first approach to CSS means you create components for things even if they will never get reused. This premature abstraction is {{<mark>}}the source of a lot of bloat{{</mark>}} and complexity in stylesheets.

## In Defense of Utility-First CSS

[Full Article link](https://frontstuff.io/in-defense-of-utility-first-css)

> Utility classes expose a well-defined API that you can use to {{<mark>}}**compose** more complex components{{</mark>}}. You’re not re-writing styles; instead, you’re relying on classes that define styles and behaviors once and for all.

> {{<mark type="good">}}**The complexity of your layout has to exist somewhere**.{{</mark>}} A component-first approach doesn’t remove “bloat”, it only deports it to the stylesheet. Even so, because your larger components reuse the same atomic styles as others, {{<mark type="bad">}}you inevitably end up with duplicate code.{{</mark>}}

> This is the definition of scalability and maintainability. All you have to do is reuse the available code you wrote **proactively**, instead of having to tweak existing code **reactively**.

> You can’t predict the future. This is why you should always {{<mark type="super">}}favor composition over inheritance{{</mark>}}. A good sign of a healthy and scalable codebase to how things go when you need to change it.

## About HTML Semantics & Front-End Architecture

[Full Article link](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

> Despite the HTML5 specification section on classes repeating the assumed “best practice” that **"authors are encouraged to use `[class attribute]` values that describe the nature of the content, rather than values that describe the desired presentation of the content."** there is no inherent reason to do this. In fact, {{<mark>}}it’s often a hindrance when working on large websites or applications{{</mark>}}.

> **Class names should communicate *useful* information to developers.** It’s helpful to understand what a specific class name is going to do when you read a DOM snippet, especially in multi-developer teams where front-enders won’t be the only people working with HTML components.

> Tying your class name semantics tightly to the nature of the content has already {{<mark>}}reduced the ability of your architecture to scale{{</mark>}} or be easily put to use by other developers.

> We shouldn’t be afraid of making the connections between layers clear and explicit rather than having class names rigidly reflect specific content. Doing this doesn’t make classes “unsemantic”, it just means that {{<mark type="good">}}their **semantics** are not derived from the **content**{{</mark>}}.

> **Front-end architecture** The aim of a component/template/object-oriented architecture is to be able to develop a limited number of reusable components that can contain a range of different content types. The important thing for class name semantics in non-trivial applications is that they be driven by pragmatism and best serve their primary purpose – providing meaningful, flexible, and reusable presentational/behavioural hooks for developers to use.

> I’ve found the “multi-class” pattern to be a more scalable pattern. For example, take the base `btn` component and add a further 5 types (variants) of button and 3 additional sizes. Using a “multi-class” pattern you end up with 9 classes that can be mixed-and-matched. Using a “single-class” pattern you end up with 24 classes.

> When you choose to author HTML and CSS in a way that seeks to reduce the amount of time you spend writing and editing CSS, it involves {{<mark>}}accepting that you must instead spend more time changing HTML classes on elements if you want to change their styles{{</mark>}}. This turns out to be fairly practical, both for front-end and back-end developers – anyone can rearrange pre-built “lego blocks”; it turns out that no one can perform CSS-alchemy.

## Who uses Atomic CSS?

_(Because my recommendations usually need credibility)_

* Kickstarter
* Twitch
* Heroku
* Buzzfeed ([Solid](https://solid.buzzfeed.com/))
* Stripe
* TED
* Stack Overflow 
* GitHub ([Primer](https://primer.style/))

{{< notice type="tip" title="Again...It's Been a While">}}

  As mentioned earlier, Tailwind and utility classes are pretty well known in 2024. There's been a great deal of acceptance, though there's still quite a lot of hesitation.

  At this point, who uses Atomic/Utility-First CSS?...A lot, a lot of places do.

{{< /notice >}}

## Additional Reading

* [Tailwind CSS' Core Concepts](https://tailwindcss.com/docs/utility-first)
    > Once you've actually built something this way, you'll quickly notice some really important benefits:
    > 
    > * **You aren't wasting energy inventing class names.** No more adding silly class names like `sidebar-inner-wrapper` just to be able to style something, and no more agonizing over the perfect abstract name for something that's really just a flex container.
    > * **Your CSS stops growing.** Using a traditional approach, your CSS files get bigger every time you add a new feature. With utilities, everything is reusable so you rarely need to write new CSS.
    > * **Making changes feels safer.** CSS is global and you never know what you're breaking when you make a change. Classes in your HTML are local, so you can change them without worrying about something else breaking.
* [A Year of Utility Classes](https://css-irl.info/a-year-of-utility-classes/)
  > Tailwind isn’t the magic bullet to fix all of CSS’s supposed problems, nor does it excuse you as a developer from understanding the cascade. If you’re someone who appreciates CSS’s underlying principles you might find it feels counterintuitive at first, but it’s worth persevering before you decide whether it’s the right approach for you. While I wouldn’t choose to use it for every project, there are clear benefits. I believe adopting Tailwind at Mud was the right decision for the team, {{<mark type="super">}}making out CSS more reusable, maintainable and performant{{</mark>}}.
* [css { guide: lines; }](https://cssguidelin.es/)
  * High-level advice and guidelines for writing sane, manageable, scalable CSS by Harry Roberts of [CSS Wizardry](https://csswizardry.com/).
  * While Harry Roberts doesn't necessarily promote utility class frameworks, in a performance workshop of his he once mentioned that the footprint of a utility class solution is usually so small that it's not worth breaking out the "critical" CSS.