# REST API Contract

## Events
| Method | Endpoint | Description | Success | Error |
|---|---|---|---|---|
| GET | /events | List all events | 200 | - |
| GET | /events/upcoming | List upcoming events, sorted by date | 200 | - |
| GET | /events/:id | Get single event | 200 | 404 |
| POST | /events | Create event | 201 | 400 |
| PATCH | /events/:id | Update event | 200 | 400, 404 |
| DELETE | /events/:id | Delete event | 204 | 404 |

## Status Codes
- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request
- 404: Not Found

## Query Parameters
search: Search events by title (case-insensitive).
category: Filter events by category.

## Upcoming Events
GET /events/upcoming

## Date Format
`DD-MM-YYY

## Error Response
{
  "error": {
    "message": "Event not found"
  }
}