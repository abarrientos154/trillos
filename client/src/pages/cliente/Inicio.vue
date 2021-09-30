<template>
  <div>
    <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-bottom-right-radius: 20px; border-bottom-left-radius: 20px"/>
    <div class="column absolute-top-left q-mt-md q-ml-sm">
      <q-btn color="primary" auto-close flat icon="notifications" round>
        <q-badge color="red" floating outline v-if="amountNotifications > 0">{{amountNotifications > 15 ? '15+' : amountNotifications}}</q-badge>
        <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
        fit
        :offset="[0, 10]"
        v-close-popup
        auto-close
        >
          <q-item>
            <q-item-section>
              <q-item-label>Notificaciones</q-item-label>
            </q-item-section>

            <q-item-section
              side
              bottom
            >
              <q-item-label caption>
                <a
                  class="cursor-pointer text-primary"
                  @click="disableAllNotify()"
                  primary
                >Marcar como Leidas</a>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-list>
            <q-scroll-area style="height: 200px; max-width: 300px;">
              <q-item
                v-for="n in notifications"
                :key="n.id"
                clickable
                v-close-popup
                :class="[!n.status?'white': 'bg-primary']"
              >
                <q-item-section
                  push
                  @click="disableNotify(n._id)"
                >
                  <!-- <q-item-label ovequasrline>{{n.name}}</q-item-label> -->
                  <q-item-label lines="
                    1">{{n.name}}</q-item-label>
                  <q-item-label caption>{{n.created_at}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="column absolute-top-right q-pa-md">
      <q-btn color="primary" label="Editar perfil" rounded no-caps class="q-pa-xs"
        @click="rol === 2 ? $router.push('/perfil/cliente') : ''" />
    </div>

    <div>
      <div class="q-mt-sm">
        <div class="text-bold text-h6 q-mb-md q-px-sm">Talleres disponibles</div>
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
        <q-img style="height: 175px; width: 100%; border-radius: 25px;" :src="'nopublicidad.jpg'"/>
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
        <q-btn round dense flat class="q-mt-xs q-ml-xs absolute-top-left" icon="close" color="primary" @click="show = false"/>
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
          <q-btn rounded  color="primary" label="Ir al chat" no-caps style="width:200px" @click="$router.push('/chat/' + chat)"/>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show2">
      <q-card style="width: 100%; height: 80%" class="q-pa-none column items-center">
        <q-btn round dense flat class="q-mt-xs q-ml-xs absolute-top-left" icon="close" color="primary" @click="show2 = false"/>
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
    <q-dialog persistent v-model="show4">
      <q-card style="width: 100%; height: 100%" class="q-pa-none column items-center">
        <q-btn round dense flat class="q-mt-xs q-ml-xs absolute-top-left" icon="close" color="primary" @click="checkCancellation()"/>
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Cotización cancelada</div>
            </div>
          </q-img>
        </div>
        <div class="text-h6 text-center text-bold q-mt-md">¡Cotización cancelada!</div>
        <div class="text-h6 text-center text-grey-9 text-subtitle1 q-mx-sm">El proveedor <b>{{workshop.full_name}}</b> ha cancelado su cotización a tu solicitud: <b>{{request.name}}</b>, ahora tu solicitud vuelve a estar disponible para que otros proveedores te contacten.</div>
        <div class="q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Volver" no-caps style="width:200px" @click="checkCancellation()"/>
        </div>
      </q-card>
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
      show4: false,
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
      idQuotationExtend: '',
      slide: 1,
      form: {
        rating: 4
      },
      quotationFinished: {},
      data_request: {},
      supplier: {},
      baseu: '',
      notifications: [],
      colorActive: 'bg-blue-1',
      amountNotifications: 0,
      workshop: {},
      request: {}
    }
  },
  validations: {
    form: {
      opinion: { required },
      rating: { required }
    }
  },
  mounted () {
    this.getNotifications()
    this.baseu = env.apiUrl + '/perfil_img/'
    this.getUser()
    this.getCategorias()
    this.getTiendas()
  },
  methods: {
    async disableNotify (id) {
      await this.$api.put('disableNotifyById/' + id).then(res => {
        if (res) {
          this.getNotifications()
        }
      })
    },
    async disableAllNotify () {
      await this.$api.put('disableAllNotifyByUser').then(res => {
        if (res === true) {
          this.getNotifications()
        }
      })
    },
    async getNotifications () {
      this.amountNotifications = 0
      await this.$api.get('getNotifications').then(res => {
        if (res) {
          this.notifications = res
          if (this.notifications.length > 0) {
            this.notifications.forEach(element => {
              if (element.status === true) {
                this.amountNotifications++
              }
            })
          }
        }
      })
    },
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
          this.chat = res.chat
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
        if (res.cancel === true) {
          this.workshop = { ...res.workshop }
          this.request = { ...res.request }
          console.log('this.request >> ', this.request)
          this.show4 = true
        }
      })
    },
    getTiendas () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        if (res) {
          this.alltiendas = res
          this.tiendas = [...this.alltiendas]
          this.ultimas = this.alltiendas.reverse().slice(0, 4)
          this.baseuTienda = env.apiUrl + '/perfil_img/perfil'
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
            this.slide = 3
            this.$q.loading.hide()
          }
        })
      }
    },
    async isQuotationFinish (id) {
      await this.$api.put('quotationFinished/' + id).then(res => {
        if (res) {
          this.show3 = false
        }
      })
    },
    async checkCancellation () {
      await this.$api.put('requestCancelled/' + this.request._id).then(res => {
        if (res) {
          this.show4 = false
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
