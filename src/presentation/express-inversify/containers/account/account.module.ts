import { ContainerModule } from "inversify";
import { 
    IAccountRepository, IAccountRoleRepository, 
    IAccountService, IBanRepository, 
    IBanService, IRoleRepository, 
    IRoleService } from "../../../../app";
import { 
    AccountController, BanController, 
    RoleController } from "../../controllers/account";
import { 
    AccountInjectableService, BanInjectableService, 
    RoleInjectableService } from "../../../extensions/services";
import { 
    AccountInjectableRepository, AccountRoleInjectableRepository, 
    BanInjectableRepository, RoleInjectableRepository } from "../../../extensions/repositories";





export const AccountModule = new ContainerModule((bind)=> {
    bind<IAccountRoleRepository>("IAccountRoleRepository").to(AccountRoleInjectableRepository);
    bind<IAccountRepository>("IAccountRepository").to(AccountInjectableRepository); 
    bind<IBanRepository>("IBanRepository").to(BanInjectableRepository);
    bind<IRoleRepository>("IRoleRepository").to(RoleInjectableRepository);
    
    bind<IBanService>("IBanService").to(BanInjectableService);
    bind<IAccountService>("IAccountService").to(AccountInjectableService);
    bind<IRoleService>("IRoleService").to(RoleInjectableService);

    bind<BanController>(BanController).toSelf();
    bind<AccountController>(AccountController).toSelf();
    bind<RoleController>(RoleController).toSelf();
})