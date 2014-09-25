poller
======

Poller is a simple asp.net web application that can be used to create a simple straw poll.  You may ask a question that may have up to four possible answers.  After the poll has been created you will be presented with a poll id number that may be given to those taking the poll.  They will enter that number on the default page and be allowed to take the poll.

application structure
=====================

The poll questions, answers, and results are all stored in ASP application state variables.  These polls are meant to be temporary polls that are used once and then throne away.  Thus the number of polls to be stored in the application state is limited.  That value may be changed in order to fit the needs of the user.  On some server configuration the Application state may also be automatically recycled and reloaded after a set amount of time.

Two primary pages exist, default.aspx and admin.aspx.  admin.aspx is the interface used to create/edit/view poll results.  Default.aspx is the page used by those taking the poll to answer questions.  Interaction between the client and server side code is done with AJAX calls to webservices located in default.aspx.cs file.  The front end of the page was built using the Bootstrap css framework.  Global.asax contains our application state variable definitions.
