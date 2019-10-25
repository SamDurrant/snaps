# Snaps
A small web application to store and organize notes, ideas, vocabulary and more. Each snap card holds information on it's front, back or both sides. Snaps are organized into boards. Data is stored in local storage.

## Live Demo

A live demo has been deployed on Netlify at [Snaps](https://snaps.netlify.com/)

## Motivation

As someone learning many new things, it can be hard to keep track of it all. I wanted to create an application that would allow me to organize smaller pieces of information that didn't necessarily warrant a bookmark in my browser. With the ability for snaps to rotate, I also thought it would make the perfect tool for flashcards and learning new terminology.

>### **Technical Goals**
> 1. Create a project that relies heavily on DOM manipulation.
> 2. Focus on the architecture and organization of the code, with a focus on reusability for smaller components.
> 3. Use Trello to help with project management and breaking the design down into smaller tasks.
> 4. Store data using local storage.
>### **Design Goals**
>1. Create custom input elements for the settings forms - this includes inputs, select dropdown menu and color picker.
>2.  Utilize css grid for the layout of the app.
>

## Technologies

* HTML
* Sass
* JavaScript
* Webpack

## Features

* Custom boards which a user can place snap cards on.
* Snaps can be extremely personalized with background color, font size, front text, back text and have multiple sizing options.
* Double clicking on a snap rotates the card, revealing the back side.
* Boards and snaps can both be deleted.
* If text overflows the snap, the text is set to scroll.
* Board and snap data is stored locally.

## Challenges

* While I thought I had done enough planning, I quickly found myself disliking the intended layout. Once I began coding in some of the logic, the UI no longer made as much sense. I ended up switching a few areas around halfway though the project, but did come up with a design that made me happy.
* I found that in order to clean up my code, sometimes I had to write a slightly longer version first before I could then refactor into cleaner drier code.
* Utilizing an article from [CSSTricks](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/) I was able to figure out how to get the application to fit the screen size. This prevents the app from hiding under the taskbar on mobile.
* After looking at a few articles and a WesBos tutorial on local storage, I thought it would be straight-forward integrating it into the application. I hadn't quite grasped that I could not store classes. I had to create a workaround that would assign the returned object as a new instance of a class.

## Future Additions

* The ability to move snaps to different boards and/or merge boards together
* Allowing snaps to be rearranged on their boards
* Expanding the personalization for snaps by allowing image uploads
* Utilizing backend storage for board and snap data
* Creating a search component that will pull up relevant snaps