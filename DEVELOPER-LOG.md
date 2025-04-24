# Developer Log

> Tuesday 27 April

`{ fc3ae008 , 0947ce38 }`

Had loads of fun making the custom cursor for the website. Wanted something small that would not overwhelm the user , but still be functional and informative.

> Wednesday 28 April

`{ }`

A happily floating astronaut , there's something zen about it.

> Monday 9 May

Decided to make the houses on the planet as line drawings. This will keep with the aesthetic of contrasting full complex 3D imagery against minimal 2D art.

> Wednesday 28 Sep

`{ 9f46cbd1 }`

Really wanted a variable content drop down section on click. Initially was going to use the shadow dom and custom elements but since those are not indexable by search bots I decided to save their implementation for another project. Instead I made use of flex grid and overflow hidden to obtain the effect I wanted. Pretty happy with the result.

> Thur 23 Mar

Issues with vs code not able to clone or make new repos on github.

# Development Workflow Change

For improved workflow and separation of concerns I implemented separate logs for development and feature branches.

Reverted back to using only this log.

# Branches

- launch
- development
- accessibility
- projects
- svgs

> March 2025

I'm updating the projects page.

Animations upon entering the page are a bit long and computationally expensive. I'm removing the planet sliding animations and animated drop down menu as well as the lights coming on around the planet.

Implementing a ships command module for displaying the projects via user interaction.

These changes improve the visitor's experience by giving them more control over what they choose to interact with. Without superflous animations slowing down their mobile devices or having them wait for animations to complete the visitors can more quickly navigate the site.

While refactoring moved previous unused code to a temporary directory. You know, just in case.

Used webp for the largest images. Kept the smallest images as png, mostly due to keeping the images sharp at various resolutions. Testing different formats and sizes for various device resolutions. Using 1250x1080 as the highest resoluton for each ship door. May need higher to accomodate some longer mobile devices when using landscape orientation. If so will use the `picture` element. Making higher resolution images depends on my blender installation being able to render them.

> Mar 2025

Using Blender for making the 3D images and optimizing as webp instead of png before adding to site.

Redesigning the projects section. Current implementation has too many animations that play prior to the user being able to engage. Will redesign so that the user can engage more meaningfully at page load.

Removed all animations that autoplayed.

> April 2025

Reverted back to one dev log. Maintaining multiple ones was cumbersome. Will need to restructure the dev log.

# Ship Wheel Animation

Decided on using `transform rotate` on one img instead of making a sprite sheet for the ship wheel spinning animation. Since the img is being rendered at 50px by 50px any fine details at such a small resolution will be difficutl to see. Additionally, performance is better when animating one img vs a sprite sheet of many images. I was mostly concerned with the lighting and shadows on the wheel but at such a small resolution and at such a short animation the trade off between the lack of realism and the performance gain is worth it at that scale.

# Lever Animation

Very happy with the lever animation. Used 3 images. Animated the lever moving up or down and switched the braces when the lever was halfway through the animation. Quick and performant.

# Asteroid Ship Animation SVG

For fun I made an animatio of the asteroid ship from the game asteroids. On click it spins, shoots, then thrusts away before crashing into the title icon in the header nav and falling apart. The `filter: brightness()` did not brighten the svg path enough, so I added a filter matrix directly to the svg instead.
For fun I made an animatio of the asteroid ship from the game asteroids. On click it spins, shoots, then thrusts away before crashing into the title icon in the header nav and falling apart. The `filter: brightness()` did not brighten the svg path enough, so I added a filter matrix directly to the svg instead.

To have the shots come out of the ship as it is moving I placed the last shot in its own div bubble. Placed the bubble at the mid point of the ship bubble move animation position so as to have a proper reference point to account for dynamic view ports.

# Spaceport Redesign

Changed the camera orientation of the spaceport to a direct front view instead of an angle. By having the landing strip pointing direclty at the viewer, it changes the perspective to first person and helps immerse the viewer into the experience of arriving at the landing page as if they where literaly reaching a landing strip.