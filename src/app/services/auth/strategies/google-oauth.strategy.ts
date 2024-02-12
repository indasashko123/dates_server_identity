import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { mainConfig } from "../../../../config";


/*
passport.use(new GoogleStrategy({
    clientID : mainConfig.authStrategy.google.clientId,
    clientSecret : mainConfig.authStrategy.google.secret,
    callbackURL : mainConfig.authStrategy.google.callback
}, async(accessToke,refreshToken,profile,done) => {
   // 
}
))
*/