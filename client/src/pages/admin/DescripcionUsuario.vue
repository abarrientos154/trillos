<template>
  <div>
    <div>
      <q-img :src="baseu + perfile" spinner-color="white" style="height: 250px; width: 100%">
        <div class="row justify-between" style="width: 100%">
          <div class="col-6">
              <div class="text-h6">{{rol === 3 ? data.full_name : data.full_name + ' ' + data.last_name}}</div>
          </div>
          <div class="col-6 row justify-end">
            <q-rating v-model="ratingPerfil" size="2em" color="yellow" readonly/>
          </div>
        </div>
        <q-card v-if="rol === 3" @click="dialogStado = true" class="q-ma-xs bg-grey-4 absolute-bottom" style="width:30%; height: 30px; border-top-left-radius:25px;border-top-right-radius:25px;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
          <div v-if="estado" class="text-positive text-h6 absolute-center">Abierta</div>
          <div v-else class="text-negative text-h6 absolute-center">Cerrada</div>
        </q-card>
      </q-img>

      <q-scroll-area
          v-if="rol === 3"
          horizontal
          style="height: 110px;"
          class="q-ma-sm"
        >
          <div class="row no-wrap" style="width: 100%">
            <q-card @click="verImg(img)" v-for="(img, index) in data.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
              <q-img :src="baseuTienda + img" spinner-color="white" style="height: 100px; width: 100px" />
            </q-card>
          </div>
        </q-scroll-area>

      <q-card class="q-pa-xs q-mt-sm shadow-up-4 bg-secondary" style="border-radius:25px">
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.country + ', ' + data.direccion}}</div>
        </div>
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="email" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.email}}</div>
        </div>
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="phone" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.phone}}</div>
        </div>
        <div class="q-mx-md text-subtitle2">{{data.country === 'Colombia' ? 'DNI: ' : 'RUN: '}}{{data.run_dni}}</div>
      </q-card>

      <q-dialog v-model="dialogStado">
        <q-card class="bg-primary" style="width: 90%">
          <q-card-section class="row justify-between">
            <div class="text-h6">Horario laboral</div>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row justify-around">
            <q-card class="col-5 q-pa-sm shadow-13" style="border-radius:25px">
              <div class="text-center text-subtitle1">Hora inicio</div>
              <div class="text-center text-h6">{{data ? data.hora_inicio : '00:00'}}</div>
            </q-card>
            <q-card class="col-5 q-pa-sm shadow-13" style="border-radius:25px">
              <div class="text-center text-subtitle1">Hora Fin</div>
              <div class="text-center text-h6">{{data ? data.hora_fin : '00:00'}}</div>
            </q-card>
          </q-card-section>
          <q-separator />
          <q-card-section class="row justify-around q-gutter-sm">
            <q-card v-for="(item, index) in data.dias" :key="index" class="col-5 q-pa-sm shadow-13" style="border-radius:25px">
              <div class="col-5 text-center text-subtitle1">{{item == 0 ? 'Domingo' : item == 1 ? 'Lunes' : item == 2 ? 'Martes' :item == 3 ? 'Miércoles' : item == 4 ? 'Jueves' : item == 5 ? 'Viernes' : 'Sábado'}}</div>
            </q-card>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="column items-center justify-center">
        <q-btn class="q-mt-sm" color="primary" text-color="black" label="Editar perfil" @click="$router.push('/editarusuario/' + id)"/>
      </div>
      <q-card v-if="data.roles" class="bordes q-pa-xs q-mt-md shadow-up-4" style="border-radius:25px">
        <div class="q-mx-md text-h6">{{rol === 3 ? 'Mis Productos' : 'Mis Solicitudes'}}</div>
        <listado-de-sugerencia @actualizarData="actualizarData" :data="misDatos" :direccion="false" :soy="data.roles[0] === 3 ? 'proveedor' : 'cliente'" :ruta="data.roles[0] !== 3 ? 'proveedor' : 'cliente'" class="q-mt-xs"/>
      </q-card>
    </div>
  </div>
</template>

<script>
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia2.vue'
import moment from 'moment'
import env from '../../env'
export default {
  components: { ListadoDeSugerencia },
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      perfile: '',
      rol: null,
      today: null,
      now: null,
      data: {},
      misDatos: [],
      img: '',
      estado: false,
      dialogStado: false,
      ratingPerfil: 0
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    actualizarData () {
      if (this.rol === 3) {
        this.getProduct()
      } else {
        this.getSolicituds()
      }
    },
    verImg (img) {
      this.baseu = env.apiUrl + '/tienda_img/'
      this.perfile = img
    },
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        this.rol = v.roles[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + '/perfil_img/perfil'
        this.baseuTienda = env.apiUrl + '/tienda_img/'
        this.calificacion()
        if (this.rol === 3) {
          this.getProduct()
        } else {
          this.getSolicituds()
        }
        this.today = moment().day()
        this.now = moment().format('HH:mm')
        if (this.rol === 3 && this.data.dias.find(v => v === this.today)) {
          if (this.now < this.data.hora_fin && this.now > this.data.hora_inicio) {
            this.estado = true
          } else {
            this.estado = false
          }
        } else {
          this.estado = false
        }
      })
    },
    getSolicituds () {
      this.$api.get('necesidad_by_user_id/' + this.id).then(v => {
        if (v) {
          this.misDatos = v
        }
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misDatos = v
        }
      })
    },
    calificacion () {
      if (this.rol === 3) {
        this.$api.get('calificacion_by_proveedor/' + this.id).then(res => {
          if (res) {
            this.ratingPerfil = res
          }
        })
      } else {
        this.$api.get('calificacion_by_cliente/' + this.id).then(res => {
          if (res) {
            this.ratingPerfil = res
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
</style>
