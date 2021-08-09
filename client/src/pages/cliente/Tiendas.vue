<template>
  <div>
    <q-img src="nopublicidad.jpg" spinner-color="white" style="width:100%; height:160px">
        <div class="text-h6 absolute-bottom text-center bg-transparent">Talleres</div>
    </q-img>

    <div>
      <!-- <div class="q-py-lg q-px-sm">
        <div class="text-bold text-h6">¿Donde necesitas ayuda?</div>
        <div class="text-caption text-grey-9 q-mb-xs">Selecciona la ciudad donde quieres ver los talleres</div>
        <q-select class="q-mb-md" v-model="city" label="Nombre de la ciudad" option-label="name" option-value="_id" emit-value map-options outlined dense :options="cities"/>
        <q-scroll-area horizontal style="height: 55px;" class="q-mb-xs">
          <div class="row no-wrap">
            <q-btn v-for="(categoria, index) in categorias" :key="index" :color="seleCat === categoria._id ? 'primary' : 'secondary'" @click="seleCat = categoria._id" class="text-no-wrap text-subtitle1 text-bold q-mr-md" :label="categoria.name" style="border-radius: 10px;" no-caps/>
          </div>
        </q-scroll-area>
        <div class="column items-center">
          <q-btn rounded :disable="!city || seleCat === '' ? true : false" class="q-pa-xs" color="primary" label="Buscar" style="width: 60%;" no-caps
          @click="filtrar()"/>
        </div>
      </div> -->

      <div class="q-pb-lg">
        <div class="q-pa-md">
          <div class="text-bold text-h6 text-center">Talleres Disponibles</div>
        </div>
        <div v-if="tiendas.length" class="row q-mb-md">
          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pa-sm" v-for="(tienda, index) in tiendas" :key="index">
            <q-card @click="$router.push('/tienda/' + tienda._id)">
              <div>
                <q-rating v-if="tienda.isVerified === true" class="q-my-xs q-mx-sm" v-model="ratingTienda" size="1.5em" color="primary" readonly/>
                <div class="bg-primary text-white text-subtitle1 text-bold q-px-sm">{{tienda.full_name}}</div>
              </div>
              <div class="q-py-sm column items-center">
                <q-avatar size="80px">
                  <q-img :src="baseuTienda + tienda._id" class="full-height"/>
                </q-avatar>
              </div>
              <div class="q-pa-sm">
                <div class="text-grey text-subtitle1 text-bold">Nuestros servicios</div>
                <q-scroll-area horizontal style="height: 55px; width:100%" class="q-mb-xs">
                  <div v-if="tienda.categoriasInfo" class="row no-wrap q-gutter-sm">
                    <q-avatar rounded v-for="(cat, index) in tienda.categoriasInfo" :key="index">
                      <q-img :src="cat.icons" style="width:50px; height:50px"/>
                    </q-avatar>
                  </div>
                </q-scroll-area>
                <div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="location_city"/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.pais + ', ' + tienda.ciudad}}</div>
                  </div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="place"/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.direccion}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <div v-else class="q-px-md q-pb-lg">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-center text-grey-9">En este momento no hay talleres disponibles</div>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="tiendas.length > 4" class="column items-center">
          <q-btn rounded class="q-pa-xs" color="primary" :label="ver ? 'Ver menos' : 'Ver más'" @click="verMas()" style="width: 60%;" no-caps/>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[7, 22]">
      <q-btn class="q-pa-xs q-mb-lg" color="primary" icon="touch_app" label="Nueva solicitud" style="border-radius: 10px;" no-caps @click="$router.push('registronecesidades')"/>
    </q-page-sticky>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      ver: false,
      city: null,
      ratingTienda: 4,
      rol: 0,
      baseuTienda: '',
      seleCat: '',
      user: {},
      cities: [],
      categorias: [],
      alltiendas: [],
      tiendas: []
    }
  },
  mounted () {
    this.baseuTienda = env.apiUrl + '/perfil_img/perfil'
    this.getUser()
    this.getCategorias()
    if (this.$route.params.city) {
      this.city = this.$route.params.city
      this.seleCat = this.$route.params.cat
      this.filtrar()
    } else {
      this.getTiendas()
    }
  },
  methods: {
    async getUser () {
      await this.$api.get('user_info').then(v => {
        if (v) {
          this.user = v
          this.rol = v.roles[0]
          this.$api.get('cityByCountry/' + this.user.country).then(res => {
            if (res) {
              this.cities = res
            }
          })
        }
      })
    },
    getTiendas () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        if (res) {
          this.alltiendas = res
          this.tiendas = this.alltiendas.reverse()
        }
      })
    },
    getCategorias () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.categorias = res
        }
      })
    },
    filtrar () {
      this.$q.loading.show({
        message: 'Filtrando datos'
      })
      this.$api.post('filtrar_talleres', { type: this.seleCat, ciudad: this.city }).then(res => {
        this.tiendas = res
        this.$q.loading.hide()
      })
    },
    verMas () {
      this.ver = !this.ver
      if (this.ver) {
        this.tiendas = this.alltiendas
      } else {
        this.tiendas = this.alltiendas.slice(0, 4)
      }
    }
  }
}
</script>

<style>
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}

</style>>
