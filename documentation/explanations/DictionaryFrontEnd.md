#Implementing the Dictionary
Relevant files for the front end are `Dictionary/index.js`, `Dictionary/styles.css`, `actions/world.js` and `store/world.js`.

The dictionary requests the list of induced rules from the back end and renders a table of the rules to the screen. 

The store is used to request the rules and pass them to the dictionary.

##Requesting the rules from the back end
The function `Actions.dictionary` in `actions/world.js` calls `SEMPREquery` from `helpers/sempre.js` which sends a request to the backend. 
After processing of the request by the back end, a response is received by the `dictionary` function.

The function parses the JSON string and dispatches an action of type `dictionary` to the store. 
The reducer defined in `store/world.js` passes the dictionary to the state of the store. 

Read more about implementing Dictionary in the back end [here](https://github.com/akshalaniche/sempre-interactive-flipper/blob/master/DictionaryBackEnd.md)