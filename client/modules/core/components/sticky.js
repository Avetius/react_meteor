import React from 'react';

export default class Sticky extends React.Component {

  scrollHandler () {
    if (!this.stickyElem) {
      return;
    }

    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const deltaY = this.props.deltaY || 0;


    let stickyClasses;
    if (this.props.stickyClasses) {
      stickyClasses = this.props.stickyClasses;
    } else {
      stickyClasses = ['sticked'];
    }

    if (scrollTop >= this.stickyElemTopPos + deltaY) {
      stickyClasses.forEach(className => {
        this.stickyElem.classList.add(className);
      });

    } else if (scrollTop < this.stickyElemTopPos + deltaY) {
      stickyClasses.forEach(className => {
        this.stickyElem.classList.remove(className);
      });
    }
  }

  componentDidMount () {
    this.stickyElemTopPos = this.stickyElem.getBoundingClientRect().top;
    document.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler.bind(this));
  }

  render () {
    // see http://stackoverflow.com/questions/32875046
    const stickyContentStyle = { transform: 'translateZ(0)' };

    const stickyContent =
      <div style={stickyContentStyle} ref={domElem => this.stickyElem = domElem}>
        { this.props.children }
      </div>;

    if (this.props.placeHolderHeight) {
      return <div style={{minHeight: this.props.placeHolderHeight}}>
        {stickyContent}
      </div>;
    } else {
      return {stickyContent};
    }
  }
}
