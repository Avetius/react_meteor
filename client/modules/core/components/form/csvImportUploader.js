import React from 'react';
import Papa from 'papaparse';
// dynamicTyping: true, // (for number and boolean autoconverting)
// preview: 1, // for 1row preview

class csvImportUploader extends React.Component {

  handleChange (event) {
    console.log(event.target.files[0]);
    Papa.parse( event.target.files[0], {
      header: true,
      dynamicTyping: true,
      //preview: 2,
      complete( results, file ) {
        results.errors[0]? console.log('errors :', results.errors[0]) : void(0);
        console.log(results.data);

        let db = results.data;
        const finalDb = db.map((obj) => {
          // pre-processing db object so that we can save it to DB
          if (obj.icoEndDatetime) {
            obj.icoEndDatetime = new Date(obj.icoEndDatetime);
          }
          if (obj.icoStartDatetime) {
            obj.icoStartDatetime = new Date(obj.icoStartDatetime);
          }
          return obj;
        });

        Meteor.call('ico.importConcepts', finalDb, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      },
      error: function(err, file, inputElem, reason) {
        if (err) {
          console.warn(err);
        }

        // executed if an error occurs while loading the file,
        // or if before callback aborted for some reason
      }
    });
  }

  render () {
    return (
      <input type="file" name="uploadCSV" onChange={this.handleChange.bind(this)} />
    );
  }

}

export default csvImportUploader;



