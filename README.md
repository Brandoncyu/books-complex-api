# Technical Library Complex API

'try'

You will be tasked with building an API from scratch. This API should:

- Follow RESTful patterns
- Use an opinionated architecture (e.g. MVC)
- Include error handling
- Include nested resources
- Stores data in a file (e.g. .json, .csv)

## Technical Library
### Books
- ID: (You Choose) A unique id that represents the book. Created automatically.
- Name: (String) Name of the book. Cannot be longer than 30 characters. Required.
- Borrowed: (Boolean) True/false value that represents whether or not the book has been borrowed. Required. Defaults to false.
- Description: (String) A description of the book. Optional.
- Authors: (Array) An array of authors.
###Authors
- ID: (You Choose) A unique id that represents the author. Created automatically.
- First Name: (String) First name of the author. Required.
- Last Name: (String) Last name of the author. Required.
Authors will have different IDs even if they have the same first and last name.

### Build RESTful routes so that you can:

- Create, Read, Update, and Delete books
- Create, Read, Update, and Delete authors through books
