/**
 *
 * @info
 * Copied react-countdown-to-future-date package and rewritten faster
 */
import React from 'react';
const App = React.createClass({displayName: "App",

  getInitialState: function(){
    return {time: new Date(this.props.givenDate)/1000}
  },

  update: function(){
    var newTime = this.state.time - 1; // minus one sec from initial time
    this.setState({time:newTime});
    if (this.state.time === 0) {
      clearInterval(this.decr);
      this.props.afterTimeout();
    }
  },

  render: function() {
    let countdown;
    if (this.props.givenDate) {
      let formattedGivenDate = new Date(this.props.givenDate);
      let today = new Date();
      let msDiff =formattedGivenDate - today;
      let days = parseInt(msDiff/(24*3600*1000));
      let hours = parseInt(msDiff/(3600*1000)-(days*24));
      let mins = parseInt(msDiff/(60*1000)-(days*24*60)-(hours*60));
      let secs = parseInt(msDiff/(1000)-(mins*60)-(days*24*60*60)-(hours*60*60));
      countdown = <span className="h4">{ days + " days " + hours + " hours " + mins + " mins " +  secs + " secs "}</span>;
    } else {
      countdown = '';
    }

    return (
      <div className="margin-vertical-xs">
        <span>{this.props.message}</span>
        {countdown}
      </div>

    );

  },

  componentDidMount: function() {
    this.decr = setInterval(this.update,1000)
  },

  componentWillUnmount() {
    clearInterval(this.decr);
  }
});

export default App;
