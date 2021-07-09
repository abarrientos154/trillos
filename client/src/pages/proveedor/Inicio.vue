<template>
  <div>
    <q-img :src="baseu + 'perfil' + form2._id" spinner-color="white" style="height: 300px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
      <div class="absolute-full">
      <div class="column absolute-top-right q-mt-md q-pr-md">
        <q-btn color="primary" label="Editar perfil" rounded no-caps class="q-pa-xs"
        @click="rol !== 1 ? $router.push('/Datos') : ''" />
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
          <div class="row q-mb-sm items-center">
            <q-icon size="sm" name="apartment" />
            <div>{{form2.region}}, {{form2.ciudad}}</div>
          </div>
          <div class="row items-center">
            <q-icon size="sm" name="location_on" />
            <div>{{form2.direccion}}</div>
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
            <q-card v-for="(item, index) in form2.tiendaFiles" class="q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
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
      style="height: 230px; width: 100%;"
    >
      <div class="row items-center no-wrap q-px-md q-gutter-md">
        <q-card v-for="(item, index) in data5" :key="index" class="shadow-5" style="width:450px;height:200px; border-radius:25px;">
          <div class="absolute-top-right text-grey-8 q-pr-sm q-mt-sm">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          <div class="row">
            <div class="column items-center justify-between q-py-md" style="width:45%">
              <q-avatar size="110px">
                <img :src="item.calificador_info._id ? baseu + 'perfil' + item.calificador_info._id : 'noimg.png'" spinner-color="white">
              </q-avatar>
              <div class="row items-center justify-center" style="width:100%">
                <q-icon size="sm" name="person" color="grey" />
                <div class="col-10 text-bold text-grey-8 ellipsis">{{item.calificador_info.full_name}} {{item.calificador_info.last_name}}</div>
              </div>
            </div>
            <div class="q-mt-md" style="width:55%">
              <div class="text-h6 q-mt-lg q-mb-xs">{{item.necesidad_info.name}}</div>
              <div class="row q-mb-lg" style="height:50px; width:100%">
                <div class="col-12 text-grey-9 ellipsis-3-lines">{{item.comentario}}</div>
              </div>
              <div class="q-pb-md">
                <q-rating v-model="item.rating_tienda" size="2em" color="yellow" readonly/>
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
        <q-card v-for="(item, index) in data2" :key="index" style="width:450px;height:200px; border-radius:25px" @click="$router.push('/cotizacion/' + item._id + '/' + item.necesidad_id )">
          <div class="row">
            <div class="q-mt-xs column items-center justify-center" style="width:45%">
              <q-avatar size="90px">
                <img :src="item.datos_cliente._id ? baseu + 'perfil' + item.datos_cliente._id : 'noimg.png'" spinner-color="white">
              </q-avatar>
              <div class="q-pl-sm q-mt-xs" style="width:100%">
                <div class="row">
                  <q-icon size="sm" name="person" color="grey" />
                  <div class="col-10 text-bold text-grey-8 ellipsis">{{item.datos_cliente.full_name}} {{item.datos_cliente.last_name}}</div>
                </div>
                <div class="row q-mt-sm">
                  <q-icon size="sm" name="phone" color="grey" />
                  <div class="col-10 text-bold text-grey-8 ellipsis">{{item.datos_cliente.phone}}</div>
                </div>
                <div class="row q-mt-sm">
                  <q-icon size="sm" name="place" color="grey" />
                  <div class="col-10 text-bold text-grey-8 ellipsis">{{item.datos_cliente.direccion}}</div>
                </div>
              </div>
            </div>
                <div class="row" style="width:55%">
                  <div class="absolute-top-right">
                    <div class="row">
                      <div class="text-h7 text-grey q-mt-xs">Nivel requerimiento:</div>
                      <div class="row">
                        <q-radio v-model="item.colorRadio" keep-color size="xs" val="red" color="red" />
                        <q-radio v-model="item.colorRadio" keep-color size="xs" val="orange" color="orange" />
                        <q-radio v-model="item.colorRadio" keep-color size="xs" val="blue" color="blue" />
                      </div>
                    </div>
                  </div>
                  <div class="text-h6 q-mt-lg q-mb-xs">{{item.name}}</div>
                  <div class="column justify-center">
                    <q-scroll-area style="height: 50px; width: 230px;">
                      <div class="text-center text-grey">{{item.necesidad_info.descripcion}}</div>
                    </q-scroll-area>
                    <div class="row">
                      <div class="text-h7 text-bold">Estado de solicitud:</div>
                      <div class="q-pl-xs text-h7 text-grey">{{item.status}}</div>
                    </div>
                    <div class="row q-mt-sm q-pb-sm">
                        <q-icon size="sm" name="clean_hands" />
                        <div class="text-bold text-grey">{{item.categorianame.name}}</div>
                      </div>
                  </div>
                </div>
          </div>
          <div class="absolute-bottom-right text-grey-8 q-pr-sm">Fecha de Solicitud: {{item.fechaCreacion}} </div>
        </q-card>
      </div>
    </q-scroll-area>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin solicitudes activas</div>
    </q-card>

    <div class="column items-center justify-center text-bold text-h6 q-ml-sm">Solicitudes en tu zona</div>
    <listado-de-sugerencia v-if="data.length" :data="data" :direccion="true" ruta="proveedor"/>
    <q-card v-else class="shadow-11 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Sin solicitudes disponibles</div>
    </q-card>

    <div class="q-py-lg column items-center justify-center">
      <q-btn v-if="data.length > 3" color="primary" rounded no-caps :label="!ver ? 'Ver más' : 'Ver menos'" style="width:70%" class="q-py-sm" @click="verMas()" />
    </div>
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
      listado: true,
      ver: false,
      listado2: false,
      id: '',
      baseu: '',
      baseu2: '',
      baseu3: '',
      ratingTienda: 0,
      form: {},
      user: {},
      info: {},
      form2: {},
      allData: [],
      data: [],
      data2: [],
      data5: [],
      diasF: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    }
  },
  async mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/necesidad_img'
    this.baseu3 = env.apiUrl + '/tienda_img/'
    await this.getUser()
    this.getSolicitudes()
    this.getSolicitudes2()
    this.estaLogueado()
  },
  methods: {
    async getSolicitudes () {
      await this.$api.get('user_info').then(res => {
        this.info = res
        /* if (res.status === 0) {
          this.data = {}
          this.$q.dialog({
            title: 'Atención',
            message: 'Para cotizar y ver solicitudes de clientes debes esperar por la autorización del administrador.',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        } else if (res.status === 2) {
          this.data = {}
          this.$q.dialog({
            title: 'Atención',
            message: 'Tu cuenta ha sido rechazada. Debes modificar tu información de usuario y esperar por respuesta del administrador.',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        } */
        this.$api.get('necesidades').then(v => {
          if (v) {
            this.allData = v
            this.data = this.allData.slice(0, 3)
          }
        })
      })
    },

    async getSolicitudes2 () {
      this.$api.get('show_all_cotizations3').then(v => {
        if (v) {
          /* this.data2 = v */
          this.data2 = [
            {
              datos_cliente: { full_name: 'Nombre', last_name: 'Apellido', phone: '435634645', direccion: 'Direccion' },
              colorRadio: 'red',
              name: 'Nombre solicitud',
              necesidad_info: { descripcion: 'Descripcion' },
              status: 'Urgente',
              categorianame: { name: 'Nombre categoria' },
              fechaCreacion: '10/10/2021'
            },
            {
              datos_cliente: { full_name: 'Nombre', last_name: 'Apellido', phone: '435634645', direccion: 'Direccion' },
              colorRadio: 'blue',
              name: 'Nombre solicitud',
              necesidad_info: { descripcion: 'Descripcion' },
              status: 'Urgente',
              categorianame: { name: 'Nombre categoria' },
              fechaCreacion: '10/10/2021'
            }
          ]
        }
      })
    },

    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
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
      })
    },
    consultaropinion () {
      this.$api.get('opiniones2/' + this.form2._id).then(res => {
        if (res) {
          this.data5 = res
        }
      })
    },
    estaLogueado () {
      const logueo = JSON.parse(localStorage.getItem('TRI_SESSION_INFO'))
      if (logueo) {
        this.user = JSON.parse(localStorage.getItem('TRI_SESSION_INFO'))
      }
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
        this.data = this.allData
      } else {
        this.data = this.allData.slice(0, 3)
      }
      this.ver = !this.ver
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
