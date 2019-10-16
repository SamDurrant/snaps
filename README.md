# Snaps
An application to store and organize bite-sized pieces of information.

## Live Demo

A live demo will be deployed in the future

## Motivation

As someone learning many new things, it can be hard to keep track of it all. I wanted to create an application that would allow me to organize smaller pieces of information that didn't necessarily warrant a bookmark in my browser. During the creation process, I have begun to learn Spanish. This application would be perfect for flashcards.

>### **Technical Goals**
> 1. Create a project that relied heavily on DOM manipulation.
> 2. Focus on the architecture and organization of my code.
> 3. Use Trello to break the project down into smaller, more manageable tasks to tackle.
>### **Design Goals**
>1. Create custom input elements for the settings forms - this includes inputs, select dropdown menu, checkbox and color picker
>2.  Showcase a design that feels clean vs. cluttered
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

## Challenges

* While I thought I had done enough planning, I quickly found myself disliking the intended layout. Once I began coding in some of the logic, the UI no longer made as much sense. I ended up switching a few areas around halfway though the project, but did come up with a design that made me happy.
* It was difficult at times maintaining clean code. Things that made this difficult include naming conventions and not thinking about the different components in the application.
* I found that in order to clean up my code, I often had to write a slightly longer version first before I could then refactor into cleaner drier code.

## Future Additions

* The ability to move snaps to different boards and/or merge boards together
* Allowing snaps to be rearranged on their boards
* Expanding the personalization for snaps by allowing image uploads
* Utilizing storage for board and snap data