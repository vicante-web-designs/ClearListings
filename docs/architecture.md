# System Design

## Description

This app allows users to view, search and filter property listings with images & details. They can also view the agent in charge of the listings. Only the agent in charge of the listing can modify, edit or delete the listing.

## Entities

### Listings

1. ID
2. title
3. description
4. location
5. agentID
6. createdAt
7. tags
8. price
9. images
10. bedrooms
11. type
12. availability
13. isArchived

### Agent

1. ID
2. name
3. email
4. role (Agent | Admin)
5. password
6. createdAt

### Images

1. ID
2. url
3. listingId

## Relationships

1. One Agent can hold many Listings
2. One Listing can only hold one Agent
3. One Listing can hold multiple Images
4. One Image can only hold one Listing

## Responsibilities

### Frontend

1. manipulates and Showcases the user's listing data
2. Sends Data to backend
3. Handles interaction logic
4. Handles user feedback

### Backend

1. Stores Data
2. Arranges data
3. Makes data easy and ready for the frontend to use via an API
4. receives data from the frontend
5. Handles authorization
