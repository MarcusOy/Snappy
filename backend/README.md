# Setting up the Snappy API

The api is built in python and makes use of django. Setting up the api is very straightforward.

1. `cd Snappy/backend`
Change the working directory to the above directory, located within the project directory.

*Note: You need to clone the repository first*

2. `python3 -m venv venv`
This creates a python virtual environemnt that allows us to safely test and run the api without messing up any of the python modules used by the computer

3. `source venv/bin/activate`
Activate the python virtual environment so that when you issue any update commands, it will only affect this smaller environment and the environment used system-wide

4. `pip install django`
Install the django package in the environment. Django is the framework used in the entire api and is a necessary dependecy

5. `pip install djangorestframework`
Install the django rest-framework. This is a specific package that allows us to create an api that isn't a fully functioning website with a user interface

6. `pip install djangorestframework-simplejwt`
Install the simplejwt package that works with the rest framework. This allows to use JWT in the api.

7. `cd ./snappy_api`
Change the current working directory to `snappy_api`

8. `python3 manage.py runserver`
This runs the api. You are now able to access the enpoints via curl requests (you can even see the endpoints in the browser, but this is only a visual interface for developers, not something our end user would actually interact with) To stop the api, type `<ctrl> + C` into the terminal.

Other useful commands:

`python3 manage.py makemigrations; python3 manage.py migrate`: this will ensure that any changes made to `/core/models.py` (the python module that holds our database schema) actually translate over to the literal database (which can be found in the `snappy_api` directory under the na,e `db.sqlite3`)

`python3 manage.py flush`: This will clear the entire database. Useful for starting from scratch sometimes as opposed to deleting the entire database. (It is not recmoneded to delete the sqlite database and attempt to remake it)

`deactivate`: Simply typing this command in the terminal will deactivate the python virtual environment and you will be returned to a "normal" terminal that has access to the system wide python interpreter.