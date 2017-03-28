import React from 'react';

const Icon = (props) => {
  let iconProps = props.iconProps || {};
  iconProps = {
    'aria-hidden': iconProps.ariaHidden || true,
    ... iconProps
  };

  const beforeElem = props.childrenPosition === 'beforeIcon' ? props.children : '';
  const afterElem = props.childrenPosition === 'afterIcon' ? props.children : '';

  return <span className={props.parentClasses}>
      { beforeElem }
    <i className={props.iconClasses} {...iconProps} />
      { afterElem }
    </span>;
};

export default Icon;
