---
published: true
layout: article
title: Documentation Notes over the last 2 months - Clay
date: {}
---
## Clay Chaffins 04/21/2019 Notes on the synthesis of  Claymore Architecture Assignment - Clay

Thomas, Brian, and myself met to discuss how we wanted to present the architecture assignment, the slides we wanted to include, and the scope of the presentation. Our first slide was a summary slide on the Grain Forecast and Yeast Summary. We decided that we wanted to display graphs and tables and then give a general overview of what we have accomplished so far. 

We then went on to discuss the high-level design architecture. Brian made an elegant chart to show how we designed our architecture. 

Brian and I met and designed a chart that shows how our database is designed (schema). After we decided what entities we needed, we started fully designing the database and the fields to go along with the schema. 
The next item we addressed was our user interface (UI). We designed our UI around the following principles: Consistent coloring, well-known icons, and easy on the eyes. 

For the pages (data screens), we took a logical approach and decided to go the route of building out 1 page for each table. We ended up with a configuration page for each of our configuration tables (Grain, Yeast, Barrel, ect.). These configuration pages would be used for the List of Value (LOV) dropdowns on other pages. We then built out the Schedule page where the user would be able to enter in all the data as needed for a production schedule.

The idea here is that upon using the web app for the fist time, the user would first load data into all the configuration tables so that the LOVs are populated, and then go to the Schedule screen where the real bulk of the work would be done.

In order to test this functionality, we made sure that when the configuration tables are populated, we received data in the LOVs. We also tested to make sure that all configuration tables are able to be populated. 

For the Batch screen, we made sure that user is successfully able to request a list of batches. We also tested the filter functionality so that when a user uses a query to search for a specific item, the search results that are returned are valid. We also tested that when a user adds a new batch, edits an existing batch, or deletes an existing batch, that data cascade deletes where necessary and all foreign key constraints respond as we saw fit.


The metrics we originally came up with included: 
•	56 Estimated story points
•	7 user stories, 12 discrete unit test cases
•	20 hours per sprint (two weeks)


## Clay Chaffins 04/21/2019 Notes on the synthesis of  Claymore Coding Assignment

We originally came up with the idea to start off giving a broad overview so that we could help tie what we had been working on to the broader audience. We then moved onto discussing the architecture plan versus the actually implementation. We decided to discuss the technologies we planned to use versus the ones we actually used. The technologies we actually used were JHipster, Amazon Web Services, and Docker. Within JHipster, we used Java Spring Boot and Angular 6. Within Amazon Web Services we used Code Pipeline, Amazon RDS, API Gateway, and Elastic Bean Stalk. 

We also re-imagined our database schema as well – we decided to keep our Schedule table/entity at the top level but change how we wanted some of the lower level tables. For example, we created MashbillGrain and MashbillYeast tables to hold the many to many relationship that a mashbill can have multiple grains attached to it and viceversa. Also, mashbills can have multiple yeast types attached to them and vice versa. We were originally under the impression that only a one to one relationship existed, but after further requirement elicitation with Shane, we discovered this was not the case. We therefore made the change accordingly and updated our app. 

At the time of this presentation, we did not yet have the app hosted on Amazon Web Services (the cloud), but we did have a video of our application being used. We showed this video to Shane to get his approval and feedback and then showed it to the class as part of the Coding Assignment presentation. The video walks through the typical user workflow of adding data to the configuration tables and then going through and setting up a production schedule and mashbill. 

To test the front end we preformed unit tests using the Jest framework. We ensured to use this framework to ensure we had tests for the primary screens that the users interact with. The framework essentially, makes changes to the backend and then observes the front end. 

To test the back end, we used the Spring Test Context framework. These tested homed in on changing data in the database level. The end goal here was to simulate the front end in order to pass the back end functions set variables. 

During this process we did discover some defects. While most of these defects were small, we were extremely glad we utilized the testing frameworks above to catch these errors. One larger defect we uncovered had to do with adding additional info. In some cases when we tried to update fields on the front end, previous data would become overwritten. We discovered a workaround in the meantime and a week later, we implemented a fix for this issue. 



## Clay Chaffins 04/21/2019 Notes on Our Final Meeting with Shane 

In preparation for our final presentation, Thomas, Brian, and I met with Shane to show off the “finished” product and get any last feedback before our presentation on the 22nd. I set up the meeting and gave the big picture of what we were hoping to accomplish. Thomas took excellent notes and Brian went into detail about the app where Shane had questions. The meeting started off very casual and then we quickly dove down into the app we had built him. 

We kicked off the discussion by showing that the app was successfully hosted in the cloud and that anyone who had the login credentials could sign in and use the app. I emailed Shane the URL to the site as well as login credentials and told him that he could sign in at any time. 
After providing Shane with the URL and login credentials, I walked through what we assumed was the typical user workflow and Shane provided feedback where necessary. Brian did an excellent job at helping me answer questions and Thomas took the following notes: 

priority changes:
- barrels made per batch
- defaults for dates
- batch number is the schedule order
- schedule has mashbill, batch doesn't need it
- schedule order
schedule order - 19D19B5
19 - year
D - april
19 - day
B5 - mashbill
export function for mashbill grain pounds
private barrel warehouse page

Using these notes and the great feedback we got from Shane, we decided to make some last minute changes to the app to have it ready to go by our presentation on Monday. 

There were 3 big requests we got from Shane. The first one was to autogenerate the schedule order based off the date, mashbill, and barrel. We wrote code to autogenerate this. 

The second big request Shane had was to include defaults for the date fields. So when we the user goes to enter a new production schedule, for example, the date field would automatically default to todays current date. Thomas, Brian, and I determined that this request was perfectly valid, so we wrote a few lines of code to do this. 

The third big request was to include aggregate totals (sum and counts) for the number of barrels needed in a given year/month/day. We are currently working on this functionality now and hope to have it ready for the demo on Monday. 

The impression we got from Shane was that he was very happy with our progress and looked forward to our real finished product.

Working with Shane has been a great experience because he knows exactly what he wants and he didn’t change his mind about what he wanted as the process went on. We would 10/10 wish to work with him again and are aiming to continue development on this project after the conclusion of 499. 



## Clay Chaffins 04/21/2019 Notes on Our Final Presentation

Following our last meeting with Shane, we began work on our final presentation. I created the slides for the presentation. I went through all of our documentation and ensured we had everything up to date and ready to submit. I then started building the structure of our presentation and grabbed data and slides from previous presentations where applicable. 

I designed this presentation with the idea of wanting it to be as memorable as possible and yet still shine light on how far we have come since the inception of this idea and our first meeting with Shane. We will start off by showing the current system in place and then showing our solution. One of first slides will actually be about the excel sheet the business currently uses. After showing the excel sheet, we will begin introducing our solution. 

After introducing our solution, our plan is to discuss our final architecture used (including our final Database schema design)

After discussing the technologies used, our plan to spend the bulk of our presentation doing a live demo. This live demo will be of our production ready environment which is hosted on the cloud has the newest requests implemented. We plan to walk through it very similarly to how we did with Shane with a few small tweaks – we will walk through how to login, add data to the configuration tables, and then create mashbills and production schedules. The major difference this time is that we will make it a priority to showcase the newest features to the app including the aggregate totals, date defaults, and the auto-generated schedule order. 

After the live demo, we will discuss the front-end testing, back-end testing, defects, and metrics. 
We will conclude by talking about the lessons we have learned along this journey of delivering an ERP system and giving 3 key takeaways.

Total wordcount to date: 2904 (existing) + 1700 (new) = 4604 words total
