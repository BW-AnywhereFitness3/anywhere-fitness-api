# Anywhere-API

# ENDPOINTS - Update in progress

## API - https://afitness.herokuapp.com

## REGISTER
> - .POST to /api/auth/register
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

## LOGIN
> - .POST to /api/auth/login
```
{
    username: string,
    password: string
}
```

## GET list of all classes for client
> * .GET to /api/client/classes
>   * Need to be logged in as client
>   * Client can view all available classes.
## GET list classes for instructor
> * .GET to /api/instructor/classes
>   * Need to be logged in as instructor
>   * Gets all classes by logged instructor
## POST new class
> - .POST /api/instructor/classes

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

## POST new session for client
> * .POST /api/client/classes/sessions
>   * Requires id of classes to join
>   * Must be logged in as client
```
{
    classes_id: num
}
```

## GET list of sessions for logged in user
>- /api/client/classes/sessions
>  - Must be logged in as user