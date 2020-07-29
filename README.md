# Anywhere-API

# ENDPOINTS - Update in progress

## API - https://afitness.herokuapp.com

## REGISTER
> - .POST to /api/auth/register

Requires:
```
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
```
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
```
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

## GET list of all classes for client
> * .GET to /api/client/classes
>   * Need to be logged in as client
>   * Client can view all available classes.
>   * Responds with an array of objects 

Responds:
```
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

## GET list of classes for client by id
> * .GET to /api/client/classes/:id
>   * Need to be logged in as client
>   * dynamic params :id
>   * Responds with an object

Responds:
```
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
## GET list classes by instructor
> * .GET to /api/instructor/classes
>   * Need to be logged in as instructor
>   * Gets all classes by logged instructor
>   * Responds with an array of objects
>   * Objects are the classes under logged in instructor

Responds:
```
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
```
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
```
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
## GET list of sessions for logged in user
> - /api/client/classes/sessions
>   - Must be logged in as user
>   - Responds with an array of object for all sessions assigned to logged in user

Responds:
```
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
    ]
}
```