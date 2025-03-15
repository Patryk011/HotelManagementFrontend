export type TIconTypes = "Users" | "RightArrows" | "Logout";

export interface IIconProps {
  hoverColor?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  iconType: TIconTypes;
}
