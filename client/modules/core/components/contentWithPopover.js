// Rubix theme
import { OverlayTrigger, Popover } from '@sketchpixy/rubix';

const ContentWithPopover = (props) => {
  return (
    <OverlayTrigger trigger={['hover', 'click']} placement="left"
                    overlay={
                            <Popover id='popover-left-0' title="Details">
                              <strong>{props.fieldLabel}</strong>
                              <span className="padding-horizontal-sm">
                                {props.helpText}
                              </span>
                            </Popover>
                          }>
      {props.children}
    </OverlayTrigger>
  );
};

export default ContentWithPopover;
