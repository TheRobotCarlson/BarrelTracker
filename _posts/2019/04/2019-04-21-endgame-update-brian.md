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
1. [Starting over vs fixing what's broken]()
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


### Final Meeting with our client
Going into the final meeting with client, I was a little concerned. Our team had been pretty busy for most of this semester and didn't have as much time to work on the project as we would have liked. I was organizing CatHacks, a month of workshops, and doing interviews, Clay was looking for where he was going to be living after college and had to travel for work, and Thomas had hard classes and the solar car software team to lead. There were only one or two weeks where we were all available to meet at once

