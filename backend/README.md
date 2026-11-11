# REST API Contract

## Events
| Method | Endpoint | Description | Success | Error |
|---|---|---|---|---|
| GET | /events | List all events | 200 | - |
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

## Error Response
{
  "error": {
    "message": "Event not found"
  }
}