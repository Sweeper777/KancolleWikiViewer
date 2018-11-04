# KancolleWikiViewer

This is a chrome extension that allows you to go to different pages of the KanColle Wiki just by typing in short commands in the address bar.

Every command begins with `kcw` followed by a space. `kcw` stands for **K**an**C**olle **W**iki

## Viewing quests

    kcw <quest ID>

Goes to the specified quest on the Quests page. `<quest ID>` is something like `A5` or `B20`, case insensitive

Example: `kcw B20` takes you to https://kancolle.wikia.com/wiki/Quests#B20

## Viewing worlds and maps

    kcw <world number>[-<map number> [-ep [-<node>]]]

Goes to the specifed world or map, or goes to the enemy patterns page of a map if specified. You can specify the `-ep` option to view enemy patterns. On top of that, you can also specify a node (case-insenstive).

Examples:

- `kcw 1` takes you to https://kancolle.wikia.com/wiki/World_1
- `kcw 1-1` takes you to https://kancolle.wikia.com/wiki/World_1/1-1
- `kcw 1-1 -ep` takes you to https://kancolle.wikia.com/wiki/World_1/1-1/Enemy_patterns
- `kcw 1-1 -ep -a` takes you to https://kancolle.wikia.com/wiki/World_1/1-1/Enemy_patterns#1-1_A

## Viewing ships

    kcw s:<ship name> [-q|-g]

Goes to the wiki page for the specified ship. The `-q` option can be specified to jump to the quotes section of the page. The `-g` option can be used to go the `/Gallery` subpage.

The ship name is generally case-insensitive, but it is not guarenteed to work every time. Ship names with a `-` such as `I-168` are not supported as of now.

Examples:

- `kcw s:Asashio` takes you to https://kancolle.wikia.com/wiki/Asashio
- `kcw s:Asashio -q` takes you to https://kancolle.wikia.com/wiki/Asashio#Quotes
- `kcw s:Asashio -g` takes you to https://kancolle.wikia.com/wiki/Asashio/Gallery