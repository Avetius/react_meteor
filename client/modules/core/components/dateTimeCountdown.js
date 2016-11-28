/**
 *
 * @info
 * Copied react-countdown-to-future-date package and rewritten faster
 */
import React from 'react';
import ContentWithPopover from './contentWithPopover';

const App = React.createClass({displayName: "App",

  getInitialState: function(){
    return {time: new Date(this.props.givenDate)/1000}
  },

  update: function(){
    var newTime = this.state.time - 60; // minus one min (in seconds) from initial time
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
      // seconds variant:
      //let secs = parseInt(msDiff/(1000)-(mins*60)-(days*24*60*60)-(hours*60*60));
      //countdown = <span className="h4">{ days + " days " + hours + " hours " + mins + " mins " +  secs + " secs "}</span>;
      countdown = <span className="h4">{ days + " days " + hours + " hours " + mins + " mins "}</span>;
    } else {
      countdown = '';
    }

    let message;
    if (this.props.help.enable) {
      message =
        <ContentWithPopover fieldLabel={this.props.help.field}
                            helpText={this.props.help.text}
        >
          <span className="text-help margin-right-xs">{this.props.message}</span>
        </ContentWithPopover>

    } else {
      message = <span>{this.props.message}</span>;
    }

    return (
      <div className="margin-vertical-xs">
        {message}
        {countdown}
      </div>
    );

  },

  componentDidMount: function() {
    this.decr = setInterval(this.update,60000)
  },

  componentWillUnmount() {
    clearInterval(this.decr);
  }
});

export default App;
