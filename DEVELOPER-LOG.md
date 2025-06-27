# Developer Log

A happily floating astronaut , there's something zen about it.

# UI

Really wanted a variable content drop down section on click. Initially was going to use the shadow dom and custom elements but since those are not indexable by search bots I decided to save their implementation for another project. Instead I made use of flex grid and overflow hidden to obtain the effect I wanted. Pretty happy with the result.

# DevEx 

> Mar

Issues with vs code not able to clone or make new repos on github.

# Development Workflow Change

For improved workflow and separation of concerns I implemented separate logs for development and feature branches.

Reverted back to one dev log. Maintaining multiple ones was cumbersome.

# Branches

- launch
- development
- accessibility
- projects
- resume
- svgs

# Projects Section Redesign

> March 2025

I'm updating the projects page.

Animations upon entering the page are a bit long and computationally expensive. I'm removing the planet sliding animations and animated drop down menu as well as the lights coming on around the planet.

Implementing a ships command module for displaying the projects via user interaction.

These changes improve the visitor's experience by giving them more control over what they choose to interact with. Without superflous animations slowing down their mobile devices or having them wait for animations to complete the visitors can more quickly navigate the site.

While refactoring moved previous unused code to a temporary directory. You know, just in case.

> Mar 2025

Redesigning the projects section. Current implementation has too many animations that play prior to the user being able to engage. Will redesign so that the user can engage quickly and more meaningfully at page load.

Removed all animations that autoplayed.

# Asteroid Ship Animation SVG

For fun I made an animation of the asteroid ship from the game asteroids. On click it spins, shoots, then thrusts away before crashing into the title icon in the header nav and falling apart. The `filter: brightness()` did not brighten the svg path enough, so I added a filter matrix directly to the svg instead.

To have the shots come out of the ship as it is moving I placed the last shot in its own div bubble. Placed the bubble at the mid point of the ship bubble move animation position so as to have a proper reference point to account for dynamic view ports.

# Lever Animation

Very happy with the lever animation. Used 3 images. Animated the lever moving up or down and switched the braces when the lever was halfway through the animation. Quick and performant.

# Magnifying Glass Animation

I had previously drawn a flat illustration of a computer with a magnifying glass over the screen. The glass magnified 1s and 0s. I used masking to make the effect. I thought how cool if it could be animated. But I was very early in my illustrating journey and even earlier in my programming journey. Now I'm able to model a 3d computer and magnifying glass. Render it as a webp img and interactively animate it. Pretty neat.

# Ship Wheel Animation

Decided on using `transform rotate` on one img instead of making a sprite sheet for the ship wheel spinning animation. Since the img is being rendered at 50px by 50px any fine details at such a small resolution will be difficutl to see. Additionally, performance is better when animating one img vs a sprite sheet of many images. I was mostly concerned with the lighting and shadows on the wheel but at such a small resolution and at such a short animation the trade off between the lack of realism and the performance gain is worth it at that scale.

# Spaceport Redesign

Changed the camera orientation of the spaceport to a direct front view instead of an angle. By having the landing strip pointing direclty at the viewer, it changes the perspective to first person and helps immerse the viewer into the experience of arriving at the landing page as if they where literaly reaching a landing strip.

# Manifest JSON

Updated the `start_url` in the manifest.json file to reflect the name of the repository since it was returning `404`. Also had to update the favicon relative paths.

# Webp Images

Using Blender for making the 3D images and optimizing as webp instead of png before adding to site.

Added `srcset` to img tags. Rerendered all images as webp files at 1x 2x 3x. This should lower the initial page load size and improve speed as only the best matched assets should download.

Gave them width and height or width and aspect ratio.

Testing different formats and sizes for various device resolutions. Using 1250x1080 as the highest resoluton for each ship door. May need higher to accomodate some longer mobile devices when using landscape orientation. If so will use the `picture` element. Making higher resolution images depends on my blender installation being able to render them.

Except for the ship door images. These I kept at a one large size. when using the picture element with media queries it became unwieldly to capture so many different device width, heights, aspect ratios, orientations, and pixel densities. These are the only 2 images that I'm scaling down to fit devices so the overall impact on the site is relatively minimal in terms of bandwidth and initial load metrics.

# 3D Images

I'm really happy with the way the 3d images are turning out. Using a sketchbook for drawing out some variations, then using blender to model, sculpt, and light the scenes. And wow, blender sure has some wild idiosyncrasies. So had to allocate further time for troubleshooting and workarounds. Nonetheless, I've learnt a lot more about modeling and am very pleased with the results. Thanks blender for such an available and powerful tool. And thanks community for all the available posts and resources.

For the main images that appear in each section, I added a button overlay and resized it to cover the image.
This accomplished two things. 1: the hit area is more consistent to where the image is displayed, ie clicking over a transparent section is no longer an issue. 2: the button tag is consistent to its use, trigerring an action.

# Cursor

Added a custom cursor. The cursor is an svg of a classic spaceship. Upon hovering over an interactive image the cursor gets swapped to another svg which expands the fins out, lights up the porthole, and adds an orange flame. These changes serve as a signal to the user. Initially I had removed the pointer indicator and was hoping to surprise the user. But by adding this subtle change, it offers a hint to the user which meets their expectations about interactive indicators and allows them to explore and still be surprised and hopefully pleased.
 
Had loads of fun making the custom cursor for the website. Wanted something small that would not overwhelm the user , but still be functional and informative.

So far I have kept the default pointer when interacting with the top navigation menu. Also decided to keep the finger pointer when interacting with items within the ship bridge. This is a more natural indicator since the items are inside the ship and the user would be touching the controls with their own hands. When outside the ship the cursor reverts back to an animation of a small spaceship. 

Had loads of fun making the custom cursor.

# Resume SVGs

Added 2d line art illustrations that match the 3d planet illustrations. Made these to give contextual continuity as the user clicks on the planet items and the related text is displayed next to its corresponding svg. While still maintaining the aesthetic of contrasting full complex 3D imagery against minimal 2D art.

Animated some of the SVGs to break up the static feel of the resume page. I implemented only one animation at a time as not to overwhelm the scene. Also it's important to take opportunities to reduce cognitive load. While a user is engaging with textual content the animation should not distract from their primary goal of reading the text. So I kept the animation as subtle as necessary.

# Accessibility

**Aria Labels**

Since the overlay buttons I placed over the planet illustrations have very short names, I added aria labels to them. These are more descriptive and should help orient users with assistive technologies.

**Buttons**

Added `type="button"` to all buttons to aid in consistent behaviour.