yarn typeorm migration:create -n CreateTaskManager
yarn typeorm migration:run

yarn jest --init

set NODE_ENV=production&&npm start
