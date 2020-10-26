'use strict';

/**
 * create table
 * 	db
 * 	tables
 * 		key
 * 		index
 * 			name
 * 			index
 * 			unique
 */
exports.createTable = function(db, tables){
	if(!db || !tables || !tables.length) return null;

	var res = [];
	for(var i=0; i<tables.length; i++){
		var table = tables[i];
        if(db.objectStoreNames.contains(table.name)) continue;
        
        // create table
        var objectStore = createTable(db, table);

        // push
        res.push(objectStore);
	}

	return res;
};

// create table
function createTable(db, table){
    if(!db || !table) return;

    // key
    var key = {};
    if(table.key == 'auto'){
        key.autoIncrement = true;
    }else{
        key.keyPath = table.key;
    }

    // create
    var objectStore = db.createObjectStore(table.name, key);

    // index
    createIndex(objectStore, table);

    // return
    return objectStore;
}

// create index
function createIndex(os, table){
    if(!os || !table || !table.index.length) return;

    for(var j=0; j<table.index.length; j++){
        var item 	= table.index[j];
        var name 	= item.name;
        var index	= item.index;
        var unique	= item.unique;
        os.createIndex(name, index, { unique: unique });
    }
}

/**
 * del table
 * 	db
 * 	tableName
 */
exports.delTable = function(db, tableName){
    if(!db || !tableName) return;
    
	db.deleteObjectStore(tableName);
};