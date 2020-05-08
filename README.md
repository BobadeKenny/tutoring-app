# tutoring-app API Documentation.
https://floating-shore-36419.herokuapp.com/
<strong>POST /signup</strong>
<p>Registers a new user to the database.</p>
<p><strong>Parameters</strong></p>
<p>email (required).</p>
<p>password (required).</p>
<p>name (required).</p>
<p>category (required. Can only be either 'tutor' or 'student'.).</p>


<strong>POST /login</strong>
<p>Returns token for user to access features.</p>
<p><strong>Parameters</strong></p>
<p>email (required).</p>
<p>password (required).</p>
<p>category (required. Can only be either 'tutor' or 'student'.).</p>

<strong>GET /:token/category</strong>
<p>Access all subject categories.</p>
<p><strong>Parameters</strong></p>
<p>token (provided during log in).</p>

<strong>GET /:token/:category/subjects</strong>
<p>Access all subjects in a category.</p>
<p><strong>Parameters</strong></p>
<p>token (provided during log in).</p>
<p>category (any one of the three subject categories)</p>



Unfortunately, the remaining files for this project has not been uploaded due to power outage. It will be completed as soon as possible.
