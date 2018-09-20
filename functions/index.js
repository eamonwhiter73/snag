// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const firebaseHelper = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');
var toPlainObject = require('lodash.toplainobject');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
//const firestore = require('firebase-firestore');

//firebaseHelper.firebase.initializeApp(serviceAccount, 'https://snag-b2b2d.firebaseio.com');

//if (!admin.apps.length) {
admin.initializeApp();
admin.firestore().settings({timestampsInSnapshots: true});
var db = admin.firestore();

function renameObjectKey(oldObj, oldName, newName) {
    const newObj = {};

    console.log("in renameObjectKey");

    Object.keys(oldObj).forEach(key => {
        const value = oldObj[key];

        if (key === oldName) {
            newObj[newName] = value;
        } else {
            newObj[key] = value;
        }
    });

    return newObj;
}

class ParamsObject {
    constructor(value, tempId) {
        this.data = {message: value, tempId: tempId};
    }
}

exports.sendMessageNotification = functions.firestore.document('messages/{messageId}').onWrite((change, context) => {
      
      	// Get an object representing the document
      	// e.g. {'name': 'Marie', 'age': 66}
      	const newValue = change.after.data();

      	// ...or the previous value before this update
      	const previousValue = change.before.data();

      	console.log("newValue:", newValue);

      	console.log("messageIdChange:", context.params.messageId);
      	//console.log("prevValue:", previousValue);

      	// access a particular field as you would any JS property
      	//const name = newValue.name;

		var topic = 'all';

		let params = toPlainObject(new ParamsObject(newValue[context.params.messageId].message, context.params.messageId.toString()));
		//params.data = toPlainObject(new WebObject());

	    /*var payload = {
	      data: {
	        message: newValue.data.message
	      }
	    };*/
	    
	    return admin.messaging().sendToTopic(topic, params).then((response) => {
          	console.log("Successfully sent message:", response);
		  //console.log("Message ID:", response.messageId);

		  	var newObj = renameObjectKey(newValue, context.params.messageId, response.messageId);

		    console.log("newObj:", newObj);

		    return firebaseHelper.firestore
			  .checkDocumentExists(db, 'messages', context.params.messageId)
			  .then(result => {
			  	console.log('result:', result);

			  	console.log("newObj inside:", newObj);
			  	
			    // Boolean value of the result 
			    //return new Promise((resolve, reject) => {
				  if(result.exists) {
			    	console.log( JSON.stringify("result.data:", result.data) ); // return an object of or document
			    	console.log( JSON.stringify("result.data.length:", result.data.length) ); // return an object of or document
			    	// If the document exist, you can get the document content 

					if(Object.keys(result.data)[0] == newObj[Object.keys(newObj)[0]].timestamp) {
			    		firebaseHelper.firestore.createDocumentWithID(db, 'messages', context.params.messageId, newObj);
			    	}
					else {
			    		firebaseHelper.firestore.updateDocument(db, 'messages', context.params.messageId, newObj);
			    	}

			    	return 0;
			      }
			      else {
			    	console.log("NO RESULT");
			    	return 0;
				  }
				/*}).then((resultProm) => {
					console.log('resultProm:', resultProm);
				})
				.catch((error) => {
					console.log('eRROR:', error)
				})*/
			  })
			  .catch((error) => {
		  		console.log("eRrOr:", error);
		  	  })

        }).catch((error) => {
       		console.log("error last:", error);
        })

    return 0;
})
