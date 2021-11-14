# Overview
As we start on this project, I thought it might be useful to outline and diagram what exactally we are doing.
There are a lot of moving parts so here I will try and break it down. (My applogies for the grammar mistakes in advance)

## Diagram
Here is a basic visual that hopefully demonstrates what is going on in our project:

![image](https://user-images.githubusercontent.com/55262458/138982983-89dd43c4-0cfb-4bdc-987b-f1c3dd234b9e.png)

The "Web app in Browser" in the diagram, for all intents and purposes is what all of our users will see, when people refer to "Snappy" or any other app,
they are refering to this "Web app in Browser". This is what the user sees, interacts with and "does stuff" with. For this project, we are calling this the "frontend".

The "Web Server" and "Database" in the diagram (these words are inner changable with eachother) hold all the information. This part of our project is a SQL databse,
which will hold all the encrypted messages between users. For this project, we are calling this the "backend".  
*Note: for all itnents and purposes, the backend is a publicly acessible website*

The "API" in the diagram is a gateway/translator/middle_man/information_transferer/etc between the frontend and the backend. The frontend and backend
work with information differently, and thus store information differently
(think of it as the backend speaks Spanish, and the frontend speaks English; there needs to be a translator between the two). In addition, the API specifies how
the front end is allowed to interact with the backend (ie, someone using the frontend shouldn't be able to `SELECT * FROM * ;`, that just makes no sense for someone to
be bale to do in a simple chat app.)

## How we are using encryption
It should make sense that we need our messages to be encrypted, but how are we doing this?

![image](https://user-images.githubusercontent.com/55262458/138986712-daaf7d40-04b4-49c1-934d-4ccfbd6e29c9.png)

This image describes almost perfectly how our project will work, here are the key take aways:
1. We are using public key cryptography, where a public key for a user, which is known to everyone, is used to encrypt information so only that same user can decrypt that
information using their private key.
2. The public keys will be stored on a server (or in our case, the "backend"). This makes sense: we want everyone to be able to send us messages, so we would want the public
key accessible to everyone, thus, we put it in the database. Instead, we will store the private key on device that the user uses to register for Snappy.
3. The private keys for users are **NOT** stored on the server. Private keys allow for the decryption of information, so if the private key is stored in the
publiclly accesible databse then there would be no point in bothering to encrypt our information.
4. The server will only ever store the encrypted version of a message. Now, when someone says "they sent a message on Snappy", what they really mean is 
"they encrypted a message and stored that message in our database". "Recieiving a message" is simply opposite: "they retrieved a message from our database and decrypted it"

We will be using RSA ecnryption to generate the public key and private key as well as to decrypt and encrypt messages. 
I recommend googling this just to get a basic understanding, but this is the encryption method we are going to use.

## Authentication
We are building an (experimental) website essentially. With that comes all of the trials and tribulations of building a real website including authentication.
In its simplest terms, authentication says "this user has these basic privilages". In terms of our website, users will have the ability to:
1. Send messages to anyone
2. View any messages where they are either the reciever or the sender
But how exactally do wee do this? How do we verify that `user a` is in fact `user a` and can view a given message? This is where JWT comes in.

![image](https://user-images.githubusercontent.com/55262458/138986663-81bcc659-86c4-4c8a-b142-207ac5236c79.png)

Think of a JWT cookie as a passcard that is sent with every request that says "this user is authorized to do X, Y and Z". 
Sure this could be done with a password in theory (because only the user will have this) but it is pretty insecure to be continually 
sending as password for every request they make. The JWT website gives a very good voerview of the technical details of JWT: https://jwt.io/introduction

## API Endpoints
An API endpoint is a relatively simple concept: it's a url where information is returned. The api is really only acessible through urls, where visting a url
will return a very specific piece of information. If one were to vist an API endpoint (without a frontend) then they would see something like this:
```json
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON:API paints my bikeshed!",
      "body": "The shortest article. Ever.",
      "created": "2015-05-22T14:56:29.000Z",
      "updated": "2015-05-22T14:56:28.000Z"
    },
    "relationships": {
      "author": {
        "data": {"id": "42", "type": "people"}
      }
    }
  }],
  "included": [
    {
      "type": "people",
      "id": "42",
      "attributes": {
        "name": "John",
        "age": 80,
        "gender": "male"
      }
    }
  ]
}
```
As you can see, the information returned is something that you might find in a database. But as you can also see: this is ugly, no one is going to try and waste their
time sifting through this to find the information they want, especially if our api returns a list of say 150 different messages. Thats where the frontend comes in:
to "beautify" the returned data. So, in essence, an api enpoint is essentially a url that returns raw data without a frontend.

## Django
Django is a python framework for building web applications. For us, Django is going to be the heart and sould of our api. Django allows us to do several things:
1. Code everything in python. Python is super simple so that why it is desirable
2. Integrate with SQL. SQL, as you might remember, can become very cumbersome. Django allows us to build and manage SQL databases using python.
Again, python is a simple language, so this is good for us
3. Django allows to create API endpoints. Ever try to build your own website completely from scratch (ie html, css, js, maybe perl/php)? Django allows us to 
build a relatively simple website in only a couple lines of (python) code. But by virtue of being in python, it allows way easier customization of the data that is returned 
(say, maybe messages from a specific user stored in a database)
4. PYTHON. Python is simple. It's psuedo code that runs and allows for us to concentrate less on syntax and more on design and function.
This is desirable when trying to program something as complex as a webserver/api.
I highly recommend, if you aren't familiar with python, google python tutorial and just take a look at whats involved.

## I hope this was useful to y'all, if not, questions are always welcome.
