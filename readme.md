yarn typeorm migration:create -n CreateTaskManager

create extension if not exists "uuid-ossp";

yarn typeorm migration:run

yarn jest --init

set NODE_ENV=production&&npm start