export const serverPort = process.env.PORT as string;
export const mongoDbconnString = process.env.MONGODB_CONNECTION_STRING as string;
export const databaseName = process.env.DATABASE_NAME as string;
export const jwtSecret = process.env.JWT_SECRET as string;
export const jwtAudience = process.env.JWT_AUDIENCE as string;
export const jwtIssuer = process.env.JWT_ISSUER as string;