import { Container } from 'inversify';
import { AccountModule } from './account';
import { AuthModule } from './auth';



export const container = new Container();
container.load(
    AccountModule,
    AuthModule,
);