proj2
=====

============================
Separation of Concerns

what concerns you identified, and how you separated them
============================
The concerns are the interface and the model. They are separate in my code; the model
does not depend on the user interface. They are separate files, the model is a class and the interface is a simple HTMl file. They are connected by the game widget. The model can be tested independently. Everything related to the actions of the Game of Life occur in the model, the interface is just a visualization of that. There is a GameWidget_install method that installs the game widget in the appropriate existing DOM. The game widget acts as a controller, calling the model and reacting to actions from the user interface appropriately, updating the user interface as necessary.



============================
Modules and Dependencies

what the program modules are, what their dependences are on one another, and whether there are any dependences that should ideally be eliminated
============================
I have four program modules. They are game.js, gamemain.js, gamewidget.js, and tests.js.
tests.js depends on game.js, which is the model. gamemain.js depends on game.js and gradewidget.js, which is the view controller. Finally, gradewidget.js depends on game.js. The model is completely independent of the other modules, which is ideal. I believe
that all my dependencies are ones that are strictly required by the nature of this web
application and that none of them should be eliminated. 




============================
Functionals

how you exploited functionals in your code
============================
I used the foreach functional where it made sense and was cleaner. This was most apparent in the the method where I iteraete through a cell's neighbors. In addition, I felt that the fill functional was very useful for initializing my 2D arrays. I was able to minimize the usage of for loops, though there were certain places where they worked better due to the nature of what was being looped through.




============================
Design Ideas

any interesting design ideas you had or tradeoffs that you made
============================
I found it difficult to decide where the methods to generate preset patterns should go.
I think that I ended making the correct decision, though I don't think either option
was the ideal - I was going to put it in either the model or the controller, and I ended
up putting it in the model. I think that makes more sense because it is something that is
inherent to the Game of Life. 