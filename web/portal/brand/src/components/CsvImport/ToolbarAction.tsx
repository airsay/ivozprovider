import { MoreMenuItem } from '@irontec/ivoz-ui/components/List/Content/Shared/MoreChildEntityLinks';
import { StyledTableRowCustomCta } from '@irontec/ivoz-ui/components/List/Content/Table/ContentTable.styles';
import { Tooltip } from '@mui/material';
import { ReactNode } from 'react';

/** The trigger for a list action, as an icon button or a "more" menu item. */
export default function ToolbarAction(props: {
  variant?: 'icon' | 'text';
  label: ReactNode;
  icon: ReactNode;
  onClick: () => void;
}): JSX.Element {
  const { variant = 'icon', label, icon, onClick } = props;

  return (
    <a onClick={onClick}>
      {variant === 'text' && <MoreMenuItem>{label}</MoreMenuItem>}
      {variant === 'icon' && (
        <Tooltip title={label} placement='bottom-start' enterTouchDelay={0}>
          <StyledTableRowCustomCta>{icon}</StyledTableRowCustomCta>
        </Tooltip>
      )}
    </a>
  );
}
