import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        type:'mysql',
        host:configService.get('DB_HOST'),
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        database:configService.get('DB_DATABASE'),
        synchronize:false,
        autoLoadEntities:true
      }),
      inject:[ConfigService]
    
    }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
