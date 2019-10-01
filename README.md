# NestJS WorkShop

This project is a workshop code for the next technologies:

NestJS

class-transformer

class-validator

TypeORM


## Requirements

1. `node js v10.x`

2. `npm install -g @nestjs/cli` - install nest js global (after installation create at least one new project - `nest new my-nest-project` - if success then nestJS installed properly)

3. `postgreSQL/mariadb/mysql`

    Alternative run database on docker: 
    `docker run --name nestjs-demo -e POSTGRES_PASSWORD=111 -e POSTGRES_USER=postgres -e POSTGRES_DB=nestjs-demo -p 0.0.0.0:5432:5432/tcp -d postgres`

4. Postman

## Step 0

1. Create new project `nest new my-nest-app`

2. Discover `package.json` (run scripts)

3. `npm run start:dev` - very convenient live reload auto-build server

4. Try localhost:3000 -> 'Hello World!'

5. Play with input params `@Body()` `@Param()` `@Get/@Post/@Delete/...`

## Step 1

1. Add new module `nest generate module todo` === `nest g mo todo`

2. Add todo controller `nest generate controller todo` === `nest g co todo`

3. Add todo service `nest g s todo`

4. Add todo entity - create new file todo/todo.entity.ts

5. Add create-todo.dto.ts

6. Add route `@Post('create')`

7. Create new todo

## Step 2

1. Discuss validation issue

2. Add class-transformer & class-validator `npm install class-transformer class-validator`

3. Add validation to DTO

4. Try with validation

5. Add default values `description = 'no description yet...';`

6. Add class transformation

## Step 3 

1. Add typeORM and all engaged modules `npm install --save @nestjs/typeorm typeorm pg` || `npm install --save @nestjs/typeorm typeorm mysql`

2. Add typeORM connect to app.module
 
    ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { TodoModule } from './todo/todo.module';
    import { TypeOrmModule } from '@nestjs/typeorm';

    @Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '111',
          database: 'nestjs-demo',
          entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
          synchronize: true,
        }),
        TodoModule,
      ],
      controllers: [ AppController ],
      providers: [ AppService ],
    })
    export class AppModule {
    }
    ```

3. Add typeORM to to todo.module 

    ```typescript
    import { Module } from '@nestjs/common';
    import { TodoService } from './todo.service';
    import { TodoController } from './todo.controller';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Todo } from './todo.entity';
    
    @Module({
      imports: [
        TypeOrmModule.forFeature([ Todo ]),
      ],
      controllers: [ TodoController ],
      providers: [ TodoService ],
    })
    export class TodoModule {
    }
    ```

4. Inject todo repository to todo.service

    ```typescript
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}
    ```

5. Use DB

6. Show migrations `synchronize: true,`

    ```typescript
    import { BaseEntity, Column, Entity } from 'typeorm';
    
    @Entity()
    export class Todo extends BaseEntity {
    
      @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
      createDate: string;
    }
    ```

## Step 4 

Questions







