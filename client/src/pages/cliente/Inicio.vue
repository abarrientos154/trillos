<template>
  <div>
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/>
    <div class="column absolute-top-right q-pa-md">
      <q-btn color="primary" label="Editar perfil" rounded no-caps class="q-pa-xs"
        @click="rol === 2 ? $router.push('/perfil/cliente') : ''" />
    </div>

    <div>
      <div class="q-py-lg q-px-sm">
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
          @click="buscar()"/>
        </div>
      </div>

      <div class="q-pb-lg">
        <div class="text-bold text-h6 q-mb-md q-px-sm">Talleres disponibles</div>
        <div v-if="tiendas.length" class="row q-mb-md">
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
                <q-scroll-area horizontal style="height: 55px; width:100%" class="q-mb-xs">
                  <div v-if="tienda.categoriasInfo" class="row no-wrap q-gutter-sm">
                    <q-avatar rounded v-for="(cat, index) in tienda.categoriasInfo" :key="index">
                      <q-img :src="cat.icons" style="width:50px; height:50px"/>
                    </q-avatar>
                  </div>
                </q-scroll-area>
                <div>
                  <div class="row items-center no-wrap">
                    <q-icon class="q-mr-xs" color="grey-7" name="location_city" size=""/>
                    <div class="text-caption text-grey-7 ellipsis">{{tienda.pais + ', ' + tienda.ciudad}}</div>
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
        <div v-else class="q-px-md q-pb-lg">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-center text-grey-9">En este momento no hay talleres disponibles</div>
            </q-card-section>
          </q-card>
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
        <q-scroll-area v-if="populares.length" horizontal style="height: 300px;" class="q-mb-xs">
          <div class="row no-wrap q-pl-md">
            <q-card class="q-mr-md" @click="$router.push('/tienda/' + tienda._id)" v-for="(tienda, index) in populares" :key="index" style="width: 200px;">
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
        </q-scroll-area>
        <div v-else class="q-px-md q-pb-lg">
          <q-card class="full-width">
            <q-card-section>
              <div class="text-center text-grey-9">En este momento no hay talleres calificados</div>
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
        <div v-if="ultimas.length" class="row q-mb-md">
          <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 q-pa-sm" v-for="(tienda, index) in ultimas" :key="index">
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
        <div v-if="ultimas.length > 4" class="column items-center">
          <q-btn rounded class="q-pa-xs" color="primary" :label="ver2 ? 'Ver menos' : 'Ver más'" @click="verMas(2)" style="width: 60%;" no-caps/>
        </div>
      </div>
      <q-page-sticky position="bottom-right" :offset="[7, 22]">
        <q-btn class="q-pa-xs q-mb-lg" color="primary" icon="touch_app" label="Nueva solicitud" style="border-radius: 10px;" no-caps @click="$router.push('registronecesidades')"/>
      </q-page-sticky>
    </div>
    <q-dialog v-model="show">
      <q-card style="width: 100%; height: 80%" class="q-pa-none column items-center">
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Nuevos Mensajes</div>
            </div>
          </q-img>
        </div>
        <div class="text-h6 text-center text-bold q-mt-xl">¡Te están comunicando!</div>
        <div class="text-h6 text-center text-grey-9 text-subtitle1">Están intentando comunicarte revisa tu bandeja de mensajes.</div>
        <div class="q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Ir a bandeja" no-caps style="width:200px" @click="$router.push('/mis_chats')"/>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show2">
      <q-card style="width: 100%; height: 80%" class="q-pa-none column items-center">
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Solicitud Prorrogada</div>
            </div>
          </q-img>
        </div>
        <div class="text-h6 text-center text-bold q-mt-xl">¡Solicitud Prorrogada!</div>
        <div class="text-h6 text-center text-grey-9 text-subtitle1">Una de tus solicitudes fue prorrogada revisa la conversación.</div>
        <div class="q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Ir al chat" no-caps style="width:200px" @click="$router.push('/chat/' + idQuotationExtend)"/>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog persistent v-model="show3">
      <q-carousel class="full-height" animated v-model="slide" infinite ref="carousel">
        <q-carousel-slide :name="1" class="q-pa-none">
          <q-card style="width: 100%; height: 100%" class="q-pa-lg column no-wrap items-center">
            <div class="q-mt-xl" style="height: 200px; width: 70%;">
              <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
                <div class="absolute-full column items-center column justify-end">
                  <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                  <div class="text-bold text-center text-grey">Solicitud Finalizada</div>
                </div>
              </q-img>
            </div>
            <div class="text-h6 text-center text-bold q-mt-md">¡La solicitud de {{data_request.name}} fue finalizada!</div>
            <div class="text-h6 text-center text-grey-9 text-subtitle1">Una de tus solicitudes fue finalizada.</div>
            <div class="column q-pa-sm q-mt-xs">
              <q-btn round dense flat no-caps label="Omitir" color="grey" @click="isQuotationFinish(data_request._id)"/>
              <q-btn rounded  color="primary" label="Calificar taller" no-caps style="width:200px" @click="slide = 2"/>
            </div>
          </q-card>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="q-pa-lg column no-wrap items-center">
          <div class="q-mt-sm" style="height: 200px; width: 70%;">
            <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
              <div class="absolute-full column items-center column justify-end">
                <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                <div class="text-bold text-center text-grey">Comenta a tu taller</div>
              </div>
            </q-img>
          </div>
          <q-avatar class="q-mt-sm" size="70px">
            <img :src="supplier._id ? baseu + 'perfil' + supplier._id : 'noimg.png'" spinner-color="white">
          </q-avatar>
          <div class="text-h6 text-center text-bold q-mt-xs">{{supplier.full_name}}</div>
          <div class="text-h6 text-center text-bold q-mt-xs">¡Califica tu taller!</div>
          <div class="text-h6 text-center text-grey-9 text-subtitle1">Selecciona la cantidad de estrellas que quieres dar a tu taller.</div>
          <q-rating v-model="form.rating" size="2em" color="yellow"/>
          <div class="text-subtitle1">Escribe un comentario</div>
          <div class="q-my-md q-mx-md" style="width: 80%">
            <q-input filled v-model="form.opinion" type="textarea" :error="$v.form.opinion.$error" error-message="Este campo es requerido" style="width: 100%" @blur="$v.form.opinion.$touch()"/>
            <div class="column items-center q-mb-md">
              <q-btn rounded  color="primary" label="Calificar taller" no-caps style="width: 100%" @click="setNewOpinion(quotationFinished._id, quotationFinished.supplier_id)"/>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="q-pa-none">
          <q-card style="width: 100%; height: 100%" class="q-pa-lg column no-wrap items-center">
            <div class="q-mt-sm" style="height: 200px; width: 70%;">
              <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
                <div class="absolute-full column items-center column justify-end">
                  <q-icon name="collections" class="text-grey" size="80px"></q-icon>
                  <div class="text-bold text-center text-grey">Comentario añadido con éxito</div>
                </div>
              </q-img>
            </div>
            <div class="text-h6 text-center text-bold q-mt-xl">¡Comentario añadido con éxito!</div>
            <div class="text-h6 text-center text-grey-9 text-subtitle1">Podrás ver los comentarios en el perfil del taller.</div>
            <div class="q-pa-sm q-mt-md">
              <q-btn rounded  color="primary" label="Inicio" no-caps style="width:200px" @click="isQuotationFinish(data_request._id)"/>
            </div>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      ver1: false,
      ver2: false,
      show: false,
      show2: false,
      show3: false,
      city: null,
      ratingTienda: 4,
      rol: 0,
      baseuTienda: '',
      seleCat: '',
      user: {},
      cities: [],
      categorias: [],
      alltiendas: [],
      tiendas: [],
      ultimas: [],
      populares: [],
      idQuotationExtend: '',
      slide: 1,
      form: {
        rating: 4
      },
      quotationFinished: {},
      data_request: {},
      supplier: {},
      baseu: ''
    }
  },
  validations: {
    form: {
      opinion: { required },
      rating: { required }
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.getUser()
    this.getCategorias()
    this.getTiendas()
    this.getPopulares()
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
          this.getQuotations()
        }
      })
    },
    async getQuotations () {
      await this.$api.get('isNewMessages/' + this.user._id).then(res => {
        if (res && res.newMessages === true) {
          this.show = true
        }
        if (res && res.quotationExtend === true) {
          this.idQuotationExtend = res.idQuotationExtend
          this.show2 = true
        }
        if (res && res.quotationFinished === true) {
          this.idQuotationFinished = res.idQuotationFinished
          this.show3 = true
          this.quotationFinished = res.finished
          this.data_request = res.finished.data_request
          this.supplier = res.supplier
        }
      })
    },
    getTiendas () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        if (res) {
          this.alltiendas = res
          this.tiendas = this.alltiendas.slice(0, 4)
          this.ultimas = this.alltiendas.reverse().slice(0, 4)
          this.baseuTienda = env.apiUrl + '/perfil_img/perfil'
        }
      })
    },
    getPopulares () {
      this.$api.get('mas_populares').then(res => {
        if (res) {
          this.populares = res.slice(0, 10)
        }
      })
    },
    getCategorias () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.categorias = res
          this.seleCat = this.categorias[0]._id
        }
      })
    },
    buscar () {
      this.$router.push('/talleres/' + this.city + '/' + this.seleCat)
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
          this.ultimas = this.alltiendas.reverse().slice(0, 8)
        } else {
          this.ultimas = this.alltiendas.reverse().slice(0, 4)
        }
      }
    },
    async setNewOpinion (id, idSupp) {
      this.$v.$touch()
      if (!this.$v.form.$error) {
        this.$q.loading.show({
          message: 'Subiendo Cotización, Por Favor Espere...'
        })
        await this.$api.post('newOpinion/' + id + '/' + idSupp, this.form).then(res => {
          if (res) {
            console.log('que pasa')
            this.slide = 3
            this.$q.loading.hide()
          }
        })
      }
    },
    async isQuotationFinish (id) {
      await this.$api.put('quotationFinished/' + id).then(res => {
        if (res) {
          console.log('sirve?')
          this.show3 = false
        }
      })
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
