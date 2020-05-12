# tutoring-app API Documentation.
<p>Hosted on https://floating-shore-36419.herokuapp.com/</p>
<strong>POST /API/v1/signup</strong>
<p>Registers a new user to the database.</p>
<p><strong>Parameters [body]</strong></p>
<p>email (required).</p>
<p>password (required).</p>
<p>name (required).</p>
<p>category (required. Can only be either 'tutor' or 'student'.).</p>


<strong>POST /api/v1/login</strong>
<p>Returns token for user to access features.</p>
<p><strong>Parameters [body]</strong></p>
<p>email (required).</p>
<p>password (required).</p>
<p>category (required. Can only be either 'tutor' or 'student'.).</p>

<strong>GET /api/v1/user</strong>
<p>Returns user details.</p>
<p><strong>Parameters [header]</strong></p>
<p>x-access-token: token (provided during log in).</p>

<strong>GET /api/v1/users</strong>
<p>Access all users.[Admin only]</p>
<p><strong>Parameters</strong></p>
<p>token (provided during log in).</p>

<strong>PUT /api/v1/user/:userId</strong>
<p>Updates user by Id.[Admin only]</p>
<p><strong>Parameters</strong></p>
<p>userId.</p>

<strong>DELETE /api/v1/user/:userId</strong>
<p>Deletes user by Id.[Admin only]</p>
<p><strong>Parameters</strong></p>
<p>userId.</p>





Unfortunately, this project could not be completed due to power outage. It will be completed as soon as possible.
