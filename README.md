# virtualKeyboard
A simple virtual keyboard using JS-only. 
The objective was to make it a bookmarklet but with the CSP, it doesn't seem to be worth it.

Based on: 

     https://codepen.io/dcode-software/pen/KYYKxP
     https://www.youtube.com/watch?time_continue=488&v=N3cq0BHDMOY&feature=emb_logo
          
But with my sauce (since i'm learning, i'm trying to do it with what I understand for now) and some improvements (ex: write on cursor instead of the end of the text area etc..).

I also tried to use it as a mozilla addon but it's having problems with a lots of site, not consistent enough.

It is possible to use it on your website, just add the script and call it in the html <script src=""></script>. It should initialize and detect all text areas. The keyboard will appear when a text area is in focus.
