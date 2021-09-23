<template>
  <div>
    <q-img v-if="form2._id" :src="baseu + 'perfil' + form2._id" spinner-color="white" style="height: 300px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
      <div class="absolute-full">
      <div class="column absolute-top-right q-mt-md q-pr-md">
        <q-btn color="primary" label="Editar perfil" rounded no-caps class="q-pa-xs"
        @click="rol !== 1 ? $router.push('/perfil/taller') : ''">
        </q-btn>
      </div>
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
                  :class="[n.status?'white':colorActive]"
                >
                  <q-item-section
                    push
                    @click="disableNotify(n.id)"
                  >
                    <q-item-label ovequasrline>{{n.title}}</q-item-label>
                    <q-item-label lines="
                      1">{{n.message}}</q-item-label>
                    <q-item-label caption>{{n.createdAt}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-scroll-area>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
        <div class="column absolute-bottom-right q-pb-md q-pr-md">
          <q-rating v-model="ratingTienda" size="1.5em" color="yellow" readonly/>
        </div>
      </div>
    </q-img>

    <q-card class="q-mt-md" flat style="width:100%">
      <div class="row q-px-sm" style="width:100%">
        <div class="col-6">
          <div class="text-h6 q-mb-sm">{{form2.full_name}}</div>
          <div class="row q-mb-sm no-wrap items-center">
            <q-icon size="sm" name="apartment" />
            <div class="ellipsis">{{form2.pais}}, {{form2.ciudad}}</div>
          </div>
          <div class="row no-wrap items-center">
            <q-icon size="sm" name="location_on" />
            <div class="ellipsis">{{form2.direccion}}</div>
          </div>
        </div>
        <div class="col-6">
          <div class="row no-wrap items-center">
            <q-icon size="sm" name="access_time" />
            <div class="text-weight-bold ellipsis">horario de atención</div>
          </div>
          <div class="q-pl-lg">Apertura: {{form2.hora_inicio}} hrs.</div>
          <div class="q-pl-lg q-pb-sm">Cierre: {{form2.hora_fin}} hrs.</div>
          <div class="row no-wrap items-center">
            <q-icon size="sm" name="date_range" />
            <div class="text-weight-bold ellipsis">Dias de atencion</div>
          </div>
          <div class="row q-pl-lg">
            <div class="row" v-for="(dia, index) in form2.dias" :key="index"> {{diasF[dia]}}
              <div v-if="form2.dias.length - 1 != index" class="q-ml-xs q-mr-xs">-</div>
            </div>
          </div>
        </div>
      </div>
      <div  class="q-mt-md q-pl-md text-h6">Fotos Del taller:</div>
      <q-card class="q-mx-md shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
          <q-scroll-area
          horizontal
          style="height: 110px;"
        >
          <div class="row no-wrap" style="width: 100%">
            <q-card v-for="(item, index) in form2.tiendaFiles" clickable v-ripple class="q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index"
            @click="imgSelec = baseu3 + item, verImg = true">
              <q-img :src="form2.tiendaFiles ? baseu3 + item : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
            </q-card>
          </div>
        </q-scroll-area>
      </q-card>
    </q-card>

    <div class="q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <div class="text-bold q-ml-sm text-h6">Comentarios del taller</div>
    </div>
    <q-scroll-area
      v-if="data5.length"
      horizontal
      style="height: 200px; width: 100%;"
    >
      <div class="row items-center no-wrap q-px-md q-gutter-md">
        <q-card v-for="(item, index) in data5" :key="index" class="shadow-5" style="width:350px;height:180px; border-radius:25px;">
          <div class="text-right text-grey-8 q-pr-sm q-pt-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          <div class="row">
            <div class="column items-center" style="width:45%">
              <q-avatar size="110px">
                <img :src="item.data_client._id ? baseu + 'perfil' + item.data_client._id : 'noimg.png'" spinner-color="white">
              </q-avatar>
              <div class="row items-center justify-center no-wrap" style="width:100%">
                <q-icon size="xs" name="person" color="grey" />
                <div class="text-grey-8 text-caption ellipsis">{{item.data_client.full_name}} {{item.data_client.last_name}}</div>
              </div>
            </div>
            <div style="width:55%">
              <div class="text-h6 q-mb-xs">{{item.quotation_data.data_request.name}}</div>
              <div class="row" style="height:50px; width:100%">
                <div class="col-12 text-grey-9 ellipsis-3-lines">{{item.opinion}}</div>
              </div>
              <div>
                <q-rating v-model="item.rating" size="2em" color="orange" readonly/>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </q-scroll-area>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin comentarios</div>
    </q-card>

    <div class="q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <div class="text-bold q-ml-sm text-h6">Solicitudes Activas</div>
    </div>
    <q-scroll-area
      v-if="data2.length"
      horizontal
      style="height: 230px; width: 100%;"
      class="rounded-borders"
    >
      <div class="row no-wrap q-gutter-md q-px-md">
        <q-card v-for="(item, index) in data2" :key="index" style="width:350px;height:210px; border-radius:10px">
          <div class="row justify-end q-pr-md">
            <div class="row items-center">
              <div class="text-caption text-grey-8">Nivel de requerimiento</div>
              <div class="row q-gutter-xs q-pl-xs">
                <q-radio v-model="item.colorRadio" disable dense keep-color size="xs" val="red" color="red" />
                <q-radio v-model="item.colorRadio" disable dense keep-color size="xs" val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" disable dense keep-color size="xs" val="blue" color="blue" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="column items-center justify-center" style="width:40%">
              <q-avatar size="90px">
                <img :src="item.data_client._id ? baseu + 'perfil' + item.data_client._id : 'noimg.png'" spinner-color="white">
              </q-avatar>
              <div class="q-pl-sm q-mt-xs" style="width:100%">
                <div class="row items-center">
                  <q-icon size="xs" name="person" color="grey" />
                  <div class="col-10 text-grey-8 ellipsis text-caption">{{item.data_client.full_name}} {{item.data_client.last_name}}</div>
                </div>
                <div class="row q-mt-sm items-center">
                  <q-icon size="xs" name="place" color="grey" />
                  <div class="col-10 text-grey-8 ellipsis text-caption">{{item.data_client.direccion}}</div>
                </div>
              </div>
            </div>
            <div style="width:60%">
              <div class="text-subtitle1 text-bold q-mb-xs">{{item.data_request.name}}</div>
              <div class="row q-mb-lg" style="height:50px; width:100%">
                <div class="col-12 text-grey-9 ellipsis-3-lines">{{item.data_request.descripcion}}</div>
              </div>
              <div class="row items-center no-wrap">
                <div class="text-grey-9 ellipsis"><b>Estado de solicitud:</b> En progreso</div>
              </div>
              <div class="row items-center q-mt-xs q-pb-sm">
                <q-icon size="sm" name="clean_hands" color="grey" />
                <div class="col-10 text-grey-8 q-pl-xs ellipsis">{{item.data_request.categorianame.name}}</div>
              </div>
            </div>
          </div>
          <div class="absolute-bottom-right text-grey-8 text-caption q-pa-sm">Fecha de Solicitud: {{item.fechaCreacion}} </div>
        </q-card>
      </div>
    </q-scroll-area>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin solicitudes activas</div>
    </q-card>

    <div class="column items-center justify-center text-bold text-h6 q-ml-sm">Solicitudes en tu zona</div>
    <listado-de-sugerencia v-if="allData.length" :data="allData" :direccion="true" ruta="proveedor" @close="close"/>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin solicitudes disponibles</div>
    </q-card>

    <!-- <div class="q-py-lg column items-center justify-center">
      <q-btn v-if="needs.length > 3" color="primary" rounded no-caps :label="!ver ? 'Ver más' : 'Ver menos'" style="width:70%" class="q-py-sm" @click="verMas()" />
    </div> -->

    <q-dialog v-model="verImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
    <q-dialog v-model="show">
      <q-card style="width: 100%; height: 80%" class="q-pa-none column items-center">
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-btn round dense flat class="q-mt-xs q-ml-xs absolute-top-left" icon="close" color="primary" @click="show = false"/>
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
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-btn round dense flat class="q-mt-xs q-ml-xs absolute-top-left" icon="close" color="primary" @click="show2 = false"/>
          <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
            <div class="absolute-full column items-center column justify-end">
              <q-icon name="collections" class="text-grey" size="80px"></q-icon>
              <div class="text-bold text-center text-grey">Cotización Aceptada</div>
            </div>
          </q-img>
        </div>
        <div class="text-h6 text-center text-bold q-mt-xl">¡Cotización Aceptada!</div>
        <div class="text-h6 text-center text-grey-9 text-subtitle1">Una de tus cotizaciones fue aceptada revisa la conversación.</div>
        <div class="q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Ir al chat" no-caps style="width:200px" @click="$router.push('/chat/' + idQuotation)"/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
import ListadoDeSugerencia from '../../components/ListadoDeSugerencia3.vue'
export default {
  components: {
    ListadoDeSugerencia
  },
  data () {
    return {
      ver: false,
      verImg: false,
      show: false,
      show2: false,
      id: '',
      imgSelec: '',
      baseu: '',
      baseu2: '',
      baseu3: '',
      ratingTienda: 0,
      form: {},
      info: {},
      form2: {},
      allData: [],
      needs: [],
      data2: [],
      data5: [],
      diasF: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      user: {},
      idQuotation: '',
      chat: '',
      notifications: [],
      colorActive: 'bg-blue-1',
      amountNotifications: 0
    }
  },
  async mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/necesidad_img'
    this.baseu3 = env.apiUrl + '/tienda_img/'
    await this.getUser()
    this.getSolicitudes()
    this.getActiveRequest()
    this.getNotifications()
  },
  methods: {
    async getNotifications () {
      await this.$api.get('getNotifications').then(res => {
        if (res) {
          this.notifications = res
          console.log('this.notifications :>> ', this.notifications)
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
    async getSolicitudes () {
      await this.$api.get('user_info').then(res => {
        this.info = res
        this.$api.get('necesidades').then(v => {
          if (v) {
            this.allData = v
            /* this.needs = this.allData.slice(0, 3) */
          }
        })
      })
    },
    async getActiveRequest () {
      this.$api.get('show_all_cotizations3').then(v => {
        if (v) {
          this.data2 = v
        }
      })
    },
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.user = v
        }
        if (this.rol === 3) {
          this.datosproveedor = true
          this.form2 = v
          this.id = this.form2._id
          this.calificacion()
          this.consultaropinion()
        }
        if (this.rol === 2) {
          this.form = v
        }
        this.getQuotations()
      })
    },
    consultaropinion () {
      this.$api.get('opiniones2/' + this.form2._id).then(res => {
        if (res) {
          this.data5 = res
        }
      })
    },
    calificacion () {
      this.$api.get('calificacion_by_proveedor/' + this.form2._id).then(res => {
        if (res) {
          this.ratingTienda = res
        }
      })
    },
    verMas () {
      if (!this.ver) {
        this.needs = this.allData
      } else {
        this.needs = this.allData.slice(0, 3)
      }
      this.ver = !this.ver
    },
    close (emit) {
      if (emit === true) {
        this.getSolicitudes()
      }
    },
    async getQuotations () {
      await this.$api.get('isNewMessages/' + this.user._id).then(res => {
        if (res && res.newMessages === true) {
          console.log('res >> ', res)
          this.show = true
          this.chat = res.chat
        }
        if (res && res.quotationActive === true) {
          this.idQuotation = res.idQuotation
          this.show2 = true
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
