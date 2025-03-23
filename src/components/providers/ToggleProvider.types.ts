import { Ref } from "vue";

export interface IToggleContext {
  isExpanded: Ref<boolean> | false;
  toggleExpansion: () => void;
}
