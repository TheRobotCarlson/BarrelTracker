---
layout: article
title: Tech Stack Discussion - Thomas
date: 2019-02-11 12:00:00
---

Recently, our team had a discussion on the specific techs that we would be utilizing to fulfill our clients needs. 

One of the most important requirements for the project is that it must be accessible on the Internet from any computer. This led us to the conclusion that it would be the best move to use the infrastructure of one of the major cloud computing services to speed up development. Our two major options were Amazon Web Services and the Google Cloud. We opted to go with Google, since Brian was most familiar with it.

Another major aspect of our project will be a database. Since we decided on Google's cloud services, the obvious choice was to use the built-in Google SQL service. This had the option to use either MySQL or PostgreSQL. We opted for MySQL since all of us were more familiar with it. 

To keep our solution more portable and easy to migrate if necessary, we decided to use Docker containers.

For our back-end, we decided on the micro-framework Python Flask. This gives us the ability to quickly develop our web application without worrying about the intricacies of making a web server. 

Lastly, we opted to use AngularJS 6 for the front-end. This was chosen primarily because team members were more familiar with this framework than other front-end frameworks.

In conclusion, we are using the following techs:

* Google Cloud Build
* Google SQL (MySQL)
* Google Compute Engine (Docker)
* Python Flask
* AngularJS 6