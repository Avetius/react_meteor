import React from 'react';

export default class Sticky extends React.Component {

  scrollHandler () {
    // todo: deferredComputeTopPos feature not needed now
    if (!this.stickyElem || (this.props.deferredComputeTopPos && !this.props.deferredComputeTopPos.now)) {
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

    if (this.props.name === 'nav-bar') {
      console.log(scrollTop, this.stickyElemTopPos + deltaY);
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

  // todo: deferredComputeTopPos feature not needed now
  componentDidUpdate(prevProps) {
    if (this.props.name === 'nav-bar') {
      console.log('received props', ' stickyElemTopPos? ', this.stickyElemTopPos);
      console.log('this.props..deferredComputeTopPos: ', this.props.deferredComputeTopPos);
    }

    if ( !this.stickyElemTopPos && this.stickyElemTopPos !== 0 &&
      this.props.deferredComputeTopPos && this.props.deferredComputeTopPos.now) {

      this.stickyElemTopPos = this.stickyElem.getBoundingClientRect().top;
      console.log('componentDidUpdate - stickyElemTopPos set to: ', this.stickyElemTopPos);
    }
  }

  componentDidMount () {
    // todo: deferredComputeTopPos feature not needed now
    if (!this.props.deferredComputeTopPos) {
      this.stickyElemTopPos = this.stickyElem.getBoundingClientRect().top;
      if (this.props.name === 'nav-bar') {
        console.log('did mount and stickyElemTopPos set: ', this.stickyElem.getBoundingClientRect().top);
      }

    }
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
