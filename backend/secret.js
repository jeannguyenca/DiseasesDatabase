const secrets = {
  dbUri: "mongodb://jeannguyen:Iupepi!252326@ds125578.mlab.com:25578/who_database"
};
export const getSecret = key => secrets[key];