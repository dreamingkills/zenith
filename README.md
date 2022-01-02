# zenith

enhanced osu! rich presence for discord!

# using

- **requirements**
- gosumemory https://github.com/l3lackShark/gosumemory
- nodejs (ideally v14.17.6) https://nodejs.org/en/download/
- yarn https://yarnpkg.com/getting-started/install

:one: **downloading the code**

download the source code or clone the repository or directory of your choice.

repo: https://github.com/dreamingkills/zenith

:two: **adding your osu! client info**

go to https://osu.ppy.sh/home/account/edit and scroll down until you see "OAuth".

under "own clients", click **New OAuth Application**. name it whatever you want and leave the _Application Callback URL_ blank.

open `.env.example` in your favorite text editor and add your Client ID and Client Secret to the file after the equals signs. then, close your editor and rename `.env.example` to `.env`.

:three: **compiling**

open a command prompt in the zenith folder and run `yarn`. this will install the necessary dependencies from npm.

next, run `yarn tsc`. it should take only a few seconds to compile the code.

:four: **running gosumemory and zenith**

run gosumemory, the directory you run gosumemory from doesn't matter.

then, in your command prompt in the zenith folder simply type `yarn start` and you should be good to go!
