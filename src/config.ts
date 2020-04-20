export default {
    mongo: {
        host: process.env.MONGO_HOST || "localhost",
        port: process.env.MONGO_PORT as any || 27017,
        database: process.env.MONGO_DATABASE || "ValorantStats"
    },
    server: {
        port: 4000,
        jwt: process.env.JWT_TOKEN
    }
}