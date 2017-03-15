const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var config = {
    user: 'wilbert', //env var: PGUSER
    database: 'musikonek_dev', //env var: PGDATABASE
    password: 'sayawibu', //env var: PGPASSWORD
    host: '172.16.0.42', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// const client = new pg.Client(connectionString);
// client.connect();

var pool = new pg.Pool(config);
// client.connect();
module.exports = {
    'test': function (req, res) {
        res.send("go")
    },
    'list':function (req,res) {

        const results = [];
        pool.connect(function (err, client, done){
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            //

            const query = client.query('SELECT * FROM student ORDER BY student_id ASC;');

            query.on('row', function(row){
                results.push(row);
            });

            query.on('end', function(){
                done();
                return res.json(results);
            });
        })

    }
}