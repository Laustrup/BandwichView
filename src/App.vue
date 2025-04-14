<template>
  <div>
    <BNavbar toggleable="lg" variant="primary">

      <BNavbarBrand href="#">Bandwich</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto">
          <BNavItem to="/login">Log in</BNavItem>
          <span style="padding-top: 6px;">|</span>
          <BNavItem to="/signup">Sign up</BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
    <BNavbar toggleable="lg" variant="primary">
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <BNavItem to="/">Home</BNavItem>
          <BNavItem to="/events">Events</BNavItem>
          <BNavItem to="/bands">Bands</BNavItem>
          <BNavItem to="/venues">Venues</BNavItem>
          <BNavItem to="/about">About</BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
  BDropdownItem,
  BNavForm,
  BFormInput,
  BButton
} from 'bootstrap-vue-next'
</script>
