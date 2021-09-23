<template>
  <div>
    <div>
      <q-img src="nopublicidad.jpg" spinner-color="white" style="width:100%; height:160px">
        <div class="text-h6 absolute-bottom text-center bg-transparent">Solicitudes</div>
      </q-img>
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes Enviadas</div>
      <div class="text-caption text-grey-9 q-pb-md">Solicitudes enviadas.</div>
      <div class="column items-center" v-if="solicitudes.length">
        <q-card class="q-mb-sm" v-for="(item, index) in solicitudes" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div v-if="!item.isQuoted" class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div v-if="item.isQuoted === true" class="row justify-center items-center">
              <div class="bg-green" style="width: 100%">
                <q-chip color="transparent" text-color="white" class="text-weight-bold">
                  Recibiste cotizaciones
                </q-chip>
              </div>
              <div class="row justify-end items-center q-pa-xs">
                <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
                <div class="row q-gutter-xs">
                  <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                  <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                  <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status === 0 ? 'Disponible' : item.status === 1 ? 'En progreso' : 'Finalizado'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div class="q-pa-md">
      <div class="text-h6">Solicitudes activas</div>
      <div class="text-caption text-grey-9 q-pb-md">A continuación podrás ver todas las solicitudes activas que has creado.</div>
      <div class="column items-center" v-if="activas.length">
        <q-card class="q-mb-sm" v-for="(item, index) in activas" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{item.status === 0 ? 'Disponible' : 'En Progreso'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div v-if="allActivas.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver1 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(1)" />
    </div>

    <div class="q-pa-md">
      <div class="text-h6">Solicitudes completadas</div>
      <div class="text-caption text-grey-9 q-pb-md">Historial de solicitudes realizadas y completadas con éxito.</div>
      <div class="column items-center" v-if="completas.length">
        <q-card class="q-mb-sm" v-for="(item, index) in completas" :key="index" style="width:100%;height:270px;" @click="selecData(item)">
            <div class="row justify-end items-center q-pa-xs">
              <div class="text-caption text-grey-8 q-pr-xs">Nivel de requerimiento</div>
              <div class="row q-gutter-xs">
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="red" color="red" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="orange" color="orange" />
                <q-radio disable v-model="item.colorRadio" keep-color size="xs" dense val="blue" color="blue" />
              </div>
            </div>
            <div :class="'text-white q-py-xs q-px-md text-right text-bold bg-'+item.colorRadio" style="widyh:100%">{{item.name}}</div>
            <div class="row q-py-sm">
              <div class="column items-center justify-center" style="width:40%">
                <q-avatar size="90px">
                  <img :src="item.images ? baseu + '/' + item.images[0] : 'noimgpro.png'" spinner-color="white">
                </q-avatar>
                <div class="q-pl-sm q-mt-xs" style="width:100%">
                  <div class="row items-center">
                    <q-icon size="xs" name="person" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.full_name}} {{item.creador.last_name}}</div>
                  </div>
                  <div class="row q-mt-sm items-center">
                    <q-icon size="xs" name="place" color="grey-8" />
                    <div class="col-10 text-grey-8 text-caption ellipsis">{{item.creador.direccion}}</div>
                  </div>
                </div>
              </div>
              <div style="width:60%">
                <div class="text-h6 q-mb-xs">Descripción</div>
                <div class="row q-mb-md" style="height:50px; width:100%">
                  <div class="col-12 q-pr-xs text-grey-9 text-caption ellipsis-3-lines">{{item.descripcion}}</div>
                </div>
                <div class="row items-center">
                  <div class="text-caption text-grey-9 ellipsis"><b>Estado de solicitud:</b> {{'Finalizado'}}</div>
                </div>
                <div class="row items-center no-wrap q-mt-xs" style="width:100%">
                  <img :src="item.categoriaInfo.icons" style="width:18px" />
                  <div class="text-grey-8 q-pl-xs ellipsis">{{item.categoriaInfo.name}}</div>
                </div>
              </div>
            </div>
            <div class="absolute-bottom-right text-grey-8 q-pa-sm text-caption">Fecha de Solicitud: {{item.fechaCreacion}} </div>
          </q-card>
      </div>
      <q-card v-else class="shadow-2 q-ma-md q-pa-md">
        <div class="text-center text-subtitle1">Actualmente sin solicitudes...</div>
      </q-card>
    </div>
    <div v-if="allCompletas.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver2 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(2)" />
    </div>

    <div v-if="allSend.length > 3" class="row justify-center q-py-md">
      <q-btn rounded no-caps :label="!ver3 ? 'Ver más' : 'Ver menos'" color="primary" style="width:200px"
      @click="verMas(3)" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[7, 22]">
      <q-btn class="q-pa-xs q-mb-lg" color="primary" icon="touch_app" label="Nueva solicitud" style="border-radius: 10px;" no-caps @click="$router.push('registronecesidades')"/>
    </q-page-sticky>

    <q-dialog v-model="verSolicitud" v-if="verSolicitud">
      <q-card class="q-pt-xs q-pb-lg" style="width:100%">
        <div class="row justify-between items-center">
          <q-btn round dense flat class="q-ml-xs" icon="close" color="primary" @click="verSolicitud = false"/>
          <div class="q-pb-xs q-mr-xs">Fecha de Solicitud {{selec.fechaCreacion}}</div>
        </div>
          <div class="text-center text-white text-h5" :class="'bg-' + selec.colorRadio" style="width:100%">{{selec.name}}</div>
          <div class="row items-center q-pt-lg">
            <div class="col-5 row justify-center">
              <q-avatar size="100px">
                <img :src="baseuPerfil + selec.ownerId">
              </q-avatar>
            </div>
            <div class="col-7">
              <div class="row items-center no-wrap">
                <q-icon size="sm" name="person" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{selec.creador.full_name}} {{selec.creador.last_name}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="place" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{selec.direccion}}</div>
              </div>
              <div class="row q-mt-sm items-center no-wrap">
                <q-icon size="sm" name="clean_hands" color="grey-7" />
                <div class="text-grey-9 ellipsis">{{selec.categoriaInfo.name}}</div>
              </div>
            </div>
          </div>
          <div class="row justify-around items-center q-pt-md q-mb-md">
            <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
            <div class="row">
              <q-radio disable v-model="selec.colorRadio" keep-color size="xs" val="red" color="red" />
              <q-radio disable v-model="selec.colorRadio" keep-color size="xs" val="orange" color="orange" />
              <q-radio disable v-model="selec.colorRadio" keep-color size="xs" val="blue" color="blue" />
            </div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
          <div class="row q-mb-lg" style="height:60px">
            <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{selec.descripcion}}</div>
          </div>
          <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
          <q-scroll-area
            horizontal
            style="height: 110px;"
            class="q-ml-md"
          >
            <div class="row no-wrap" style="width: 100%">
              <q-card v-for="(img, index) in selec.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu + '/' + img, showImg = true">
                <q-img :src="baseu + '/' + img" spinner-color="white" style="height: 100px; width: 100px" />
              </q-card>
            </div>
          </q-scroll-area>
          <div class="row justify-center q-pa-sm q-mt-sm" v-if="selec.status === 0 || selec.status === 1">
            <q-btn  rounded  color="primary" label="Cancelar" no-caps style="width:200px" @click="changeStatus(selec._id)"/>
          </div>
          <div v-if="selec.opinion">
            <div class="q-ml-md text-h6 text-bold q-mt-md">Comentarios del servicio</div>
            <div class="row" style="height:60px">
              <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{selec.opinion.opinion}}</div>
              <div class="col-12 q-ml-xs q-px-md text-bold text-grey-9">Calificación</div>
              <div class="row q-mb-lg q-ml-md">
                <q-rating v-model="selec.opinion.rating" size="2em" color="orange" readonly/>
              </div>
            </div>
          </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show" v-if="show">
      <q-card class="q-pa-sm column items-center">
        <div class="q-mt-xl" style="height: 200px; width: 70%;">
          <q-img src="nopublicidad.jpg" style="height: 200px; width: 100%; border-radius: 15px">
          <div class="absolute-full column items-center column justify-end">
            <q-icon name="collections" class="text-grey" size="80px"></q-icon>
            <div class="text-bold text-center text-grey">Solicitud Cancelada</div>
          </div>
          </q-img>
        </div>
        <div class="text-h6 text-center text-bold q-mt-xl">¡Cancelaste con exito tu solicitud!</div>
        <div class="text-h6 text-center text-grey-9 text-subtitle1">Ya esta solicitud no aparecera más.</div>
        <div class="q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Volver" no-caps style="width:200px" @click="reload()"/>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      ver1: false,
      ver2: false,
      ver3: false,
      verSolicitud: false,
      showImg: false,
      baseu: '',
      baseuPerfil: '',
      imgSelec: '',
      selec: {},
      allSend: [],
      solicitudes: [],
      allActivas: [],
      activas: [],
      allCompletas: [],
      completas: [],
      show: false
    }
  },
  mounted () {
    this.getSolicitudes()
    this.baseu = env.apiUrl + '/necesidad_img'
    this.baseuPerfil = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getSolicitudes () {
      this.$q.loading.show({
        message: 'Cargando datos'
      })
      this.$api.get('user_info').then(res => {
        if (res) {
          var id = res._id
          this.$api.get('necesidad_by_user_id/' + id).then(v => {
            if (v) {
              this.allActivas = v.filter(v => v.status === 1)
              this.allCompletas = v.filter(v => v.status === 2)
              this.allSend = v.filter(v => v.status === 0)
              this.solicitudes = this.allSend.slice(0, 3)
              this.activas = this.allActivas.slice(0, 3)
              this.completas = this.allCompletas.slice(0, 3)
              this.$q.loading.hide()
            }
          })
        }
      })
    },
    selecData (data) {
      this.selec = data
      this.verSolicitud = true
    },
    editSolicitud (id) {
      this.$router.push('/editar_solicitud/' + id)
    },
    verMas (val) {
      if (val === 1) {
        this.ver1 = !this.ver1
        if (this.ver1) {
          this.activas = this.allActivas
        } else {
          this.activas = this.allActivas.slice(0, 3)
        }
      } else if (val === 2) {
        this.ver2 = !this.ver2
        if (this.ver2) {
          this.completas = this.allCompletas
        } else {
          this.completas = this.allCompletas.slice(0, 3)
        }
      } else {
        this.ver3 = !this.ver3
        if (this.ver3) {
          this.solicitudes = this.allSend
        } else {
          this.solicitudes = this.allSend.slice(0, 3)
        }
      }
    },
    changeStatus (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas cancelar esta solicitud?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.loading.show({
          message: 'Cancelando solicitud...'
        })
        this.$api.put('updateQuotation/' + id, { status: 3 }).then(res => {
          if (res) {
            this.$q.loading.hide()
            this.show = true
            this.verSolicitud = false
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    reload () {
      this.getSolicitudes()
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
