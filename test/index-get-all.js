'use strict';

var qdb = require('../lib/qiao.indexeddb.js');

var test = async function(){
	var databaseName 	= 'db_test';
	var tableName		= 't_test1';
	var indexName		= 'name'
	var version 		= 2;

	try{
		var db 	= await qdb.openDB(databaseName, version);
		var s 	= await qdb.igetAll(db, tableName, indexName);
		console.log(s);
	}catch(e){
		console.log(e);
	}
};

test();