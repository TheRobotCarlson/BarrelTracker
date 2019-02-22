---
published: true
layout: article
title: Tech Stack Discussion - Brian
date: 2019-02-21 12:00:00
---
## Tech Stack Discussion - Brian
After going through a few rounds of discussion about the way we wanted to build the system. Thomas and I settled on using Flask, Angular, Google SQL (MySQL), and Google Compute Engine with Docker. This would allow us to have a web interface for the system while allowing us to easily develop locally on Docker.

After thinking more about the expandability requirement, we had a tech stack change. We found [JHipster](https://jhipster.tech) a framework for managing some of the tedious parts of building frameworks with Java Spring and Angular. It uses the built in package and entity managers for both to generate endpoint code, leaving us to only have to write the business logic components. This system also has plugins to allow for easy cloud deployment to Amazon Web Services. This resulted in a total pivot on our tech stack. Our final tech stack is below:

![ERP-system-design.png]({{site.baseurl}}/contents/images/2019/02/ERP-system-design.png)

