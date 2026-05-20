# Task Requirements:

✦ User register aur login kar sake (JWT tokens milein)

✦ Authenticated user apni notes create kar sake

✦ Apni saari notes list kar sake (GET all)

✦ Single note fetch kar sake (GET by ID)

✦ Note update kar sake (PATCH)

✦ Note delete kar sake (DELETE)

✦ Dusre user ki note access na ho sake (Authorization check)

✦ Input validation honi chahiye (empty title/content reject ho)

✦ Proper HTTP status codes return hon (200, 201, 400, 401, 403, 404, 500)

# Engineering Flow:

POST /api/notes
→
auth middleware
→
validator
→
controller
→
DB save
→
201 response

DELETE /api/notes/:id
→
auth check
→
ownership check
→
delete
→
200 response

