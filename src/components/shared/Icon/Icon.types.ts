export type TIconTypes = "Users" | "RightArrows" | "Logout" | "Reservation";

export interface IIconProps {
  hoverColor?: string;
  color?: string;
  width?: string | number;
  height?: string | number;
  iconType: TIconTypes;
}
