mkdir build\
cd build
mkdir electron
cd electron
mkdir resources
cd resources
mkdir app
cd ../../..
copy package.json build\electron\resources\app\package.json
copy package-lock.json build\electron\resources\app\package-lock.json
copy main.js build\electron\resources\app\main.js
xcopy .\Modules build\electron\resources\app\Modules /O /X /E /H /K /y /s
xcopy .\Assets build\electron\resources\app\Assets /O /X /E /H /K /y /s
xcopy .\build\electronbinaries build\electron /e /v
cd build\electron\resources\app
npm i
npm run rebuild
cd ..
asar pack app app.asar
rmdir app /s
cd ../../../..

