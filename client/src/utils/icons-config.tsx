import type { SvgIconProps } from '@thesvg/react';

export default function IconButton({ icon: Icon, ...props }: { icon: React.ComponentType<SvgIconProps> }) {
  return <Icon width={20} height={20} {...props} />;
}