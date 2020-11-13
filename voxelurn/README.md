
Blocks world of robots, building upon the [Voxelurn world](https://github.com/sidaw/shrdlurn) 



## Installation

To install, simply run `yarn install`. This will install all the needed node dependencies. (Install yarn as described [here](https://yarnpkg.com/lang/en/docs/install/).)

## Running
To start the client, run `yarn start` . This will open the default browser with the client in it. 
(If the browser does not open, go to http://localhost:3000) 


#### Development

We use [react-scripts]([https://github.com/facebookincubator/create-react-app]) to handle the building and running of the client.

To run locally with hot reload, run `yarn start`. (If there is a problem with running this command saying that node doesn't exist, check if you only have `nodejs` and if so, create a simlink `node`)

By default, the client tries to connect to the servers specified in "constants/strings.js". But, if you wish the client to connect to a different instance of SEMPRE or the community server, you can set environment variables to override the URLs they try to connect. The following environmental variables will tell the client which server to connect to:

- `REACT_APP_SEMPRE_SERVER` specifies the URL of the running SEMPRE instance.
- `REACT_APP_COMMUNITY_SERVER` specifies the URL of the (optionally) running community server to support logging and community features.

You can either specify these in a `.env` file or in the CLI command like so, `REACT_APP_SEMPRE_SERVER=localhost:8410 yarn start`

#### Building

Run `yarn build` to build a production version of the app. The build will be saved to "/build".

*Note:* In order to build to deploy to a URL that is not the root, you must [set the "homepage" in "package.json" to the URL where the client will be hosted](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths).

#### Deployment

It is simple to deploy to Github Pages. Just set the "homepage" variable in "package.json", and then run `yarn deploy`.

## Organization

All javascript and CSS source code is the "src" folder. Generally, anything that is a route is in "src/routes". Anything that is not a route, but that handles interacts directly with data in the store (i.e. is wrapped with Redux's connect function) is in "src/containers". Anything that does not get data directly from the store will reside in "src/components".

The setting (BlocksWorld) lives in the "src/setting". Here is the only logic that is blocks world dependent.

## RobotWorld 

Interested in expanding this client to handle a different setting? Everything should be setting agnostic except for the code in "src/setting". All you have to do is implement all the same props as "src/setting/BlocksWorld" does and then export the new setting as the App's setting by changing what gets imported in "src/setting/index.js". Then, everything should work as intended!
The RobotWorld file structure is described [here](/voxelurn/ROBO-DOCUMENTATION.md).

### Known bugs
 - if a system behaves nonsensically, make sure to clear the cached commands (an error on the right-hand side of the screen and then the clear button).