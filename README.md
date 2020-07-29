# Anywhere-API

# ENDPOINTS - Update in progress

## API - https://afitness.herokuapp.com

## Database SCHEMAS
### Roles
id | name 
---|---- 
1 | instructor
2 | client

### Users
Name| Data Type | Metadata
------------ | ------------- | --------
id | integer | primary key, auto increments, auto generates
role | integer | required, f/k
first_name | string | required
last_name | string | required
email | string | required, unique
username | string | required, unique
password | string | required, unique

### Classes
Name| Data Type | Metadata
------------ | ------------- | --------
id | integer | primary key, auto increments, auto generates
instructor_id | integer | fk, auto assigned by being logged in
name | string | required
type | string | required
start_time | string | required
duration | integer | required
intensity_level | integer | required
address | string | required
city | string | required
postal | integer | required
current_attendees | integer | required
max_class | integer | required

### Sessions
Name| Data Type | Metadata
------------ | ------------- | --------
id | integer | primary key, auto increments, auto generates
users_id | integer | f/k, auto assigned by being logged in
classes_id | integer | required, f/k
joined | string | auto generated


### **** All endpoints besides register/login require req.header with Authorization Token ****

## REGISTER
> - .POST to /api/auth/register

Requires:
```js
{ 
    role: num,
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
}
```
Responds:
```js
{
    data: {
        id: num,
        role: num,
        first_name: string,
        last_name: string,
        email: string,
        username: string
    },
    message: "role: 1=instructor 2=client"
}
```

## LOGIN
> - .POST to /api/auth/login

Requires:
```js
{
    username: string,
    password: string
}
```
Responds:
```
{
    message: string,
    token: string
}
```

## GET list of all classes available for client
> * .GET to /api/client/classes
>   * Need to be logged in as client
>   * Client can view all available classes.
>   * Responds with an array of objects 

Responds:
```js
{
    data: [ 
        {
            id: num,
            instructor_id: num,
            name: string,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
    ]
}
```

## GET Class available for client by id
> * .GET to /api/client/classes/:id
>   * Need to be logged in as client
>   * dynamic params :id
>   * Responds with an object

Responds:
```js
{
    class: {
            id: num,
            instructor_id: num,
            name: string,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        }
}
```
## GET list of sessions for logged in user
> - .GET to /api/client/classes/sessions
>   - Must be logged in as user
>   - Responds with an array of object for all sessions assigned to logged in user

Responds:
```js
{
    classes: [
        {
            sessionID: num,
            users_id: num,
            classes_id: num
            name: string,
            instructor_id: num,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
    ],
    message: "all classes for logged user"
}
```
## GET Session of logged in user by session :id
> - .GET to /api/client/classes/sessions/:id
>   - Requires a session id of current user
>   - Responds with an object
>   - Responds with 404 Not found if session id is not assigned to logged in user

Responds:
```js
    session: [
        {
            session_id: num,
            users_id: num,
            classes_id: num
            name: string,
            instructor_id: num,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
        message: "Session for logged user"
```

## POST new session for client
> * .POST /api/client/classes/sessions
>   * Requires id of classes to join
>   * Must be logged in as client
>   * Responds with new seession object

Requires:
```
{
    classes_id: num
}
```
Responds:
```js
{
    addedSession: {
            session_id: num,
            users_id: num,
            classes_id: num,
            name: string,
            instructor_id: num,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
        message: "successfully added new session"
}
```

## PUT Updates a session by :id
> * .PUT /api/client/classes/sessions/:id
>   * Needs to be logged in
>   * Requires only the classes_id: num
>   * Responds with success message 200 OK status and an object with new updated session

Requires:
```js
{
    classes_id: num //this will be the ID of the new class
}
```
Responds: 201 OK status code if success
```js
{
    message: "successfully added new session"
    updated: {
            session_id: num,
            users_id: num,
            classes_id: num, // updated class id
            name: string,
            instructor_id: num,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        }
}
```

## DELETE Deletes session by :id
> - .DELETE /api/client/classes/sessions/:id
>   - 200 status code, deletes a session by id, if session exists/is assigned to logged in user 
>   - 500 status code if could not delete

Reponds: 200 OK if success
```js
{
    message: `successfully deleted session with${:id}"
}
```

## GET list classes by instructor
> * .GET to /api/instructor/classes
>   * Need to be logged in as instructor
>   * Gets all classes by logged instructor
>   * Responds with an array of objects
>   * Objects are the classes under logged in instructor

Responds:
```js
{
    data: [
        {
            id: num,
            instructor_id: num,
            name: string,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
    ]
}
```
## POST new class
> * .POST /api/instructor/classes
>   * Responds with an object of newly created class and a success message

Requires:
```js
{
    name: string,
    type: string,
    start_time: string,
    duration: num,
    intensity_level: num,
    address: string,
    city: string,
    postal: num,
    current_attendees: num,
    max_class: num
}
```
Responds:
```js
{
    data: {
            id: num,
            instructor_id: num,
            name: string,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        },
        message: "successfully added class"
}
```

## PUT Updates a class by :id
> - .PUT /api/instructor/classes/:id
>   * Requires only at at least one property value change
>   * Responds with success message 200 OK status and an object with new updated session

Requires: at least one of these to change
```js
{
    name: string,
    type: string,
    start_time: string,
    duration: num,
    intensity_level: num,
    address: string,
    city: string,
    postal: num,
    current_attendees: null, // null if none
    max_class: num
}
```
Responds:
```js
    message: `successfully updated class with id ${:id}`
    updated: {
            id: num, // class id
            instructor_id: num,
            name: string,
            type: string,
            start_time: string,
            duration: num,
            intensity_level: num,
            address: string,
            city: string,
            postal: num,
            current_attendees: null, // null if none
            max_class: num
        }
```

## DELETE Deletes class by :id
> - .DELETE /api/instructor/classes/:id
>   - 200 status code, deletes a class by id, if session exists/is assigned to logged in user 
>   - 500 status code if could not delete

Reponds: 200 OK if success
```js
{
    message: `successfully removed class with id ${:id}"
}
```