// Rubix theme
import { OverlayTrigger, Popover } from '@sketchpixy/rubix';

const ContentWithPopover = (props) => {
  return (
    <OverlayTrigger trigger={['hover', 'click']} placement="bottom"
                    overlay={
                            <Popover id='popover-bottom-0' title={<strong>{props.fieldLabel}</strong>}>
                              <span className="">
                                {props.helpText}
                              </span>
                            </Popover>
                          }>
      {props.children}
    </OverlayTrigger>
  );
};

export default ContentWithPopover;
