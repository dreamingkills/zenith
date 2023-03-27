cd ~ # Basically this tell powershell to change directory to home
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
scoop install nodejs-lts aria2 git
npm i -g corepack # assumeing that nodejs-lts is before 16.10 if it's 16.10 then you might have to change to "corepack enable"
aria2c https://github.com/l3lackShark/gosumemory/releases/download/1.3.6/gosumemory_windows_amd64.zip
Expand-Archive -Path ~\gosumemory_windows_amd64.zip -DestinationPath gosumemory
git clone https://github.com/dreamingkills/zenith.git
cd zenith
