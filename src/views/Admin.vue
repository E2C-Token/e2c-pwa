<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        @click="closeMenu"
        class="btn btn-sm btn-dark"
        href="#"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#"> <img src="" width="42px" /> E2C</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="/img/user.png"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
              <span class="user-name">{{ myInfo.name }}</span>
              <MyBalance />
            </div>
          </div>

          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li>
                <router-link to="/admin/overview">
                  <i class="fas fa-bullhorn"></i>
                  <span>Experiências</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/avaiable">
                  <i class="fas fa-share"></i>
                  <span>Disponível</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/transactions">
                  <i class="fas fa-hand-spock"></i>                  
                  <span>Emitir</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/liquidate">
                  <i class="fas fa-check-double"></i>
                  <span>Liquidar</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/wishAccess">
                  <i class="far fa-laugh-beam"></i>
                  <span>Desejos de Acesso</span>
                </router-link>
              </li>

              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Perfil</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Sair</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
// @ is an alias to /src

import { fb } from "../firebase";
import MyBalance from "../components/MyBalance";
export default {
  name: "admin",
  components: { MyBalance },
  data() {
    return {
      name: null,      
    };
  },  
  computed: {    
    myInfo: function() {
      return this.$store.state.userProfile;
    },
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
