<template>
  <aside :class="{ 'is-expanded': isExpanded }">
    <MenuToggle :is-expanded @toggle="toggleExpansion" />
    <nav class="menu">
      <SidebarItem
        to="/admin/reservations/"
        text="Rezerwacje"
        icon="Reservation"
      />
      <SidebarItem to="/admin/users/" text="Goście" icon="Users" />
      <LogoutButton />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import SidebarItem from "./SidebarItem/SidebarItem.vue";
import MenuToggle from "./MenuToggle/MenuToggle.vue";
import { useToggleContext } from "../../../composables/useExpansion/useToggleContext";
import LogoutButton from "./LogoutButton/LogoutButton.vue";

const { isExpanded, toggleExpansion } = useToggleContext();
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  background-color: #2e2e2e;
  width: 60px;
  transition: width 0.3s ease-in-out;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;

  .menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
    margin: 0 -1rem;
  }

  h3 {
    display: none;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 200;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    padding-left: 1.2rem;
    transition: opacity 0.3s ease-in-out;
  }

  &.is-expanded {
    width: 250px;

    h3 {
      display: block;
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    z-index: 99;
    height: 100%;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.is-expanded {
      transform: translateX(0);
    }
  }
}
</style>
