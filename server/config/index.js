module.exports = {
    port: parseInt(process.env.PORT, 10) || 5000,

    host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
    
    mongo: {
        mongodb_uri: process.env.NODE_ENV === "production" ? process.env.MONGO_DB_REMOTE_URL: process.env.MONGO_DB_LOCAL_URL
    },

    mailConfig:{
        port: process.env.NODE_ENV === "production" ? parseInt(process.env.MAIL_PORT,10): 587,
        host: process.env.MAIL_HOST,
        account: {
            user: process.env.MAIL_ACCOUNT_USER,
            pass: process.env.MAIL_ACCOUNT_PWD,
        }
    },
    
    allowedDomains:  (process.env.NODE_ENV === "production" ?
        [process.env.REMOTE_APP_URL]
        : [process.env.LOCAL_APP_URL]) 
}