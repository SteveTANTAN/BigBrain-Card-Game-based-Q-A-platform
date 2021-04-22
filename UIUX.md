In this document, I’m going to use teach as the admin Quiz management and student as the player.


Quiz management part:
1.	The first component for this website is the “path ‘/’”, which is used for distinguish 
the two different people group using this APP (the teach group and the student group).
The student group can joinin the session without link or account if they got session ID.

2.	If we click the login link, then we can see the login part. Input the email and password, then you can log in. if one of both is incorrect,
 one error window will pop, it will show you the error reason, and this window will always showing on the first top div. click ‘X’ the window will closed.
3.	If you donnot have a account click ‘No Account? Regist one’ link, then move one the register part, similarly enter the detail needed, 
and the error window will show as well if you make some errors(for example, the email used),



After first login or the register, the page will move on the dashboard page, and the token will saved in cookie and localstorage, 
that means you donnot need to login when you refresh the page if you did not logout.


Then in the dashboard page:
1.	Logout button will always showing on the top.
2.	You can post your new game one the top by typing question and click post button.
3.	Then the each card means one game, and it will showing some changes when your mouse hover it to help you distinguish the game, as well as the button.


In each game card:
1.	Delete button: deleting the game here.
2.	Edit button: after clicking it, tranasfer to a new page ’path=gameEdit’ for showing the whole details for this game;
3.	Game start or game closed button it will transfer automatically;

After click the GAME Edit button:
1.	You can check out the whole info for the game including the game name and game Photo, and all the questions details for each question 
        (question choices, title, photo, time and marks)
2.	In this page you can update the game photo and game name by clicking ‘Edit game name’ button and ‘EDIT PHOTO’ button, 
        after you click it a new button will pop put for submit the changes
3.	 ‘ ADD a new question’ option: after click it it will transfer a new page to edit new question;
4.	  Then, in each question page card, you can Click EDIT button to edit the question or delete the question

After click question EDIT button:
1.	‘DELETE THIS QUESTION’ button Here you can able to delete this question
2.	Select time, points, question and correct answer by selector
3.	‘add choice’ button here you are able to add new choice , if the choice number is more than 6, this add choice button will disappear,
Similarly, one the right of choice the ‘error’ button used for deleting the choice, 
if the choice number is more than 6, this delete choice button will disappear.
4.	Then the select image file is able used for update image.
5.	After editing click submit and save it.

The return BACK and Logout button is always showing on the top!


If you click the Game start button on dashboard.
	A noti window will pop with session id and session join link.
	Click the button the link will be copied
The click 
SHOWING GAME DETAILS  button, to check out game playing board,
The copy link button is still one the top.
For moving to next question, by click START OR MOVE TO NEXT QUESTION  button.
Then it will showing the question detail for the question you doing rightnow.
By click next question, it will showing the next one.

(when the file submitted the timer automatically have not done, so for the question transfer need click manually, 
but the student part will update automatically (expect result part)).
So after move on the last one it will showing the game finished.


In the student part:
1.	After join in (Link without session id input but joinin one needed),
You will in the waiting room page, after the teacher part start the student part will update auto.
2.	For the different question, it will update auto as well.
3.	After game finished it will transfer to new page showing result info (not finished yet.)
