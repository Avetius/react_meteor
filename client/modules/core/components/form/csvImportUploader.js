import React from 'react';
// to enable this: meteor npm install --save papaparse
// import Papa from 'papaparse';

class csvImportUploader extends React.Component {

  /* handleChange (event) {
    console.log(event.target.files[0]);

    const removeCurrencySign = (strField) => {
      return strField.replace('$', '').replace('ETH', '').replace('BTC', '').trim();
    };

    const customParseFloat = (strField) => {
      // remove currency signs and all commas, the parseFloat
      return parseFloat(removeCurrencySign(strField).replace(/,/g , ''));
    };

    Papa.parse( event.target.files[0], {
      header: true,
      //dynamicTyping: true,
      skipEmptyLines: true,
      //preview: 2,
      complete( results, file ) {
        results.errors[0]? console.log('errors :', results.errors) : void(0);
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

          // remove currency signs, whitespaces, commas and parseToFloat
          obj.bitcoinInvestments = obj.bitcoinInvestments ? customParseFloat(obj.bitcoinInvestments) : null;
          obj.ethInvestments = obj.ethInvestments ? customParseFloat(obj.ethInvestments) : null;
          obj.usdTotalInvestment = obj.usdTotalInvestment ? customParseFloat(obj.usdTotalInvestment) : null;
          obj.icoMinimumThreshold = obj.icoMinimumThreshold ? customParseFloat(obj.icoMinimumThreshold) : null;
          obj.icoMaximumThreshold = obj.icoMaximumThreshold ? customParseFloat(obj.icoMaximumThreshold) : null;
          obj.participantsInIco = obj.participantsInIco ? customParseFloat(obj.participantsInIco) : null;

          return obj;
        });

        console.log('finalDb:', finalDb);

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
  */
}

export default csvImportUploader;



