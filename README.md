# DistributedSystems
Project work for Distributed Systems course.

Distributed System project with 3 individual nodes This repo consists the application files for 3 individual nodes, which are supposed to be executed in 2 different virtual machines.
Dependencies:
Nodejs modules Download nodejs: https://nodejs.org/en/download/ Basic web browser. The project game only includes very simple html and css processing. VirtualBox with Ubuntu 64-bit OS or something similar.
How to operate: 0. Install all dependencies, mainly nodejs and VMs
1.	Launch 2 different virtual machine nodes. This application was tested using VirtualBox with Ubuntu (64-bit) Mint.
2.	Move opponent.js to a virtual machine #1
3.	Move player.js to a virtual machine #2
4.	Keep rest of the files in your host computer.
5.	In virtual machine #2, execute the player.js with command: >node player
6.	In virtual machine #1, execute the opponent.js with command: >node opponent
7.	In host machine, execute the game_master.js with command: >node game_master
Now by observing all the terminals, all server statuses can be seen in the console prints. If one machine is closed. game_master will inform other nodes about this status change.
To play the game:
8.	In virtual machine #2, open the index.html. Insert you answer to the box and press the button. The message can be seen traveling through the nodes from the terminals.
More describtion can be found from the report.pdf file.


