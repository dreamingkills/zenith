# zenith

enhanced osu! rich presence for discord!

:one: **Running Pre-install script**

It will download everything for you including clone this repo.

:two: **adding your osu! client info**

go to https://osu.ppy.sh/home/account/edit and scroll down until you see "OAuth".

under "own clients", click **New OAuth Application**. name it whatever you want and leave the _Application Callback URL_ blank.

open `.env.example` in your favorite text editor and add your Client ID and Client Secret to the file after the equals signs. then, close your editor and rename `.env.example` to `.env`.

:three: **compiling**

Run Compile script and **make sure you have already add your client info**.

:four: **Running start script**

run a start script Both gosumemory and zenith will run both for you.

# This script will download 3 piece of software as a requirement

- gosumemory https://github.com/l3lackShark/gosumemory
- nodejs (ideally v14.17.6) https://nodejs.org/en/download/
- yarn https://yarnpkg.com/getting-started/install
