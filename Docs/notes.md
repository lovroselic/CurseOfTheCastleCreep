# prereqs 
https://codepen.io/laughingskull/pen/dyovBeB
## stat
* wall
* door

# GOLD use
* shrines


# interactions
## trigger
* decal - eye position, keep size OR crest decal category
* grid
* face (dirIndex)
* target grid
* target response
### trigger types
    * wall button
    * floor plate/button
### response types
    * hole -> solid floor
    * wall -> empty

### trap to do:
    * trigger fireballs, bounceballs
        * source: EMTPY or WALL ? 
        * target is trigger grid
        * type (which)
            * missile(Missile, Bouncy), 
            * spawn(monster)
        * example:
    * trigger hole undeneath and die ?? there is no remedy for this 

# SAVE
* missing: dropped items!
* diff tracker
    * map
        * has changed &check;
    * ENTITY3D 
        * index to null: action -> remove &check;
    * GATE3D
        * index to Null: action -> deactivate &check;
    * INTERACTIVE_DECAL3D
        - interactive, active to false: action -> deactivate
            * shrine &check;
            * trap, trigger, &check;
            * interactive entity &check;
    * ITEM3D
        - active false: action -> deactivate &check;
    * VANISHING3D ???
    * INTERACTIVE_BUMP3D: action-> openGate
        * color
        * open
## structure
* IAM
* id
* action