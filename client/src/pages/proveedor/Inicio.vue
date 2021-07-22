<template>
  <div>
    <q-img v-if="form2._id" :src="baseu + 'perfil' + form2._id" spinner-color="white" style="height: 300px; width: 100%;border-bottom-right-radius:25px;border-bottom-left-radius:25px">
      <div class="absolute-full">
      <div class="column absolute-top-right q-mt-md q-pr-md">
        <q-btn color="primary" label="Editar perfil" rounded no-caps class="q-pa-xs"
        @click="rol !== 1 ? $router.push('/perfil/taller') : ''" />
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
                <div class="col-10 text-grey-8 ellipsis">{{item.calificador_info.full_name}} {{item.calificador_info.last_name}}</div>
              </div>
            </div>
            <div class="q-mt-md" style="width:55%">
              <div class="text-h6 q-mt-lg q-mb-xs">{{item.data_request.name}}</div>
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
        <q-card v-for="(item, index) in data2" :key="index" style="width:350px;height:210px; border-radius:10px">
          <div class="row justify-end q-pr-md">
            <div class="row items-center">
              <div class="text-caption text-grey-8">Nivel de requerimiento</div>
              <div class="row q-gutter-xs q-pl-xs">
                <q-radio v-model="item.colorRadio" dense keep-color size="xs" val="red" color="red" />
                <q-radio v-model="item.colorRadio" dense keep-color size="xs" val="orange" color="orange" />
                <q-radio v-model="item.colorRadio" dense keep-color size="xs" val="blue" color="blue" />
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
                  <q-icon size="xs" name="phone" color="grey" />
                  <div class="col-10 text-grey-8 ellipsis text-caption">{{item.data_client.phone}}</div>
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
    <listado-de-sugerencia v-if="allData.length" :data="allData" :direccion="true" ruta="proveedor"/>
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
      diasF: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    }
  },
  async mounted () {
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/necesidad_img'
    this.baseu3 = env.apiUrl + '/tienda_img/'
    await this.getUser()
    this.getSolicitudes()
    this.getActiveRequest()
  },
  methods: {
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
