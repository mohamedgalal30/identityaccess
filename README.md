<h1>
    <p align="center">
        Identity and Access Managment Service
    </p>
</h1>

<details>
  <summary><strong>Table of contents</strong></summary>
  
  - 🏁 [Getting Started](#-getting-started)
  - 💡 [Architecture](#-architecture)
    - Hexagonal Architecture (ports and adapters)
    - Onion Architecture
    - RESTful Design
    - Dependency Injection
  - 📇 [Tools and Technologies](#-tools-and-technologies)
  - [TODO](#-todo)
</details>


## 🏁 Getting Started
## To run the app
- make sure you have docker installed in your machime.
- The will run on port 8080, so make sure its unused, if you want to change the port, just change the value of APP_PORT env variable in .env file under root directory
- from the app root directory run ```docker-compose up -d```

## To stop the app
- from the app root directory run ```docker-compose down```


## To run tests
- from the app root directory run ```npm run test```
- to show coverage report run ```npm run coverage```

## Playing with the APIs
From your Favorite API tool like postman or insomnia.

- To register a new user
```
Method: POST 
Url: http://localhost:8080/auth/register
Body: {
	"name": "Test",
	"email": "test@email.com",
	"password": "pass-123"
}
```
- To login
```
Method: POST 
Url: http://localhost:8080/auth/login
Body: {
	"email": "test@email.com",
	"password": "pass-123"
}
```

- To add new role
```
Method: POST 
Url: http://localhost:8080/api/roles/
Body: {
	"name": "editor",
	"permissions": {
		"iam": {
			"users": ["assignRole"],
			"sessions": ["invalidate"]
		}
	}
}
Headers: {
    "Authorization": <accessToken from login api>
}

To add a role containing all permissions send the body {"name": "admin",	"permissions": "*"}
```

- To assign role to the user
```
Method: POST 
Url: http://localhost:8080/api/users/:userId/assign-role
Body: {
	"roleId": "62dbd4eb7247e6560c1c7ae7"
}
Headers: {
    "Authorization": <accessToken from login api>
}

```

- To verify the access token is valid and the user has the permission to access the resource
```
Method: POST 
Url: http://localhost:8080/auth/verify
Body: {
	"service": "iam",
	"resource": "role",
	"permission": "create"
}
Headers: {
    "Authorization": <accessToken from login api>
}

sending this api without body means that the api will just authenticate the user. no authorization required.
```

- To force invalidate session
```
Method: POST 
Url: http://localhost:8080/api/sessions/:sessionId/invalidate
Headers: {
    "Authorization": <accessToken from login api>
}
```

- To logout
```
Method: POST 
Url: http://localhost:8080/auth/logout
Headers: {
    "Authorization": <accessToken from login api>
}
```

## To effectively test the api follow this steps
- register an user
- login the user
- call the init endpoint to init a role called "admin" and assign it to the user
    ```
        Url: http://localhost:8080/api/users/userId/init
    ```
    note: this api is just for testing api purpose because the new user can not create a role or assign the role to users due to his null permissions. on production deployment may will be a default admin and role based on business requirement.
- with this user you test all the apis

# 💡 Architecture

The identity and access management service built according to DDD priciples with support of 
other architecture patterns like:



# - Hexagonal Architecture (ports and adapters)
<div align="center">
  <img width="360" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hexagonal_Architecture.svg/500px-Hexagonal_Architecture.svg.png" alt="Redis OM" />
</div>

A hexagonal architecture is divided into three loosely coupled parts (User Interfaces, Backing services, Business Logic) and defines the strict roles that these parts play within the application.
The intent is to make the core of our application immune to changes in the communication with other layers. Those concerns are to be handled at the boundary of our hexagon.

## - Ports

Ports are what our core application interacts with. Ports stay consistent for the inner application no matter what happens outside them. They are interfaces that the inner components interact with without knowing whats being plugged into them. They belong to the core domain and represented by interfaces like:

    src/domain/model/user/IUserRepository
    src/domain/model/role/IRoleRepository
    src/domain/model/session/ISessionRepository


## - Adapters
Ports are staying consistent but we still want to be able to plug multiple applications to them when needed. These applications could have different needs and may not comply with the interface defined by the ports. This is where out adapters come in. Their purpose is to convert the data provided by the outer applications into a format digestible for the inner application using **[DTOs](https://martinfowler.com/eaaCatalog/dataTransferObject.html)** and **Mappers**.

#### - Inbound Adapters (User Interfaces)
There can be many user interfaces to a backend. They will all get their resources from the Business logic layer. The representation of the Inbound adapters is the web app with its server, routers, middlewares and controllers.

    src/adapters/http

and we can plug multiple adapters like - mobile apps, desktop softwares, etc.

#### - Outbound Adapters (Data sources)
These are services which support the business logic. They each serve a specific purpose and provide data/services to the application. They interact with the business logic layer and are replaceable as long as the communication contract between the two layers is maintained. the representations of them mongo adapter and redis adapter:

    src/adapters/mongodb-repo
    src/adapters/redis-repo
    src/adapters/inmemory-repo

Here mongodb adapter pluged into users and roles ports while redis adapter pluged into session port. ie. users and roles use mongodb while session use redis to store and retrieve their data. 

At any point of time we can add or replace any adapter for any port without affecting the core business domain, for example we can use **Neo4j whit CypherQl** to implement graph-like data model for users and roles.

And we can plug multiple adapters like:
- Notification services
- Another service like a payment gateway
- In microservices context, another microservice.


# - Onion Architecture (Serve as The core of our Hexagon)
<div align="center">
  <img width="360" src="https://anarsolutions.com/wp-content/uploads/2020/04/Onion-Architecture.png" alt="Redis OM" />
</div>

Onion Architecture is based on **the inversion of control principle**. Onion Architecture is comprised of multiple concentric layers interfacing each other towards the core that represents the domain. The architecture does not depend on the data layer as in classic multi-tier architectures, but on the actual domain models.

## The Dependency Rule
Source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle.

The concentric circles represent different areas of software. In general, the further in you go, the higher level the software becomes. The outer circles are mechanisms. The inner circles are policies.

## Entities
```src/domain/model```
Entities encapsulate Enterprise wide business rules.
No operational change to any particular application should affect the entity layer.

## Use Cases
```src/usecases```
The software in this layer contains application specific business rules. 

We do not expect changes in this layer to affect the entities. We also do not expect this layer to be affected by changes to externalities such as the database, the UI, or any of the common frameworks.

## Adapters
```src/adapters```
The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities.
Also in this layer is any other adapter necessary to convert data from some external form, such as an external service, to the internal form used by the use cases and entities.


# - RESTful Design
We create resources for our meaningfull resouces that we want to
expose as accessible from the outside and assign each a distinct identity.
In general, each resource has one URI.
It doesn't need to be in one-to-one relation with our domain model aggregates.

The ```src/adapters/http/routers``` follow the RESTful design.

# - Dependency Injection
The goal is to improve the reusability of your code and to follow **SOLID**’s **dependency inversion** and **single responsibility principles**.They also aim to reduce the frequency with which you need to change a class.  That enables you to replace dependencies without changing the class that uses them. It also reduces the risk that you have to change a class just because one of its dependencies changed.

## - Constructor Injection
All controllers use the Constructor Injection to recieve thier dependencies at its initialization see for example ```src/adapters/http/controlles/AuthenticationController``` .
On the other hand routers inject the controllers' dependencies when they get used them like ```src/adapters/http/routers/AuthenticationController```.

## - Closure Injection
Usecases get their dependencies by a clousure function on the usecase for example ```src/usecases/authentication/register-user```.

Usecases index.ts file serve as DI container to provide each use case with its depedencies.
This way you can easily replace any dependency wiht one another see for example **the unit test** for register user under ```test/usecases/authentication/register-user.test.ts```. we Just mocked the ```UserRepository``` and  injected it to the ```registerUser``` function to test it.



# 📇 Tools and Technologies
### - node.js with Express Framework.
### - mongodb
The Document Model DB of the system.
### - redis-stack
Redis with the Redis Stack extension that adds modern data models like **json** and processing engines like **Full-text search** to support our system needs.

We use redis to store our sessions for high performence.

### - docker and docker-compose
To containerize our services and infrasturcture.

### Jest.js For unit testing.


# Roles scheme
- I assume that the system has multiple services, each has multiple resources, each single resource has multiple permissions.
```
interface Role {
	service: {
		resource: string[];
	};
}
```
For example the identity and access managment service will be like:
```
{
    iam: {
        users: ["assignRole", "edit", "block"]
    }
}
```

# TODO if having more time
- complete the missing apis like edit, remove, list role.
- validate the permissions scheme for the add role api.
- implement event driven archticture and update role in eventual consistancy mode.
    - denormalize the role and permissions in the user entity for rapid retrieval.
    - save all the required data for authentication and authorization in the session in redis.
    - when edit roles or users update the data in redis-stack based on event derien architecture.
- write the missing unit test (due to the time I implemented the unit test of only register user as a proof of concept.)


