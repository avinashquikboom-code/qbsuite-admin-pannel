import { RiQuestionLine } from '@remixicon/react';
/** Pass any named @remixicon/react export through the icon prop. */
export function RemixIcon({ icon: Icon = RiQuestionLine, size = 20, label, ...props }) {
 return <Icon size={size} aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} {...props} />;
}
