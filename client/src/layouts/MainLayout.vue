<template>
  <q-layout view="lHh Lpr lFf">
    <q-footer>
      <div class="bg-grey-1 shadow-2 full-width row justify-around q-py-md" >
          <q-btn icon="home" color="primary" flat round size="md" :to="rol === 2 ? '/inicio_cliente' : rol === 3 ? '/inicio_proveedor' : rol === 1 ? '/inicio_administrador' : ''" />
          <q-btn :icon="rol === 3 ? 'card_giftcard' : 'view_list'" color="primary" flat round size="md" :to="rol === 2 ? '/solicitudes' : rol === 3 ? '/productos' : rol === 1 ? '/reportes_usuarios' : ''"/>
          <q-btn v-if="rol != 1 && comprobar" icon="add" outline color="secondary" class="q-mb-sm" round size="lg" :to="rol === 2 ? '/registronecesidades' : rol === 3 ? '/registroproductos' : ''"/>
          <q-btn :icon="rol === 1 ? 'lock_clock' : 'fact_check'" color="primary" flat round size="md" :to="rol === 1 ? '/proveedores_pendientes' : '/mis_cotizaciones'" />
          <q-btn v-if="rol != 1" color="primary" icon="grading" flat round size="md" to="/reportes" />
          <q-btn v-if="rol != null" color="primary" icon="logout" flat round size="md" @click="cerrarsesion()" />
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
      <q-btn v-if="rol != 1 && mostrarBoton" class="float" fab icon="forum" color="primary" to="/mis_chats" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      rol: null,
      categoria: []
    }
  },
  computed: {
    mostrarBoton () {
      return this.$route.meta.botonchat
    },
    comprobar () {
      if (this.rol === 3) {
        const buscar = this.categoria.findIndex(v => v === 2)
        if (buscar >= 0) { return true } else { return false }
      } else {
        return true
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.categoria = res.categorias
          this.rol = res.roles[0]
        }
      })
    },
    cerrarsesion () {
      localStorage.removeItem('TRI_SESSION_INFO')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
.float{
position:fixed;
width:55px;
height:55px;
bottom:80px;
right:10px;
background-color:#0C9;
color:#FFF;
border-radius:50px;
text-align:center;
}
</style>
