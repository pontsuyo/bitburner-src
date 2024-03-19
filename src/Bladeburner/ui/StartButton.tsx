import React from "react";

import { Bladeburner } from "../Bladeburner";
import { ActionIdentifier } from "../Actions/ActionIdentifier";
import { ButtonWithTooltip } from "../../ui/Components/ButtonWithTooltip";

interface StartButtonProps {
  bladeburner: Bladeburner;
  actionId: ActionIdentifier;
  rerender: () => void;
}
export function StartButton({ bladeburner, actionId, rerender }: StartButtonProps): React.ReactElement {
  const action = bladeburner.getActionObject(actionId);
  const availability = action.getAvailability(bladeburner);
  const disabledReason = availability.available ? "" : availability.error;

  function onStart(): void {
    if (disabledReason) return;
    bladeburner.startAction(actionId);
    rerender();
  }

  return (
    <ButtonWithTooltip disabledTooltip={disabledReason} onClick={onStart}>
      Start
    </ButtonWithTooltip>
  );
}
