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

Will no longer be adding entries to this particular log.
May delete this.

> March 2025

I'm updating the projects page.

Animations upon entering the page are a bit long and computationally expensive. I'm removing the planet sliding animations and animated drop down menu as well as the lights coming on around the planet.

Implementing a ships command module for displaying the projects via user interaction.

These changes improve the visitor's experience by giving them more control over what they choose to interact with. Without superflous animations slowing down their mobile devices or having them wait for animations to complete the visitors can more quickly navigate the site.

While refactoring moved previous unused code to a temporary directory. You know, just in case.

Used webp for the largest images. Kept the smallest images as png, mostly due to keeping the images sharp at various resolutions. Testing different formats and sizes for various device resolutions. Using 1250x1080 as the highest resoluton for each ship door. May need higher to accomodate some longer mobile devices when using landscape orientation. If so will use the `picture` element. Making higher resolution images depends on my blender installation being able to render them.

> Mar 2025

Implemented a multiple branch workflow. Launch , development , features.
This will allow for ease of visualization and documentation.

Using Blender for making the 3D images and optimizing as webp instead of png before adding to site.

Redesigning the projects section. Current implementation has too many animations that play prior to the user being able to engage. Will redesign so that the user can engage more meaningfully at page load.

Removed all animations that autoplayed.