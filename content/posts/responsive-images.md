---
title: Responsive Images
date: 2021-05-01
---

I've done a fair amount of research to better understand modern image features and know what Google sees when they analyze a page. [MDN's Responsive Images article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) provides a lot of helpful detailed information.

There are three (free) tools that I'm aware of to understand what Google receives:

- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Ftimbomckay.github.io%2Fimage-test.html) - Seems to be consistently on the latest version of Lighthouse
- [Lighthouse Metrics](https://lighthouse-metrics.com/) - Can tend to be slightly behind PageSpeed Insights (but not as far behind as it used to be)
- ~~[Mobile Friendly Test](https://search.google.com/test/mobile-friendly) - I believe this renders the entire page to determine the mobile friendly support of your site~~ ([Retired in favor of Lighthouse](https://developers.google.com/search/blog/2023/04/page-experience-in-search#search-console-reports))

{{<notice type="tip" title="Focus">}}

There are other tools, such as Google Search Console, but you have to verify your domain. Beyond that I wanted to focus on what Google is considering for SEO & Core Web Vital purposes, not an exhaustive list of performance tools.

{{</notice>}}

## Testing

I created an [image testing page](https://timbomckay.github.io/image-test.html) on my personal GitHub repo to test these tools, responsive images, and lazy loading. It uses [placeholder.com](https://placeholder.com/) for images to provide text in the image for easily recognizing which sources are chosen by the device.

The image below shows the varying screen sizes the tools use. They're all rendering at a `2.625` pixel density while the screen width is `360px` for PageSpeed Insights & Lighthouse Metrics and `412px` for Mobile Friendly Test.

<img width="696" alt="image" src="https://user-images.githubusercontent.com/87433587/197817750-357626c6-c18e-4b97-b43c-fc3fce6298dc.png">

{{<notice title="2024 Update">}}

It appears PageSpeed Insights and Lighthouse Metrics are now at `1.75` pixel density and `412px` screen width.

{{</notice>}}

Now we have data to properly gauge how to scale our images for mobile delivery, particularly regarding Google's Core Web Vitals.

## Image srcset

The [srcset attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) for image elements is similar to the `<picture>` element to specify when to load certain images. The difference being that this `srcset` expects the image to be {{<mark>}}the same aspect-ratio{{</mark>}} and only requests larger sizes of the image. If the window is reduced, {{<mark type="super">}}it'll keep the largest size image{{</mark>}} it has instead of switching to the smaller image because it already has a higher quality version.

Likewise on page load it'll retrieve the largest size from the cache instead of requesting a smaller one. This benefits returning visitors more than new, but {{<mark>}}this should be the preferred method{{</mark>}} as it reduces DOM nodes & network requests.

```html
<img
  alt="-- Insert Alt Text --"
  width="960" height="720"
  src="https://via.placeholder.com/960x720"
  sizes="(max-width: 768px) 100vw, 50vw"
  srcset="https://via.placeholder.com/480x360?text=w1 480w,
          https://via.placeholder.com/960x720?text=w2 960w,
          https://via.placeholder.com/1440x1080?text=w3 1440w,
          https://via.placeholder.com/1920x1440?text=w4 1920w"
/>
```

### Resolution Switch

If you read some of these articles you'll notice there are a variety of ways to declare breakpoints and which source to use. I recommend using the image's [intrinsic size](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size) (its real size) be the dictator via the `w` unit to {{<mark type="good">}}let the browser's calculation determine when to use what{{</mark>}}, instead of having to factor in when to use `x` size for `x` section for `x` pixel density.

It may take some playing around with, but using the intrinsic size calculated by the defined `sizes` has proven to be much easier to comprehend and maintain.

## `<picture>` For Aspect Ratio Changes

The [picture element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) is better suited for changing an image for certain criteria, such as a 1:1 image on mobile and 4:3 on desktop, or a different image altogether (for whatever reason). The downside with this option is {{<mark>}}it'll change the image for each stage of the criteria{{</mark>}}. Meaning if you start off on a 1600px wide window and shrink it down to 1024px (to split the screen or what have you) it'll request the smaller image *even though* it already has a better one.

{{<notice type="tip" title="DOM Nodes Consideration">}}

As I mentioned DOM nodes above, this method requires an additional element for each conditional. Meaning the image `srcset` is one element while the picture element is a minimum of 3  (the `<picture>`, `<img>`, and at least 1 `<source>`). This is important to keep in mind as Lighthouse takes DOM nodes into consideration for performance scores because it impacts the document reflow.

I'm not entirely certain how many of the elements would count towards *"nodes"* because I believe it only counts those that aren't hidden. So Lighthouse might be counting only the `<source>` or `<img>` (whichever is active) but will still be counting the `<picture>`.

{{</notice>}}

Here's an example of optimizing the picture element to only trigger a change when switching aspect-ratios and utilizing `srcset` to determine the image quality as detailed in the above.

```html
<picture>
    <source media="(min-width: 768px)"
        sizes="(max-width: 1500px) 50vw, 840px"
        srcset="https://via.placeholder.com/480x270?text=16:9+(w1) 480w,
                https://via.placeholder.com/960x540?text=16:9+(w2) 960w,
                https://via.placeholder.com/1440x810?text=16:9+(w3) 1440w,
                https://via.placeholder.com/1920x1080?text=16:9+(w4) 1920w,
                https://via.placeholder.com/2400x1350?text=16:9+(w5) 2400w">
    <img
        alt="-- Insert Alt Text --"
        width="480" height="360"
        src="https://via.placeholder.com/480x360?text=Original"
        sizes="100vw"
        srcset="https://via.placeholder.com/480x360?text=4:3+(w1) 480w,
                https://via.placeholder.com/960x720?text=4:3+(w2) 960w,
                https://via.placeholder.com/1440x1080?text=4:3+(w3) 1440w">
</picture>
```

## Scaling

Now that we know what screen sizes the various tools use, we can better plan the size increments. We don't want to create too many breakpoints because that'll impact the server's processing speed, server caching, browser caching and network requests. Using a multiplier of `320` works well in our experience to account for a variety of sizes. So you might have a scale like this:

1. 320
2. 640
3. **960** => Lighthouse Mobile (360px at 2.625 pixel density = 945) 
4. 1280
5. **1600** => Lighthouse Desktop (1350px at 1px density)
6. 2240 (skipping 1920)
7. 3200 (skipping 2560 & 2880)

This is a general recommendation, not a hard-fast rule. There may be instances that something smaller than 320px would be applicable for something like an avatar/profile image to be 80px or so, but with the pixel density multiplier you're still getting closer to 320.

This general scale also accounts for images that aren't necessarily full width, such as heroes at half width on desktop or images in cards that are one third of the viewport width.

## Reserving Space

**Always provide the `height` & `width` attributes,** this reserves the space while the image is loading by calculating the aspect-ratio via the declared height & width settings. Otherwise, when the image is loaded it shifts the content down, impacting the cumulative layout shift. This can either be the actual image dimensions or simply the aspect ratio (`width="16" height="9"`), though you'll need to ensure either your CSS is setting it to 100% of the provided space or using a larger number to be safe (1600 & 900).

Because Google gives so much prominence to mobile in their search engine rankings, it's best to {{<mark>}}default the reserved space to the mobile aspect ratio{{</mark>}}. For instance a hero might change from a 1:1 square on mobile to 4:3 on desktop, we'd want to declare it a square by default. This may create a slight shift on desktop when the image pops in but they generally have more bandwidth & performance and want to prioritize preventing layout shifts on mobile over desktop.

For instance:

```html
<picture>
    <source media="(min-width: 768px)"
        sizes="(max-width: 1500px) 50vw, 840px"
        srcset="https://via.placeholder.com/480x270?text=16:9+(w1) 480w,
            ..."
    >
    <img
        alt="-- Insert Alt Text --"
        width="360" height="360"
        src="https://via.placeholder.com/480x360?text=Original"
        ...
    >
</picture>
```

{{<notice type="tip" title="Further Reading">}}

For further reading, checkout the [sizing hints](https://web.dev/learn/design/responsive-images/#sizing-hints) portion of web.dev's responsive images article as well as their post to [avoid layout shifts by specifying dimensions](https://web.dev/serve-images-with-correct-dimensions/#avoid-layout-shifts-by-specifying-dimensions).

{{</notice>}}

## Lazy Loading

Loading all images of a page on load can have a performance impact of your application. To reduce network requests and the initial paint flow we can apply `loading="lazy"` and let the browser determine when to load the image. According to Google's [Lazy-Loading article](https://web.dev/browser-level-image-lazy-loading/) the threshold isn't an absolute as there are a variety of factors considered in this calculation, but you can generally expect it to be **about 1250px below the screen**.

To demonstrate this, I've placed a red bar at 100% of the viewport height + 1250px and it seems to be consistent with what I'm seeing in the network panel and reported in PageSpeed Insights.

<img width="1083" alt="image" src="https://user-images.githubusercontent.com/87433587/197870000-6ab4844b-61f9-470f-bb0e-8487ead4d2b6.png">

```html
<img
  alt="-- Insert Alt Text --"
  width="960" height="720"
  src="https://via.placeholder.com/960x720"
  loading="lazy"
/>
```

{{<notice type="warning">}}

Don't lazy load any section that you know _will be_ above the threshold. A hero image should never be lazy loaded.

{{</notice>}}

## Further Reading

For more info, here are a couple articles to help understand the robustness of responsive images.

- [Learn Images](https://web.dev/learn/images/)
- [Serve images with correct dimensions](https://web.dev/serve-images-with-correct-dimensions/) - web.dev article
- [Use lazy-loading to improve loading speed](https://web.dev/lazy-loading/) - web.dev article
- [Responsive Images](https://web.dev/learn/design/responsive-images/#sizing-hints) - web.dev tutorial
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) - MDN article