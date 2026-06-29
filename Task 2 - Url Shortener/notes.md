Phase 1 (Auth): Har koi link chhota na kar sake. Pehle user account banaye (Register/Login) aur JWT token le. Sirf logged-in user hi link short kar sake.

Phase 2 (URL Core & 301 Redirect): User jab long URL de, toh database mein ek unique code (jaise bX9z) save ho jaye. Aur jab koi localhost:5000/api/auth/bX9z par aaye, toh use HTTP 301 status ke sath original website par redirect kar diya jaye. Agar user chahe toh apna naam rakh sake (jaise /my-brand).

Phase 3 (Analytics): Jab bhi koi short link par click kare, toh database mein count barh jaye (clicks: clicks + 1) aur time save ho jaye.

Phase 4 (Rate Limit): Spammers se bachne ke liye rule lagao ke ek IP address se 1 minute mein max 10 links hi short kiye ja sakein.

Phase 5 (Error Refactor): Poore project mein unhandled errors na hon, global error middleware use hoga.


===========================================================

1. Short link par kaun click kar sakta hai?
Jawab: Internet par koi bhi banda (Public User)!

Yahan aapko do cheezon mein farq samajhna hoga:

Link banana (Create/Shorten): Yeh kaam sirf Authenticated User (Logged-in user) hi kar sakta hai. Linktify Inc. chahti hai ke sirf wahi log link chhota karein jinhone account banaya hua hai taake koi spammer robot script chala kar database na bhar de.

Link par click karna (Visit/Redirect): Yeh route bilkul Public hota hai. Ispe click karne ke liye kisi login, token ya account ki zaroorat nahi hoti.

Real-world Example: Agar aapne login karke ek link banaya: linktify.com/my-sale, toh aap is link ko apne Twitter, WhatsApp, ya Instagram par share karenge. Ab aapke followers ya koi bhi anjaan banda jab is link par click karega, toh backend usay bina kisi rukawat ke asal website par redirect kar dega.