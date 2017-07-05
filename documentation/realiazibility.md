# Realizability

This document contains the formal definitions of realizable actions in the
robot world. Each definition contains a set of preconditions, constraints,
and postconditions that must be met for the action to be considered "realizable."

- `visit FIELD`
    ```
    preconditions:
      none

    constraints:
      none

    postconditions:
      robot at FIELD
    ```
- `visit FIELD while avoiding AREA`
    ```
    preconditions:
      none

    constraints:
      AREA is treated as if the contained fields were walls

    postconditions:
      robot at FIELD
    ```
- `pick item FILTER`
    ```
    preconditions:
      robot has N items passing FILTER

    constraints:
      none

    postconditions:
      robot has N + 1 items passing FILTER
    ```
- `pick every item FILTER`
    ```
    preconditions:
      none

    constraints:
      none

    postconditions:
      none
    ```
- `drop item FILTER`
    ```
    preconditions:
      robot has N items passing FILTER

    constraints:
      none

    postconditions:
      robot has N - 1 items passing FILTER
    ```
- `drop every item FILTER`
    ```
    preconditions:
      none

    constraints:
      none

    postconditions:
      none
    ```
