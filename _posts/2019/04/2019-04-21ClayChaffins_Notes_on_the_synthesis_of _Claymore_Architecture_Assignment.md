---
published: true
---
## Clay Chaffins 04/21/2019 Notes on the synthesis of  Claymore Architecture Assignment

Thomas, Brian, and myself met to discuss how we wanted to present the architecture assignment, the slides we wanted to include, and the scope of the presentation. Our first slide was a summary slide on the Grain Forecast and Yeast Summary. We decided that we wanted to display graphs and tables and then give a general overview of what we have accomplished so far. 

We then went on to discuss the high-level design architecture. Brian made an elegant chart to show how we designed our architecture. 

Brian and I met and designed a chart that shows how our database is designed (schema). After we decided what entities we needed, we started fully designing the database and the fields to go along with the schema. 
The next item we addressed was our user interface (UI). We designed our UI around the following principles: Consistent coloring, well-known icons, and easy on the eyes. 

For the pages (data screens), we took a logical approach and decided to go the route of building out 1 page for each table. We ended up with a configuration page for each of our configuration tables (Grain, Yeast, Barrel, ect.). These configuration pages would be used for the List of Value (LOV) dropdowns on other pages. We then built out the Schedule page where the user would be able to enter in all the data as needed for a production schedule.

The idea here is that upon using the web app for the fist time, the user would first load data into all the configuration tables so that the LOVs are populated, and then go to the Schedule screen where the real bulk of the work would be done.

In order to test this functionality, we made sure that when the configuration tables are populated, we received data in the LOVs. We also tested to make sure that all configuration tables are able to be populated. 

For the Batch screen, we made sure that user is successfully able to request a list of batches. We also tested the filter functionality so that when a user uses a query to search for a specific item, the search results that are returned are valid. We also tested that when a user adds a new batch, edits an existing batch, or deletes an existing batch, that data cascade deletes where necessary and all foreign key constraints respond appropriately. 


The metrics we originally came up with included: 
•	56 Estimated story points
•	7 user stories, 12 discrete unit test cases
•	20 hours per sprint (two weeks)
