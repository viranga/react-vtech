var Config = {
    BASE_URL : process.env.NODE_ENV === 'staging' ? 'https://api.staging.autorepairapp.io/v1/' : process.env.NODE_ENV === 'production' ? 'https://api.autorepairapp.io/v1/' : 'https://api.dev.autorepairapp.io/v1/',
    API_KEY: "2BAAFD2BE944AAA5B21BCBDF99F6E",
    API_SECRET: "CA41A12EA2828DBC49CDBDA88D521",
 }
 
 module.exports = Config;
 