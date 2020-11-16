import { PromiseProvider } from 'mongoose';
import mysql from 'mysql';
require('dotenv/config')

export class DBConnection{

    constructor() {
        this.connection = mysql.createConnection({
          host     : process.env.RDS_HOSTNAME,
          user     : process.env.RDS_USERNAME,
          password : process.env.RDS_PASSWORD,
          port     : process.env.RDS_PORT,
          database : process.env.RDS_DATABASE
        });
    }

    openConnection(){
        this.connection.connect(function(err) {
            if (err) {
               console.error('Database connection failed: ' + err.stack);
               return;
            }
         
            console.log('Connected to database.');
        });
    }

    closeConnection(){
        this.connection.end();
    }

    async execute(query){

        return new Promise((resolve, reject) =>{
            this.connection.query(query, function(err, result, fields){
                if (!err) resolve(JSON.parse(JSON.stringify(result))); // Hacky solution
                else reject(err);
            });
        })
    } 
}
