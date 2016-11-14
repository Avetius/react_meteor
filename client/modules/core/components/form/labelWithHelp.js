// Rubix theme
import { OverlayTrigger, Popover } from '@sketchpixy/rubix';

const LabelWithHelp = (props) => {
  return (
    <OverlayTrigger trigger="click" placement="right"
                    overlay={
                            <Popover id='popover-left-0' title="Details">
                              <strong>{props.fieldLabel}</strong>
                              <span className="padding-horizontal-sm">
                                {props.helpText}
                              </span>
                            </Popover>
                          }>
            <span>
              <b><span className="margin-horizontal-md">{props.fieldLabel}</span></b>
              <i className="fa fa-info-circle fa-lg cursor-pointer" aria-hidden="false" />
            </span>
    </OverlayTrigger>
  );

};

export default LabelWithHelp;
