# Snappy
End to end encryption implementation. Final project for CNIT370.

## Overview
Snappy is going to be an example [end-to-end-encryption](https://usa.kaspersky.com/blog/what-is-end-to-end-encryption/23288/) (or e2e) chat app, similar to [whatsapp](https://www.whatsapp.com/) or [signal](https://signal.org/en/). Our main goals are going to be:
1. Representing e2e
2. To prove tht e2e is simple to implement or, to put it more bluntly: *why are a group of college students able to develop e2e yet apps like discord, groupme, or snapchat aren't?*

The app is going to rely on a [public key encryption](https://www.tutorialspoint.com/cryptography/public_key_encryption.htm) scheme, specifically [RSA](https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_understanding_rsa_algorithm.htm).

Snappy is going to have (more or less) 3 working parts: a [database](#The-Database), a [frontend](#The-Frontend), and an [API](#The-API).

### The Database
This part of the app should be self explanatory: information regarding account info and messages won't be stored on each user's device, but rather on one server.

For now, we are going to store account information and messages in a SQL database. *(I'm currently looking into other databases, such as [graphql](https://graphql.org/), but for now, we'll stick with [sqlite3](https://www.sqlite.org/index.html))*

All account information will be stored in this database with the exception of each user's private key. All information should be encrypted in this database, or at a very minimum, the messages sent between users should certainly be encrypted.

When we actually "release" our app, unless one of us purchases a domain, we won't actually have a server and a website thats globally known (ie: snappy.com), instead, we will most likely develop a local server that allows the app to work only if you are on a specific wifi, but for now, that part of the database implementation is unimportant.

### The Frontend
This part of the app is what our users are going to see and interact with. Two main tools are going to be used to build this part:
1. [React](https://reactjs.org/): a javascript library that lets us build websites using javascript objects.
2. [Electron](https://www.electronjs.org/): essentially a framework that allows us to take an existing website and make it an app.

The frontend, in addition to being what the users see and interact with, will also generate our users public and private keys AND store the private key locally (on the user's device or in the user's browser). This is important because we never, ever want the user's private key to be sent out over the internet, and we especially don't want it to be stored anywhere where someone else can have access to it (like a publicly accessable database that stores account info...). Instead, the frontend, which will be on each user's device, will take care of the logic for this without the private key being accessible to anyone except each individual account owner.

### The API
The API is the bridge between the database and the frontend. In essence, what the api does is translate requests from the frontend to SQL code so that the commands can be issued on the database. It also works in reverse: when the SQL database returns something, the API will translate it so that the frontend can display it to the user

The API is going to be built in [python](https://www.python.org/) and make use of [Flask](https://flask.palletsprojects.com/en/2.0.x/)

*Note: the Flask documentation doesn't explain what Flask is actually used for very well, so use this instead: https://towardsdatascience.com/creating-restful-apis-using-flask-and-python-655bad51b24*


## Summary
This app is going to have a lot of moving parts and consist of several different programming languages, so it's important to atleast skim through each of the different tools and programing languages we will be using (anything that is hyper-linked into this readme above, I highly recomend reading). 

This document will serve as our basic outline for the foreseeable future, and for the most part, won't really change that much unless something catastrophic happens.
