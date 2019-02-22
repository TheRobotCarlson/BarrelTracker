---
published: true
---
---
layout: article
title: Requirements Gathering - Brian
date: 2019-01-29 12:00:00
---

## Requirements Gathering

To gather requirements for this project, we setup a meeting with our client: Shane Baker, the CEO of Wilderness Trail Distillery and Ferm Solutions. This meeting was to get a clearer idea of the problems we'd be solving with our software and to get clear use cases and data models.

During the meeting, Clay, Thomas, and I clarified the project scope with Shane. Initially, we anticipated that we'd be creating a live barrel tracking system with QR code or computer vision technologies. After getting more into the discussion with Shane, we clarified that the real focus should be on internal operations and resource planning. This led us to a clear picture of what our minimum viable product should be: an ERP system. 

Shane already managed many company operations using a series of Excel spreadsheets. This was a slow, asynchronous system that wasn't easily integrated into other tools or accessible by other members of the team. Not everyone needs to be able to access all of the data, but everyone needs to be able to access their parts from wherever they are. This isn't possible with the current system.

Our ERP system would need to be:
1. Accessible - Warehouse managers would need to be able to access the system from their phones on the warehouse floor when updating barrel positions, Shane would like to be able to manage operations wherever he is in the world.

1. Equivalent in functionality to the current system - Our system would need to be able to at least match functionality of the current system. This system needed modules for:
	1. Summary data
    1. Production scheduling
    1. Grain, yeast, and barrel purchase forecasting
    1. Barrel warehouse placement

1. Expandable - Our system would need to be expandable for features to be added later. Other systems may need to interact with our system. This necessitates our system having an API.
