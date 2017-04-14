import React from 'react';

const Link = (props) => {
  const linkProps = props.linkProps || {};
  linkProps.rel = linkProps.rel || 'noopener noreferrer';

  return <a onClick={props.onClick} href={props.linkHref} className={props.className} {...linkProps}>
      {props.children}
    </a>;
};

export default Link;
