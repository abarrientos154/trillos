<template>
  <div>
    <div>
      <q-img :src="baseu + perfile" spinner-color="white" style="height: 250px; width: 100%">
        <div class="row justify-between" style="width: 100%">
          <div class="col-6">
              <div class="text-h6">{{data ? data.full_name : 'Nombre Tienda'}}</div>
          </div>
          <div class="col-6 row justify-end">
            <q-rating v-model="ratingTienda" size="2em" color="yellow" readonly/>
          </div>
        </div>
        <div class="row justify-between absolute-bottom bg-transparent">
          <q-card @click="dialogStado = true" class="q-ma-xs bg-grey-4" style="width:30%; height: 30px; border-top-left-radius:25px;border-top-right-radius:25px;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
            <div v-if="estado" class="text-positive text-h6 absolute-center">Abierta</div>
            <div v-else class="text-negative text-h6 absolute-center">Cerrada</div>
          </q-card>
          <q-icon class="col-2" :name="fav ? 'favorite' : 'favorite_border'" color="red" style="font-size: 2rem;" @click="favorito()"/>
        </div>
      </q-img>

      <q-scroll-area
          horizontal
          style="height: 110px"
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

      <botones-header v-if="category !== ''" class="q-mx-md q-my-xs" :id="category"/>

      <q-card class="bordes q-pa-xs q-mt-md shadow-up-4" style="border-radius:25px">
        <div class="q-mx-md text-h6">Mis Productos</div>
        <listado-de-sugerencia :data="productos" :direccion="false" ruta="tienda" class="q-mt-xs"/>
      </q-card>
    </div>
  </div>
</template>

<script>
import BotonesHeader from '../../components/BotonesHeader.vue'
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia.vue'
import moment from 'moment'
import env from '../../env'
export default {
  components: { BotonesHeader, ListadoDeSugerencia },
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      perfile: '',
      today: null,
      now: null,
      data: {},
      productos: [],
      img: '',
      estado: false,
      dialogStado: false,
      fav: false,
      ratingTienda: 0,
      category: ''
    }
  },
  mounted () {
    this.getInfo()
    this.calificacion()
  },
  methods: {
    favorito () {
      this.fav = !this.fav
      this.$api.post('new_favorito/' + this.id, { favorito: this.fav })
    },
    verImg (img) {
      this.baseu = env.apiUrl + '/tienda_img/'
      this.perfile = img
    },
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        this.category = v.categorias[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + '/perfil_img/perfil'
        this.baseuTienda = env.apiUrl + '/tienda_img/'
        this.getProduct()
        this.today = moment().day()
        this.now = moment().format('HH:mm')
        if (this.data.dias.find(v => v === this.today)) {
          if (this.now < this.data.hora_fin && this.now > this.data.hora_inicio) {
            this.estado = true
          } else {
            this.estado = false
          }
        } else {
          this.estado = false
        }
        this.$api.post('favorito/' + this.id).then(res => {
          if (res) {
            this.fav = res.favorito
          }
        })
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.data._id).then(v => {
        if (v) {
          this.productos = v
        }
      })
    },
    calificacion () {
      this.$api.get('calificacion_by_proveedor/' + this.id).then(res => {
        if (res) {
          this.ratingTienda = res
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-top: 6px solid $primary
}
</style>
