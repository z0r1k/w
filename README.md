# [Welcome to the Wonder Challenge](https://www.notion.so/Welcome-to-the-Wonder-Challenge-dbd8a748723f4f0088aaf046124090e8)

I didn't manage to do the task completely and to show how would I usually do the project from scratch. I am sorry about it.

Here you can find some basic folder setup and config file which is useless atm because it has only one configuration option.

I wanted to do this task as sort of CLI application and config would have default values while they could be overwritten by 
CLI's arguments passed to the script via flags.
Had no time to deal with `process.argv` or using any library for it.

Also there is no logger so you wouldn't find `pino` or `winston` here. 
No `nvm` or `engines` configuration, no `eslint` and `prettier`.

TypeScript could be handy here to define types and function interfaces, but it is also not there. 

Also you won't see much in term of `git log` because i created the repo last minute and pushed everything under "initial commit", 
so no PR branch history, squashing and other things.

And btw there are no tests as well. I actually wanted to do `jest` and use it entrypoint, 
but again I got a bit stuck with second part of the task and lost a lot of time. 
 
So basically you won't much here *sigh*. Sorry.

Ah, yes, there is `uuid/v4` package! Yay! (Actually not yay at all 😞)

If you still wanna run this ... (you name it), just do `npm start` 
and it will run on fixed values which could be changed in `./src/main.js`.

OK, nuff said. 

Have a lovely day. I hope it is better than mine.

Cheers.
