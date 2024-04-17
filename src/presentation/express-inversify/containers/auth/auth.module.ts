import { ContainerModule } from "inversify";
import { 
    IAuthService, ISessionRepository, 
    ISessionService, ITokenService } from "../../../../app";
import { AuthController, SessionController } from "../../controllers/auth";
import { 
    AuthInjectableService, SessionInjectableService, 
    TokenInjectableService } from "../../../extensions/services";
import { SessionInjectableRepository } from "../../../extensions/repositories";




export const AuthModule = new ContainerModule((bind)=>{
    bind<ISessionRepository>("ISessionRepository").to(SessionInjectableRepository);

    bind<ISessionService>("ISessionService").to(SessionInjectableService);
    bind<ITokenService>("ITokenService").to(TokenInjectableService);
    bind<IAuthService>("IAuthService").to(AuthInjectableService);
 
    bind<AuthController>(AuthController).toSelf();
    bind<SessionController>(SessionController).toSelf();
});