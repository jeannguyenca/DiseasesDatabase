const secrets = {
  dbUri: process.env.DB_URI
};
// "MONGO_URL=mongodb://giangnguyen:who252326@ds125578.mlab.com:25578/who_database"

export const getSecret = key => secrets[key];