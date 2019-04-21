---
published: true
layout: article
title: Endgame Update - Brian
date: 2019-04-21T12:00:00.000Z
---
# Endgame update

Finishing up these posts with reflections on how this semester and this project have gone with a final update from our client and lessons learned.

1. [Changing requirements](#changing-requirements)
	1. [The Barrel Tracker](#the-barrel-tracker)
    1. [Technically still tracking barrels?](#technically-still-tracking-barrels)
1. [Technicalities](#technicalities)
	1. [Expectations vs Reality](#expectations-vs-reality)
	1. [Starting over vs fixing what's broken](#starting-over-vs-fixing-whats-broken)
1. [Keeping the endgame in mind]()
1. [Final Meeting with our client]()
1. [Reflections and Lessons learned]()


## Changing requirements 
(or at least our understanding of them)

Before the semester started I toyed with the idea of bringing in my own senior project. I had been talking to a distillery about automating their process and some of the pain points that I could help relieve some stress around. 

### The Barrel Tracker

At that time the biggest pain point mentioned was tracking barrels. Barrels get moved around between when they're initially placed in the warehouse and when they're ready to be bottled. They didn't have a good system in place for recording these movements, however, leading to a lot of headache searching for barrels and potential product loss if barrels break in the moving process. This was the project that I introduced for senior design, but not the one that we ended up doing.
    

### Technically still tracking barrels?

During the first meeting with our client, we established the real issue: all business operations were ran out of an intricately connected set of Excel spreadsheets on network drives. This system was slow, not very intuitive, not very fault tolerant, and clunky to use. Our client used Excel for everything from keeping inventory in warehouses to the production schedule that led directly to purchase orders. An error in these sheets could lead to orders being incorrectly filled.

Talking with our client clarified a bit what he expected a replacement to look like. It should be highly available (online), intuitive (well labeled and organized), and expandable (have an api). The proposed system was sort of like the "data hub" for something that could later be expanded to connect to more services later. We decided this fit the bill of an "Enterprise Resource Planner" or "ERP" for short. An ERP allows a company to schedule things that are going to be produced and see the resources they'll need for it in the future. 

Technically, we're still tracking barrels in this system, just digitally instead of physically as we had originally anticipated.

## Technicalities

This ended up being a relatively interesting project technology-wise. We had a complex, production-grade, feature-rich, scalable tech stack. Going into the project, we didn't know much about any of the technologies we used. It's very fun learning new things and learning what tools work best for the job at hand. But learning like that that comes at a cost of productivity. Assumptions were made that later turned out to be wrong. Lots of code changes were just undoing previous code changes. Such is life. 

### Expectations Vs Reality
Just like real life, the expectations we set for this project were different than how things turned out. I had found this awesome code scaffolding tool called [JHipster](https://jhipster.tech) and I had anticipated using it being a breeze to generate boring, repetitive code and infrastructure and focus on the meat of the application: the business logic. Half of that was actually the case. We could use it to generate some of the infrastructure pieces and some of the frontend components that get repeated across projects... but it wasn't a breeze in the slightest.

What JHipster aims to do is huge. It does a lot and goes through changes rapidly. During the course of this project it went from JHipster 5.8.0 to 5.8.2, that's a quick change process. This means that a lot of features and bugs are documented incorrectly or not at all. I had to hunt through 100 pages of Github issues and Stackoverflow questions when I had problems. There was a huge learning curve to understanding the framework. I did a lot of things wrong that I had to undo, redo, and just leave broken. But I learned how to use the framework.

Now, I feel confident that if I started this project from scratch, I could get to where I am now in under 30 hours of work. Which brings me to my next point:


### Starting over vs fixing what's broken



## Final Meeting with our client
Going into the final meeting with client, I was a little concerned. Our team had been pretty busy for most of this semester and didn't have as much time to work on the project as we would have liked. I was organizing CatHacks, a month of workshops, and doing interviews, Clay was looking for where he was going to be living after college and had to travel for work, and Thomas had hard classes and the solar car software team to lead. There were only one or two weeks where we were all available to meet at once

