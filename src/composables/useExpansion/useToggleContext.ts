import { inject } from "vue";
import { toggleContext } from "../../components/providers/ToggleProvider.keys";

export const useToggleContext = () =>
  inject(toggleContext, {
    isExpanded: false,
    toggleExpansion: () => {},
  });
