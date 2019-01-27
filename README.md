# KancolleWikiViewer

This is a chrome extension that allows you to go to different pages of the KanColle Wiki just by typing in short commands in the address bar.

Every command begins with `kcw` followed by a space. `kcw` stands for **K**an**C**olle **W**iki

## Viewing quests

    kcw <quest ID>

Goes to the specified quest on the Quests page. `<quest ID>` is something like `A5` or `B20`, case insensitive

Example: `kcw B20` takes you to https://kancolle.wikia.com/wiki/Quests#B20

## Viewing worlds and maps

    kcw <world number>[-<map number> [-dl|-ep [-<node>]]]

Goes to the specifed world or map, or goes to the enemy patterns page of a map if specified. You can specify the `-ep` option to view enemy patterns. On top of that, you can also specify a node (case-insenstive). Alternatively, specify the `-dl` option to view the drop list.

Event worlds are also supported e.g. E-1. I will try to make it as up to date as possible to show the current or upcoming event.

Note that event worlds are not supported if there currently no event running.

Examples:

- `kcw 1` takes you to https://kancolle.wikia.com/wiki/World_1
- `kcw 1-1` takes you to https://kancolle.wikia.com/wiki/World_1/1-1
- `kcw 1-1 -ep` takes you to https://kancolle.wikia.com/wiki/World_1/1-1/Enemy_patterns
- `kcw 1-1 -ep -a` takes you to https://kancolle.wikia.com/wiki/World_1/1-1/Enemy_patterns#1-1_A
- `kcw 1-1 -dl` takes you to https://kancolle.wikia.com/wiki/World_1/1-1/Drop_list

## Viewing ships

    kcw s:<ship name> [-q|-g]

Goes to the wiki page for the specified ship. The `-q` option can be specified to jump to the quotes section of the page. The `-g` option can be used to go the `/Gallery` subpage.

The ship name is generally case-insensitive, but it is not guarenteed to work every time.

After typing `s:`, autocomplete suggestions will pop up, so you don't have to type the full name.

Examples:

- `kcw s:Asashio` takes you to https://kancolle.wikia.com/wiki/Asashio
- `kcw s:Asashio -q` takes you to https://kancolle.wikia.com/wiki/Asashio#Quotes
- `kcw s:Asashio -g` takes you to https://kancolle.wikia.com/wiki/Asashio/Gallery

## Viewing equipments

    kcw e:<equipment name>

Goes to the wiki page for the specified equipment.

The equipment name is generally case-insensitive, but it is not guarenteed to work every time.

After typing `e:`, autocomplete suggestions will pop up, so you don't have to type the full name.

Examples:

- `kcw e:Searchlight` takes you to https://kancolle.wikia.com/wiki/Searchlight
- `kcw e:12.7cm Twin Gun Mount Model A` takes you to http://kancolle.wikia.com/wiki/12.7cm_Twin_Gun_Mount_Model_A

### Limitations

When linking to equipment pages, I used duckduckgo.com's "I'm feeling lucky" feature to do a fuzzy search for the equipment names, since different wikis use slightly different equipment names. Therefore, I cannot guarentee that you will always be taken to the correct page. However, through my everyday usage, I have never been sent to the wrong page.

## Viewing ship lists

    kcw list <ship type>

Goes the "list of &lt;ship type&gt; by upgraded maximum stats" page. Ship type is case insensitive.

The following ship types are supported:

> DD, DE, CL, CLT, CA, BB, CV, CVL, SS, AV

CAV and BBV are not supported as their info can be found on the CA and BB pages respectively.

Examples:

- `kcw list dd` takes you to http://kancolle.wikia.com/wiki/List_of_destroyers_by_upgraded_maximum_stats
- `kcw list cl` takes you to http://kancolle.wikia.com/wiki/List_of_light_cruisers_by_upgraded_maximum_stats

## Linking to different wikis (WIP)

If you prefer the EN kancollewiki to the Wikia, you can change which wiki to link to in the options, which you can open by clicking on the extension's icon, then click "options"

### Limitations

Because different wikis are different, some features might not work on all wikis.

- Specifying a specific node when viewing enemy patterns is not available on EN Wiki