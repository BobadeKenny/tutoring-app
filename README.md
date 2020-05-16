# tutoring-app API Documentation.
<p>Hosted on https://floating-shore-36419.herokuapp.com/</p>
<br>
<strong>POST /api/v1/signup</strong>
<p>Registers a new user to the database.</p>
<p><strong>Parameters [body][x-www-form-urlencoded]</strong></p>
<p>email (required).</p>
<p>password (required).</p>
<p>name (required).</p>
<p>role (required. Can only be either 'tutor' or 'student'.).</p>
<br>

<strong>POST /api/v1/login</strong>
<p>Returns token for user to access features.</p>
<p><strong>Parameters [body][x-www-form-urlencoded]</strong></p>
<p>email (required).</p>
<p>password (required).</p>

<br>
<strong>POST /api/v1/admin/signup</strong>
<p>Registers tutors ad admin.</p>
<p><strong>Parameters [body][x-www-form-urlencoded]</strong></p>
<p>email.</p>

<br>
<strong>POST /api/v1/admin/login</strong>
<p>Access admin features.[Admin only]</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>

<br>
<strong>GET /api/v1/subjects/categories</strong>
<p>Access all subject categories.</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>

<br>
<strong>GET /api/v1/subjects/:category</strong>
<p>Access subjects by categories.</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>
<br>

<strong>POST /api/v1/subjects/create</strong>
<p>Create new subject.</p>
<p><strong>Parameters [body][x-www-form-urlencoded]</strong></p>
<p>accessToken (provided during log in).</p>
<p>name [subject name].</p>
<p>category.</p>

<br>
<strong>GET /api/v1/tutors</strong>
<p>Get all tutors.</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>

<br>
<strong>GET /api/v1/tutors/:id</strong>
<p>Get a tutor by ID.</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>

<br>
<strong>DELETE /api/v1/tutors/:id</strong>
<p>Delete a tutor by ID.</p>
<p><strong>Parameters [header]</strong></p>
<p>access-token (provided during log in).</p>






