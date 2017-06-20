This system offers a language for controlling robots and specifying environments. Afterwards, user can define his natural language commands to define subroutines of the core-language and the system has to infer the parameters, context etc. The inference takes place across all the system user having an end goal to give late user an option to immediately use intuitive commands rather than the core language.


# Use case
## Phase1
A user is given a map with walls and doors shown in it and the rewards somewhere around the map. He has to specify what the robot has to do and his goal is to maximize the reward. The environment is specified completely (user doesn't have to tell if the doors are opened or closed etc.)

## Phase2
A user is given a map with walls and doors shown in it and the rewards somewhere around the map. 
The rewards can appear and disappear and the walls can open and close. He has to specify what the robot has to do and his goal is to maximize the reward. 
User also has to specify the environment behavior for the robot (such as - if the doors would open or close, if the rewards would appear or disappear etc.) If the 
specification is unrealizable, the system warns the user about the root cause (and then the user has to change environment assumptions or change the specification.)

# Technical details
The setup of the system is described [here](/voxelurn).
The system is inspired by the [Voxelurn system](https://github.com/sidaw/shrdlurn/blob/master/Voxelurn.md), that performs the same naturalization process for a simple world of Voxels.
The semantic parser is developed in a [separate repository](https://gitlab.mpi-sws.org/gavran/sempre-interactive).