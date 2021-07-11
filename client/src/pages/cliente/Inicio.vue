<template>
  <div>
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/>

    <div>
      <div class="q-py-lg q-px-sm">
        <div class="text-bold text-h6">¿Donde necesitas ayuda?</div>
        <div class="text-caption text-grey-9 q-mb-xs">Selecciona la ciudad donde quieres ver los talleres</div>
        <q-select class="q-mb-md" v-model="city" label="Nombre de la ciudad" outlined dense :options="[]"/>
        <q-scroll-area horizontal style="height: 55px;" class="q-mb-xs">
          <div class="row no-wrap">
            <q-btn v-for="(categoria, index) in categorias" :key="index" :color="seleCat === categoria._id ? 'primary' : 'secondary'" @click="seleCat = categoria._id" class="text-no-wrap text-subtitle1 text-bold q-mr-md" :label="categoria.name" style="border-radius: 10px;" no-caps/>
          </div>
        </q-scroll-area>
        <div class="column items-center">
          <q-btn rounded class="q-pa-xs" color="primary" label="Buscar" style="width: 60%;" no-caps/>
        </div>
      </div>

      <div class="q-pb-lg">
        <div class="text-bold text-h6 q-mb-md q-px-sm">Nuestros talleres disponibles</div>
        <div class="row q-mb-md">
          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pa-sm" v-for="(tienda, index) in tiendas" :key="index">
            <q-card @click="$router.push('/tienda/' + tienda._id)">
              <div>
                <q-rating class="q-my-xs q-mx-sm" v-model="ratingTienda" size="1.5em" color="primary" readonly/>
                <div class="bg-primary text-white text-subtitle1 text-bold q-px-sm">{{tienda.full_name}}</div>
              </div>
              <div class="q-py-sm column items-center">
                <q-avatar size="80px">
                  <q-img :src="baseuTienda + tienda._id" class="full-height"/>
                </q-avatar>
              </div>
              <div class="q-pa-sm">
                <div class="text-grey text-subtitle1 text-bold">Nuestros servicios</div>
                <div class="row">
                  <q-avatar rounded v-for="index in 3" :key="index" class="col q-mr-xs">
                    <q-img :src="'nopublicidad.jpg'" class="full-height"/>
                  </q-avatar>
                </div>
                <div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="location_city" size=""/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.region + ', ' + tienda.ciudad}}</div>
                  </div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="place" size=""/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.direccion}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
        <div v-if="tiendas.length > 4" class="column items-center">
          <q-btn rounded class="q-pa-xs" color="primary" :label="ver1 ? 'Ver menos' : 'Ver más'" @click="verMas(1)" style="width: 60%;" no-caps/>
        </div>
      </div>

      <div class="row items-center justify-center q-px-lg" style="height: 200px;">
        <q-img style="height: 175px; width: 100%; border-radius: 25px; transform: rotate(-10deg);" :src="'nopublicidad.jpg'"/>
      </div>

      <div>
        <div class="q-pa-md">
          <div class="text-bold text-h6">Talleres mejor calificados</div>
          <div class="text-caption text-grey-9 q-mb-xs">Conoce los 10 talleres que prestan mejor servicio.</div>
        </div>
        <q-scroll-area v-if="TPopulares.length" horizontal style="height: 300px;" class="q-mb-xs">
          <div class="row no-wrap q-pl-md">
            <q-card class="q-mr-md" @click="$router.push('/tienda/' + tienda._id)" v-for="(tienda, index) in TPopulares" :key="index" style="width: 200px;">
              <div>
                <q-rating class="q-my-xs q-mx-sm" v-model="ratingTienda" size="1.5em" color="primary" readonly/>
                <div class="bg-primary text-white text-subtitle1 text-bold q-px-sm">{{tienda.full_name}}</div>
              </div>
              <div class="q-py-sm column items-center">
                <q-avatar size="80px">
                  <q-img :src="baseuTienda + tienda._id" class="full-height"/>
                </q-avatar>
              </div>
              <div class="q-pa-sm">
                <div class="text-grey text-subtitle1 text-bold">Nuestros servicios</div>
                <div class="row">
                  <q-avatar rounded v-for="index in 3" :key="index" class="col q-mr-xs">
                    <q-img :src="'nopublicidad.jpg'" class="full-height"/>
                  </q-avatar>
                </div>
                <div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="location_city"/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.region + ', ' + tienda.ciudad}}</div>
                  </div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="place"/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.direccion}}</div>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </q-scroll-area>
        <div v-else class="q-px-md q-pb-lg">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-center text-bold text-grey">En este momento hay talleres calificados</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row items-center justify-center q-px-lg">
        <q-img style="height: 175px; width: 100%; border-radius: 25px;" :src="'nopublicidad.jpg'"/>
      </div>

      <div class="q-pb-lg">
        <div class="q-pa-md">
          <div class="text-bold text-h6">Nuevos talleres</div>
          <div class="text-caption text-grey-9 q-mb-xs">Ultimos talleres registrados</div>
        </div>
        <div class="row q-mb-md">
          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pa-sm" v-for="(tienda, index) in TUltimas" :key="index">
            <q-card @click="$router.push('/tienda/' + tienda._id)">
              <div>
                <q-rating class="q-my-xs q-mx-sm" v-model="ratingTienda" size="1.5em" color="primary" readonly/>
                <div class="bg-primary text-white text-subtitle1 text-bold q-px-sm">{{tienda.full_name}}</div>
              </div>
              <div class="q-py-sm column items-center">
                <q-avatar size="80px">
                  <q-img :src="baseuTienda + tienda._id" class="full-height"/>
                </q-avatar>
              </div>
              <div class="q-pa-sm">
                <div class="text-grey text-subtitle1 text-bold">Nuestros servicios</div>
                <div class="row">
                  <q-avatar rounded v-for="index in 3" :key="index" class="col q-mr-xs">
                    <q-img :src="'nopublicidad.jpg'" class="full-height"/>
                  </q-avatar>
                </div>
                <div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="location_city"/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.region + ', ' + tienda.ciudad}}</div>
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
        <div v-if="TUltimas.length > 4" class="column items-center">
          <q-btn rounded class="q-pa-xs" color="primary" :label="ver2 ? 'Ver menos' : 'Ver más'" @click="verMas(2)" style="width: 60%;" no-caps/>
        </div>
      </div>
      <q-page-sticky position="bottom-right" :offset="[7, 22]">
        <q-btn class="q-pa-xs q-mb-lg" color="primary" icon="" label="Nueva solicitud" style="border-radius: 10px;" no-caps/>
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      ratingTienda: 4,
      baseuTienda: '',
      user: {},
      categorias: [],
      alltiendas: [],
      tiendas: [],
      TUltimas: [],
      TPopulares: [],
      city: '',
      seleCat: '',
      ver1: false,
      ver2: false
    }
  },
  mounted () {
    this.getUser()
    this.getCategorias()
    this.getTiendas()
    this.getTPopulares()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.user = v
          console.log(this.user, 'user')
        }
      })
    },
    getTiendas () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        if (res) {
          this.alltiendas = res
          this.tiendas = this.alltiendas.slice(0, 4)
          this.TUltimas = this.alltiendas.reverse().slice(0, 4)
          this.baseuTienda = env.apiUrl + '/perfil_img/perfil'
          console.log(this.alltiendas, 'tiendas')
        }
      })
    },
    getTPopulares () {
      this.$api.get('mas_populares').then(res => {
        if (res) {
          this.TPopulares = res.slice(0, 10)
          console.log(this.TPopulares, 'TPopulares')
        }
      })
    },
    getCategorias () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.categorias = res
          this.seleCat = this.categorias[0]._id
          console.log(this.categorias, 'cat')
        }
      })
    },
    verMas (ver) {
      if (ver === 1) {
        this.ver1 = !this.ver1
        if (this.ver1) {
          this.tiendas = this.alltiendas
        } else {
          this.tiendas = this.alltiendas.slice(0, 4)
        }
      } else if (ver === 2) {
        this.ver2 = !this.ver2
        if (this.ver2) {
          this.TUltimas = this.alltiendas.reverse().slice(0, 8)
        } else {
          this.TUltimas = this.alltiendas.reverse().slice(0, 4)
        }
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
