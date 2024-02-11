export const oauthStrategyConfig =  {
    google : {
        clientId : process.env.GOOGLE_OAUTH_CLIENTID,
        secret : process.env.GOOGLE_OAUTH_SECRET,
        callback : process.env.GOOGLE_OAUTH_CALLBACK
    },
    vk : {
        clientId : process.env.VK_OAUTH_CLIENTID,
        secret : process.env.VK_OAUTH_SECRET,
        callback : process.env.VK_OAUTH_CALLBACK
    }
}