Conway's Game of Life
====

Background
---

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

* Any live cell with fewer than two live neighbours dies, as if caused by under-population.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overcrowding.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed-births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

[Wikipedia](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)

- - -

Instructions
---

Adjust the game of life by specifying parameters via the query string.

i.e. http://labs.danielna.com/life?param1=foo&param2=bar

* rows: Number of rows in the grid. (default 75)
* cols: Number of columns in the grid. (default 75)
* seed: A percentage, between 0.0 - 1.0, that represents the percentage of cells to be set live in the first generation of cells. (default 0.4)

Example for a 30x30, 50% seeded grid: [http://labs.danielna.com/life?rows=30&cols=30&seed=0.5](http://labs.danielna.com/life?rows=30&cols=30&seed=0.5)

