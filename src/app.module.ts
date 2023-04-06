import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersQlModule } from './graphQl/_users/users.ql.module';
import { join } from 'path';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      playground : true,
      include : [UsersQlModule],
      autoSchemaFile : join(process.cwd(), "src/shared/schemas/schema.gql")
    }),
    UsersQlModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule{}
