import { InjectionKey } from "vue";
import { IToggleContext } from "./ToggleProvider.types";

export const toggleContext = Symbol() as InjectionKey<IToggleContext>;
