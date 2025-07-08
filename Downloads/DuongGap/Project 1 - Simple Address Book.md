

**Objective:** Create a Python program that manages an address book, allowing users to add, view, edit, and delete contacts, with data persistence using a JSON file.

**Features to implement:**
1. Add new contacts
2. View all contacts
3. Search for a contact
4. Edit existing contacts
5. Delete contacts
6. Save contacts to a JSON file
7. Load contacts from a JSON file

**Suggested Implementation Steps:**
1. Create a `Contact` class with attributes like name, phone number, email, and address.
2. Implement a main menu that displays options to the user.
3. Use a list to store `Contact` objects in memory.
4. Implement functions for each feature (add, view, search, edit, delete).
5. Use the `json` module to save and load contacts to/from a JSON file.
6. Implement error handling for invalid inputs and file operations.

**Example Usage:**
```
Welcome to your Address Book!
1. Add a contact
2. View all contacts
3. Search for a contact
4. Edit a contact
5. Delete a contact
6. Save contacts to file
7. Load contacts from file
8. Exit
Enter your choice: 1

Enter name: John Doe
Enter phone number: 123-456-7890
Enter email: john@example.com
Enter address: 123 Main St, Anytown, USA
Contact added successfully!

Enter your choice: 2

Your contacts:
1. John Doe (123-456-7890)

Enter your choice: 6

Contacts saved to 'contacts.json' successfully!

Enter your choice: 8

Thank you for using the Address Book!
```

**JSON File Structure:**
```json
[
  {
    "name": "John Doe",
    "phone": "123-456-7890",
    "email": "john@example.com",
    "address": "123 Main St, Anytown, USA"
  },
  {
    "name": "Jane Smith",
    "phone": "987-654-3210",
    "email": "jane@example.com",
    "address": "456 Elm St, Othertown, USA"
  }
]
```

**Learning Outcomes:**
- Practice creating and using classes in Python
- Gain experience with user input and output in the command line
- Learn about JSON serialization and deserialization in Python
- Implement file I/O operations with JSON
- Use dictionaries to structure data
- Implement basic error handling and input validation
- Practice working with lists of objects
